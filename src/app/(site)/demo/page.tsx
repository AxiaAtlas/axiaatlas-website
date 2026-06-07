'use client'
import { useState } from 'react'
import Link from 'next/link'
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

const TIME_WINDOWS = [
  'Morning (9am – 12pm)',
  'Midday (12pm – 2pm)',
  'Afternoon (2pm – 5pm)',
  'Flexible — any time works',
]

type Form = {
  // Step 1 — person
  firstName: string; lastName: string; email: string; phone: string
  // Step 2 — business
  companyName: string; websiteUrl: string; position: string
  linkedin: string; instagram: string; facebook: string; x: string
  growthArea: string
  // Step 3 — book time
  preferredDate: string; preferredTime: string; notes: string
}

const EMPTY: Form = {
  firstName: '', lastName: '', email: '', phone: '',
  companyName: '', websiteUrl: '', position: '',
  linkedin: '', instagram: '', facebook: '', x: '',
  growthArea: '',
  preferredDate: '', preferredTime: '', notes: '',
}

export default function DemoPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<Form>(EMPTY)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  // Step 1 → 2: require first name + email (the only required person fields)
  function nextFromPerson(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.firstName.trim()) { setError('Please add your first name.'); return }
    if (!form.email.trim()) { setError('Please add your email.'); return }
    setStep(2)
  }

  // Step 2 → 3: require company name + website
  function nextFromBusiness(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.companyName.trim()) { setError('Please add your company name.'); return }
    if (!form.websiteUrl.trim()) { setError('Please add your website.'); return }
    setStep(3)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSending(true)
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSent(true)
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
        <h1 className="section-headline">See exactly where you&apos;re invisible.</h1>
        <p className="section-sub">Three quick steps. Before your demo we audit how you show up today, so we come to the call with your pain points pinpointed and specific solutions to propose — no pitch deck, no pressure.</p>
      </div>

      <div className="demo-body">
        <div className="demo-card">
          {sent ? (
            <div className="demo-success">
              <div className="demo-success-ico"><Check /></div>
              <h2>Request received.</h2>
              <p>Thanks, {form.firstName || 'there'}. We&apos;re already looking at {form.companyName}. Expect a reply within 24 hours — usually the same day — to confirm your call and share where buyers are missing you.</p>
              <div className="demo-success-actions">
                <Link href="/case-studies" className="btn-primary">See real results <Arrow className="arr" /></Link>
                <Link href="/services" className="btn-outline">Explore services</Link>
              </div>
            </div>
          ) : (
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
                <form onSubmit={nextFromBusiness}>
                  <div className="demo-step-title">Tell us about your business</div>
                  <div className="demo-step-sub">Just the basics so we can take a look before we talk. Add the links you have — skip the ones you don&apos;t.</div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>Company name *</label>
                      <input value={form.companyName} onChange={set('companyName')} placeholder="Your company" required autoFocus />
                    </div>
                    <div className="form-row">
                      <label>Website *</label>
                      <input value={form.websiteUrl} onChange={set('websiteUrl')} placeholder="https://yourcompany.com" inputMode="url" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <label>Position / role <span className="form-hint">(optional)</span></label>
                    <input value={form.position} onChange={set('position')} placeholder="Founder, Marketing Lead…" />
                  </div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>LinkedIn</label>
                      <input value={form.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/company/…" />
                    </div>
                    <div className="form-row">
                      <label>Instagram</label>
                      <input value={form.instagram} onChange={set('instagram')} placeholder="@yourbrand" />
                    </div>
                  </div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>Facebook</label>
                      <input value={form.facebook} onChange={set('facebook')} placeholder="facebook.com/yourbrand" />
                    </div>
                    <div className="form-row">
                      <label>X (Twitter)</label>
                      <input value={form.x} onChange={set('x')} placeholder="@yourbrand" />
                    </div>
                  </div>

                  <div className="form-row">
                    <label>What areas do you need growth in? <span className="form-hint">(optional)</span></label>
                    <select value={form.growthArea} onChange={set('growthArea')}>
                      <option value="">— Select an area —</option>
                      {GROWTH_AREAS.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
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
                <form onSubmit={submit}>
                  <div className="demo-step-title">Book time for your call</div>
                  <div className="demo-step-sub">Pick a day and a window that works — we&apos;ll confirm a time and send a calendar invite.</div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>Preferred date <span className="form-hint">(optional)</span></label>
                      <input type="date" value={form.preferredDate} onChange={set('preferredDate')} />
                    </div>
                    <div className="form-row">
                      <label>Preferred time <span className="form-hint">(optional)</span></label>
                      <select value={form.preferredTime} onChange={set('preferredTime')}>
                        <option value="">— Any time —</option>
                        {TIME_WINDOWS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <label>Anything we should know before the call? <span className="form-hint">(optional)</span></label>
                    <textarea value={form.notes} onChange={set('notes')} placeholder="Where do you feel invisible? What have you already tried?" />
                  </div>

                  {error && <div className="demo-error">{error}</div>}

                  <div className="demo-actions">
                    <button type="button" className="btn-outline" onClick={() => { setError(''); setStep(2) }}>← Back</button>
                    <div className="spacer" />
                    <button type="submit" className="btn-primary" disabled={sending} style={{ opacity: sending ? 0.7 : 1 }}>
                      {sending ? 'Sending…' : <>Request my audit <Arrow className="arr" /></>}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
