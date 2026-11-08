import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { Arrow, ServiceIcons } from '@/components/icons'
import { PageHero, SectionHead, JsonLd } from '@/components/service/Blocks'
import FragmentForward from './FragmentForward'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { THEIA_LAUNCH } from '@/lib/flags'
import { ADDON_GROUPS, ADDON_IDS, PORTAL_PATH, serviceHref, serviceName, type ServiceId } from '@/lib/services'
import { ADDON_BLURB } from '@/lib/service-copy'
import { fromPrice, money, range } from '@/lib/pricing'

/* ── THE SERVICES HUB ────────────────────────────────────────────────────────
   Kept at /services so the URL keeps its ranking. It is a short map now: the
   headline services, then the add-ons by group, each linking to its page or
   anchor. The Portal joins the headline cards at the Theia launch. */

const TITLE = 'Marketing Services and Add-Ons Overview'
const H1 = 'Every Axia Atlas Service, From Website Builds to Advisory'

const [WEB_LO] = range('website', 'oneTime')
const [SOCIAL_LO] = range('social', 'monthly')

const ANSWER =
  'Axia Atlas builds websites and runs social media for growing businesses, then adds focused services where they pay off: ' +
  'search and answer engines, local, leads, competitor research, advisory and custom dashboards. ' +
  `Websites start at ${money(WEB_LO)} one-time and social media at ${money(SOCIAL_LO)} a month.`

const DESCRIPTION =
  `Website design and build from ${money(WEB_LO)}, social media management from ${money(SOCIAL_LO)} a month, and add-ons for search, local, leads, research, advisory and dashboards.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/services' },
  ...social({ title: pageTitle(TITLE), description: DESCRIPTION, path: '/services' }),
}

type Card = { key: string; icon: string; name: string; desc: string; price: string; href: string }

const HEADLINE: Card[] = [
  ...(THEIA_LAUNCH
    ? [{ key: 'portal', icon: 'dashboards', name: 'The Client Portal', desc: 'One login for your results, approvals and reports, with Theia by Axia Atlas built in.', price: 'Pricing on request', href: PORTAL_PATH }]
    : []),
  { key: 'website', icon: 'website', name: serviceName('website'), desc: 'Positioning, copy, design and build in one engagement, with search foundations laid from day one and an optional care plan after launch.', price: fromPrice('website'), href: serviceHref('website') },
  { key: 'social', icon: 'social', name: serviceName('social'), desc: 'Two or three platforms, one voice, content made for each, published on a plan and answered in the comments.', price: fromPrice('social'), href: serviceHref('social') },
]

const LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/services#catalog`,
  name: 'Axia Atlas services',
  numberOfItems: HEADLINE.length + ADDON_IDS.length,
  itemListElement: [
    ...HEADLINE.map((c) => ({ name: c.name, url: c.href })),
    ...ADDON_IDS.map((id) => ({ name: serviceName(id), url: serviceHref(id) })),
  ].map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: { '@type': 'Service', name: s.name, url: `${SITE_URL}${s.url}`, provider: { '@id': `${SITE_URL}/#organization` } },
  })),
}

export default function ServicesPage() {
  return (
    <div className="page sv-page">
      <JsonLd data={LD} />
      <FragmentForward />

      <PageHero section="services.hero" eyebrow="Services" title={H1} answer={ANSWER}>
        <Link href="/pricing" className="btn-outline">See pricing</Link>
      </PageHero>

      <section data-aa-section="services.headline" className="sv-section g-raise">
        <div className="section-inner">
          <SectionHead eyebrow="Headline services" title="Where Most Clients Start" />
          <div className={`sv-cards sv-cards-${HEADLINE.length}`}>
            {HEADLINE.map((c) => {
              const Icon = ServiceIcons[c.icon]
              return (
                <Link key={c.key} href={c.href} className="sv-card">
                  <span className="service-icon">{Icon && <Icon />}</span>
                  <h3 className="sv-card-name">{c.name}</h3>
                  <p className="sv-card-desc">{c.desc}</p>
                  <span className="sv-card-price">{c.price}</span>
                  <span className="service-link">Learn more <Arrow className="arr" /></span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section data-aa-section="services.addons" className="sv-section g-black">
        <div className="section-inner">
          <SectionHead
            eyebrow="Add-ons"
            title="Add-Ons, Grouped by the Job You Need Done"
            lede="Each add-on is priced on its own tiers and can be added to a website or social engagement when it pays off."
          />
          <div className="sv-groups">
            {ADDON_GROUPS.map((g) => (
              <div key={g.id} className="sv-group">
                <h3 className="sv-group-name"><Link href={`/services/add-ons#${g.id}`}>{g.name}</Link></h3>
                <p className="sv-group-lede">{g.lede}</p>
                <ul className="sv-group-list">
                  {g.ids.map((id: ServiceId) => (
                    <li key={id}>
                      <Link href={serviceHref(id)}>{serviceName(id)}</Link>
                      <span>{ADDON_BLURB[id as keyof typeof ADDON_BLURB]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        headline="Not sure where to start?"
        sub="Book a demo. We audit how you show up today before the call, then tell you which service will pay off first."
      />
      <Footer />
    </div>
  )
}
