import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

/* Careers application (/careers). Receives the 3-step application as multipart
   form data, stores the resume in the Supabase Storage `resumes` bucket, then
   writes a row to `careers_applications` (anon INSERT per RLS migration 016) so
   it surfaces in the portal's Careers tab under Website Analytics. */

const RESUME_BUCKET = 'resumes'
const MAX_BYTES = 4 * 1024 * 1024 // keep under Vercel's ~4.5MB request body cap
const ALLOWED_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'DB not configured' }, { status: 500 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
  }

  const get = (k: string) => (formData.get(k) as string | null)?.trim() || ''

  const fullName = get('fullName')
  const email = get('email')
  const phone = get('phone')
  const linkedin = get('linkedin')
  const role = get('role')
  const yearsExperience = get('yearsExperience')
  const experience = get('experience')
  const whyAxia = get('whyAxia')
  const resume = formData.get('resume')

  // Required: name, email, role applying for, and a resume file.
  if (!fullName || !email || !role) {
    return NextResponse.json(
      { error: 'Name, email, and the role you’re applying for are required' },
      { status: 400 },
    )
  }
  if (!(resume instanceof File) || resume.size === 0) {
    return NextResponse.json({ error: 'Please attach your resume' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.has(resume.type)) {
    return NextResponse.json({ error: 'Resume must be a PDF or Word document' }, { status: 400 })
  }
  if (resume.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Resume must be under 4MB' }, { status: 400 })
  }

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  }

  // 1) Upload the resume to private storage. Path is namespaced + de-duplicated.
  const safeName = (resume.name || 'resume').replace(/[^a-zA-Z0-9._-]/g, '_')
  const resumePath = `applications/${Date.now()}-${randomUUID().slice(0, 8)}-${safeName}`
  try {
    const bytes = Buffer.from(await resume.arrayBuffer())
    const uploadRes = await fetch(
      `${supabaseUrl}/storage/v1/object/${RESUME_BUCKET}/${resumePath}`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': resume.type || 'application/octet-stream',
          'x-upsert': 'false',
        },
        body: bytes,
      },
    )
    if (!uploadRes.ok) {
      return NextResponse.json({ error: 'Could not upload your resume' }, { status: 502 })
    }
  } catch {
    return NextResponse.json({ error: 'Could not upload your resume' }, { status: 500 })
  }

  // 2) Save the application row (resume referenced by storage path).
  try {
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/careers_applications`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({
        full_name: fullName,
        email,
        phone: phone || null,
        linkedin: linkedin || null,
        role,
        years_experience: yearsExperience || null,
        experience: experience || null,
        why_axia: whyAxia || null,
        resume_path: resumePath,
        resume_filename: resume.name || safeName,
        status: 'new',
      }),
    })
    if (!insertRes.ok) {
      return NextResponse.json({ error: 'Could not save your application' }, { status: 502 })
    }
  } catch {
    return NextResponse.json({ error: 'Could not save your application' }, { status: 500 })
  }

  // 3) Send the applicant a confirmation email. Fire-and-forget: a Resend
  //    failure (or missing key) must never fail an otherwise-saved application.
  void sendConfirmationEmail(email, fullName, role)

  return NextResponse.json({ success: true })
}

async function sendConfirmationEmail(email: string, fullName: string, role: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const firstName = fullName.split(/\s+/)[0] || 'there'
  const subject = 'We received your application — Axia Atlas'
  const text = [
    `Hi ${firstName},`,
    '',
    `Thank you for applying to Axia Atlas. We've received your application for the ${role} role and it's now with our team for review.`,
    '',
    `We read every application carefully. If your background looks like a strong fit, we'll reach out to take the conversation further.`,
    '',
    `Thank you again for your interest in helping brands be SEEN.`,
    '',
    'Warm regards,',
    'The Axia Atlas Team',
  ].join('\n')

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thank you for applying to Axia Atlas. We&rsquo;ve received your application for the <strong>${escapeHtml(role)}</strong> role and it&rsquo;s now with our team for review.</p>
      <p>We read every application carefully. If your background looks like a strong fit, we&rsquo;ll reach out to take the conversation further.</p>
      <p>Thank you again for your interest in helping brands be SEEN.</p>
      <p>Warm regards,<br/>The Axia Atlas Team</p>
    </div>`

  try {
    await fetch('https://api.resend.com/emails', {
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
  } catch {
    // Swallowed by design — the application is already saved.
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
