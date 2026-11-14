import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/icons'
import MaskingFigure from '@/components/site/MaskingFigure'
import Shot from '@/components/site/Shot'
import { Cta, FaqList, Head, JsonLd, faqJsonLd } from '@/components/site/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { PATHS, PRIVACY_CLAIMS as C, faq } from '@/lib/site'

/* /security: ONLY sentences from the platform's docs/security/privacy-claims.md
   "May say" table, word for word (lib/site PRIVACY_CLAIMS). Nothing from its
   "Must not say yet" table, and no claim about client isolation, retention or
   certification: none of those is on the list. Sign-in is described as single
   sign-on with Google or Microsoft, as Amit set it. When that file changes,
   change PRIVACY_CLAIMS in the same release. */

const NAME = 'Security and Privacy for Your Campaign Data'
const H1 = 'Security and privacy: how we protect your campaign data'
const DESCRIPTION =
  'Names and figures are masked before any analysis, data is encrypted in transit and at rest, and our analysis provider does not train on your data.'

const ANSWER =
  'Your names and values are masked before any analysis. Every request we send for analysis or drafting has your names replaced first, and a request that still carries a real name or figure is stopped. Data travels encrypted (HTTPS, TLS 1.2 or higher) everywhere, your data is encrypted at rest, and our analysis provider does not train on it.'

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
  alternates: { canonical: PATHS.security },
  ...social({ title: pageTitle(NAME), description: DESCRIPTION, path: PATHS.security }),
}

const FAQ = faq('security')

export default function SecurityPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_URL}${PATHS.security}`,
        url: `${SITE_URL}${PATHS.security}`,
        name: pageTitle(NAME),
        description: ANSWER,
        about: { '@id': `${SITE_URL}/#software` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      }} />
      <JsonLd data={faqJsonLd(FAQ)} />

      <section data-aa-section="security.hero" className="page-hero">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <div className="kicker">Security and privacy</div>
          <h1 className="h1">{H1}</h1>
          <p className="lede">{ANSWER}</p>
        </div>
      </section>

      <section data-aa-section="security.masking" id="masked" className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <MaskingFigure />
        </div>
      </section>

      <section data-aa-section="security.masked" className="sec">
        <div className="wrap">
          <Head kicker="Masked before analysis" title="Theia works from placeholders, not from your names." />
          <ul className="claims rv">
            <li><span className="label">Names</span><p>{C.r1}</p></li>
            <li><span className="label">Numbers</span><p>{C.r2}</p></li>
            <li><span className="label">Every request</span><p>{C.r4}</p></li>
            <li><span className="label">A last check</span><p>{C.r5}</p></li>
          </ul>
        </div>
      </section>

      <section data-aa-section="security.encrypted" id="encrypted" className="sec">
        <div className="wrap">
          <Head kicker="Encrypted" title="In transit, at rest, and again for credentials." />
          <ul className="claims rv">
            <li><span className="label">In transit</span><p>{C.r8}</p></li>
            <li><span className="label">At rest</span><p>{C.r9}</p></li>
            <li><span className="label">Credentials</span><p>{C.r10}</p></li>
            <li><span className="label">Backups</span><p>{C.r11}</p></li>
          </ul>
        </div>
      </section>

      <section data-aa-section="security.provider" id="provider" className="sec">
        <div className="wrap split">
          <div className="split-copy rv">
            <div className="kicker">Our analysis provider</div>
            <h2 className="h2">What leaves Axia Atlas for analysis, and what does not.</h2>
            <ul className="points">
              <li><span className="label">No names, no IDs</span><p>{C.r6}</p></li>
              <li><span className="label">No training</span><p>{C.r12}</p></li>
              <li><span className="label">Brand book</span><p>{C.r7}</p></li>
            </ul>
          </div>
          <figure className="figure rv">
            <div className="frame frame-flush"><Shot id="cu-thinking-steps" sizes="(max-width: 960px) 100vw, 720px" /></div>
            <figcaption>Theia at work. What Theia reads has been masked first.</figcaption>
          </figure>
        </div>
      </section>

      <section data-aa-section="security.signin" className="sec">
        <div className="wrap statement rv">
          <div className="kicker">Sign in</div>
          <h2 className="h2">Single sign-on with Google or Microsoft.</h2>
          <p className="lede">Your team signs in to the portal with the work account it already uses. Share a report with someone outside the team and you choose whether they can view or edit.</p>
          <div className="actions"><Link href={PATHS.platform} className="link-arrow">See the platform <Arrow className="arr" /></Link></div>
        </div>
      </section>

      <section data-aa-section="security.faq" className="sec">
        <div className="wrap">
          <Head kicker="Questions" title="About your data." />
          <FaqList items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <Cta data-aa-section="security.cta" lede="Ask us anything about how your data is handled. We walk through it on the demo." />
    </>
  )
}
