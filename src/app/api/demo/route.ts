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
    const prospectRes = await fetch(`${supabaseUrl}/rest/v1/prospects`, {
      method: 'POST',
      headers,
      body: JSON.stringify(prospect),
    })
    if (prospectRes.ok) {
      prospectSaved = true
    } else {
      const detail = await prospectRes.text().catch(() => '')
      console.error(`[demo] prospects insert failed (${prospectRes.status}): ${detail}`)
      // Retry without `source` in case that column is absent in this environment.
      const { source: _source, ...withoutSource } = prospect
      const retryRes = await fetch(`${supabaseUrl}/rest/v1/prospects`, {
        method: 'POST',
        headers,
        body: JSON.stringify(withoutSource),
      })
      if (retryRes.ok) {
        prospectSaved = true
      } else {
        const retryDetail = await retryRes.text().catch(() => '')
        console.error(`[demo] prospects retry failed (${retryRes.status}): ${retryDetail}`)
      }
    }
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

  // Confirmation email to the prospect. Fire-and-forget: an email failure must
  // never fail an otherwise-recorded lead.
  void sendDemoConfirmationEmail(email, firstName || fullName, companyName)

  return NextResponse.json({ success: true })
}

async function sendDemoConfirmationEmail(email: string, firstName: string, company: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[demo] RESEND_API_KEY missing — confirmation email not sent')
    return
  }

  const name = (firstName || '').split(/\s+/)[0] || 'there'
  const subject = 'We’ve got your details — Axia Atlas'
  const text = [
    `Hi ${name},`,
    '',
    `Thanks for booking time with Axia Atlas. We've received your details for ${company} and we're already taking a look at how you show up across search, answer engines, local, and social.`,
    '',
    `If you haven't picked a time yet, you can still choose a slot on the booking page. When we meet, we'll come with the gaps mapped and real recommendations — not a pitch deck.`,
    '',
    `Talk soon,`,
    'The Axia Atlas Team',
  ].join('\n')

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;">
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thanks for booking time with Axia Atlas. We&rsquo;ve received your details for <strong>${escapeHtml(company)}</strong> and we&rsquo;re already taking a look at how you show up across search, answer engines, local, and social.</p>
      <p>If you haven&rsquo;t picked a time yet, you can still choose a slot on the booking page. When we meet, we&rsquo;ll come with the gaps mapped and real recommendations &mdash; not a pitch deck.</p>
      <p>Talk soon,<br/>The Axia Atlas Team</p>
    </div>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Axia Atlas <partner@axiaatlas.com>',
        to: email,
        subject,
        text,
        html,
      }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error(`[demo] Resend confirmation failed (${res.status}): ${detail}`)
    }
  } catch (err) {
    console.error('[demo] Resend confirmation threw:', err)
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
