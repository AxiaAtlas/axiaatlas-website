import { NextRequest, NextResponse } from 'next/server'

/* Demo-request survey (/demo). Writes a lead to the portal `prospects` table
   (source: demo) so it shows up in the client portal and fires the portal's
   notification bell, and mirrors a record into `contact_submissions`. The lead
   is recorded on SURVEY submit — before, and independent of, whether the visitor
   completes the external Google appointment booking on the next step. */
export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('[demo] Supabase env vars missing — cannot record lead')
    return NextResponse.json({ error: 'DB not configured' }, { status: 500 })
  }

  const body = await req.json()
  const {
    firstName,
    lastName,
    email,
    phone,
    companyName,
    websiteUrl,
    noWebsite,
    position,
    linkedin,
    instagram,
    facebook,
    x,
    noSocials,
    growthArea,
  } = body

  // Required: first name, email, company name, and a growth area.
  if (!firstName || !email || !companyName || !growthArea) {
    return NextResponse.json(
      { error: 'First name, email, company name, and growth area are required' },
      { status: 400 },
    )
  }
  // Website required unless the visitor flagged they don't have one.
  if (!noWebsite && !websiteUrl) {
    return NextResponse.json(
      { error: 'Please add your website, or check that you don’t have one' },
      { status: 400 },
    )
  }
  // Socials: at least two platforms, unless they flagged no social presence.
  const socialEntries = [
    linkedin && `LinkedIn: ${linkedin}`,
    instagram && `Instagram: ${instagram}`,
    facebook && `Facebook: ${facebook}`,
    x && `X: ${x}`,
  ].filter(Boolean)
  if (!noSocials && socialEntries.length < 2) {
    return NextResponse.json(
      { error: 'Please add at least two social platforms, or check that you have no social presence' },
      { status: 400 },
    )
  }

  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim()
  const socials = socialEntries.join('\n')

  const notes = [
    '[Demo request]',
    noWebsite && '⚠ UPSELL: No website — opportunity to pitch a website build.',
    noSocials && '⚠ UPSELL: No social presence — greenfield social opportunity.',
    phone && `Phone: ${phone}`,
    position && `Position/role: ${position}`,
    websiteUrl && `Website: ${websiteUrl}`,
    socials && `Socials:\n${socials}`,
    growthArea && `Growth areas: ${growthArea}`,
  ].filter(Boolean).join('\n')

  // Concise pain-point summary for the portal's prospect card. Lead with the
  // upsell flag when there's no website so it's obvious at a glance.
  const painPoint = [noWebsite && 'No website (upsell)', growthArea]
    .filter(Boolean)
    .join(' · ')

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  }

  // Portal `prospects` columns: company (NOT NULL), website, linkedin_url,
  // contact_name, contact_email, pain_point, notes, status, source.
  const prospect = {
    company: companyName,
    website: noWebsite ? null : websiteUrl,
    linkedin_url: linkedin || null,
    contact_name: fullName || firstName,
    contact_email: email,
    pain_point: painPoint,
    notes,
    status: 'new',
    source: 'demo',
  }

  let prospectSaved = false
  let mirrorSaved = false

  try {
    prospectSaved = await insertProspect(supabaseUrl, headers, prospect)
  } catch (err) {
    console.error('[demo] prospects insert threw:', err)
  }

  // Mirror into contact_submissions for the marketing inbox (safety net).
  try {
    const mirrorRes = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: fullName || firstName,
        email,
        company: companyName,
        service: growthArea || 'Demo request',
        message: notes,
      }),
    })
    if (mirrorRes.ok) {
      mirrorSaved = true
    } else {
      const detail = await mirrorRes.text().catch(() => '')
      console.error(`[demo] contact_submissions insert failed (${mirrorRes.status}): ${detail}`)
    }
  } catch (err) {
    console.error('[demo] contact_submissions insert threw:', err)
  }

  // Only fail the request if the lead could not be recorded anywhere.
  if (!prospectSaved && !mirrorSaved) {
    return NextResponse.json({ error: 'Could not save your request' }, { status: 500 })
  }

  // No email is sent from the site. The portal sends the calendar invite + Meet
  // link only after the booking is confirmed on the portal booking page.
  return NextResponse.json({ success: true })
}

/* Insert a prospect, healing around columns that don't exist in this DB.
   The portal schema has drifted before (e.g. `company_name` vs `company`), so
   instead of guessing one column to drop, we read the REAL PostgREST/Postgres
   error, pull out the offending column name, drop it, and retry — looping until
   the insert succeeds or there's nothing left to strip. Every attempt is logged
   so the actual failing column is visible in the server logs. */
async function insertProspect(
  supabaseUrl: string,
  headers: Record<string, string>,
  prospect: Record<string, unknown>,
): Promise<boolean> {
  let payload: Record<string, unknown> = { ...prospect }
  // `company` is NOT NULL — never strip it. Bound the loop by the field count.
  const maxAttempts = Object.keys(payload).length + 1

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const res = await fetch(`${supabaseUrl}/rest/v1/prospects`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    if (res.ok) return true

    const detail = await res.text().catch(() => '')
    console.error(`[demo] prospects insert failed (${res.status}): ${detail}`)

    const missing = extractMissingColumn(detail)
    if (!missing || missing === 'company' || !(missing in payload)) {
      // Can't identify a strippable column — give up (mirror is the safety net).
      return false
    }
    console.error(`[demo] retrying prospects insert without absent column "${missing}"`)
    const { [missing]: _dropped, ...rest } = payload
    payload = rest
  }
  return false
}

/* Pull the column name out of a PostgREST/Postgres "column missing" error, e.g.
   PGRST204: "Could not find the 'pain_point' column of 'prospects' ..." or
   42703:    "column \"pain_point\" of relation \"prospects\" does not exist". */
function extractMissingColumn(detail: string): string | null {
  const m =
    detail.match(/Could not find the '([^']+)' column/i) ||
    detail.match(/column "([^"]+)" of relation/i) ||
    detail.match(/column ([a-z0-9_]+) does not exist/i)
  return m ? m[1] : null
}
