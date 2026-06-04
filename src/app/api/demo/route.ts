import { NextRequest, NextResponse } from 'next/server'

/* Audit-request survey (/demo). Writes a lead to `prospects` so it shows up in
   the client portal, and mirrors a record into `contact_submissions`. */
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
    preferredDate,
    preferredTime,
    notes: extraNotes,
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

  const preferredCall = [preferredDate, preferredTime].filter(Boolean).join(' · ')

  const notes = [
    '[Website audit request]',
    phone && `Phone: ${phone}`,
    position && `Position/role: ${position}`,
    websiteUrl && `Website: ${websiteUrl}`,
    socials && `Socials:\n${socials}`,
    growthArea && `Growth areas: ${growthArea}`,
    preferredCall && `Preferred call time: ${preferredCall}`,
    extraNotes && `Notes: ${extraNotes}`,
  ].filter(Boolean).join('\n')

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  }

  try {
    // Primary: portal lead
    await fetch(`${supabaseUrl}/rest/v1/prospects`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        company_name: companyName,
        contact_name: fullName || firstName,
        contact_email: email,
        notes,
        status: 'new',
      }),
    })

    // Mirror into contact_submissions for the marketing inbox
    await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: fullName || firstName,
        email,
        company: companyName,
        service: growthArea || 'Audit request',
        message: notes,
      }),
    })
  } catch {
    return NextResponse.json({ error: 'Could not save your request' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
