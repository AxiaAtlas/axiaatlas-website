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

  return NextResponse.json({ success: true })
}
