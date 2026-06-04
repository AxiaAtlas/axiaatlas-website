'use client'
import { useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Arrow, Check, Plus } from '@/components/icons'

const FAQS = [
  {
    q: 'What services do you offer?',
    a: (
      <>
        Eight, across search, answer engines, local, social, founder brand, websites, campaigns, and lead generation. Most clients combine three or four into one connected plan. See the full breakdown on the <Link href="/services">services page</Link>.
      </>
    ),
  },
  {
    q: 'How does working with you start?',
    a: (
      <>
        Every engagement starts with a free audit. We map where you show up today, where you don&apos;t, and the fastest wins — then build a clear 90-day plan. No 30-day onboarding; real output lands in week one. <Link href="/demo">Book your free audit →</Link>
      </>
    ),
  },
  {
    q: 'How much does it cost?',
    a: (
      <>
        We work in three tiers — Starter, Growth, and Authority — scoped to how fast you want to move. Exact pricing is shared on your audit call once we know your goals. See what each tier includes on the <Link href="/pricing">pricing page</Link>.
      </>
    ),
  },
  {
    q: 'Do you work with B2B and B2C?',
    a: 'Both. We work with consumer brands, local businesses, and B2B / professional services. The playbook adapts — the goal is the same: make you impossible to miss where your buyers actually spend attention.',
  },
  {
    q: 'How do you report on results?',
    a: 'In plain English, monthly. We measure pipeline, rankings, citations, and compounding assets — not posts published. Growth and Authority tiers include a live dashboard and a monthly strategy call.',
  },
  {
    q: 'How fast will I see results?',
    a: 'Work starts in week one and you\'ll see output immediately. Compounding channels like SEO and answer-engine optimization build over 60–90 days; local and social can move faster. We set expectations channel by channel on your audit call.',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service: 'General inquiry' }),
      })
      if (res.ok) setSent(true)
      else setError('Something went wrong. Please email partner@axiaatlas.com directly.')
    } catch {
      setError('Network error. Please email partner@axiaatlas.com directly.')
    }
    setSending(false)
  }

  return (
    <div className="page contact-page">
      <div className="contact-hero">
        <div className="section-eyebrow">Contact</div>
        <h1 className="section-headline">Questions? Let&apos;s talk.</h1>
        <p className="section-sub">Send us a message and we&apos;ll reply within 24 hours. Ready to start? The fastest path is a <Link href="/demo" style={{ color: 'var(--inverse-accent)', textDecoration: 'underline', textUnderlineOffset: 2 }}>free audit</Link>.</p>
      </div>

      <div className="contact-body">
        <div>
          <div className="contact-info-title">Get in touch</div>

          <div className="contact-info-item">
            <div className="contact-info-label">Email</div>
            <div className="contact-info-value"><a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a></div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-label">Response time</div>
            <div className="contact-info-value">Within 24 hours, usually same day</div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-label">Ready to start?</div>
            <div className="contact-info-value" style={{ fontWeight: 400, fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
              Skip the back-and-forth and <Link href="/demo" style={{ color: 'var(--accent)' }}>book a free audit</Link> — a two-step survey and we&apos;ll come to the call with specific recommendations.
            </div>
          </div>
        </div>

        <div>
          {sent ? (
            <div className="contact-form">
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, color: 'var(--accent)' }}>
                  <Check style={{ width: 40, height: 40 }} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.375rem', fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Message sent.</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>We&apos;ll reply within 24 hours at <a href="mailto:partner@axiaatlas.com" style={{ color: 'var(--accent)' }}>partner@axiaatlas.com</a>. In a hurry? <Link href="/demo" style={{ color: 'var(--accent)' }}>Book a free audit →</Link></p>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={submit}>
              <div className="form-title">Send us a message</div>
              <p className="form-intro">Not ready for an audit yet? Ask us anything — we&apos;re happy to help.</p>

              <div className="form-2col">
                <div className="form-row">
                  <label>Full Name *</label>
                  <input value={form.name} onChange={set('name')} placeholder="Your name" required />
                </div>
                <div className="form-row">
                  <label>Email *</label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" required />
                </div>
              </div>

              <div className="form-row">
                <label>Company Name</label>
                <input value={form.company} onChange={set('company')} placeholder="Your company" />
              </div>

              <div className="form-row">
                <label>Your message</label>
                <textarea value={form.message} onChange={set('message')} placeholder="What can we help you with?" />
              </div>

              {error && <div style={{ fontSize: '0.75rem', color: 'var(--negative)', marginBottom: 16 }}>{error}</div>}

              <button type="submit" className="btn-primary" disabled={sending} style={{ width: '100%', justifyContent: 'center', opacity: sending ? 0.7 : 1 }}>
                {sending ? 'Sending…' : <>Send message <Arrow className="arr" /></>}
              </button>
            </form>
          )}
        </div>
      </div>

      <section className="faq-section">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">FAQ</div>
            <h2 className="section-headline">Common questions</h2>
            <p className="section-sub">Quick answers on services, process, pricing, and getting started.</p>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q">{f.q}<Plus className="faq-ico" /></summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
