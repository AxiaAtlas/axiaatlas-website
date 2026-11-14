import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow, Check } from '@/components/icons'
import { SiteAddons, SiteSteps, SiteTierCards } from '@/components/site/SiteTiers'
import { Cta, FaqList, Head, JsonLd, faqJsonLd, type Faq } from '@/components/site/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { PATHS } from '@/lib/site'
import { PLANS, PLAN_ADDONS, PLAN_ROWS } from '@/lib/plans'

/* /pricing: what each plan includes (from the platform's pricing analysis,
   Option A, in lib/plans), a side-by-side table, add-ons and questions. NO
   PRICES ANYWHERE: the website never shows a dollar figure for anything we
   sell (Amit, 2026-11-14). Pricing is discussed on a demo, said once on this
   page beside the Book a demo button. Website tiers show what each includes,
   from the platform's pricing.ts, without a price. */

const NAME = 'Pricing for Investment Campaign Analytics Plans'
const H1 = 'Pricing for investment campaign analytics and website projects'
const DESCRIPTION =
  'Three Axia Atlas plans, Launch, Campaign and Portfolio, with what each includes, plus website projects in three tiers. Pricing is discussed on a demo.'
const ANSWER =
  'Axia Atlas has three plans: Launch, Campaign and Portfolio. Each includes Live Campaigns, Raise Ledger and Theia, with full seats for the people who ask Theia questions and view-only seats for everyone else. They differ in raises, channels read live, how often you report and analyst time. Website projects are priced separately.'

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
  alternates: { canonical: PATHS.pricing },
  ...social({ title: pageTitle(NAME), description: DESCRIPTION, path: PATHS.pricing }),
}

const FAQ: Faq[] = [
  {
    q: 'Why is there no price on the page?',
    a: 'The price depends on how many raises you run, how many channels you connect, how many people need Theia and how often you report. On a demo we walk through Axia Atlas on a demo raise, ask about your channels and your team, and send a quote for the plan that fits. Website projects are quoted the same way, after a short call. There is no obligation to buy.',
  },
  {
    q: 'What is the difference between a full seat and a view-only seat?',
    a: 'A full seat includes Theia: that person can ask questions, build reports and share them. A view-only seat can sign in and read every dashboard and report, without Theia. Most teams give full seats to the people who run the raise and view-only seats to the board and partners.',
  },
  {
    q: 'What counts as a channel?',
    a: 'A channel is one ad platform account read live, such as Meta Ads or Google Ads. Affiliates, newspapers, press and platforms without a connector are imported from their exports or entered by hand, and they are included on every plan.',
  },
  {
    q: 'Does Axia Atlas charge a share of ad spend?',
    a: 'No. Axia Atlas never buys media, runs ads or manages ad spend, so nothing is priced on a percentage of your budget. Each plan is a set of seats, channels and reports, and anything added on top, such as another seat or channel, is priced on its own.',
  },
  {
    q: 'Do I need a plan to commission a website?',
    a: 'No. Website projects are one-off and priced on their own: Starter, Growth or Authority, each scoped with you on a call. You can commission a site without using the platform.',
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

      <section data-aa-section="pricing.hero" className="page-hero">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <div className="kicker">Pricing</div>
          <h1 className="h1">{H1}</h1>
          <p className="lede">{ANSWER}</p>
        </div>
      </section>

      <section data-aa-section="pricing.plans" className="sec sec-flush-top">
        <div className="wrap">
          <h2 className="sr-only">Plans</h2>
          <ol className="plan-cards">
            {PLANS.map((p, i) => (
              <li key={p.name} className={`plan-card card rv${i === 1 ? ' plan-card-on' : ''}`} style={{ ['--d' as string]: `${i * 90}ms` }}>
                <span className="label">Plan {String(i + 1).padStart(2, '0')}</span>
                <h3 className="h3">{p.name}</h3>
                <p className="plan-for">{p.for}</p>
                <ul>
                  <li><Check /><span><strong>{p.raises}</strong></span></li>
                  <li><Check /><span>{p.channels}, plus imported and manual channels</span></li>
                  <li><Check /><span>{p.cadence}</span></li>
                  <li><Check /><span><strong>{p.fullSeats} full seats</strong> with Theia</span></li>
                  <li><Check /><span><strong>{p.viewSeats} view-only seats</strong> without Theia</span></li>
                  <li><Check /><span>{p.analyst}</span></li>
                </ul>
              </li>
            ))}
          </ol>
          <div className="quote-line rv">
            <p>Every plan includes Live Campaigns, Raise Ledger, Ask Theia, Theia Reports and setup of your channels. Pricing for the plans and for website projects is discussed on a demo.</p>
            <Link href={PATHS.demo} className="btn btn-ink">Book a demo <Arrow className="arr" /></Link>
          </div>
        </div>
      </section>

      <section data-aa-section="pricing.compare" className="sec">
        <div className="wrap">
          <Head kicker="Side by side" title="Compare the plans." />
          <div className="table-wrap rv">
            <table className="compare">
              <thead>
                <tr><th scope="col"><span className="sr-only">Included</span></th>{PLANS.map((p) => <th key={p.name} scope="col">{p.name}</th>)}</tr>
              </thead>
              <tbody>
                {PLAN_ROWS.map((r) => (
                  <tr key={r.k}><th scope="row">{r.k}</th>{PLANS.map((p) => <td key={p.name}>{r.get(p)}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section data-aa-section="pricing.addons" className="sec">
        <div className="wrap">
          <Head kicker="On any plan" title="Add what your raise needs." />
          <ul className="addons rv">
            {PLAN_ADDONS.map((a) => <li key={a.t}><span className="t">{a.t}</span><span className="d">{a.d}</span></li>)}
          </ul>
        </div>
      </section>

      <section data-aa-section="pricing.websites" id="websites" className="band">
        <div className="wrap">
          <Head kicker="Website projects" title="A website, designed and built, then handed over." lede="One-off projects, separate from the platform. Each covers positioning, copy, design and build." />
          <SiteTierCards />
          <div className="block-gap">
            <div className="split-head rv"><div className="kicker">Add-ons</div></div>
            <SiteAddons />
          </div>
          <div className="block-gap">
            <div className="split-head rv"><div className="kicker">How a project runs</div></div>
            <SiteSteps />
          </div>
        </div>
      </section>

      <section data-aa-section="pricing.faq" className="sec">
        <div className="wrap faq-split">
          <div className="rv">
            <div className="kicker">Questions</div>
            <h2 className="h2">About plans and pricing.</h2>
          </div>
          <FaqList items={FAQ} />
        </div>
      </section>

      <Cta data-aa-section="pricing.cta" title="Leave the demo with a quote." lede="See the platform on a demo raise and leave with a quote for the plan that fits." />
    </>
  )
}
