import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { Arrow } from '@/components/icons'
import { SectionHead, TierCards, AddonList, JsonLd } from '@/components/service/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { THEIA_LAUNCH } from '@/lib/flags'
import { ADDON_IDS, HEADLINE_PAGES, PORTAL_PATH, serviceHref, serviceName } from '@/lib/services'
import { SERVICE_ADDON_COPY } from '@/lib/service-copy'
import {
  CURRENCY, addOn, addOnPrice, addOnsFor, money, monthsWord, paymentPlan, pricingFor, range, termLabel, tierNotes, tierPrice,
} from '@/lib/pricing'

/* ── EVERY FIGURE ON THIS PAGE COMES FROM THE PLATFORM ────────────────────
   lib/pricing reads pricing-catalog.json, which scripts/sync-pricing.mjs
   writes by running the platform's src/lib/pricing.ts. Nothing numeric is
   typed in this file. When the platform reprices, run `npm run sync:pricing`.

   THE SHAPE FOLLOWS THE SITE MODEL: the headline services first (website,
   with its payment plan and care plan, then social), the Portal at the Theia
   launch with no invented figure, then every add-on in one compact table.
   Service JSON-LD carries only prices printed on the page. */

const W = pricingFor('website')
const S = pricingFor('social')
const [WEB_LO, WEB_HI] = range('website', 'oneTime')
const [SOCIAL_LO, SOCIAL_HI] = range('social', 'monthly')
const CARE = addOn('website', 'care_plan')
const CARE_PRICES = CARE.tierPrices ?? [CARE.price]
const PLAN_WORD = monthsWord(W.paymentPlanMonths ?? 0)
const ADDON_LO = Math.min(...ADDON_IDS.flatMap((id) => pricingFor(id).tiers.map((t) => t.monthly).filter((n) => n > 0)))

const TITLE = THEIA_LAUNCH ? 'Website, Social and Client Portal Pricing' : 'Website and Social Media Pricing, Plus Add-Ons'
const H1 = THEIA_LAUNCH ? 'Published Pricing for Website, Social and the Client Portal' : 'Published Prices for Websites, Social Media and Add-Ons'

const ANSWER =
  `A website is a one-time build from ${money(WEB_LO)} to ${money(WEB_HI)}, paid once or over ${PLAN_WORD} months at the same total, ` +
  `with an optional care plan from ${money(Math.min(...CARE_PRICES))} a month. ` +
  `Social media management runs ${money(SOCIAL_LO)} to ${money(SOCIAL_HI)} a month. ` +
  `Add-ons start at ${money(ADDON_LO)} a month, and you buy only what you need.`

const DESCRIPTION =
  `Published prices: websites from ${money(WEB_LO)} one-time or over ${PLAN_WORD} months, care plans from ${money(Math.min(...CARE_PRICES))} a month, ` +
  `social media from ${money(SOCIAL_LO)} a month, and add-ons from ${money(ADDON_LO)} a month.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/pricing' },
  ...social({ title: pageTitle(TITLE), description: DESCRIPTION, path: '/pricing' }),
}

const monthlySpec = (price: number) => ({ '@type': 'UnitPriceSpecification', price, priceCurrency: CURRENCY, unitCode: 'MON' })

const PRICING_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service', '@id': `${SITE_URL}${HEADLINE_PAGES.website}#service`, name: serviceName('website'),
      url: `${SITE_URL}/pricing#website`, provider: { '@id': `${SITE_URL}/#organization` },
      offers: [
        ...W.tiers.map((t) => ({ '@type': 'Offer', name: `${serviceName('website')}: ${t.label}`, price: t.oneTime, priceCurrency: CURRENCY })),
        ...W.tiers.map((t, i) => ({ '@type': 'Offer', name: `${CARE.label}: ${t.label}`, price: CARE_PRICES[i] ?? CARE_PRICES[0], priceCurrency: CURRENCY, priceSpecification: monthlySpec(CARE_PRICES[i] ?? CARE_PRICES[0]) })),
      ],
    },
    {
      '@type': 'Service', '@id': `${SITE_URL}${HEADLINE_PAGES.social}#service`, name: serviceName('social'),
      url: `${SITE_URL}/pricing#social`, provider: { '@id': `${SITE_URL}/#organization` },
      offers: S.tiers.map((t) => ({ '@type': 'Offer', name: `${serviceName('social')}: ${t.label}`, price: t.monthly, priceCurrency: CURRENCY, priceSpecification: monthlySpec(t.monthly) })),
    },
  ],
}

function addonRows(id: 'website' | 'social') {
  return addOnsFor(id)
    .filter((a) => a.key !== 'care_plan')
    .map((a) => ({ key: a.key, name: SERVICE_ADDON_COPY[a.key]?.label ?? a.label, price: addOnPrice(a), what: SERVICE_ADDON_COPY[a.key]?.what ?? '' }))
}

export default function PricingPage() {
  return (
    <div className="page sv-page pricing-page">
      <JsonLd data={PRICING_JSON_LD} />

      <div data-aa-section="pricing.hero" className="services-hero sv-hero">
        <div className="section-eyebrow">Pricing</div>
        <h1 className="section-headline">{H1}</h1>
        <div className="section-sub sv-hero-side">
          <p className="sv-answer">{ANSWER}</p>
          <nav className="sv-hero-actions sv-jump-inline" aria-label="Price sections">
            <a href="#website">Website</a>
            <a href="#social">Social</a>
            {THEIA_LAUNCH && <a href="#portal">Portal</a>}
            <a href="#add-ons">Add-ons</a>
          </nav>
        </div>
      </div>

      <section data-aa-section="pricing.website" className="sv-section g-raise" id="website">
        <div className="section-inner">
          <SectionHead
            eyebrow={serviceName('website')}
            title={`Website Builds: Pay Once or Over ${PLAN_WORD} Months`}
            lede={`A one-time fee per build. Pay it upfront, or spread it over ${PLAN_WORD} months for the same total: not financed, no interest, no fee.`}
          />
          <TierCards
            tiers={W.tiers.map((t) => {
              const plan = paymentPlan('website', t.oneTime)
              return { name: t.label, amount: money(t.oneTime), unit: 'one-time', extra: plan ? `or ${plan.monthly} a month for ${PLAN_WORD} months` : undefined, notes: t.features }
            })}
          />
          <div className="sv-subhead" id="care-plan">
            <h3 className="sv-subhead-title">{CARE.label}</h3>
            <p className="sv-lede">
              {`Optional, after launch, priced by your site's tier${CARE.minTermMonths ? `, with a ${monthsWord(CARE.minTermMonths)}-month minimum` : ''}. `}
              <strong>It covers only sites Axia Atlas built.</strong>
            </p>
          </div>
          <TierCards tiers={W.tiers.map((t, i) => ({ name: `${t.label} care`, amount: money(CARE_PRICES[i] ?? CARE_PRICES[0]), unit: '/mo' }))} />
          <div className="sv-subhead">
            <h3 className="sv-subhead-title">Website add-ons</h3>
          </div>
          <AddonList rows={addonRows('website')} />
          <Link href={HEADLINE_PAGES.website} className="service-link sv-more">What a website build includes <Arrow className="arr" /></Link>
        </div>
      </section>

      <section data-aa-section="pricing.social" className="sv-section g-black" id="social">
        <div className="section-inner">
          <SectionHead
            eyebrow={serviceName('social')}
            title="Social Media Plans, Billed Monthly"
            lede={`Three plans. The plan sets how much we publish and how often we meet and report.${S.minTermMonths ? ` ${termLabel(S)}.` : ''}`}
          />
          <TierCards tiers={S.tiers.map((t) => ({ name: t.label, amount: money(t.monthly), unit: '/mo', notes: tierNotes(t) }))} />
          <div className="sv-subhead">
            <h3 className="sv-subhead-title">Social add-ons</h3>
          </div>
          <AddonList rows={addonRows('social')} />
          <Link href={HEADLINE_PAGES.social} className="service-link sv-more">How social media management works <Arrow className="arr" /></Link>
        </div>
      </section>

      {THEIA_LAUNCH && (
        <section data-aa-section="pricing.portal" className="sv-section g-raise" id="portal">
          <div className="section-inner sv-note">
            <h2 className="section-headline">The Client Portal</h2>
            <p className="sv-lede">One login for your results, approvals and reports, with Theia by Axia Atlas built in.</p>
            <div className="sv-tier-amount">Pricing on request</div>
            <Link href={PORTAL_PATH} className="service-link">About the portal <Arrow className="arr" /></Link>
          </div>
        </section>
      )}

      <section data-aa-section="pricing.addons" className="sv-section g-raise" id="add-ons">
        <div className="section-inner">
          <SectionHead
            eyebrow="Add-ons"
            title="Every Add-On, With Its Three Tiers"
            lede="Each add-on is priced on its own and runs alongside a website or social engagement."
          />
          <div className="sv-table-wrap">
            <table className="sv-table">
              <thead>
                <tr><th scope="col">Add-on</th><th scope="col">Tier 1</th><th scope="col">Tier 2</th><th scope="col">Tier 3</th><th scope="col">Term</th></tr>
              </thead>
              <tbody>
                {ADDON_IDS.map((id) => {
                  const p = pricingFor(id)
                  return (
                    <tr key={id}>
                      <th scope="row"><Link href={serviceHref(id)}>{serviceName(id)}</Link></th>
                      {p.tiers.map((t) => {
                        const pr = tierPrice(p, t)
                        return (
                          <td key={t.label} data-label={t.label}>
                            <span className="sv-table-tier">{t.label}</span>
                            <span className="sv-table-price">{pr.amount}<small>{pr.unit.replace('/mo', ' a month').replace('one-time', ' one-time')}</small></span>
                            {pr.extra && <span className="sv-table-extra">{pr.extra}</span>}
                          </td>
                        )
                      })}
                      <td data-label="Term" className="sv-table-term">{termLabel(p)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <p data-aa-section="pricing.note" className="pricing-note">
        Prices are in US dollars. You combine only the services you need, and the quote you sign is the price you pay. On the demo call we tell you which services and tiers will pay off first.
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
