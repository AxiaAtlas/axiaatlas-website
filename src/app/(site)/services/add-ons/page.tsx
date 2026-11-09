import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { Arrow, ServiceIcons } from '@/components/icons'
import { PageHero, SectionHead, JsonLd } from '@/components/service/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { ADDON_ANCHOR, ADDON_GROUPS, ADDON_IDS, ADDONS_PATH, serviceName, type ServiceId } from '@/lib/services'
import { ADDON_COPY } from '@/lib/service-copy'
import { CURRENCY, money, pricingFor, termLabel, tierPrice, tierNotes } from '@/lib/pricing'

/* ── ADD-ONS ─────────────────────────────────────────────────────────────────
   Everything that is not a headline service, grouped by the job the buyer
   wants done (lib/services ADDON_GROUPS). Each add-on keeps its own anchor,
   which the old /services/<id> addresses 301 to. Prices and terms come from
   the platform. */

type AddonId = keyof typeof ADDON_ANCHOR

const TITLE = 'Marketing Add-Ons: SEO, Local, Leads and More'
const H1 = 'Add-On Services for Search, Local, Leads and Strategy'

const LOWEST = Math.min(...ADDON_IDS.flatMap((id) => pricingFor(id).tiers.map((t) => t.monthly).filter((n) => n > 0)))

const ANSWER =
  'Add-ons extend a website or social engagement with focused work: search and answer engine optimization, local search, ' +
  "lead generation, a leader's personal brand, competitor research, strategic advisory and custom dashboards. " +
  `Each is priced on its own three tiers, from ${money(LOWEST)} a month, so you add only what pays off.`

const DESCRIPTION =
  `Add-on marketing services from ${money(LOWEST)} a month: SEO and answer engine optimization, local search and maps, lead generation, executive brand, competitor research, advisory and custom dashboards.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: ADDONS_PATH },
  ...social({ title: pageTitle(TITLE), description: DESCRIPTION, path: ADDONS_PATH }),
}

const LD = {
  '@context': 'https://schema.org',
  '@graph': ADDON_IDS.map((id) => {
    const p = pricingFor(id)
    return {
      '@type': 'Service',
      '@id': `${SITE_URL}${ADDONS_PATH}#${ADDON_ANCHOR[id as AddonId]}`,
      name: serviceName(id),
      url: `${SITE_URL}${ADDONS_PATH}#${ADDON_ANCHOR[id as AddonId]}`,
      description: ADDON_COPY[id as AddonId].desc,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'United States' },
      offers: p.tiers.map((t) => ({
        '@type': 'Offer',
        name: `${serviceName(id)}: ${t.label}`,
        priceCurrency: CURRENCY,
        price: t.monthly || t.oneTime,
        ...(t.monthly ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: t.monthly, priceCurrency: CURRENCY, unitCode: 'MON' } } : {}),
      })),
    }
  }),
}

function Addon({ id }: { id: ServiceId }) {
  const p = pricingFor(id)
  const copy = ADDON_COPY[id as AddonId]
  const Icon = ServiceIcons[id]
  return (
    <article id={ADDON_ANCHOR[id as AddonId]} className="sv-addon-detail">
      <div className="sv-addon-detail-head">
        <span className="service-icon">{Icon && <Icon />}</span>
        <h3 className="sv-addon-detail-name">{serviceName(id)}</h3>
        <p className="sv-addon-who">{p.audience ?? copy.who}</p>
      </div>
      <div className="sv-addon-detail-body">
        <p className="sv-addon-desc">{copy.desc}</p>
        <ul className="sv-addon-tiers">
          {p.tiers.map((t) => {
            const price = tierPrice(p, t)
            const notes = id === 'strategy' ? tierNotes(t).slice(0, 2) : []
            return (
              <li key={t.label}>
                <span className="sv-addon-tier-name">{t.label}</span>
                <span className="sv-addon-tier-price">{price.amount} {price.unit}{price.extra ? `, ${price.extra}` : ''}</span>
                {notes.length > 0 && <span className="sv-addon-tier-notes">{notes.join('. ')}</span>}
              </li>
            )
          })}
        </ul>
        <div className="sv-addon-foot">
          <span className="price-row-term">{termLabel(p)}</span>
          <Link href="/demo" className="service-link">Book a Demo <Arrow className="arr" /></Link>
        </div>
      </div>
    </article>
  )
}

export default function AddOnsPage() {
  return (
    <div className="page sv-page">
      <JsonLd data={LD} />

      <PageHero data-aa-section="addons.hero" eyebrow="Add-ons" title={H1} answer={ANSWER}>
        <Link href="/pricing#add-ons" className="btn-outline">Compare prices</Link>
      </PageHero>

      <nav className="sv-jump section-inner" aria-label="Add-on groups">
        {ADDON_GROUPS.map((g) => <a key={g.id} href={`#${g.id}`}>{g.name}</a>)}
      </nav>

      {/* One section per group. The ids are literal so the site map can read them. */}
      <section data-aa-section="addons.found" className="sv-section g-raise" id="get-found">
        <Group index={0} />
      </section>
      <section data-aa-section="addons.pipeline" className="sv-section g-black" id="fill-the-pipeline">
        <Group index={1} />
      </section>
      <section data-aa-section="addons.decide" className="sv-section g-raise" id="decide-with-evidence">
        <Group index={2} />
      </section>
      <section data-aa-section="addons.custom" className="sv-section g-black" id="custom-builds">
        <Group index={3} />
      </section>

      <CtaBand
        headline="Not sure which add-on pays off first?"
        sub="Book a demo. We audit how you show up before the call and tell you which add-on, if any, is worth it now."
      />
      <Footer />
    </div>
  )
}

function Group({ index }: { index: number }) {
  const g = ADDON_GROUPS[index]
  return (
    <div className="section-inner">
      <SectionHead eyebrow="Add-ons" title={g.name} lede={g.lede} />
      <div className="sv-addon-details">
        {g.ids.map((id) => <Addon key={id} id={id} />)}
      </div>
    </div>
  )
}
