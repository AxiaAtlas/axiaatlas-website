import { NextRequest, NextResponse } from 'next/server'

/* Demo-request survey (/demo). Writes a lead to `prospects` (source: demo) so it
   shows up in the client portal, and mirrors a record into `contact_submissions`.
   Booking itself happens client-side via the embedded Google appointment page. */
export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
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
    position,
    linkedin,
    instagram,
    facebook,
    x,
    growthArea,
  } = body

  // Required: first name, email, company name, website.
  if (!firstName || !email || !companyName || !websiteUrl) {
    return NextResponse.json(
      { error: 'First name, email, company name, and website are required' },
      { status: 400 },
    )
  }

  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim()

  const socials = [
    linkedin && `LinkedIn: ${linkedin}`,
    instagram && `Instagram: ${instagram}`,
    facebook && `Facebook: ${facebook}`,
    x && `X: ${x}`,
  ].filter(Boolean).join('\n')

  const notes = [
    '[Demo request]',
    phone && `Phone: ${phone}`,
    position && `Position/role: ${position}`,
    websiteUrl && `Website: ${websiteUrl}`,
    socials && `Socials:\n${socials}`,
    growthArea && `Growth areas: ${growthArea}`,
  ].filter(Boolean).join('\n')

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  }

  try {
    // Primary: portal lead, tagged with source. If the `source` column doesn't
    // exist yet in the prospects table, retry without it so the lead is never lost.
    const prospect = {
      company_name: companyName,
      contact_name: fullName || firstName,
      contact_email: email,
      notes,
      status: 'new',
    }
    const prospectRes = await fetch(`${supabaseUrl}/rest/v1/prospects`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ ...prospect, source: 'demo' }),
    })
    if (!prospectRes.ok) {
      await fetch(`${supabaseUrl}/rest/v1/prospects`, {
        method: 'POST',
        headers,
        body: JSON.stringify(prospect),
      })
    }

    // Mirror into contact_submissions for the marketing inbox
    await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
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
  } catch {
    return NextResponse.json({ error: 'Could not save your request' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
