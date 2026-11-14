import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/icons'
import FilmSlot from '@/components/site/FilmSlot'
import Shot from '@/components/site/Shot'
import ThinkingMark from '@/components/site/ThinkingMark'
import PinnedStage from '@/components/site/PinnedStage'
import AskTheiaMock from '@/components/mocks/AskTheiaMock'
import ReportsMock from '@/components/mocks/ReportsMock'
import ShareMock from '@/components/mocks/ShareMock'
import { Cta, FaqList, JsonLd, faqJsonLd } from '@/components/site/Blocks'
import { social, SITE_URL } from '@/lib/seo'
import { PATHS, PRIVACY_CLAIMS, PRODUCTS, faq } from '@/lib/site'

/* ════════════════════════════════════════════════════════════════════════════
   /theia: THE CANONICAL PAGE FOR THEIA.

   Amit's own design for this page has not arrived yet. Built toward the
   reference he named (Apple's Apple Intelligence page): very large type, one
   capability per screen, the product filling the frame, a stage that stays
   pinned while the words change, short lines, almost no chrome. Pack screens
   are used here only for Theia's interface.

   TITLE AND DESCRIPTION are shared with theia.axiaatlas.com, whose landing
   canonicalizes to this page (platform docs/theia/LANDING.md). The title is
   that file's word for word; it is the one page outside the site's
   "<keyword> - Axia Atlas" title format, on purpose.
   ════════════════════════════════════════════════════════════════════════════ */

const TITLE = 'Theia: Everything in sight | Axia Atlas'
const DESCRIPTION =
  'Theia is the proprietary AI-powered analysis assistant in Axia Atlas investment campaign dashboards. Theia Reports and Ask Theia explain your numbers every day and recommend what to review next.'

const ANSWER =
  'Theia is our proprietary AI-powered analysis assistant, built into Axia Atlas. Ask anything about your campaigns and your raise and get the reason in seconds: what changed, the numbers behind it, and what we recommend. Theia also builds your weekly and monthly investor reports in your brand.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATHS.theia },
  ...social({ title: TITLE, description: DESCRIPTION, path: PATHS.theia }),
}

const FAQ = faq('theia', 'analyst', 'roas', 'reports', 'security')

export default function TheiaPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SoftwareApplication',
            '@id': `${SITE_URL}${PATHS.theia}#software`,
            name: 'Theia',
            alternateName: 'Theia by Axia Atlas',
            url: `${SITE_URL}${PATHS.theia}`,
            description: ANSWER,
            applicationCategory: 'BusinessApplication',
            applicationSubCategory: 'Analytics assistant',
            operatingSystem: 'Web browser',
            featureList: [PRODUCTS.ask, PRODUCTS.reports],
            isPartOf: { '@id': `${SITE_URL}/#software` },
            publisher: { '@id': `${SITE_URL}/#organization` },
            provider: { '@id': `${SITE_URL}/#organization` },
          },
        ],
      }} />
      <JsonLd data={faqJsonLd(FAQ.map((f) => ({ q: f.q, a: f.a })))} />

      <section data-aa-section="theia.hero" className="th-hero">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <ThinkingMark size={72} />
          <h1 className="h1">Theia: everything in sight, explained.</h1>
          <p className="lede">{ANSWER}</p>
          <div className="actions">
            <Link href={PATHS.demo} className="btn btn-ink">Book a demo <Arrow className="arr" /></Link>
            <Link href="#ask" className="btn btn-quiet">Watch Theia answer</Link>
          </div>
        </div>
      </section>

      <section data-aa-section="theia.product" className="th-full">
        <figure className="figure rv">
          <div className="frame frame-flush"><Shot id="theia-home" priority sizes="100vw" /></div>
          <figcaption>Theia in the Axia Atlas portal.</figcaption>
        </figure>
      </section>

      <section data-aa-section="theia.line" className="th-chapter">
        <div className="wrap rv">
          <p className="th-line th-line-center">Ask anything. <span className="dim">Get the reason, not a chart to read.</span></p>
        </div>
      </section>

      <section className="sec-flush-top th-chapter">
        <div className="wrap">
          <PinnedStage
            mark="theia.capabilities"
            steps={[
              {
                id: 'ask',
                kicker: PRODUCTS.ask,
                title: 'Ask in your own words.',
                body: 'Why did our click rate fall? Which channel brings investors for the least? Theia reads every platform and the raise itself, then answers under four headings: what happened, where, why, and what we recommend.',
                stage: <FilmSlot id="ask-theia"><AskTheiaMock /></FilmSlot>,
              },
              {
                id: 'reports',
                kicker: PRODUCTS.reports,
                title: 'The report builds itself.',
                body: 'Weekly and monthly investor decks from live campaign and raise data, in your brand. Theia flags the slide worth a look before the board meeting.',
                stage: <FilmSlot id="theia-reports"><ReportsMock /></FilmSlot>,
              },
              {
                kicker: 'Share',
                title: 'One link to the board.',
                body: 'Choose who can view and who can edit, then copy the link.',
                stage: <ShareMock />,
              },
            ]}
          />
        </div>
      </section>

      <section data-aa-section="theia.work" className="th-full th-chapter">
        <figure className="figure rv">
          <div className="frame frame-flush"><Shot id="theia-thinking" sizes="100vw" /></div>
          <figcaption>Theia shows each step while it works.</figcaption>
        </figure>
      </section>

      <section data-aa-section="theia.principle" className="th-chapter">
        <div className="wrap rv">
          <p className="th-line th-line-center">Theia recommends. <span className="dim">You decide.</span></p>
          <p className="lede th-sub">Theia says what we recommend reviewing and why. You and your media buyer decide what happens next, and our analysts are there whenever you want a person.</p>
        </div>
      </section>

      <section data-aa-section="theia.library" className="th-full">
        <figure className="figure rv">
          <div className="frame frame-flush"><Shot id="theia-library" sizes="100vw" /></div>
          <figcaption>Everything Theia builds stays in your Library.</figcaption>
        </figure>
      </section>

      <section data-aa-section="theia.privacy" className="th-chapter">
        <div className="wrap trust">
          <div className="rv">
            <div className="kicker">Your data</div>
            <h2 className="h2">{PRIVACY_CLAIMS.r3}</h2>
            <div className="actions actions-gap"><Link href={PATHS.security} className="link-arrow">Security and privacy <Arrow className="arr" /></Link></div>
          </div>
          <ul className="claims claims-1 rv">
            <li><span className="label">Names</span><p>{PRIVACY_CLAIMS.r1}</p></li>
            <li><span className="label">Numbers</span><p>{PRIVACY_CLAIMS.r2}</p></li>
            <li><span className="label">A last check</span><p>{PRIVACY_CLAIMS.r5}</p></li>
            <li><span className="label">Training</span><p>{PRIVACY_CLAIMS.r12}</p></li>
          </ul>
        </div>
      </section>

      <section data-aa-section="theia.faq" className="sec sec-flush-top">
        <div className="wrap faq-split">
          <div className="rv">
            <div className="kicker">Questions</div>
            <h2 className="h2">About Theia.</h2>
          </div>
          <FaqList items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <Cta data-aa-section="theia.cta" lede="Watch Theia answer questions about a demo raise and build its investor report, then talk through your own." />
    </>
  )
}
