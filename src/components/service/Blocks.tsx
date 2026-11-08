/* ════════════════════════════════════════════════════════════════════════════
   SERVICE PAGE BLOCKS

   The parts every service page is built from, so /services/website-design,
   /services/social-media-management, /services/add-ons, /services/portal,
   /theia and /pricing share one shape: a hero with the page's answer block, a
   head per section, tier cards, an add-on list and an FAQ whose JSON-LD is
   generated from the same array the reader sees.

   Each block takes its `data-aa-section` id as a literal from the page, so the
   platform's site-map script can read it.
   ════════════════════════════════════════════════════════════════════════════ */
import Link from 'next/link'
import { Arrow, Plus } from '@/components/icons'

export function PageHero({ section, eyebrow, title, answer, children }: {
  section: string
  eyebrow: string
  title: string
  /** The 40 to 60 word answer to the page's question. */
  answer: string
  children?: React.ReactNode
}) {
  return (
    <div data-aa-section={section} className="services-hero sv-hero">
      <div className="section-eyebrow">{eyebrow}</div>
      <h1 className="section-headline">{title}</h1>
      <div className="section-sub sv-hero-side">
        <p className="sv-answer">{answer}</p>
        <div className="sv-hero-actions">
          <Link href="/demo" className="btn-primary">Book a Demo <Arrow className="arr" /></Link>
          {children}
        </div>
      </div>
    </div>
  )
}

export function SectionHead({ eyebrow, title, lede, id }: { eyebrow?: string; title: string; lede?: string; id?: string }) {
  return (
    <div className="sv-head">
      {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
      <h2 className="section-headline" id={id}>{title}</h2>
      {lede && <p className="sv-lede">{lede}</p>}
    </div>
  )
}

export type TierCard = {
  name: string
  amount: string
  unit: string
  /** A second line under the price, e.g. the payment plan. */
  extra?: string
  notes?: string[]
}

export function TierCards({ tiers }: { tiers: TierCard[] }) {
  return (
    <ol className="sv-tiers">
      {tiers.map((t) => (
        <li key={t.name} className="sv-tier">
          <h3 className="sv-tier-name">{t.name}</h3>
          <div className="sv-tier-amount">{t.amount} <span>{t.unit}</span></div>
          {t.extra && <div className="sv-tier-extra">{t.extra}</div>}
          {t.notes && t.notes.length > 0 && (
            <ul className="sv-tier-notes">
              {t.notes.map((n) => <li key={n}>{n}</li>)}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}

export type AddonRow = { key: string; name: string; price: string; what: string; note?: string | null; href?: string }

export function AddonList({ rows }: { rows: AddonRow[] }) {
  return (
    <ul className="sv-addons">
      {rows.map((r) => (
        <li key={r.key} className="sv-addon">
          <div className="sv-addon-head">
            <h3 className="sv-addon-name">{r.href ? <Link href={r.href}>{r.name}</Link> : r.name}</h3>
            <span className="sv-addon-price">{r.price}</span>
          </div>
          <p className="sv-addon-what">{r.what}</p>
          {r.note && <p className="sv-addon-note">{r.note}</p>}
        </li>
      ))}
    </ul>
  )
}

export type Faq = { q: string; a: string }

/** FAQPage JSON-LD carrying exactly the questions and answers on the page. */
export function faqJsonLd(items: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="faq-list sv-faq-list">
      {items.map((f, i) => (
        <details key={f.q} className="faq-item" open={i === 0}>
          <summary className="faq-q">
            <h3 className="faq-q-text">{f.q}</h3>
            <Plus className="faq-ico" />
          </summary>
          <div className="faq-a"><p>{f.a}</p></div>
        </details>
      ))}
    </div>
  )
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
