'use client'
import { useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Arrow, Check } from '@/components/icons'

const GOALS = [
  'Get found in search (SEO)',
  'Get cited by answer engines (AEO/GEO)',
  'Win local / "near me" customers',
  'Grow on social media',
  'Build a founder / executive brand',
  'Launch or rebuild my website',
  'Generate more leads / pipeline',
  'Not sure yet — help me figure it out',
]

const BUDGETS = [
  'Under $1,500 / mo',
  '$1,500 – $3,000 / mo',
  '$3,000 – $6,000 / mo',
  '$6,000 – $10,000 / mo',
  '$10,000+ / mo',
  'Not sure yet',
]

type Form = {
  companyName: string; websiteUrl: string
  linkedin: string; instagram: string; facebook: string; x: string
  name: string; role: string; email: string
  goal: string; challenge: string; budget: string
}

const EMPTY: Form = {
  companyName: '', websiteUrl: '', linkedin: '', instagram: '', facebook: '', x: '',
  name: '', role: '', email: '', goal: '', challenge: '', budget: '',
}

export default function DemoPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<Form>(EMPTY)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  function next(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.companyName.trim()) { setError('Please add your company name.'); return }
    setStep(2)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.name.trim() || !form.email.trim()) { setError('Name and work email are required.'); return }
    setSending(true)
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSent(true)
      else setError('Something went wrong. Please email strategy@axiaatlas.com directly.')
    } catch {
      setError('Network error. Please email strategy@axiaatlas.com directly.')
    }
    setSending(false)
  }

  return (
    <div className="page demo-page">
      <div className="demo-hero">
        <div className="section-eyebrow">Free Audit</div>
        <h1 className="section-headline">See exactly where you&apos;re invisible.</h1>
        <p className="section-sub">Two quick steps. We&apos;ll review how you show up today and come back with the specific moves that would change it — no pitch deck, no pressure.</p>
      </div>

      <div className="demo-body">
        <div className="demo-card">
          {sent ? (
            <div className="demo-success">
              <div className="demo-success-ico"><Check /></div>
              <h2>Request received.</h2>
              <p>Thanks, {form.name.split(' ')[0] || 'there'}. We&apos;re already looking at {form.companyName}. Expect a reply within 24 hours — usually the same day — with where buyers are missing you and what we&apos;d do first.</p>
              <div className="demo-success-actions">
                <Link href="/case-studies" className="btn-primary">See real results <Arrow className="arr" /></Link>
                <Link href="/services" className="btn-outline">Explore services</Link>
              </div>
            </div>
          ) : (
            <>
              <div className="demo-steps" aria-hidden="true">
                <div className={`demo-step-dot ${step === 1 ? 'active' : 'done'}`}>
                  <span className="num">{step > 1 ? '✓' : '1'}</span> Your business
                </div>
                <div className="demo-step-bar" />
                <div className={`demo-step-dot ${step === 2 ? 'active' : ''}`}>
                  <span className="num">2</span> Your goals
                </div>
              </div>

              {step === 1 ? (
                <form onSubmit={next}>
                  <div className="demo-step-title">Tell us about your business</div>
                  <div className="demo-step-sub">Just the basics so we can take a look before we talk. Add the links you have — skip the ones you don&apos;t.</div>

                  <div className="form-row">
                    <label>Company name *</label>
                    <input value={form.companyName} onChange={set('companyName')} placeholder="Your company" required autoFocus />
                  </div>

                  <div className="form-row">
                    <label>Website URL</label>
                    <input value={form.websiteUrl} onChange={set('websiteUrl')} placeholder="https://yourcompany.com" inputMode="url" />
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

                  {error && <div className="demo-error">{error}</div>}

                  <div className="demo-actions">
                    <div className="spacer" />
                    <button type="submit" className="btn-primary">Continue <Arrow className="arr" /></button>
                  </div>
                </form>
              ) : (
                <form onSubmit={submit}>
                  <div className="demo-step-title">What are you trying to grow?</div>
                  <div className="demo-step-sub">This tells us what to look at first and how to scope your audit.</div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>Your name *</label>
                      <input value={form.name} onChange={set('name')} placeholder="Your name" required autoFocus />
                    </div>
                    <div className="form-row">
                      <label>Your role</label>
                      <input value={form.role} onChange={set('role')} placeholder="Founder, Marketing Lead…" />
                    </div>
                  </div>

                  <div className="form-row">
                    <label>Work email *</label>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" required />
                  </div>

                  <div className="form-row">
                    <label>Primary goal</label>
                    <select value={form.goal} onChange={set('goal')}>
                      <option value="">— Select a goal —</option>
                      {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>

                  <div className="form-row">
                    <label>Biggest challenge right now</label>
                    <textarea value={form.challenge} onChange={set('challenge')} placeholder="Where do you feel invisible? What have you already tried?" />
                  </div>

                  <div className="form-row">
                    <label>Approximate monthly budget <span className="form-hint">(optional)</span></label>
                    <select value={form.budget} onChange={set('budget')}>
                      <option value="">— Prefer not to say —</option>
                      {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  {error && <div className="demo-error">{error}</div>}

                  <div className="demo-actions">
                    <button type="button" className="btn-outline" onClick={() => { setError(''); setStep(1) }}>← Back</button>
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
