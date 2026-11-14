import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/icons'
import FilmSlot from '@/components/site/FilmSlot'
import Shot from '@/components/site/Shot'
import ThinkingMark from '@/components/site/ThinkingMark'
import AskTheiaMock from '@/components/mocks/AskTheiaMock'
import ReportsMock from '@/components/mocks/ReportsMock'
import ShareMock from '@/components/mocks/ShareMock'
import { Cta, FaqList, Head, JsonLd, faqJsonLd } from '@/components/site/Blocks'
import { social, SITE_URL } from '@/lib/seo'
import { PATHS, PRIVACY_CLAIMS, PRODUCTS, faq } from '@/lib/site'

/* ════════════════════════════════════════════════════════════════════════════
   /theia: THE CANONICAL PAGE FOR THEIA.

   Designed from the intent of Amit's "Theia Website" draft, not its layout:
   the real product in the hero, then Ask Theia and Theia Reports each played
   as a mock interaction on sample data, close-ups from the design pack, and
   what happens to your data. The draft's sections, cards and words are not
   reused.

   TITLE AND DESCRIPTION are shared with theia.axiaatlas.com, whose landing
   canonicalizes to this page (platform docs/theia/LANDING.md). The title is
   that file's word for word; it is the one page outside the site's
   "<keyword> - Axia Atlas" title format, on purpose.
   ════════════════════════════════════════════════════════════════════════════ */

const TITLE = 'Theia: Everything in sight | Axia Atlas'
const DESCRIPTION =
  'Theia is the proprietary AI-powered analysis assistant in Axia Atlas investment campaign dashboards. Theia Reports and Ask Theia explain your numbers every day and recommend what to review next.'

const ANSWER =
  'Theia is our proprietary AI-powered analysis assistant, built into Axia Atlas. With Ask Theia, you ask anything about your campaigns and your raise and get the answer in seconds: what changed, the numbers behind it, and what we recommend. With Theia Reports, your weekly and monthly investor decks build themselves in your brand.'

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

      <section data-aa-section="theia.hero" className="page-hero page-hero-center">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <ThinkingMark size={88} className="page-hero-mark" />
          <div className="kicker">Theia</div>
          <h1 className="h1">Theia: Everything in Sight, Asked and Answered</h1>
          <p className="lede">{ANSWER}</p>
          <div className="actions">
            <Link href={PATHS.demo} className="btn btn-ink">Book a demo <Arrow className="arr" /></Link>
            <Link href="#ask" className="btn btn-quiet">Watch her answer</Link>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 'clamp(48px, 7vw, 88px)' }}>
          <figure className="figure rv">
            <div className="frame frame-flush"><Shot id="theia-home" priority sizes="(max-width: 1300px) 100vw, 1240px" /></div>
            <figcaption>Theia in the portal. The names on screen are sample people.</figcaption>
          </figure>
        </div>
      </section>

      <section data-aa-section="theia.ask" id="ask" className="sec">
        <div className="wrap">
          <Head
            kicker={PRODUCTS.ask}
            title="Ask in your own words. Get the why."
            lede="Ask anything about your campaigns and your raise. Theia reads across every platform and the raise itself, then answers with what happened, where, why, and what we recommend."
          />
          <div className="rv">
            <FilmSlot id="ask-theia"><AskTheiaMock /></FilmSlot>
          </div>
        </div>
      </section>

      <section data-aa-section="theia.ask-detail" className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap strip strip-2">
          <figure className="figure rv">
            <div className="frame frame-flush"><Shot id="cu-thinking-steps" sizes="(max-width: 860px) 100vw, 620px" /></div>
            <figcaption>She shows her work while she thinks.</figcaption>
          </figure>
          <figure className="figure rv" style={{ ['--d' as string]: '90ms' }}>
            <div className="frame frame-flush"><Shot id="theia-answer" sizes="(max-width: 860px) 100vw, 620px" /></div>
            <figcaption>Every answer ends with what we recommend, then the next question worth asking.</figcaption>
          </figure>
        </div>
      </section>

      <section data-aa-section="theia.principle" className="sec">
        <div className="wrap statement rv">
          <div className="kicker">How she speaks</div>
          <h2 className="h2">She recommends. She never instructs.</h2>
          <p className="lede">Theia says what we recommend reviewing and why. You and your media buyer decide what happens next, and our analysts are there whenever you want a person.</p>
        </div>
      </section>

      <section data-aa-section="theia.reports" id="reports" className="sec">
        <div className="wrap">
          <Head
            kicker={PRODUCTS.reports}
            title="Press play. The report builds itself."
            lede="Weekly and monthly investor decks, built from live campaign and raise data, in your brand. Theia flags the slides that matter most that week, so you review and present instead of assembling."
          />
          <div className="rv">
            <FilmSlot id="theia-reports"><ReportsMock /></FilmSlot>
          </div>
        </div>
      </section>

      <section data-aa-section="theia.reports-detail" className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap gallery">
          <figure className="figure rv">
            <div className="frame frame-flush"><Shot id="theia-comment" sizes="(max-width: 860px) 100vw, 760px" /></div>
            <figcaption>Leave a comment on any slide and send it to Theia to revise.</figcaption>
          </figure>
          <div className="gallery-side">
            <figure className="figure rv" style={{ ['--d' as string]: '90ms' }}>
              <div className="frame frame-flush"><Shot id="theia-scheduled" sizes="(max-width: 860px) 100vw, 480px" /></div>
              <figcaption>Weekly and monthly reports run on a schedule.</figcaption>
            </figure>
            <figure className="figure rv" style={{ ['--d' as string]: '180ms' }}>
              <div className="frame frame-flush"><Shot id="theia-library" sizes="(max-width: 860px) 100vw, 480px" /></div>
              <figcaption>Everything she builds stays in your Library.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section data-aa-section="theia.share" className="sec">
        <div className="wrap split split-rev">
          <div className="split-copy rv">
            <div className="kicker">Share</div>
            <h2 className="h2">One link to the board.</h2>
            <p className="lede">Share a finished report with the people who need it. Choose who can view and who can edit, then copy the link.</p>
          </div>
          <div className="rv"><ShareMock /></div>
        </div>
      </section>

      <section data-aa-section="theia.privacy" className="sec">
        <div className="wrap">
          <Head kicker="Your data" title={PRIVACY_CLAIMS.r3} />
          <ul className="claims rv">
            <li><span className="label">Names</span><p>{PRIVACY_CLAIMS.r1}</p></li>
            <li><span className="label">Numbers</span><p>{PRIVACY_CLAIMS.r2}</p></li>
            <li><span className="label">A last check</span><p>{PRIVACY_CLAIMS.r5}</p></li>
            <li><span className="label">Training</span><p>{PRIVACY_CLAIMS.r12}</p></li>
          </ul>
          <div className="actions rv" style={{ marginTop: 32 }}><Link href={PATHS.security} className="link-arrow">Security and privacy <Arrow className="arr" /></Link></div>
        </div>
      </section>

      <section data-aa-section="theia.faq" className="sec">
        <div className="wrap">
          <Head kicker="Questions" title="About Theia." />
          <FaqList items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <Cta data-aa-section="theia.cta" lede="Watch Theia answer questions about a demo raise and build its investor report, then talk through your own." />
    </>
  )
}
