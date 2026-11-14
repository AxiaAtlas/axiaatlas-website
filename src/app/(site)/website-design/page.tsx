import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/icons'
import { Cta, FaqList, Head, JsonLd, faqJsonLd } from '@/components/site/Blocks'
import { SiteAddons, SiteSteps, SiteTierCards } from '@/components/site/SiteTiers'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { PATHS, faq } from '@/lib/site'

/* /website-design: websites as one-off projects, separate from the platform.
   No prices on the site: every project is quoted on a call. There is no
   website work in the design pack, so this page is designed in type alone
   rather than with a placeholder frame. */

const NAME = 'Website Design and Build as One-Off Projects'
const H1 = 'Website design and build for issuers and marketing agencies'
const DESCRIPTION =
  'Axia Atlas designs and builds websites as one-off projects, separate from the analytics platform. No subscription needed. Projects from $3,500.'
const ANSWER =
  'Axia Atlas designs and builds websites as one-off projects, separate from the analytics platform, so an issuer or agency can commission a site without a subscription. Each project covers positioning, copy, design and build, with search foundations laid from day one. Projects run from $3,500 for a Starter Site to $10,000 for an Authority Site.'

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
  alternates: { canonical: PATHS.website },
  ...social({ title: pageTitle(NAME), description: DESCRIPTION, path: PATHS.website }),
}

const KINDS = [
  { k: 'For a raise', t: 'Campaign sites', d: 'The story, the terms and the way to invest, on one site built to be shared.' },
  { k: 'For a company', t: 'Company sites', d: 'What you do, for whom, and why it matters, for investors, customers and hires.' },
  { k: 'For one offer', t: 'Landing pages', d: 'One page, one message, one next step, for a single campaign.' },
]

const FAQ = faq('websites')

export default function WebsiteDesignPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${SITE_URL}${PATHS.website}#service`,
        name: 'Website design and build',
        serviceType: 'Website design',
        url: `${SITE_URL}${PATHS.website}`,
        description: ANSWER,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'United States' },
      }} />
      <JsonLd data={faqJsonLd(FAQ.map((f) => ({ q: f.q, a: f.a })))} />

      <section data-aa-section="website.hero" className="page-hero">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <div className="kicker">Websites</div>
          <h1 className="h1">{H1}</h1>
          <p className="lede">{ANSWER}</p>
          <div className="actions">
            <Link href={PATHS.demo} className="btn btn-ink">Book a demo <Arrow className="arr" /></Link>
            <Link href={PATHS.platform} className="btn btn-quiet">See the platform</Link>
          </div>
        </div>
      </section>

      <section data-aa-section="website.what" className="sec-tight">
        <div className="wrap">
          <Head kicker="What we build" title="A website, designed and built, then handed over." />
          <div className="trio">
            {KINDS.map((k, i) => (
              <div key={k.t} className="rv" style={{ ['--d' as string]: `${i * 90}ms` }}>
                <div className="label">{k.k}</div>
                <h3 className="h3">{k.t}</h3>
                <p>{k.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-aa-section="website.tiers" className="band">
        <div className="wrap">
          <Head kicker="Three tiers" title="Pick the size of the site. The price is the price." />
          <SiteTierCards />
          <div className="block-gap">
            <div className="split-head rv"><div className="kicker">Add-ons</div></div>
            <SiteAddons />
          </div>
        </div>
      </section>

      <section data-aa-section="website.steps" className="sec">
        <div className="wrap">
          <Head kicker="How a project runs" title="Four steps from first call to launch." />
          <SiteSteps />
        </div>
      </section>

      <section data-aa-section="website.terms" className="sec">
        <div className="wrap statement rv">
          <div className="kicker">No subscription</div>
          <h2 className="h2">Yours on launch day. The site, the copy and the design files.</h2>
          <p className="lede">You do not need the platform to commission a site. If you run a raise, the site and Axia Atlas work well together, but each stands on its own.</p>
        </div>
      </section>

      <section data-aa-section="website.faq" className="sec">
        <div className="wrap">
          <Head kicker="Questions" title="About website projects." />
          <FaqList items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <Cta data-aa-section="website.cta" lede="Tell us what the site has to do. We start with a short call." />
    </>
  )
}
