import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/icons'
import Shot from '@/components/site/Shot'
import { Cta, FaqList, Head, JsonLd, faqJsonLd, type Faq } from '@/components/site/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { PATHS, PRODUCTS } from '@/lib/site'

/* /pricing: plan names and "Book a demo". NO PRICES AND NO SEAT, CHANNEL OR
   DECK COUNTS until Amit sets the price book. Plan names follow the platform's
   docs/pricing/pricing-analysis.md, Option A. */

const NAME = 'Pricing for Investment Campaign Analytics Plans'
const H1 = 'Pricing Plans for Investment Campaign Analytics Software'
const DESCRIPTION =
  'Three Axia Atlas plans, Launch, Campaign and Portfolio, each with Live Campaigns, Raise Ledger and Theia. Book a demo for pricing.'
const ANSWER =
  'Axia Atlas has three plans: Launch, Campaign and Portfolio. Each includes Live Campaigns, Raise Ledger and Theia, with seats for the people who ask Theia questions and view-only seats for everyone else. Pricing depends on your raise, your channels and how often you report, so every plan starts with a demo.'

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
  alternates: { canonical: PATHS.pricing },
  ...social({ title: pageTitle(NAME), description: DESCRIPTION, path: PATHS.pricing }),
}

const PLANS = [
  { name: 'Launch', for: 'One raise, a small team, the first channels live.' },
  { name: 'Campaign', for: 'A raise in full swing across several platforms, reported weekly.', featured: true },
  { name: 'Portfolio', for: 'Several raises, or an agency reporting for many clients.' },
]

const INCLUDED = [
  { k: PRODUCTS.live, d: 'Every ad platform and campaign in one live view.' },
  { k: PRODUCTS.ledger, d: 'Every dollar behind the raise against the investors it brought.' },
  { k: PRODUCTS.ask, d: 'Answers about your campaigns and your raise, in seconds.' },
  { k: PRODUCTS.reports, d: 'Weekly and monthly investor decks, in your brand.' },
  { k: 'Setup', d: 'Your channels connected, and your manual sources imported.' },
  { k: 'Analysts', d: 'People to talk to whenever you want a second pair of eyes.' },
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
    <>
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

      <section data-aa-section="pricing.hero" className="page-hero page-hero-center">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <div className="kicker">Pricing</div>
          <h1 className="h1">{H1}</h1>
          <p className="lede">{ANSWER}</p>
        </div>
      </section>

      <section data-aa-section="pricing.plans" className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="sr-only">Plans</h2>
          <ol className="plans">
            {PLANS.map((p, i) => (
              <li key={p.name} className={`plan card rv${p.featured ? ' plan-featured' : ''}`} style={{ ['--d' as string]: `${i * 90}ms` }}>
                <div className="label">Plan {String(i + 1).padStart(2, '0')}</div>
                <h3 className="h3">{p.name}</h3>
                <p className="plan-for">{p.for}</p>
                <Link href={PATHS.demo} className={`btn ${p.featured ? 'btn-ink' : 'btn-quiet'}`}>Book a demo <Arrow className="arr" /></Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-aa-section="pricing.included" className="sec">
        <div className="wrap split">
          <div className="split-copy rv">
            <div className="kicker">In every plan</div>
            <h2 className="h2">The whole platform, Theia included.</h2>
            <ul className="points">
              {INCLUDED.map((x) => <li key={x.k}><span className="label">{x.k}</span><p>{x.d}</p></li>)}
            </ul>
          </div>
          <figure className="figure rv">
            <div className="frame frame-flush"><Shot id="theia-library" sizes="(max-width: 960px) 100vw, 720px" /></div>
            <figcaption>The Library: everything Theia builds for your team, in every plan.</figcaption>
          </figure>
        </div>
      </section>

      <section data-aa-section="pricing.faq" className="sec">
        <div className="wrap">
          <Head kicker="Questions" title="About plans and pricing." />
          <FaqList items={FAQ} />
        </div>
      </section>

      <Cta data-aa-section="pricing.cta" lede="See the platform on a demo raise and leave with the price for the plan that fits." />
    </>
  )
}
