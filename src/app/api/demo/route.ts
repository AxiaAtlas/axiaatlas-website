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
    companyName,
    websiteUrl,
    linkedin,
    instagram,
    facebook,
    x,
    name,
    role,
    email,
    goal,
    challenge,
    budget,
  } = body

  if (!name || !email || !companyName) {
    return NextResponse.json({ error: 'Company, name, and email are required' }, { status: 400 })
  }

  const socials = [
    linkedin && `LinkedIn: ${linkedin}`,
    instagram && `Instagram: ${instagram}`,
    facebook && `Facebook: ${facebook}`,
    x && `X: ${x}`,
  ].filter(Boolean).join('\n')

  const notes = [
    '[Website audit request]',
    role && `Role: ${role}`,
    websiteUrl && `Website: ${websiteUrl}`,
    socials && `Socials:\n${socials}`,
    goal && `Primary goal: ${goal}`,
    challenge && `Biggest challenge: ${challenge}`,
    budget && `Approx monthly budget: ${budget}`,
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
        contact_name: name,
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
        name,
        email,
        company: companyName,
        service: goal || 'Audit request',
        message: notes,
      }),
    })
  } catch {
    return NextResponse.json({ error: 'Could not save your request' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
