'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Arrow, Check, Plus } from '@/components/icons'
import { AEO, PATHS, PORTAL_URL } from '@/lib/site'
import { aaTrack } from '@/lib/aa-track'

/* ────────────────────────────────────────────────────────────────────────────
   THE FAQ IS AN ANSWER-ENGINE SURFACE, SO IT IS BUILT LIKE ONE.

   Nine flat questions became four labelled sections with four to five each,
   under three rules that are not cosmetic:

   1. THE QUESTION IS THE HEADING. Each one is an <h3> under its section's
      <h2>, phrased the way a person actually types it — "how much does it
      cost", not "Pricing". A model extracting an answer needs the question in
      the markup, not a noun.

   2. THE ANSWER IS DIRECT IN THE FIRST 40-60 WORDS. Everything an extractor
      needs is in the opening sentences; qualification comes after. An answer
      that warms up for three lines is an answer that gets truncated before it
      says anything.

   3. NOTHING HERE IS A NEW CLAIM. The buyer questions are lib/site's AEO
      list (the platform's saas-copy.md section 6), shared with the other
      pages, the chat widget and /llms.txt; the contact answers repeat the two
      inboxes and the 24-hour reply printed on this page.

   ANSWERS ARE PLAIN STRINGS, with an optional trailing link, so that the
   visible copy and the FAQPage JSON-LD below are generated from ONE source and
   cannot drift apart. Do not switch these back to JSX.
   ──────────────────────────────────────────────────────────────────────────── */

type Faq = { q: string; a: string; link?: { href: string; label: string; external?: boolean } }
type FaqSection = { id: string; title: string; items: Faq[] }

/* The twelve buyer questions from lib/site (saas-copy.md section 6), grouped,
   then the contact questions only this page answers. */
const aeo = (id: string, link?: Faq['link']): Faq => {
  const f = AEO.find((x) => x.id === id)
  if (!f) throw new Error(`Unknown AEO id: ${id}`)
  return { q: f.q, a: f.a, link }
}

const FAQ_SECTIONS: FaqSection[] = [
  {
    id: 'platform',
    title: 'The platform',
    items: [
      aeo('what', { href: PATHS.platform, label: 'See the platform' }),
      aeo('cost-per-investor', { href: `${PATHS.platform}#raise-ledger`, label: 'About Raise Ledger' }),
      aeo('why-not-raise-platform'),
      aeo('channels', { href: `${PATHS.platform}#live-campaigns`, label: 'About Live Campaigns' }),
      aeo('agencies'),
    ],
  },
  {
    id: 'theia',
    title: 'Theia',
    items: [
      aeo('theia', { href: PATHS.theia, label: 'Meet Theia' }),
      aeo('analyst'),
      aeo('reports', { href: `${PATHS.theia}#reports`, label: 'About Theia Reports' }),
      aeo('roas'),
    ],
  },
  {
    id: 'trust',
    title: 'Ads, data and privacy',
    items: [
      aeo('ads'),
      aeo('security', { href: PATHS.security, label: 'Security and privacy' }),
    ],
  },
  {
    id: 'company',
    title: 'Company',
    items: [
      aeo('websites', { href: PATHS.website, label: 'Website design' }),
      {
        q: "I'm a current client. Who do I contact?",
        a: 'Email strategy@axiaatlas.com and our team will pick it up. You can also sign in to Axia Atlas at app.axiaatlas.com to see your dashboards, ask Theia, or send us a message. Use this inbox for anything about your account or your plan rather than the general one.',
        link: { href: PORTAL_URL, label: 'Sign in to Axia Atlas', external: true },
      },
      {
        q: "I'm new. What's the right email to reach you?",
        a: 'Write to partner@axiaatlas.com. That inbox covers new and prospective clients, agencies, partnerships, and general questions. If you are ready to see the platform, the fastest path is to book a demo: we walk you through Axia Atlas and Theia on a demo raise, then talk through your own channels.',
        link: { href: PATHS.demo, label: 'Book a demo' },
      },
      {
        q: 'How quickly will you reply?',
        a: 'Within 24 hours, usually the same day. That applies to both inboxes: partner@axiaatlas.com for new enquiries and strategy@axiaatlas.com for current clients. If you would rather skip the back-and-forth entirely, booking a demo puts a time in the calendar directly.',
      },
      {
        q: 'Are you hiring?',
        a: 'We are always glad to meet sharp people who do great work. Applying takes three quick steps and you attach your resume at the end. Open roles and the application form both live on the careers page.',
        link: { href: '/careers', label: 'View careers and apply' },
      },
    ],
  },
]

/* One FAQPage node covering every question on the page, generated from the
   same array the page renders — so an answer edited above cannot leave a stale
   copy in the structured data. `acceptedAnswer` carries the prose only; the
   trailing links are navigation, not part of the answer. */
const SITE_URL = 'https://axiaatlas.com'
const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/contact#faq`,
  mainEntity: FAQ_SECTIONS.flatMap((sec) =>
    sec.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  ),
}

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
      if (res.ok) { setSent(true); aaTrack('formSubmit', 'contact') }
      else setError('Something went wrong. Please email partner@axiaatlas.com directly.')
    } catch {
      setError('Network error. Please email partner@axiaatlas.com directly.')
    }
    setSending(false)
  }

  return (
    <div className="page contact-page">
      <div data-aa-section="contact.hero" className="contact-hero">
        <div className="section-eyebrow">Contact</div>
        <h1 className="section-headline">Contact the Axia Atlas team about the platform or Theia</h1>
        <p className="section-sub">Send us a message about the platform, Theia, pricing or your account and we&apos;ll reply within 24 hours. Axia Atlas is investment campaign analytics software, headquartered in Miami and working with clients across the US. Ready to see it? The fastest path is to <Link href="/demo" className="inline-link">book a demo</Link> on a demo raise.</p>
      </div>

      <div className="contact-body">
        <div data-aa-section="contact.info">
          <h2 className="contact-info-title">Get in touch</h2>

          <div className="contact-info-item">
            <h3 className="contact-info-label">New &amp; prospective clients</h3>
            <div className="contact-info-value"><a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a></div>
            <div style={{ fontWeight: 400, fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--text-muted)', marginTop: 4 }}>
              Thinking about working together, exploring a partnership, or just have a question? This is the inbox for you.
            </div>
          </div>

          <div className="contact-info-item">
            <h3 className="contact-info-label">Current clients</h3>
            <div className="contact-info-value"><a href="mailto:strategy@axiaatlas.com">strategy@axiaatlas.com</a></div>
            <div style={{ fontWeight: 400, fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--text-muted)', marginTop: 4 }}>
              Already on Axia Atlas? Reach our team here for anything about your account or your plan.
            </div>
          </div>

          <div className="contact-info-item">
            <h3 className="contact-info-label">Response time</h3>
            <div className="contact-info-value">Within 24 hours, usually same day</div>
          </div>

          <div className="contact-info-item">
            <h3 className="contact-info-label">Ready to start?</h3>
            <div className="contact-info-value" style={{ fontWeight: 400, fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
              Skip the back-and-forth and <Link href="/demo" style={{ color: 'var(--accent)' }}>book a demo</Link>: a quick survey, then a walkthrough of Axia Atlas and Theia on a demo raise.
            </div>
          </div>

          <div className="contact-careers">
            <div className="contact-info-label">Careers</div>
            <h2 className="contact-careers-title">Want to work with us?</h2>
            <p className="contact-careers-desc">We&apos;re always glad to meet sharp people who do great work. Apply in three quick steps and attach your resume.</p>
            <Link href="/careers" className="btn-outline">View careers &amp; apply <Arrow className="arr" /></Link>
          </div>
        </div>

        <div data-aa-section="contact.form">
          {sent ? (
            <div className="contact-form">
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, color: 'var(--accent)' }}>
                  <Check style={{ width: 40, height: 40 }} />
                </div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.375rem', fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Message sent.</div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>We&apos;ll reply within 24 hours at <a href="mailto:partner@axiaatlas.com" style={{ color: 'var(--accent)' }}>partner@axiaatlas.com</a>. In a hurry? <Link href="/demo" style={{ color: 'var(--accent)' }}>Book a demo →</Link></p>
              </div>
            </div>
          ) : (
            <form className="contact-form" data-aa-form="contact" data-aa-submit="manual" onSubmit={submit}>
              <h2 className="form-title">Send us a message</h2>
              <p className="form-intro">Not ready for a demo yet? Ask us anything. We&apos;re happy to help.</p>

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

      <section data-aa-section="contact.faq" className="faq-section g-spruce">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
        />
        <div className="section-inner">
          {/* "FREQUENTLY ASKED QUESTIONS", NOT "COMMON QUESTIONS". This block
              exists to be matched, and the exact string is what gets typed into
              a search box and what an extractor looks for above a FAQPage node.
              "Common questions" is the better English and the worse heading.

              THE SUBHEAD IS THE SECOND MATCHING SURFACE, so it carries the four
              nouns a person actually appends to the query — services, pricing,
              process, and working with us — in the order the sections below run.
              Two alternatives, recorded so this is not re-argued: "Everything
              people ask before they hire us" (warmer, carries no query term) and
              "Answers about our digital marketing services, pricing, and
              process" (denser in keywords, but it reads as a meta description
              that escaped onto the page). The shipped line keeps the terms and
              still sounds like a person wrote it. */}
          <div className="section-head centred">
            <div className="section-eyebrow">FAQ</div>
            <h2 className="section-headline">Frequently Asked Questions</h2>
            <p className="section-sub">Straight answers about the platform, Theia, your data, and working with us.</p>
          </div>

          {FAQ_SECTIONS.map((sec) => (
            <div key={sec.id} className="faq-group" id={`faq-${sec.id}`}>
              <h2 className="faq-group-title">{sec.title}</h2>
              <div className="faq-list">
                {/* THE FIRST QUESTION IN EACH SECTION IS OPEN. A wall of four
                    closed rows shows a reader the shape of an FAQ and none of
                    its content, and it makes them click once to find out
                    whether clicking is worth it. One answer visible per section
                    proves the answers are real. It is `open` on the element
                    rather than script, so it is open in the HTML — which is
                    also what a crawler and an extractor read. */}
                {sec.items.map((f, i) => (
                  <details key={f.q} className="faq-item" open={i === 0}>
                    <summary className="faq-q">
                      <h3 className="faq-q-text">{f.q}</h3>
                      <Plus className="faq-ico" />
                    </summary>
                    <div className="faq-a">
                      <p>{f.a}</p>
                      {f.link ? (
                        f.link.external ? (
                          <a className="faq-a-link" href={f.link.href}>{f.link.label} &rarr;</a>
                        ) : (
                          <Link className="faq-a-link" href={f.link.href}>{f.link.label} &rarr;</Link>
                        )
                      ) : null}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
