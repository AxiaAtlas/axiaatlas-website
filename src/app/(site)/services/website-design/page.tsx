import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { ArtWebsite } from '@/components/artifacts/ChannelArtifacts'
import { PageHero, SectionHead, TierCards, AddonList, FaqList, JsonLd, faqJsonLd, type Faq } from '@/components/service/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { serviceName, serviceHref, HEADLINE_PAGES } from '@/lib/services'
import { ADDON_BLURB, SERVICE_ADDON_COPY, CARE_PLAN_COVERS } from '@/lib/service-copy'
import { CURRENCY, addOn, addOnPrice, addOnsFor, money, monthsWord, paymentPlan, pricingFor, range } from '@/lib/pricing'

/* ── WEBSITE DESIGN & BUILD ──────────────────────────────────────────────────
   Every figure comes from the platform (lib/pricing): the three build fees, the
   payment plan's month count, the care plan's three monthly prices and its
   minimum term, and every add-on. Nothing numeric is typed here. */

const PATH = HEADLINE_PAGES.website
const NAME = serviceName('website')
const W = pricingFor('website')
const [LO, HI] = range('website', 'oneTime')
const CARE = addOn('website', 'care_plan')
const CARE_PRICES = CARE.tierPrices ?? [CARE.price]
const PLAN_MONTHS = W.paymentPlanMonths ?? 0
const PLAN_WORD = monthsWord(PLAN_MONTHS)
const CARE_TERM = CARE.minTermMonths ? monthsWord(CARE.minTermMonths) : null
const STARTER_PLAN = paymentPlan('website', W.tiers[0].oneTime)

const TITLE = 'Website Design and Build With Care Plans'
const H1 = 'Website Design and Build, Backed by a Monthly Care Plan'

const ANSWER =
  `Axia Atlas designs and builds websites that explain what you sell and turn visitors into enquiries. ` +
  `A build is a one-time fee from ${money(LO)} to ${money(HI)}, paid upfront or spread over ${PLAN_WORD} months at the same total. ` +
  `After launch, an optional care plan keeps the site up to date from ${money(Math.min(...CARE_PRICES))} a month.`

const DESCRIPTION =
  `Website design and build from ${money(LO)} to ${money(HI)}, paid once or over ${PLAN_WORD} months at the same total, ` +
  `with an optional care plan from ${money(Math.min(...CARE_PRICES))} a month for sites we build.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  ...social({ title: pageTitle(TITLE), description: DESCRIPTION, path: PATH }),
}

const STEPS = [
  { title: 'Positioning', desc: 'What you sell, who it is for, and why a buyer should pick you over the alternatives they are also looking at. That decision drives everything after it.' },
  { title: 'Copy', desc: 'Pages that argue your case in plain language, written around what a visitor came to do, so the site says what the business actually does.' },
  { title: 'Design', desc: 'A layout built from the copy rather than around it, in your brand, tested on a real phone as well as a laptop.' },
  { title: 'Build and search foundations', desc: 'A working site, not a mockup. Page structure that matches how people search, titles and headings written for real queries, schema markup, fast load times and a sitemap that gets indexed.' },
]

const ADDONS = addOnsFor('website').filter((a) => a.key !== 'care_plan')

const FAQ: Faq[] = [
  {
    q: 'How much does a website cost?',
    a: `A build is a one-time fee: ${W.tiers.map((t) => `${t.label} ${money(t.oneTime)}`).join(', ')}. ` +
      `The tier sets how large the site is and what it includes. Add-ons such as extra pages are priced separately.`,
  },
  {
    q: 'Can I pay for the build over time?',
    a: `Yes. You can pay the build fee upfront or spread it over ${PLAN_WORD} monthly payments. The total is the same either way: it is not financed and there is no interest or fee.` +
      (STARTER_PLAN ? ` A ${W.tiers[0].label} works out to ${STARTER_PLAN.monthly} a month for ${PLAN_WORD} months.` : ''),
  },
  {
    q: 'What does the care plan cover?',
    a: `${CARE_PLAN_COVERS.join(', ')}. It costs ${W.tiers.map((t, i) => `${money(CARE_PRICES[i] ?? CARE_PRICES[0])} a month for a ${t.label}`).join(', ')}` +
      (CARE_TERM ? `, with a ${CARE_TERM}-month minimum.` : '.'),
  },
  {
    q: 'Can I put a site someone else built on the care plan?',
    a: 'No. The care plan covers only sites Axia Atlas built. We can only stand behind code we wrote, so for an existing site we start with a new build.',
  },
]

const SERVICE_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}${PATH}#service`,
  name: NAME,
  serviceType: 'Website design and development',
  url: `${SITE_URL}${PATH}`,
  description: ANSWER,
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  offers: [
    ...W.tiers.map((t) => ({
      '@type': 'Offer', name: `${NAME}: ${t.label}`, price: t.oneTime, priceCurrency: CURRENCY,
    })),
    ...W.tiers.map((t, i) => ({
      '@type': 'Offer', name: `${CARE.label}: ${t.label}`, price: CARE_PRICES[i] ?? CARE_PRICES[0], priceCurrency: CURRENCY,
      priceSpecification: { '@type': 'UnitPriceSpecification', price: CARE_PRICES[i] ?? CARE_PRICES[0], priceCurrency: CURRENCY, unitCode: 'MON' },
    })),
  ],
}

export default function WebsiteDesignPage() {
  return (
    <div className="page sv-page">
      <JsonLd data={SERVICE_LD} />
      <JsonLd data={faqJsonLd(FAQ)} />

      <PageHero section="website.hero" eyebrow={NAME} title={H1} answer={ANSWER}>
        <Link href="#tiers" className="btn-outline">See the tiers</Link>
      </PageHero>

      <section data-aa-section="website.process" className="sv-section g-raise">
        <div className="section-inner sv-split">
          <div>
            <SectionHead
              eyebrow="What a build includes"
              title="Positioning First, Then Copy, Design and Build"
              lede="A website is not a design job. It starts with what you sell and who it is for, and the search foundations go in during the build rather than after it."
            />
            <ol className="sv-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="sv-step">
                  <span className="sv-step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="sv-step-title">{s.title}</h3>
                    <p className="sv-step-desc">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="sv-figure" aria-hidden="true"><ArtWebsite /></div>
        </div>
      </section>

      <section data-aa-section="website.tiers" className="sv-section g-black" id="tiers">
        <div className="section-inner">
          <SectionHead
            eyebrow="Build tiers"
            title="Three Website Tiers, Paid Once or Over Time"
            lede={`Each build is a one-time fee. Pay it upfront, or spread it over ${PLAN_WORD} months: same total, not financed, no interest.`}
          />
          <TierCards
            tiers={W.tiers.map((t) => {
              const plan = paymentPlan('website', t.oneTime)
              return {
                name: t.label,
                amount: money(t.oneTime),
                unit: 'one-time',
                extra: plan ? `or ${plan.monthly} a month for ${PLAN_WORD} months` : undefined,
                notes: t.features,
              }
            })}
          />
        </div>
      </section>

      <section data-aa-section="website.care" className="sv-section g-spruce" id="care-plan">
        <div className="section-inner sv-split">
          <div>
            <SectionHead
              eyebrow="After launch"
              title="The Care Plan Keeps Your Site Current"
              lede={`An optional monthly plan for the site we built for you, priced by its tier${CARE_TERM ? `, with a ${CARE_TERM}-month minimum` : ''}. It covers only sites Axia Atlas built.`}
            />
            <ul className="sv-checks">
              {CARE_PLAN_COVERS.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
          <TierCards
            tiers={W.tiers.map((t, i) => ({
              name: `${t.label} care`,
              amount: money(CARE_PRICES[i] ?? CARE_PRICES[0]),
              unit: '/mo',
            }))}
          />
        </div>
      </section>

      <section data-aa-section="website.addons" className="sv-section g-black">
        <div className="section-inner">
          <SectionHead eyebrow="Add to a build" title="Website Add-Ons, Priced Up Front" />
          <AddonList
            rows={ADDONS.map((a) => ({
              key: a.key,
              name: SERVICE_ADDON_COPY[a.key]?.label ?? a.label,
              price: addOnPrice(a),
              what: SERVICE_ADDON_COPY[a.key]?.what ?? '',
            }))}
          />
        </div>
      </section>

      <section data-aa-section="website.pairs" className="sv-section g-raise">
        <div className="section-inner">
          <SectionHead eyebrow="Pairs well with" title="Get the New Site Found in Search and on the Map" />
          <AddonList
            rows={(['geo', 'local'] as const).map((id) => ({
              key: id, name: serviceName(id), price: `From ${money(range(id, 'monthly')[0])} a month`,
              what: ADDON_BLURB[id], href: serviceHref(id),
            }))}
          />
        </div>
      </section>

      <section data-aa-section="website.faq" className="sv-section faq-section g-black">
        <div className="section-inner">
          <SectionHead eyebrow="Questions" title="Website Design and Build Questions, Answered" />
          <FaqList items={FAQ} />
        </div>
      </section>

      <CtaBand
        headline="Ready for a site that sells?"
        sub="Book a demo. Before the call we audit your current site and how you show up in search, then walk you through the tier that fits."
      />
      <Footer />
    </div>
  )
}
