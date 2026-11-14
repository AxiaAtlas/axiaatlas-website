/* The parts pages are built from: a section head, the FAQ (its JSON-LD made
   from the same array the reader sees), the closing call to action, and a
   JSON-LD tag. Every block takes its data-aa-section as a literal from the
   page so the platform's site-map can read it. */
import Link from 'next/link'
import TheiaMark from '@/components/TheiaMark'
import { Arrow } from '@/components/icons'
import { PATHS, TAGLINE } from '@/lib/site'

export function Head({ kicker, title, lede, center = false, id, as: H = 'h2' }: {
  kicker?: string; title: string; lede?: React.ReactNode; center?: boolean; id?: string; as?: 'h2' | 'h3'
}) {
  return (
    <div className={`head rv${center ? ' head-center' : ''}`}>
      {kicker && <div className="kicker">{kicker}</div>}
      <H className="h2" id={id}>{title}</H>
      {lede && <p className="lede">{lede}</p>}
    </div>
  )
}

export type Faq = { q: string; a: string }

export function FaqList({ items, center = false }: { items: Faq[]; center?: boolean }) {
  return (
    <div className={`faq faq-list rv${center ? ' faq-center' : ''}`}>
      {items.map((f) => (
        <details key={f.q} className="faq-item">
          <summary><h3 className="faq-q-text">{f.q}</h3><span className="faq-ico" aria-hidden="true" /></summary>
          <p className="faq-a">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export const faqJsonLd = (items: Faq[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function Cta({ 'data-aa-section': mark, title = `${TAGLINE}.`, lede }: { 'data-aa-section': string; title?: string; lede?: string }) {
  return (
    <section data-aa-section={mark} className="cta">
      <div className="glow" aria-hidden="true" />
      <div className="wrap rv">
        <TheiaMark className="cta-mark" />
        <h2 className="display">{title}</h2>
        {lede && <p className="lede">{lede}</p>}
        <div className="actions">
          <Link href={PATHS.demo} className="btn btn-ink">Book a demo <Arrow className="arr" /></Link>
        </div>
      </div>
    </section>
  )
}
