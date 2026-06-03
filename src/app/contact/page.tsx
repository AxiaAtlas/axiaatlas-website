'use client'
import { useState } from 'react'
import Footer from '@/components/Footer'

const SERVICES = [
  'Social Media Strategy',
  'GEO / AEO (AI Search)',
  'SEO & Content Marketing',
  'Local Digital Presence',
  'Executive Brand',
  'Website Design',
  'Campaigns',
  'Lead Generation',
  'Not sure yet — help me figure it out',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError('Something went wrong. Please email strategy@axiaatlas.com directly.')
      }
    } catch {
      setError('Network error. Please email strategy@axiaatlas.com directly.')
    }
    setSending(false)
  }

  return (
    <div className="page">
      <div className="contact-hero">
        <div className="section-eyebrow">Contact</div>
        <h1 className="section-headline">Let&apos;s map your growth architecture.</h1>
        <p className="section-sub">A 30-minute call. We review what you have, find the gaps, and tell you what we&apos;d do about it.</p>
      </div>

      <div className="contact-body">
        <div>
          <div className="contact-info-title">Get in touch</div>

          <div className="contact-info-item">
            <div className="contact-info-label">Email</div>
            <div className="contact-info-value">
              <a href="mailto:strategy@axiaatlas.com">strategy@axiaatlas.com</a>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-label">Based in</div>
            <div className="contact-info-value">Toronto, Ontario — serving clients globally</div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-label">Response time</div>
            <div className="contact-info-value">Within 24 hours, usually same day</div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-label">What happens next</div>
            <div className="contact-info-value" style={{ fontWeight: 400, fontSize: 13, lineHeight: 1.7, color: 'rgba(var(--spruce-darker-rgb),0.6)' }}>
              We review your submission, do a quick audit of your current online presence, and come to the call with specific observations and recommendations. No generic pitch deck.
            </div>
          </div>
        </div>

        <div>
          {sent ? (
            <div className="contact-form">
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--spruce-darker)', marginBottom: 12 }}>Got it — we&apos;ll be in touch.</h2>
                <p style={{ fontSize: 14, color: 'rgba(var(--spruce-darker-rgb),0.55)', lineHeight: 1.7 }}>Expect a reply within 24 hours. In the meantime, you can reach us directly at <a href="mailto:strategy@axiaatlas.com" style={{ color: 'var(--spruce)' }}>strategy@axiaatlas.com</a>.</p>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={submit}>
              <div className="form-title">Book a Free Audit</div>

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
                <label>Which service are you interested in?</label>
                <select value={form.service} onChange={set('service')}>
                  <option value="">— Select a service —</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="form-row">
                <label>Tell us about your growth challenge</label>
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  placeholder="What are you trying to grow? What's not working? What have you tried?"
                />
              </div>

              {error && <div style={{ fontSize: 12, color: 'var(--negative)', marginBottom: 16 }}>{error}</div>}

              <button type="submit" className="btn-primary" disabled={sending} style={{ width: '100%', justifyContent: 'center', opacity: sending ? 0.7 : 1 }}>
                {sending ? 'Sending…' : 'Book a Free Audit →'}
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
