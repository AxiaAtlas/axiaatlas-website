import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'DB not configured' }, { status: 500 })
  }

  const body = await req.json()
  const { name, email, company, service, message } = body

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  }

  // Save to contact_submissions
  await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, company: company || null, service: service || null, message: message || null }),
  })

  // Also save to prospects so it appears in portal
  await fetch(`${supabaseUrl}/rest/v1/prospects`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      company_name: company || name,
      contact_name: name,
      contact_email: email,
      notes: `[Website contact] Service interest: ${service || 'Not specified'}\n\n${message || ''}`.trim(),
      status: 'new',
    }),
  })

  return NextResponse.json({ success: true })
}
