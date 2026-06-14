'use client'
import { useRef, useState } from 'react'
import Footer from '@/components/Footer'
import { Arrow, Check, Doc } from '@/components/icons'

const ROLES = [
  'SEO & Content Strategist',
  'Answer-Engine / GEO Specialist',
  'Social Media Manager',
  'Local Presence Specialist',
  'Web Designer / Developer',
  'Account & Strategy',
  'Content Writer',
  'Graphic / Brand Designer',
  'General / Open application',
]

const YEARS = ['Less than 1 year', '1–2 years', '3–5 years', '6–9 years', '10+ years']

const WORK_AUTH = ['Yes', 'No']

// Standard country list (ISO common/short names).
const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Brazzaville)', 'Congo (Kinshasa)', 'Costa Rica', 'Côte d’Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czechia',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
  'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
  'Haiti', 'Honduras', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
  'Oman',
  'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar',
  'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
  'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen',
  'Zambia', 'Zimbabwe',
]

type Form = {
  // Step 1 — person
  fullName: string; email: string; phone: string; linkedin: string
  // Step 2 — experience
  role: string; yearsExperience: string; experience: string; proudOf: string
  whyAxia: string; availability: string; workAuthorized: string; workCountry: string
}

const EMPTY: Form = {
  fullName: '', email: '', phone: '', linkedin: '',
  role: '', yearsExperience: '', experience: '', proudOf: '',
  whyAxia: '', availability: '', workAuthorized: '', workCountry: '',
}

// Accepts linkedin.com/in/… profile URLs (with or without scheme / www / subdomain).
const LINKEDIN_RE = /^(https?:\/\/)?([\w-]+\.)?linkedin\.com\/.+/i

const MAX_BYTES = 4 * 1024 * 1024
const ACCEPT = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

export default function CareersPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<Form>(EMPTY)
  const [resume, setResume] = useState<File | null>(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  function pickFile(file: File | null) {
    setError('')
    if (!file) { setResume(null); return }
    const okType = /\.(pdf|docx?|)$/i.test(file.name) || ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)
    if (!okType) { setError('Please upload a PDF or Word document.'); return }
    if (file.size > MAX_BYTES) { setError('Your resume must be under 4MB.'); return }
    setResume(file)
  }

  // Step 1 → 2: require name, email, and a valid LinkedIn URL
  function nextFromPerson(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.fullName.trim()) { setError('Please add your name.'); return }
    if (!form.email.trim()) { setError('Please add your email.'); return }
    if (!form.linkedin.trim()) { setError('Please add your LinkedIn profile.'); return }
    if (!LINKEDIN_RE.test(form.linkedin.trim())) { setError('Please enter a valid LinkedIn URL (linkedin.com/in/…).'); return }
    setStep(2)
  }

  // Step 2 → 3: all seven screening questions are required
  function nextFromExperience(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.role) { setError('Please pick the role you’re applying for.'); return }
    if (!form.yearsExperience) { setError('Please pick your years of experience.'); return }
    if (!form.experience.trim()) { setError('Please tell us a little about your experience.'); return }
    if (!form.proudOf.trim()) { setError('Please describe a project or result you’re proud of.'); return }
    if (!form.whyAxia.trim()) { setError('Please tell us why you want to work at Axia Atlas.'); return }
    if (!form.availability.trim()) { setError('Please share your availability or earliest start date.'); return }
    if (!form.workCountry) { setError('Please select your country.'); return }
    if (!form.workAuthorized) { setError('Please confirm your work authorization.'); return }
    setStep(3)
  }

  // Step 3 → submit: require resume, send everything as multipart form data
  async function submitApplication(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!resume) { setError('Please attach your resume to submit.'); return }
    setSending(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      fd.append('resume', resume)
      const res = await fetch('/api/careers', { method: 'POST', body: fd })
      if (res.ok) {
        setSent(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Something went wrong. Please email partner@axiaatlas.com directly.')
      }
    } catch {
      setError('Network error. Please email partner@axiaatlas.com directly.')
    }
    setSending(false)
  }

  const stepClass = (n: number) => (step === n ? 'active' : step > n ? 'done' : '')

  return (
    <div className="page careers-page">
      <div className="demo-hero">
        <div className="section-eyebrow">Careers</div>
        <h1 className="section-headline">Help businesses become impossible to miss.</h1>
        <p className="section-sub">We build presence across search, answer engines, local, and social — and we&apos;re always glad to meet sharp, curious people who do great work. Tell us about yourself in three quick steps.</p>
      </div>

      <div className="demo-body">
        <div className="demo-card">
          {sent ? (
            <div style={{ textAlign: 'center', padding: '24px 0 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18, color: 'var(--accent)' }}>
                <Check style={{ width: 44, height: 44 }} />
              </div>
              <div className="demo-step-title" style={{ marginBottom: 10 }}>Application received.</div>
              <p className="demo-step-sub" style={{ marginBottom: 0, maxWidth: 440, marginInline: 'auto' }}>
                Thanks, {form.fullName.split(' ')[0] || 'and welcome'}. We&apos;ve got your details and your resume. If there&apos;s a fit, someone from our team will reach out at <strong style={{ color: 'var(--text)' }}>{form.email}</strong>. Questions in the meantime? Email <a href="mailto:partner@axiaatlas.com" style={{ color: 'var(--accent)' }}>partner@axiaatlas.com</a>.
              </p>
            </div>
          ) : (
            <>
              <div className="demo-steps" aria-hidden="true">
                <div className={`demo-step-dot ${stepClass(1)}`}>
                  <span className="num">{step > 1 ? '✓' : '1'}</span> About you
                </div>
                <div className="demo-step-bar" />
                <div className={`demo-step-dot ${stepClass(2)}`}>
                  <span className="num">{step > 2 ? '✓' : '2'}</span> Experience
                </div>
                <div className="demo-step-bar" />
                <div className={`demo-step-dot ${stepClass(3)}`}>
                  <span className="num">3</span> Resume
                </div>
              </div>

              {step === 1 && (
                <form onSubmit={nextFromPerson}>
                  <div className="demo-step-title">First, a little about you</div>
                  <div className="demo-step-sub">So we know who you are and how to reach you.</div>

                  <div className="form-row">
                    <label>Full name *</label>
                    <input value={form.fullName} onChange={set('fullName')} placeholder="Your full name" required autoFocus />
                  </div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>Email *</label>
                      <input type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" required />
                    </div>
                    <div className="form-row">
                      <label>Phone <span className="form-hint">(optional)</span></label>
                      <input type="tel" value={form.phone} onChange={set('phone')} placeholder="(555) 123-4567" inputMode="tel" />
                    </div>
                  </div>

                  <div className="form-row">
                    <label>LinkedIn *</label>
                    <input type="url" value={form.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/in/…" required />
                  </div>

                  {error && <div className="demo-error">{error}</div>}

                  <div className="demo-actions">
                    <div className="spacer" />
                    <button type="submit" className="btn-primary">Continue <Arrow className="arr" /></button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={nextFromExperience}>
                  <div className="demo-step-title">Your experience</div>
                  <div className="demo-step-sub">Tell us what you&apos;d be doing and what you&apos;ve done.</div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>Role you&apos;re applying for *</label>
                      <select value={form.role} onChange={set('role')} required autoFocus>
                        <option value="">— Select a role —</option>
                        {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div className="form-row">
                      <label>Years of experience *</label>
                      <select value={form.yearsExperience} onChange={set('yearsExperience')} required>
                        <option value="">— Select —</option>
                        {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <label>Tell us about your relevant experience *</label>
                    <textarea value={form.experience} onChange={set('experience')} placeholder="The work you've done, the results you're proud of, the tools and channels you know best." required />
                  </div>

                  <div className="form-row">
                    <label>Describe a project or result you&apos;re most proud of, and your specific role in it *</label>
                    <textarea value={form.proudOf} onChange={set('proudOf')} placeholder="What the project was, what you personally owned, and the outcome it drove." required />
                  </div>

                  <div className="form-row">
                    <label>Why do you want to work at Axia Atlas? *</label>
                    <textarea value={form.whyAxia} onChange={set('whyAxia')} placeholder="What draws you to this work and to us." required />
                  </div>

                  <div className="form-row">
                    <label>Availability / earliest start date *</label>
                    <input value={form.availability} onChange={set('availability')} placeholder="e.g. Two weeks' notice, or June 30" required />
                  </div>

                  <div className="form-2col form-2col-inline">
                    <div className="form-row">
                      <label>Country *</label>
                      <select value={form.workCountry} onChange={set('workCountry')} required>
                        <option value="">— Select your country —</option>
                        {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="form-row">
                      <label>Authorized to work in that country? *</label>
                      <select value={form.workAuthorized} onChange={set('workAuthorized')} required>
                        <option value="">— Select —</option>
                        {WORK_AUTH.map((w) => <option key={w} value={w}>{w}</option>)}
                      </select>
                    </div>
                  </div>

                  {error && <div className="demo-error">{error}</div>}

                  <div className="demo-actions">
                    <button type="button" className="btn-outline" onClick={() => { setError(''); setStep(1) }}>← Back</button>
                    <div className="spacer" />
                    <button type="submit" className="btn-primary">Continue <Arrow className="arr" /></button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={submitApplication}>
                  <div className="demo-step-title">Attach your resume</div>
                  <div className="demo-step-sub">PDF or Word document, up to 4MB. This is the last step.</div>

                  <input
                    ref={fileInput}
                    type="file"
                    accept={ACCEPT}
                    onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                    style={{ display: 'none' }}
                  />

                  {resume ? (
                    <div className="file-chip">
                      <Doc className="file-chip-ico" />
                      <div className="file-chip-meta">
                        <span className="file-chip-name">{resume.name}</span>
                        <span className="file-chip-size">{(resume.size / 1024).toFixed(0)} KB</span>
                      </div>
                      <button type="button" className="file-chip-remove" onClick={() => { setResume(null); if (fileInput.current) fileInput.current.value = '' }}>Remove</button>
                    </div>
                  ) : (
                    <button type="button" className="file-drop" onClick={() => fileInput.current?.click()}>
                      <Doc className="file-drop-ico" />
                      <span className="file-drop-title">Upload your resume</span>
                      <span className="file-drop-hint">Click to choose a PDF or Word file (max 4MB)</span>
                    </button>
                  )}

                  {error && <div className="demo-error">{error}</div>}

                  <div className="demo-actions">
                    <button type="button" className="btn-outline" onClick={() => { setError(''); setStep(2) }}>← Back</button>
                    <div className="spacer" />
                    <button type="submit" className="btn-primary" disabled={sending} style={{ opacity: sending ? 0.7 : 1 }}>
                      {sending ? 'Submitting…' : <>Submit application <Arrow className="arr" /></>}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>

        <p className="careers-note">
          Don&apos;t see your exact role? Apply under <strong>General / Open application</strong> — we read every submission. Prefer email? Reach us at <a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a>.
        </p>
      </div>

      <Footer />
    </div>
  )
}
