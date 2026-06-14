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
  const subRes = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, company: company || null, service: service || null, message: message || null }),
  })
  if (!subRes.ok) {
    console.error(`[contact] contact_submissions insert failed (${subRes.status}): ${await subRes.text().catch(() => '')}`)
  }

  // Also save to the portal `prospects` table so it appears in the portal and
  // fires the notification bell. Columns: company (NOT NULL), contact_name,
  // contact_email, notes, status, source.
  const prospectRes = await fetch(`${supabaseUrl}/rest/v1/prospects`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      company: company || name,
      contact_name: name,
      contact_email: email,
      notes: `[Website contact] Service interest: ${service || 'Not specified'}\n\n${message || ''}`.trim(),
      status: 'new',
      source: 'contact',
    }),
  })
  if (!prospectRes.ok) {
    console.error(`[contact] prospects insert failed (${prospectRes.status}): ${await prospectRes.text().catch(() => '')}`)
  }

  return NextResponse.json({ success: true })
}
