import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import PortalShot from '@/components/PortalShot'
import InfraStrip from '@/components/artifacts/InfraStrip'
import { Arrow } from '@/components/icons'
import { PageHero, SectionHead, JsonLd } from '@/components/service/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { THEIA_LAUNCH } from '@/lib/flags'
import { PORTAL_PATH, THEIA_PATH } from '@/lib/services'

/* ── THE CLIENT PORTAL (Theia launch) ────────────────────────────────────────
   404 until NEXT_PUBLIC_THEIA_LAUNCH is "true" (lib/flags). No price is
   printed: the portal has no figure in the platform yet, so the page says
   "Pricing on request" rather than invent one. */

const TITLE = 'Client Portal for Marketing and Reporting'
const H1 = 'One Client Portal for Your Results, Approvals and Reports'

const ANSWER =
  'The Axia Atlas client portal is one login for everything we do together: your results across search, social and your website, ' +
  'the work waiting for your approval, and your reports. It includes Theia by Axia Atlas, a private assistant that helps you ' +
  'understand your data and build your own reports from it.'

const DESCRIPTION = 'One login for your marketing results, approvals and reports, with Theia by Axia Atlas built in. Pricing on request.'

export const metadata: Metadata = THEIA_LAUNCH
  ? { title: TITLE, description: DESCRIPTION, alternates: { canonical: PORTAL_PATH }, ...social({ title: pageTitle(TITLE), description: DESCRIPTION, path: PORTAL_PATH }) }
  : { robots: { index: false, follow: false } }

const FEATURES = [
  { title: 'Results in one place', desc: 'Search rankings, answer engine citations, social performance and website enquiries, side by side and kept current.' },
  { title: 'Approvals and proofing', desc: 'Every post, page and article waits for your approval before it goes live. Comment on it, request a change, or approve it in one click.' },
  { title: 'Reports you can read', desc: 'Reports written in plain English on the cadence your plan sets, with every past report kept.' },
  { title: 'Your ad results, beside the rest', desc: 'An ad campaign dashboard shows how the ads you run are performing next to everything else. We never run or manage the ads.' },
  { title: 'Your contacts', desc: 'Every form and chat enquiry from your website lands in your own contact list.' },
  { title: 'Theia by Axia Atlas', desc: 'Ask about your results in plain English and build your own reports, decks and plans from your data.' },
]

export default function PortalPage() {
  if (!THEIA_LAUNCH) notFound()
  return (
    <div className="page sv-page">
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Service', '@id': `${SITE_URL}${PORTAL_PATH}#service`,
        name: 'Axia Atlas Client Portal', url: `${SITE_URL}${PORTAL_PATH}`, description: ANSWER,
        provider: { '@id': `${SITE_URL}/#organization` }, areaServed: { '@type': 'Country', name: 'United States' },
      }} />

      <PageHero section="portal.hero" eyebrow="The Client Portal" title={H1} answer={ANSWER} />

      <section data-aa-section="portal.features" className="sv-section g-raise">
        <div className="section-inner">
          <SectionHead eyebrow="What is inside" title="Everything We Do Together, Behind One Login" />
          <div className="sv-cards sv-cards-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="sv-card sv-card-static">
                <h3 className="sv-card-name">{f.title}</h3>
                <p className="sv-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="sv-figure sv-figure-wide" aria-hidden="true"><PortalShot /></div>
        </div>
      </section>

      <section data-aa-section="portal.theia" className="sv-section g-spruce">
        <div className="section-inner sv-note">
          <SectionHead
            eyebrow="Built in"
            title="Theia by Axia Atlas Lives Inside Your Portal"
            lede="Theia is our proprietary assistant. She answers questions from your own data and helps you build your own reports, decks and plans from it. She lives only inside your portal and knows only your business."
          />
          <Link href={THEIA_PATH} className="service-link">Meet Theia <Arrow className="arr" /></Link>
        </div>
      </section>

      <section data-aa-section="portal.security" className="sv-section g-black">
        <div className="section-inner">
          <SectionHead
            eyebrow="Security"
            title="Your Data Is Scoped to Your Business Alone"
            lede="Each client's data is kept to that client. Nobody else's portal, and nobody else's Theia, can read it."
          />
          <InfraStrip />
        </div>
      </section>

      <section data-aa-section="portal.pricing" className="sv-section g-raise">
        <div className="section-inner sv-note">
          <h2 className="section-headline">Portal Pricing</h2>
          <div className="sv-tier-amount">Pricing on request</div>
          <p className="sv-lede">Book a demo and we will walk you through the portal with your own business in mind.</p>
        </div>
      </section>

      <CtaBand headline="See the portal for yourself." sub="Book a demo. We audit how you show up before the call, then show you the portal with your results in mind." />
      <Footer />
    </div>
  )
}
