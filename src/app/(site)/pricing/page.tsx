import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { Arrow } from '@/components/icons'
import { FaqList, JsonLd, PageHero, SectionHead, faqJsonLd, type Faq } from '@/components/service/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { PATHS } from '@/lib/site'

/* /pricing: three plans, NO PRICES. Every plan's button is "Book a demo".
   Plan names and what each includes follow the platform's
   docs/pricing/pricing-analysis.md, Option A (recommended). The figures are
   kept to what a buyer compares (seats, channels, decks); prices, analyst
   hours and implementation fees stay off the site. */

const NAME = 'Pricing for Investment Campaign Analytics Plans'
const H1 = 'Pricing Plans for Investment Campaign Analytics Software'
const DESCRIPTION =
  'Three Axia Atlas plans, Launch, Campaign and Portfolio, each with Theia seats, view-only seats, live ad channels and investor decks. Book a demo for pricing.'

const ANSWER =
  'Axia Atlas has three plans: Launch, Campaign and Portfolio. Each includes Live Campaigns, Raise Ledger and Theia, with seats for the people who ask Theia questions, view-only seats for everyone else, live ad channels and Theia Reports decks each month. Pricing depends on your raise, so every plan starts with a demo.'

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
  alternates: { canonical: PATHS.pricing },
  ...social({ title: pageTitle(NAME), description: DESCRIPTION, path: PATHS.pricing }),
}

const PLANS = [
  {
    name: 'Launch',
    for: 'One raise, a small team, the first channels live.',
    notes: ['3 full seats with Theia', '10 view-only seats', '2 live ad channels', '1 Theia Reports deck a month', 'Analyst review each month'],
  },
  {
    name: 'Campaign',
    for: 'A raise in full swing across several platforms, reported weekly.',
    notes: ['6 full seats with Theia', '25 view-only seats', '4 live ad channels', '4 Theia Reports decks a month', 'More analyst review each month'],
    featured: true,
  },
  {
    name: 'Portfolio',
    for: 'Several raises, or an agency reporting for many clients.',
    notes: ['15 full seats with Theia', '60 view-only seats', '6 live ad channels', '8 Theia Reports decks a month', 'The most analyst review each month'],
  },
]

const EXTRAS = [
  { t: 'Extra seats', d: 'Add full seats with Theia, or view-only seats, on any plan.' },
  { t: 'Extra channels', d: 'Add another ad platform, or a channel with no connector, such as an affiliate network, by manual import.' },
  { t: 'A new connector', d: 'A platform we do not connect yet can be added for you. We quote it on a call.' },
  { t: 'A campaign website', d: 'Designed and built as a one-off project, separate from your plan.' },
]

const FAQ: Faq[] = [
  {
    q: 'Why is there no price on the page?',
    a: 'Pricing depends on how many channels you run, how many people need Theia and how often you report to investors. On a demo we walk through Axia Atlas on a demo raise, ask about your channels and your team, and send the price for the plan that fits. There is no obligation to buy.',
  },
  {
    q: 'What is the difference between a full seat and a view-only seat?',
    a: 'A full seat includes Theia: that person can ask questions, build reports and share them. A view-only seat can sign in and read every dashboard and report, without Theia. Most teams give full seats to the people who run the raise and view-only seats to the board and partners.',
  },
  {
    q: 'Does Axia Atlas charge a share of ad spend?',
    a: 'No. Axia Atlas never buys media, runs ads or manages ad spend, so nothing is priced on a percentage of your budget. Each plan is a set of seats, channels and reports, and anything added on top, such as another seat or channel, is priced on its own.',
  },
]

export default function PricingPage() {
  return (
    <div className="page sv-page">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_URL}${PATHS.pricing}`,
        url: `${SITE_URL}${PATHS.pricing}`,
        name: pageTitle(NAME),
        description: ANSWER,
        about: { '@id': `${SITE_URL}/#software` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      }} />
      <JsonLd data={faqJsonLd(FAQ)} />

      <PageHero data-aa-section="pricing.hero" eyebrow="Pricing" title={H1} answer={ANSWER} />

      <section data-aa-section="pricing.plans" className="sv-section g-raise">
        <div className="section-inner">
          <SectionHead eyebrow="Plans" title="Three plans. Theia in every one." />
          <ol className="px-plans">
            {PLANS.map((p) => (
              <li key={p.name} className={`px-plan${p.featured ? ' featured' : ''}`}>
                <h3 className="px-plan-name">{p.name}</h3>
                <p className="px-plan-for">{p.for}</p>
                <div className="px-plan-price">Pricing on a demo</div>
                <ul className="sv-tier-notes">
                  {p.notes.map((n) => <li key={n}>{n}</li>)}
                </ul>
                <Link href={PATHS.demo} className={p.featured ? 'btn-primary' : 'btn-outline'}>Book a demo <Arrow className="arr" /></Link>
              </li>
            ))}
          </ol>
          <p className="sv-lede">
            Every plan includes{' '}
            <Link className="inline-link" href={PATHS.platform}>Live Campaigns and Raise Ledger</Link>,{' '}
            <Link className="inline-link" href={PATHS.theia}>Theia Reports and Ask Theia</Link>, and setup of your channels.
          </p>
        </div>
      </section>

      <section data-aa-section="pricing.extras" className="sv-section g-black">
        <div className="section-inner">
          <SectionHead eyebrow="On any plan" title="Add what your raise needs." />
          <div className="sv-cards sv-cards-4">
            {EXTRAS.map((e) => (
              <div key={e.t} className="sv-card sv-card-static">
                <h3 className="sv-card-name">{e.t}</h3>
                <p className="sv-card-desc">{e.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-aa-section="pricing.faq" className="sv-section g-raise">
        <div className="section-inner">
          <SectionHead eyebrow="Questions" title="About plans and pricing." />
          <FaqList items={FAQ} />
        </div>
      </section>

      <CtaBand headline="Find the plan that fits your raise." sub="Book a demo. We walk you through the platform on a demo raise and send the price for the plan that fits." />
      <Footer />
    </div>
  )
}
