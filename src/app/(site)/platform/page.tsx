import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/icons'
import FilmSlot from '@/components/site/FilmSlot'
import ProofBand from '@/components/site/ProofBand'
import LiveMock from '@/components/mocks/LiveMock'
import LedgerMock from '@/components/mocks/LedgerMock'
import ShareMock from '@/components/mocks/ShareMock'
import { Cta, FaqList, Head, JsonLd, faqJsonLd } from '@/components/site/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { PATHS, PRIVACY_CLAIMS, PRODUCTS, faq } from '@/lib/site'

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
  { k: 'Live', t: 'Connected ad platforms', d: 'Meta Ads, Google Ads and LinkedIn Ads are read live, down to the campaign, the ad set and the ad.' },
  { k: 'Live', t: 'Your raise platform', d: 'DealMaker is read live. StartEngine, Republic, Wefunder and others are read from the export you download.' },
  { k: 'Manual', t: 'Everything else', d: 'Affiliates, newspapers, press and other ad platforms are imported from a file or entered by hand.' },
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

      <section data-aa-section="platform.hero" className="hero2">
        <div className="glow" aria-hidden="true" />
        <div className="wrap hero2-grid">
          <div className="hero2-copy">
            <div className="kicker">The platform</div>
            <h1 className="h1 platform-h1">The investment campaign analytics platform</h1>
            <p className="lede">{ANSWER}</p>
            <div className="actions">
              <Link href={PATHS.demo} className="btn btn-ink">Book a demo <Arrow className="arr" /></Link>
              <Link href="#raise-ledger" className="btn btn-quiet">Go to {PRODUCTS.ledger}</Link>
            </div>
          </div>
          <div className="hero2-stage" id="live-campaigns">
            <FilmSlot id="live-campaigns"><LiveMock /></FilmSlot>
          </div>
        </div>
      </section>

      <ProofBand mark="platform.proof" claim={PRIVACY_CLAIMS.r3} />

      <section data-aa-section="platform.live" className="sec">
        <div className="wrap trust">
          <div className="rv">
            <div className="kicker">{PRODUCTS.live}</div>
            <h2 className="h2">All spend, in one place, while it is still running.</h2>
            <p className="lede">Start from the total across every channel, then filter to one platform, one campaign or one creative. Every chart opens, zooms and exports.</p>
          </div>
          <ul className="claims claims-1 rv">
            <li><span className="label">One view</span><p>Spend, clicks and results from every connected platform, on one timeline.</p></li>
            <li><span className="label">Drill down</span><p>From the total to a channel, a campaign and the creative behind it.</p></li>
            <li><span className="label">Worth a look</span><p>Diagnostics point at what changed, so you know where to start reading.</p></li>
          </ul>
        </div>
      </section>

      <section data-aa-section="platform.sources" className="sec sec-flush-top">
        <div className="wrap">
          <div className="split-head rv">
            <div className="kicker">Where the numbers come from</div>
          </div>
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

      <section data-aa-section="platform.ledger" id="raise-ledger" className="band">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <div className="band-head rv">
            <div className="kicker">{PRODUCTS.ledger}</div>
            <h2 className="h2">Every dollar against every investor.</h2>
            <p className="lede">Raise Ledger sets all the spend behind the raise against the investments it brought. Cost per investor, channel by channel, while there is still budget to move.</p>
          </div>
          <div className="rv band-stage">
            <FilmSlot id="raise-ledger"><LedgerMock /></FilmSlot>
          </div>
          <ul className="claims rv claims-gap">
            <li><span className="label">Live and Manual</span><p>A Live badge means the figures are read from a connected platform. A Manual badge means your team entered them or imported a file.</p></li>
            <li><span className="label">The funnel</span><p>Visits, people who started investing and investors, with the rate between each step.</p></li>
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

      <section data-aa-section="platform.theia" className="sec sec-flush-top">
        <div className="wrap rv">
          <p className="statement-wide">Every view comes with someone to ask. <em>Theia reads the same numbers you see.</em></p>
          <div className="actions actions-gap"><Link href={PATHS.theia} className="link-arrow">Meet Theia <Arrow className="arr" /></Link></div>
        </div>
      </section>

      <section data-aa-section="platform.faq" className="sec">
        <div className="wrap faq-split">
          <div className="rv">
            <div className="kicker">Questions</div>
            <h2 className="h2">About the platform.</h2>
          </div>
          <FaqList items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <Cta data-aa-section="platform.cta" lede="See Live Campaigns and Raise Ledger on a demo raise, then talk through your own channels." />
    </>
  )
}
