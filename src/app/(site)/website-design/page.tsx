import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import ShotSlot from '@/components/ShotSlot'
import { FaqList, JsonLd, PageHero, SectionHead, faqJsonLd } from '@/components/service/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { PATHS, faq } from '@/lib/site'

/* /website-design: websites as one-off projects, separate from the platform.
   No prices on the site (2026-11): every project is quoted on a call. */

const NAME = 'Website Design and Build as One-Off Projects'
const H1 = 'Website Design and Build for Issuers and Marketing Agencies'
const DESCRIPTION =
  'Axia Atlas designs and builds websites as one-off projects, separate from the analytics platform. No subscription needed. Book a demo for a quote.'

const ANSWER =
  'Axia Atlas designs and builds websites as one-off projects, separate from the analytics platform, so an issuer or agency can commission a site without a subscription. Each project covers positioning, copy, design and build, with search foundations laid from day one, and is quoted after a short call.'

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
  alternates: { canonical: PATHS.website },
  ...social({ title: pageTitle(NAME), description: DESCRIPTION, path: PATHS.website }),
}

const STEPS = [
  { n: '01', t: 'Positioning', d: 'What the site has to say, to whom, and what a visitor should do next. Agreed before anything is designed.' },
  { n: '02', t: 'Copy', d: 'Every page written in plain English, built around the questions your visitors actually ask.' },
  { n: '03', t: 'Design', d: 'A design in your brand, for desktop and phone, reviewed with you page by page.' },
  { n: '04', t: 'Build and launch', d: 'Fast pages, search foundations and structured data in place on launch day. Then the site is yours.' },
]

const FAQ = faq('websites')

export default function WebsiteDesignPage() {
  return (
    <div className="page sv-page">
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

      <PageHero data-aa-section="website.hero" eyebrow="Website design" title={H1} answer={ANSWER}>
        <Link href={PATHS.platform} className="btn-outline">See the platform</Link>
      </PageHero>

      <section data-aa-section="website.what" className="sv-section g-raise">
        <div className="section-inner px-split">
          <div>
            <SectionHead
              eyebrow="One project, one price"
              title="A website, designed and built, then handed over."
              lede="A project has a start, a finish and a quote agreed up front. Campaign sites for a raise, company sites, and landing pages for a single offer."
            />
            <ul className="px-points">
              <li><strong>No subscription.</strong> You do not need the platform to commission a site.</li>
              <li><strong>Yours on launch day.</strong> The site, the copy and the design files.</li>
              <li><strong>Built to be read.</strong> Search foundations and structured data from the first page.</li>
            </ul>
          </div>
          <ShotSlot id="website" />
        </div>
      </section>

      <section data-aa-section="website.steps" className="sv-section g-black">
        <div className="section-inner">
          <SectionHead eyebrow="How a project runs" title="Four steps from first call to launch." />
          <ol className="sv-steps">
            {STEPS.map((s) => (
              <li key={s.n} className="sv-step">
                <span className="sv-step-n">{s.n}</span>
                <div>
                  <h3 className="sv-step-title">{s.t}</h3>
                  <p className="sv-step-desc">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-aa-section="website.faq" className="sv-section g-raise">
        <div className="section-inner">
          <SectionHead eyebrow="Questions" title="About website projects." />
          <FaqList items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <CtaBand headline="Tell us about the site." sub="Book a call. We ask what the site has to do, then send a quote for the project." cta="Book a Demo" />
      <Footer />
    </div>
  )
}
