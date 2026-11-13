import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { FaqList, JsonLd, PageHero, SectionHead, faqJsonLd } from '@/components/service/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { PATHS, PRIVACY_CLAIMS as C, faq } from '@/lib/site'

/* /security: ONLY sentences from the platform's docs/security/privacy-claims.md
   "May say" table, word for word (lib/site PRIVACY_CLAIMS). Nothing from its
   "Must not say yet" table, and no claim about client isolation, retention or
   certification: none of those is on the list. When that file changes, change
   PRIVACY_CLAIMS in the same release. */

const NAME = 'Security and Privacy for Your Campaign Data'
const H1 = 'Security and Privacy: How We Protect Your Campaign Data'
const DESCRIPTION =
  'Names and figures are masked before any analysis, data is encrypted in transit and at rest, and our analysis provider does not train on your data.'

const ANSWER =
  'Your names and values are masked before any analysis. Every request we send for analysis or drafting has your names replaced first, and a request that still carries a real name or figure is stopped. Data travels encrypted (HTTPS, TLS 1.2 or higher) everywhere, your data is encrypted at rest, and our analysis provider does not train on it.'

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
  alternates: { canonical: PATHS.security },
  ...social({ title: pageTitle(NAME), description: DESCRIPTION, path: PATHS.security }),
}

const GROUPS = [
  {
    id: 'masked',
    eyebrow: 'Masked before analysis',
    title: 'Theia works from placeholders, not from your names.',
    items: [C.r1, C.r2, C.r4, C.r5],
  },
  {
    id: 'encrypted',
    eyebrow: 'Encrypted',
    title: 'Encrypted in transit, at rest, and again for credentials.',
    items: [C.r8, C.r9, C.r10, C.r11],
  },
  {
    id: 'provider',
    eyebrow: 'Our analysis provider',
    title: 'What leaves Axia Atlas for analysis, and what does not.',
    items: [C.r6, C.r12, C.r7],
  },
]

const FAQ = faq('security')

function Group({ 'data-aa-section': mark, g, ground }: { 'data-aa-section': string; g: (typeof GROUPS)[number]; ground: string }) {
  return (
    <section id={g.id} data-aa-section={mark} className={`sv-section ${ground}`}>
      <div className="section-inner">
        <SectionHead eyebrow={g.eyebrow} title={g.title} />
        <ul className="sv-cards">
          {g.items.map((t) => (
            <li key={t} className="sv-card sv-card-static"><p className="sv-card-desc">{t}</p></li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function SecurityPage() {
  return (
    <div className="page sv-page">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_URL}${PATHS.security}`,
        url: `${SITE_URL}${PATHS.security}`,
        name: pageTitle(NAME),
        description: ANSWER,
        about: { '@id': `${SITE_URL}/#software` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      }} />
      <JsonLd data={faqJsonLd(FAQ.map((f) => ({ q: f.q, a: f.a })))} />

      <PageHero data-aa-section="security.hero" eyebrow="Security and privacy" title={H1} answer={ANSWER}>
        <Link href={PATHS.contact} className="btn-outline">Ask a security question</Link>
      </PageHero>

      <Group data-aa-section="security.masked" g={GROUPS[0]} ground="g-raise" />
      <Group data-aa-section="security.encrypted" g={GROUPS[1]} ground="g-black" />
      <Group data-aa-section="security.provider" g={GROUPS[2]} ground="g-raise" />

      <section data-aa-section="security.faq" className="sv-section g-black">
        <div className="section-inner">
          <SectionHead eyebrow="Questions" title="Is my data secure?" />
          <FaqList items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <CtaBand headline="Bring your security questions." sub="Book a demo and ask anything about how your campaign and raise data is handled. We answer from what the platform does today." />
      <Footer />
    </div>
  )
}
