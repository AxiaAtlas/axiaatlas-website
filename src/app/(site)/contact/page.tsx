'use client'
import { useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Arrow, Check, Plus } from '@/components/icons'

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

   3. NOTHING HERE IS A NEW CLAIM. Every fact below already ships on this site:
      the eight services and their descriptions from /services, the three tiers
      and their contents from /pricing, the audit-plan-build-grow sequence and
      the week-one output from the home page and /about, the two inboxes and
      the 24-hour reply from this page, and `areaServed` from the Organization
      node in app/layout.tsx. The local-intent question is answered from that
      last one — we say how the work is done for a city, and we do NOT claim an
      office in one, because the site claims no address anywhere.

   ANSWERS ARE PLAIN STRINGS, with an optional trailing link, so that the
   visible copy and the FAQPage JSON-LD below are generated from ONE source and
   cannot drift apart. Do not switch these back to JSX.
   ──────────────────────────────────────────────────────────────────────────── */

type Faq = { q: string; a: string; link?: { href: string; label: string; external?: boolean } }
type FaqSection = { id: string; title: string; items: Faq[] }

const FAQ_SECTIONS: FaqSection[] = [
  {
    id: 'services',
    title: 'Services',
    items: [
      {
        q: 'What services does Axia Atlas offer?',
        a: 'Eight: website design and build, social media management, competitive intelligence, local presence and maps, answer engine optimization, lead generation, executive personal brand, and strategic advisory. Most clients combine three or four of them into one connected plan rather than buying a single channel. Which three depends on where your buyers already are and where you are currently missing.',
        link: { href: '/services', label: 'See the full breakdown of all eight services' },
      },
      {
        q: 'What is answer engine optimization (AEO), and do I need it?',
        a: 'Answer engine optimization is the work of getting your business named and cited when buyers ask Claude, ChatGPT, Perplexity, or Gemini which company to use. We measure it first: the exact prompts a buyer in your category would type, run across all four platforms, recorded so you can see who gets named today. Then we fix the entity data, schema, and source pages those systems read.',
        link: { href: '/services#geo', label: 'How answer engine optimization works' },
      },
      {
        q: 'Do you do local SEO and Google Business Profile management?',
        a: 'Yes. Two results decide whether a nearby buyer finds you — the map pack and the organic listings under it — and we work both. That means a Google Business Profile built out properly with categories, services, hours, photos and Q&A; citations kept consistent across the directories that feed the map; a review programme; and the service and location pages that rank for "service in city". Rankings and calls are tracked per location.',
        link: { href: '/services#local', label: 'Local Presence & Maps in detail' },
      },
      {
        q: 'Can you build or rebuild my website?',
        a: 'Yes, and it is the core engagement most other channels point traffic at. It starts with positioning — what you sell, who it is for, and why a buyer picks you — which drives the copy, which drives the layout. Search foundations go in during the build rather than after it. You get a working site, not a mockup handed to someone else to interpret.',
        link: { href: '/services#website', label: 'What a website engagement includes' },
      },
      {
        q: 'Do you work with B2B and B2C?',
        a: 'Both. We work with consumer brands, local businesses, and B2B and professional services. The playbook adapts — the goal is the same: make you impossible to miss where your buyers actually spend attention. What changes between them is which two or three channels are worth your money first, which is the first thing we tell you.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing',
    items: [
      {
        q: 'How much does Axia Atlas cost?',
        a: 'We work in three tiers — Starter, Growth, and Authority — scoped to how fast you want to move, and exact pricing is shared on your demo call once we know your goals. Pricing depends on the channels you choose and how much we are building, so we quote it clearly on the call and you decide from there.',
        link: { href: '/pricing', label: 'See what each tier includes' },
      },
      {
        q: "What's the difference between Starter, Growth, and Authority?",
        a: 'Starter is one or two channels, a 90-day plan, monthly execution and a plain-English report. Growth adds a third and fourth channel working together, answer engine optimization, website or landing-page work, a monthly strategy call, a live dashboard and priority support. Authority is full channel coverage plus the executive personal brand programme, campaign work, lead generation where it fits, and a senior strategist as your lead contact.',
        link: { href: '/pricing', label: 'Compare the three tiers' },
      },
      {
        q: 'Am I locked into a long contract?',
        a: 'No. There are no long lock-ins and no surprise add-ons. Each tier is a monthly engagement, and what you pay depends on the channels you picked and how much we are building — quoted clearly on your demo call before anything starts, not discovered later on an invoice.',
      },
      {
        q: 'Can I start with just one channel?',
        a: 'Yes. Starter exists for exactly that: get momentum on one or two channels and prove the model before you scale. You do not need all eight services, and we would rather tell you which two or three will pay off fastest than sell you the full system on day one.',
        link: { href: '/pricing', label: 'What Starter includes' },
      },
    ],
  },
  {
    id: 'process',
    title: 'Process',
    items: [
      {
        q: 'How does working with Axia Atlas start?',
        a: 'It starts with a demo. Before the call we audit where you show up today, where you do not, and the fastest wins — so we arrive with your pain points pinpointed and solutions to propose, then build a clear 90-day plan. There is no 30-day onboarding; real output lands in week one.',
        link: { href: '/demo', label: 'Book a demo' },
      },
      {
        q: 'What happens before the demo call?',
        a: 'We run an audit of how you show up today across search, answer engines, local, and social. That means the call itself is about your pain points and the solutions we would propose, not a generic pitch. You leave with the map either way, whether or not you work with us.',
      },
      {
        q: 'How fast will I see results?',
        a: 'Work starts in week one and you will see output immediately. Compounding channels like SEO and answer engine optimization build over 60 to 90 days; local and social can move faster. We set expectations channel by channel on your demo call rather than promising one timeline for all eight.',
      },
      {
        q: 'How do you report on results?',
        a: 'In plain English, monthly. We measure pipeline, rankings, citations, and compounding assets — not posts published. Growth and Authority tiers include a live dashboard and a monthly strategy call, so you can see the numbers between reports rather than waiting for one.',
        link: { href: 'https://app.axiaatlas.com', label: 'The client portal', external: true },
      },
      {
        q: 'Who actually does the work?',
        a: 'The people you meet. We operate as an extension of your team rather than a faceless vendor, and you get direct access to the people doing the work. We take on fewer clients than most agencies, on purpose, so we can go deep instead of wide. On the Authority tier a senior strategist is your lead contact.',
        link: { href: '/about', label: 'How we work, and why' },
      },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    items: [
      {
        q: 'Are you a marketing agency in Miami?',
        /* THE LOCAL-INTENT ANSWER, AND WHAT IT DELIBERATELY DOES NOT SAY. We
           hold no address, so this answers the intent behind the query — can you
           do this for my city — without claiming a Miami office, which would be
           a new and false claim. If a real city is ever added to the brand, this
           is the answer that has to change first.

           NATIONWIDE, NOT WORLDWIDE. Corrected on direction: the reach claim is
           the United States, and "worldwide" was overstating it. The
           Organization node's `areaServed` in app/layout.tsx and the Service
           nodes on /services carried the same overstatement as structured data
           and were corrected with it — a visible answer that says nationwide
           over a machine-readable claim that says worldwide is exactly the
           drift this file exists to prevent. */
        a: 'We work with businesses in Miami and anywhere else in the country — Axia Atlas works remotely with clients nationwide rather than from a single city storefront. For a Miami business the local work is the same as anywhere: a Google Business Profile built out for your categories and service area, citations kept consistent across the directories that feed the map, a review programme, and service and location pages that rank for "service in Miami". Rankings and calls are tracked per location.',
        link: { href: '/services#local', label: 'How local presence work is done' },
      },
      {
        q: "I'm a current client — who do I contact?",
        a: 'Email strategy@axiaatlas.com and your strategist will pick it up. You can also sign in to the client portal for reporting, deliverables, and messages. Use this inbox for anything about your account, your plan, or your deliverables rather than the general one.',
        link: { href: 'https://app.axiaatlas.com', label: 'Sign in to the client portal', external: true },
      },
      {
        q: "I'm new — what's the right email to reach you?",
        a: 'Write to partner@axiaatlas.com. That inbox covers new and prospective clients, partnerships, and general questions. If you are ready to talk, the fastest path is to book a demo instead — we audit your presence beforehand and come to the call with specific recommendations rather than questions.',
        link: { href: '/demo', label: 'Book a demo' },
      },
      {
        q: 'How quickly will you reply?',
        a: 'Within 24 hours, usually the same day. That applies to both inboxes — partner@axiaatlas.com for new enquiries and strategy@axiaatlas.com for current clients. If you would rather skip the back-and-forth entirely, booking a demo puts a time in the calendar directly.',
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
        <h1 className="section-headline">Contact Our Digital Marketing Team With Any Question</h1>
        <p className="section-sub">Send us a message and we&apos;ll reply within 24 hours. Ready to start? The fastest path is to <Link href="/demo" style={{ color: 'var(--inverse-accent)', textDecoration: 'underline', textUnderlineOffset: 2 }}>book a demo</Link>.</p>
      </div>

      <div className="contact-body">
        <div>
          <h2 className="contact-info-title">Get in touch</h2>

          <div className="contact-info-item">
            <h3 className="contact-info-label">New &amp; prospective clients</h3>
            <div className="contact-info-value"><a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a></div>
            <div style={{ fontWeight: 400, fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--text-muted)', marginTop: 4 }}>
              Thinking about working together, exploring a partnership, or just have a question — this is the inbox for you.
            </div>
          </div>

          <div className="contact-info-item">
            <h3 className="contact-info-label">Current clients</h3>
            <div className="contact-info-value"><a href="mailto:strategy@axiaatlas.com">strategy@axiaatlas.com</a></div>
            <div style={{ fontWeight: 400, fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--text-muted)', marginTop: 4 }}>
              Already working with us? Reach your strategist here for anything about your account, plan, or deliverables.
            </div>
          </div>

          <div className="contact-info-item">
            <h3 className="contact-info-label">Response time</h3>
            <div className="contact-info-value">Within 24 hours, usually same day</div>
          </div>

          <div className="contact-info-item">
            <h3 className="contact-info-label">Ready to start?</h3>
            <div className="contact-info-value" style={{ fontWeight: 400, fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
              Skip the back-and-forth and <Link href="/demo" style={{ color: 'var(--accent)' }}>book a demo</Link> — a quick survey, then we audit how you show up today and come to the call with your pain points pinpointed and solutions to propose.
            </div>
          </div>

          <div className="contact-careers">
            <div className="contact-info-label">Careers</div>
            <h2 className="contact-careers-title">Want to work with us?</h2>
            <p className="contact-careers-desc">We&apos;re always glad to meet sharp people who do great work. Apply in three quick steps and attach your resume.</p>
            <Link href="/careers" className="btn-outline">View careers &amp; apply <Arrow className="arr" /></Link>
          </div>
        </div>

        <div>
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
            <form className="contact-form" onSubmit={submit}>
              <h2 className="form-title">Send us a message</h2>
              <p className="form-intro">Not ready for a demo yet? Ask us anything — we&apos;re happy to help.</p>

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

      <section className="faq-section g-spruce">
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
            <p className="section-sub">Straight answers about our services, pricing, process, and what working with us actually looks like.</p>
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

      <Footer />
    </div>
  )
}
