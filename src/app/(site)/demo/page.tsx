'use client'
import { useState } from 'react'
import Footer from '@/components/Footer'
import { Arrow, Check } from '@/components/icons'

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

/* Public Google Appointment Schedule booking page (no API/OAuth — embed only).
   Short link: https://calendar.app.google/iziwgCH6zEvDAhcX7 */
const BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2i3onIzlpInG346A55jVk9v_T3ZhQTdLp-XsYnUyfCKVzIrshUzklTxrj_sGxr5b03FykQf92O?gv=true'
const BOOKING_FALLBACK_URL = 'https://calendar.app.google/iziwgCH6zEvDAhcX7'

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
  const [frameLoaded, setFrameLoaded] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const socialCount = [form.linkedin, form.instagram, form.facebook, form.x].filter((v) => v.trim()).length

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
                <div>
                  <div className="demo-booked-note"><Check /> Details received — we&apos;re already looking at {form.companyName}.</div>
                  <div className="demo-step-title">Book time for your call</div>
                  <div className="demo-step-sub">Pick a slot that works for you — you&apos;ll get a calendar invite right away.</div>

                  <div className="demo-booking-frame">
                    <div className="demo-booking-head">
                      <span>Schedule your demo call</span>
                      <span className="demo-booking-brand">Axia Atlas</span>
                    </div>
                    <div className="demo-booking-body">
                      {!frameLoaded && (
                        <div className="demo-booking-spinner" aria-label="Loading booking calendar">
                          <div className="spin" />
                          <span>Loading available times…</span>
                        </div>
                      )}
                      <iframe
                        src={BOOKING_URL}
                        title="Book your demo call"
                        onLoad={() => setFrameLoaded(true)}
                        style={{ opacity: frameLoaded ? 1 : 0 }}
                      />
                    </div>
                  </div>

                  <div className="demo-booking-foot">
                    Calendar not loading?{' '}
                    <a href={BOOKING_FALLBACK_URL} target="_blank" rel="noopener noreferrer">Open the booking page in a new tab →</a>
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
