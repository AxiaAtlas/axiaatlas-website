'use client'
import { useState } from 'react'
import Footer from '@/components/Footer'
import { Arrow } from '@/components/icons'

const GROWTH_AREAS = [
  'Get found in search (SEO)',
  'Get cited by answer engines (AEO/GEO)',
  'Win local / "near me" customers',
  'Grow on social media',
  'Build a founder / executive brand',
  'Launch or rebuild my website',
  'Generate more leads / pipeline',
  'Not sure yet — help me figure it out',
]

/* Portal booking page. After the survey saves the lead to Prospects, we hand the
   visitor off here to pick a time. Name / email / company are passed as query
   params so the portal page prefills them. The portal sends the invite + Meet
   link only after the booking is confirmed — this site sends no email. */
const PORTAL_BOOKING_BASE = 'https://app.axiaatlas.com/book/4e9c1a7b8f2d4c6e9a0b3d5f7c1e2a4b'

type Form = {
  // Step 1 — person
  firstName: string; lastName: string; email: string; phone: string
  // Step 2 — business
  companyName: string; websiteUrl: string; noWebsite: boolean; position: string
  linkedin: string; instagram: string; facebook: string; x: string; noSocials: boolean
  growthArea: string
}

const EMPTY: Form = {
  firstName: '', lastName: '', email: '', phone: '',
  companyName: '', websiteUrl: '', noWebsite: false, position: '',
  linkedin: '', instagram: '', facebook: '', x: '', noSocials: false,
  growthArea: '',
}

export default function DemoPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<Form>(EMPTY)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const socialCount = [form.linkedin, form.instagram, form.facebook, form.x].filter((v) => v.trim()).length

  // Portal booking link with the entered details passed through for prefill.
  const portalBookingUrl = (() => {
    const name = [form.firstName, form.lastName].filter(Boolean).join(' ').trim()
    const params = new URLSearchParams()
    if (name) params.set('name', name)
    if (form.email.trim()) params.set('email', form.email.trim())
    if (form.companyName.trim()) params.set('company', form.companyName.trim())
    const q = params.toString()
    return q ? `${PORTAL_BOOKING_BASE}?${q}` : PORTAL_BOOKING_BASE
  })()

  // Step 1 → 2: require first name + email (the only required person fields)
  function nextFromPerson(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.firstName.trim()) { setError('Please add your first name.'); return }
    if (!form.email.trim()) { setError('Please add your email.'); return }
    setStep(2)
  }

  // Step 2 → 3: validate, save the survey, then show the calendar
  async function submitSurvey(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.companyName.trim()) { setError('Please add your company name.'); return }
    if (!form.noWebsite && !form.websiteUrl.trim()) { setError('Please add your website, or check that you don’t have one yet.'); return }
    if (!form.growthArea) { setError('Please pick the area you need growth in.'); return }
    if (!form.noSocials && socialCount < 2) { setError('Please add at least two social platforms, or check that you don’t have a social presence.'); return }
    setSending(true)
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setStep(3)
      else setError('Something went wrong. Please email partner@axiaatlas.com directly.')
    } catch {
      setError('Network error. Please email partner@axiaatlas.com directly.')
    }
    setSending(false)
  }

  const stepClass = (n: number) => (step === n ? 'active' : step > n ? 'done' : '')

  return (
    <div className="page demo-page">
      <div className="demo-hero">
        <div className="section-eyebrow">Book a Demo</div>
        <h1 className="section-headline">Your next customer is searching right now.</h1>
        <p className="section-sub">Three quick steps to a call worth your time. Before we meet, we audit how you show up across search, answer engines, local, and social — so we arrive with the gaps mapped and real solutions, not a pitch deck.</p>
      </div>

      <div className="demo-body">
        <div className="demo-card">
          <>
              <div className="demo-steps" aria-hidden="true">
                <div className={`demo-step-dot ${stepClass(1)}`}>
                  <span className="num">{step > 1 ? '✓' : '1'}</span> About you
                </div>
                <div className="demo-step-bar" />
                <div className={`demo-step-dot ${stepClass(2)}`}>
                  <span className="num">{step > 2 ? '✓' : '2'}</span> Your business
                </div>
                <div className="demo-step-bar" />
                <div className={`demo-step-dot ${stepClass(3)}`}>
                  <span className="num">3</span> Book time
                </div>
              </div>

              {step === 1 && (
                <form onSubmit={nextFromPerson}>
                  <div className="demo-step-title">First, a little about you</div>
                  <div className="demo-step-sub">So we know who we&apos;re talking to and how to reach you.</div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>First name *</label>
                      <input value={form.firstName} onChange={set('firstName')} placeholder="Your first name" required autoFocus />
                    </div>
                    <div className="form-row">
                      <label>Last name</label>
                      <input value={form.lastName} onChange={set('lastName')} placeholder="Your last name" />
                    </div>
                  </div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>Email *</label>
                      <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" required />
                    </div>
                    <div className="form-row">
                      <label>Phone <span className="form-hint">(optional)</span></label>
                      <input type="tel" value={form.phone} onChange={set('phone')} placeholder="(555) 123-4567" inputMode="tel" />
                    </div>
                  </div>

                  {error && <div className="demo-error">{error}</div>}

                  <div className="demo-actions">
                    <div className="spacer" />
                    <button type="submit" className="btn-primary">Continue <Arrow className="arr" /></button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={submitSurvey}>
                  <div className="demo-step-title">Tell us about your business</div>
                  <div className="demo-step-sub">Just the basics so we can take a look before we talk. Add the links you have — skip the ones you don&apos;t.</div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>Company name *</label>
                      <input value={form.companyName} onChange={set('companyName')} placeholder="Your company" required autoFocus />
                    </div>
                    <div className="form-row">
                      <label>Website {form.noWebsite ? <span className="form-hint">(none)</span> : '*'}</label>
                      <input
                        value={form.websiteUrl}
                        onChange={set('websiteUrl')}
                        placeholder="https://yourcompany.com"
                        inputMode="url"
                        disabled={form.noWebsite}
                        required={!form.noWebsite}
                      />
                      <label className="demo-check">
                        <input
                          type="checkbox"
                          checked={form.noWebsite}
                          onChange={(e) => setForm((f) => ({ ...f, noWebsite: e.target.checked, websiteUrl: e.target.checked ? '' : f.websiteUrl }))}
                        />
                        <span>I don&apos;t have a website</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-row">
                    <label>Position / role <span className="form-hint">(optional)</span></label>
                    <input value={form.position} onChange={set('position')} placeholder="Founder, Marketing Lead…" />
                  </div>

                  <div className="form-row">
                    <label>
                      Social profiles {form.noSocials ? <span className="form-hint">(none)</span> : <span className="form-hint">(add at least 2)</span>}
                    </label>
                  </div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>LinkedIn</label>
                      <input value={form.linkedin} onChange={set('linkedin')} placeholder="@yourcompany" disabled={form.noSocials} />
                    </div>
                    <div className="form-row">
                      <label>Instagram</label>
                      <input value={form.instagram} onChange={set('instagram')} placeholder="@yourbrand" disabled={form.noSocials} />
                    </div>
                  </div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>Facebook</label>
                      <input value={form.facebook} onChange={set('facebook')} placeholder="@yourbrand" disabled={form.noSocials} />
                    </div>
                    <div className="form-row">
                      <label>X (Twitter)</label>
                      <input value={form.x} onChange={set('x')} placeholder="@yourbrand" disabled={form.noSocials} />
                    </div>
                  </div>

                  <label className="demo-check">
                    <input
                      type="checkbox"
                      checked={form.noSocials}
                      onChange={(e) => setForm((f) => ({
                        ...f,
                        noSocials: e.target.checked,
                        ...(e.target.checked ? { linkedin: '', instagram: '', facebook: '', x: '' } : {}),
                      }))}
                    />
                    <span>I don&apos;t have a social media presence</span>
                  </label>

                  <div className="form-row">
                    <label>What areas do you need growth in? *</label>
                    <select value={form.growthArea} onChange={set('growthArea')} required>
                      <option value="">— Select an area —</option>
                      {GROWTH_AREAS.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>

                  {error && <div className="demo-error">{error}</div>}

                  <div className="demo-actions">
                    <button type="button" className="btn-outline" onClick={() => { setError(''); setStep(1) }}>← Back</button>
                    <div className="spacer" />
                    <button type="submit" className="btn-primary" disabled={sending} style={{ opacity: sending ? 0.7 : 1 }}>
                      {sending ? 'Saving…' : <>Continue to booking <Arrow className="arr" /></>}
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <div className="demo-done">
                  <div className="demo-done-check" aria-hidden="true">✓</div>
                  <div className="demo-step-title">You&apos;re all set{form.firstName ? `, ${form.firstName}` : ''} — one last step</div>
                  <div className="demo-step-sub">We&apos;ve got your details for {form.companyName || 'your business'}. Pick a time on our booking page and we&apos;ll confirm your demo — you&apos;ll get the calendar invite and meeting link once it&apos;s confirmed. We&apos;ll arrive with the gaps mapped and real recommendations, not a pitch deck.</div>

                  <a href={portalBookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary demo-done-cta">
                    Pick a time for your demo <Arrow className="arr" />
                  </a>

                  <div className="demo-booking-foot">
                    Your name, email, and company carry over so you don&apos;t have to retype them.
                  </div>
                </div>
              )}
            </>
        </div>
      </div>

      <Footer />
    </div>
  )
}
