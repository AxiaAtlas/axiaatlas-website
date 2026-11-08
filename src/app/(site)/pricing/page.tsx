import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { Arrow } from '@/components/icons'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { serviceName, type ServiceId } from '@/lib/services'
import {
  CURRENCY, PRICED_SERVICES, minimumTerms, money, monthlyRange, range, termLabel, tierNotes, tierPrice,
  type PricedService,
} from '@/lib/pricing'

/* ── EVERY FIGURE ON THIS PAGE COMES FROM THE PLATFORM ────────────────────
   lib/pricing reads pricing-catalog.json, which scripts/sync-pricing.mjs
   writes by running the platform's src/lib/pricing.ts. Tier names, prices,
   build fees, terms, capped hours and cadences all come from there, and
   nothing numeric is typed in this file. When the platform reprices, run
   `npm run sync:pricing` and this page follows.

   THE SHAPE IS THE PLATFORM'S TOO. There is no site-wide bundle ladder: each
   service is priced on its own three tiers, so the page is one row per
   service. Monthly services come first, then the two builds (Portals &
   Dashboards and Website Design & Build), which are priced as software is:
   a fee to build, and for a dashboard a monthly to keep it right.

   ON-PAGE SEO follows the platform's contract (lib/website/seo-contract.ts):
   a 50-60 character title, one H1 of 50-60 characters, the answer in the
   first 40-60 words, H2 per section and H3 per service, and Service JSON-LD
   carrying only prices that are printed on the page. */

const TITLE = 'Digital Marketing Pricing by Service and Tier'

const [MONTHLY_LO, MONTHLY_HI] = monthlyRange()
const [WEB_LO, WEB_HI] = range('website', 'oneTime')
const [DASH_BUILD_LO] = range('dashboards', 'oneTime')
const [DASH_MONTHLY_LO] = range('dashboards', 'monthly')

/* The answer block: what it costs, in one paragraph a model can lift whole. */
const ANSWER =
  `Axia Atlas publishes a price for every service, each on its own three tiers, and you buy only the services you need. ` +
  `Monthly services run from ${money(MONTHLY_LO)} to ${money(MONTHLY_HI)} a month each. ` +
  `A website is a one-time build from ${money(WEB_LO)} to ${money(WEB_HI)}. ` +
  `${serviceName('dashboards')} start at a ${money(DASH_BUILD_LO)} build plus ${money(DASH_MONTHLY_LO)} a month.`

const DESCRIPTION =
  `Published prices for every Axia Atlas service. Monthly services from ${money(MONTHLY_LO)} to ${money(MONTHLY_HI)} a month, ` +
  `websites from ${money(WEB_LO)} one-time, and client portals and dashboards from a ${money(DASH_BUILD_LO)} build.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/pricing' },
  ...social({ title: pageTitle(TITLE), description: DESCRIPTION, path: '/pricing' }),
}

const isBuild = (p: PricedService) => p.tiers.some((t) => t.oneTime > 0)
const MONTHLY = PRICED_SERVICES.filter((s) => !isBuild(s.pricing))
const BUILDS = PRICED_SERVICES.filter((s) => isBuild(s.pricing))

/** "A, B and C" */
const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`)

/* Minimum terms, worded from the data rather than typed. */
const MONTHLY_TERMS = minimumTerms().filter(([id]) => MONTHLY.some((s) => s.id === id))
const TERM_MONTHS = Array.from(new Set(MONTHLY_TERMS.map(([, m]) => m)))
const MONTHLY_LEDE =
  'Each monthly service has three tiers. The service decides what gets done; the tier decides how much of it, how often we meet and how often you get a report. ' +
  (TERM_MONTHS.length === 1
    ? `${list(MONTHLY_TERMS.map(([id]) => serviceName(id)))} carry a ${TERM_MONTHS[0]}-month minimum term. The rest run month to month.`
    : 'Each card states its minimum term, if it has one.')

const DASH_TERM = minimumTerms().find(([id]) => id === 'dashboards')?.[1]
const BUILDS_LEDE =
  `Websites and dashboards are software we build, so they are priced as builds. ${serviceName('website')} is a one-time fee. ` +
  `${serviceName('dashboards')} is a build fee plus a monthly that keeps its integrations right as your other systems change` +
  (DASH_TERM ? `, on a ${DASH_TERM}-month minimum term.` : '.')

/* Service JSON-LD with an Offer per tier. Same @ids as /services, so the two
   pages describe one set of entities. Only prices printed below. */
const PRICING_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': PRICED_SERVICES.map((s) => ({
    '@type': 'Service',
    '@id': `${SITE_URL}/services#${s.id}`,
    name: s.name,
    url: `${SITE_URL}/pricing#${s.id}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'United States' },
    offers: s.pricing.tiers.map((t) => ({
      '@type': 'Offer',
      name: `${s.name}: ${t.label}`,
      priceCurrency: CURRENCY,
      price: t.monthly || t.oneTime,
      priceSpecification: [
        ...(t.monthly
          ? [{ '@type': 'UnitPriceSpecification', price: t.monthly, priceCurrency: CURRENCY, unitCode: 'MON', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' } }]
          : []),
        ...(t.oneTime ? [{ '@type': 'PriceSpecification', price: t.oneTime, priceCurrency: CURRENCY, name: 'One-time build' }] : []),
      ],
    })),
  })),
}

function PriceRow({ id, name, pricing }: { id: ServiceId; name: string; pricing: PricedService }) {
  return (
    <article id={id} className="price-row">
      <div className="price-row-head">
        <h3 className="price-row-name">{name}</h3>
        {pricing.audience && <p className="price-row-who">{pricing.audience}</p>}
        <div className="price-row-foot">
          <span className="price-row-term">{termLabel(pricing)}</span>
          <Link href={`/services#${id}`} className="service-link">What it includes <Arrow className="arr" /></Link>
        </div>
      </div>
      <ol className="price-tiers">
        {pricing.tiers.map((t) => {
          const p = tierPrice(pricing, t)
          const notes = tierNotes(t)
          return (
            <li key={t.label} className="price-tier">
              <div className="price-tier-name">{t.label}</div>
              <div className="price-tier-amount">{p.amount} <span>{p.unit}</span></div>
              {p.extra && <div className="price-tier-extra">{p.extra}</div>}
              {notes.length > 0 && (
                <ul className="price-tier-notes">
                  {notes.map((n) => <li key={n}>{n}</li>)}
                </ul>
              )}
            </li>
          )
        })}
      </ol>
    </article>
  )
}

export default function PricingPage() {
  return (
    <div className="page pricing-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICING_JSON_LD) }} />

      <div data-aa-section="pricing.hero" className="pricing-hero">
        <div className="section-eyebrow">Pricing</div>
        <h1 className="section-headline">Published Prices for Every Marketing Service and Tier</h1>
        <p className="section-sub pricing-answer">{ANSWER}</p>
      </div>

      <section data-aa-section="pricing.tiers" className="price-section" aria-labelledby="price-monthly-head">
        <div className="price-section-head">
          <div className="section-eyebrow">Billed monthly</div>
          <h2 className="section-headline" id="price-monthly-head">Monthly Services</h2>
          <p className="price-section-lede">{MONTHLY_LEDE}</p>
        </div>
        <div className="price-rows">
          {MONTHLY.map((s) => <PriceRow key={s.id} id={s.id} name={s.name} pricing={s.pricing} />)}
        </div>
      </section>

      <section data-aa-section="pricing.builds" className="price-section price-section-builds" aria-labelledby="price-builds-head">
        <div className="price-section-head">
          <div className="section-eyebrow">Priced as builds</div>
          <h2 className="section-headline" id="price-builds-head">Websites, Portals and Dashboards</h2>
          <p className="price-section-lede">{BUILDS_LEDE}</p>
        </div>
        <div className="price-rows">
          {BUILDS.map((s) => <PriceRow key={s.id} id={s.id} name={s.name} pricing={s.pricing} />)}
        </div>
      </section>

      <p data-aa-section="pricing.note" className="pricing-note">
        Prices are in US dollars, per service. You combine only the services you need, and the quote you sign is the price you pay. On the demo call we tell you which services and tiers will pay off first.
      </p>

      <CtaBand
        eyebrow="Not sure which tier?"
        headline="We'll tell you what to do first."
        sub="Book a demo. We audit how you show up before the call, then walk you through the services and tiers that will pay off fastest."
      />

      <Footer />
    </div>
  )
}
