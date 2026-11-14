import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/icons'
import FilmSlot from '@/components/site/FilmSlot'
import LiveMock from '@/components/mocks/LiveMock'
import LedgerMock from '@/components/mocks/LedgerMock'
import ShareMock from '@/components/mocks/ShareMock'
import { Cta, FaqList, Head, JsonLd, faqJsonLd } from '@/components/site/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { PATHS, PRODUCTS, faq } from '@/lib/site'

const NAME = 'Investment Campaign Analytics Platform'
const DESCRIPTION =
  'Live Campaigns puts every ad platform in one live view. Raise Ledger sets every dollar behind the raise against the investors it brought. Investment campaign analytics by Axia Atlas.'
const ANSWER =
  'Axia Atlas is one platform with two views of your raise. Live Campaigns brings every ad platform and campaign into one live dashboard. Raise Ledger sets every dollar behind the raise, from ads to affiliates, print and press, against the investments your raise platform reports, so cost per investor is clear for each channel.'

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
  alternates: { canonical: PATHS.platform },
  ...social({ title: pageTitle(NAME), description: DESCRIPTION, path: PATHS.platform }),
}

const FAQ = faq('channels', 'cost-per-investor', 'why-not-raise-platform', 'ads', 'agencies')

const SOURCES = [
  { k: 'Live', t: 'Connected ad platforms', d: 'Spend, clicks and results are read from each platform you connect, down to the campaign, the creative and the audience.' },
  { k: 'Live', t: 'Your raise platform', d: 'The investments come from the platform that records them, so every channel is measured against the raise itself.' },
  { k: 'Manual', t: 'Everything else', d: 'Affiliates, newspapers and press are entered by hand or imported from a file, so nothing behind the raise is left out.' },
]

export default function PlatformPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_URL}${PATHS.platform}`,
        url: `${SITE_URL}${PATHS.platform}`,
        name: pageTitle(NAME),
        description: ANSWER,
        about: { '@id': `${SITE_URL}/#software` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      }} />
      <JsonLd data={faqJsonLd(FAQ)} />

      <section data-aa-section="platform.hero" className="page-hero page-hero-center">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <div className="kicker">The platform</div>
          <h1 className="h1">The Investment Campaign Analytics Platform</h1>
          <p className="lede">{ANSWER}</p>
          <div className="actions">
            <Link href={PATHS.demo} className="btn btn-ink">Book a demo <Arrow className="arr" /></Link>
            <Link href="#raise-ledger" className="btn btn-quiet">Go to {PRODUCTS.ledger}</Link>
          </div>
        </div>
      </section>

      <section data-aa-section="platform.live" id="live-campaigns" className="sec-tight">
        <div className="wrap">
          <Head
            kicker={PRODUCTS.live}
            title="All spend, in one place."
            lede="Every ad platform and every campaign in one live dashboard. Start from the total, then filter to a channel, a campaign or a creative. Every chart opens, zooms and exports."
          />
          <div className="rv">
            <FilmSlot id="live-campaigns"><LiveMock /></FilmSlot>
          </div>
        </div>
      </section>

      <section data-aa-section="platform.sources" className="sec">
        <div className="wrap">
          <Head kicker="Where the numbers come from" title="Read live where it can be. Entered by hand where it cannot." />
          <div className="trio">
            {SOURCES.map((s, i) => (
              <div key={s.t} className="rv" style={{ ['--d' as string]: `${i * 90}ms` }}>
                <span className={`badge ${s.k === 'Live' ? 'badge-live' : 'badge-manual'}`}>{s.k}</span>
                <h3 className="h3">{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-aa-section="platform.ledger" id="raise-ledger" className="sec">
        <div className="wrap">
          <Head
            kicker={PRODUCTS.ledger}
            title="Every dollar against every investor."
            lede="Raise Ledger sets all the spend behind the raise against the investments it brought. Cost per investor and return, channel by channel, while there is still budget to move."
          />
          <div className="rv">
            <FilmSlot id="raise-ledger"><LedgerMock /></FilmSlot>
          </div>
          <ul className="points rv" style={{ marginTop: 48, maxWidth: 880 }}>
            <li><span className="label">Live and Manual</span><p>A Live badge means the figures are read from a connected platform. A Manual badge means your team entered them or imported a file.</p></li>
            <li><span className="label">The funnel</span><p>Visits, people who started investing, and investors, with the rate between each step.</p></li>
            <li><span className="label">Per channel</span><p>Spend, investors and cost per investor for every channel, sorted so the outliers stand out.</p></li>
          </ul>
        </div>
      </section>

      <section data-aa-section="platform.share" className="sec">
        <div className="wrap split">
          <div className="split-copy rv">
            <div className="kicker">Share</div>
            <h2 className="h2">Send the board a link, not a spreadsheet.</h2>
            <p className="lede">Share any dashboard or report with the people who need it. Choose who can view and who can edit, then copy the link.</p>
            <ul className="points">
              <li><span className="label">Sign in</span><p>Single sign-on with Google or Microsoft.</p></li>
              <li><span className="label">Agencies</span><p>Each client has a workspace of its own, and its own reports in its own brand.</p></li>
            </ul>
          </div>
          <div className="rv"><ShareMock /></div>
        </div>
      </section>

      <section data-aa-section="platform.theia" className="sec">
        <div className="wrap statement rv">
          <div className="kicker">Theia, built in</div>
          <h2 className="h2">Every view comes with someone to ask.</h2>
          <p className="lede">Theia, our proprietary AI-powered analysis assistant, reads the same numbers you see. Ask her why a number moved, or have her build the investor report.</p>
          <div className="actions"><Link href={PATHS.theia} className="link-arrow">Meet Theia <Arrow className="arr" /></Link></div>
        </div>
      </section>

      <section data-aa-section="platform.faq" className="sec">
        <div className="wrap">
          <Head kicker="Questions" title="About the platform." />
          <FaqList items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <Cta data-aa-section="platform.cta" lede="See Live Campaigns and Raise Ledger on a demo raise, then talk through your own channels." />
    </>
  )
}
