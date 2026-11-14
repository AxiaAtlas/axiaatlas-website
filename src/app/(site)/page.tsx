import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/icons'
import TheiaMark from '@/components/TheiaMark'
import FilmSlot from '@/components/site/FilmSlot'
import PinnedStage from '@/components/site/PinnedStage'
import ProofBand from '@/components/site/ProofBand'
import LiveMock from '@/components/mocks/LiveMock'
import LedgerMock from '@/components/mocks/LedgerMock'
import ReportsMock from '@/components/mocks/ReportsMock'
import ShareMock from '@/components/mocks/ShareMock'
import AskTheiaMock from '@/components/mocks/AskTheiaMock'
import { Cta, FaqList, JsonLd, faqJsonLd } from '@/components/site/Blocks'
import { SITE_URL, HOME_TITLE } from '@/lib/seo'
import { PATHS, PRODUCTS, TAGLINE, faq } from '@/lib/site'

/* The home page's own canonical, SITE_URL with no trailing slash, to match the
   sitemap and the Organization node (see app/layout.tsx). */
export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  alternates: { canonical: SITE_URL },
}

const FAQ = faq('what', 'cost-per-investor', 'why-not-raise-platform', 'theia', 'ads', 'agencies')

const ONBOARD = [
  { n: '01', t: 'See it on a demo raise', d: 'We walk you through Live Campaigns, Raise Ledger and Theia on Kova, a demo raise, then talk through your channels.' },
  { n: '02', t: 'Connect your channels', d: 'Sign in to your ad accounts and your raise platform. Anything without a connector is imported from its export.' },
  { n: '03', t: 'Read your first report', d: 'Your dashboards fill, the ledger balances, and Theia builds your first investor report in your brand.' },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQ.map((f) => ({ q: f.q, a: f.a })))} />

      <section data-aa-section="home.hero" className="hero2">
        <div className="glow" aria-hidden="true" />
        <div className="wrap hero2-grid">
          <div className="hero2-copy">
            <h1 className="display">
              <span className="h1-kw">Investment campaign analytics for companies raising capital</span>
              {TAGLINE}.
            </h1>
            <p className="lede">Every dollar behind your raise, from every ad platform, affiliate and press buy, set against the investors it brought.</p>
            <div className="actions">
              <Link href={PATHS.demo} className="btn btn-ink">Book a demo <Arrow className="arr" /></Link>
              <Link href={PATHS.platform} className="btn btn-quiet">See the platform</Link>
            </div>
          </div>
          <div className="hero2-stage">
            <FilmSlot id="home-hero"><LiveMock /></FilmSlot>
          </div>
        </div>
      </section>

      <ProofBand mark="home.proof" />

      <section data-aa-section="home.statement" className="sec">
        <div className="wrap rv">
          <p className="statement-wide">
            Ad platforms count clicks. Your raise platform counts investors. <em>Axia Atlas shows what each investor cost.</em>
          </p>
        </div>
      </section>

      <section className="sec sec-flush-top">
        <div className="wrap">
          <PinnedStage
            mark="home.platform"
            steps={[
              {
                kicker: PRODUCTS.ledger,
                title: 'Cost per investor, channel by channel, while there is still budget to move.',
                body: 'Every dollar behind the raise, from ads to affiliates, print and press, set against the investments your raise platform reports.',
                extra: <Link href={`${PATHS.platform}#raise-ledger`} className="link-arrow">Explore {PRODUCTS.ledger} <Arrow className="arr" /></Link>,
                stage: <LedgerMock />,
              },
              {
                kicker: PRODUCTS.reports,
                title: 'The investor report builds itself.',
                body: 'Weekly and monthly decks, in your brand, from live campaign and raise data. Theia flags the slide worth a look before the board meeting.',
                extra: <Link href={`${PATHS.theia}#reports`} className="link-arrow">See {PRODUCTS.reports} <Arrow className="arr" /></Link>,
                stage: <ReportsMock />,
              },
              {
                kicker: 'Share',
                title: 'Send the board a link, not a spreadsheet.',
                body: 'Choose who can view and who can edit, copy the link, and everyone reads the same numbers.',
                stage: <ShareMock />,
              },
            ]}
          />
        </div>
      </section>

      <section data-aa-section="home.theia" className="band band-theia">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <div className="band-head rv">
            <div className="kicker"><TheiaMark className="tm-mark" /> Meet Theia</div>
            <h2 className="h2">Know why your number moved, with the evidence, in the time it takes to ask.</h2>
            <p className="lede">Theia is our proprietary AI-powered analysis assistant, built into Axia Atlas. Ask in plain words and get the reason, the numbers behind it, and what we recommend.</p>
            <div className="actions"><Link href={PATHS.theia} className="link-arrow">Explore Theia <Arrow className="arr" /></Link></div>
          </div>
          <div className="rv band-stage">
            <FilmSlot id="ask-theia"><AskTheiaMock /></FilmSlot>
          </div>
        </div>
      </section>

      <section data-aa-section="home.onboarding" className="sec">
        <div className="wrap">
          <div className="split-head rv">
            <div className="kicker">Getting started</div>
            <h2 className="h2">Live in three steps.</h2>
          </div>
          <ol className="steps steps-3">
            {ONBOARD.map((s, i) => (
              <li key={s.n} className="rv" style={{ ['--d' as string]: `${i * 90}ms` }}>
                <span className="num">{s.n}</span>
                <h3 className="h3">{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-aa-section="home.trust" className="sec">
        <div className="wrap statement rv">
          <div className="kicker">How we work</div>
          <h2 className="h2">We present, analyze and recommend. You decide.</h2>
          <p className="lede">Axia Atlas never buys media, runs ads or manages ad spend. Your team or your media buyer stays in control of every campaign.</p>
        </div>
      </section>

      <section data-aa-section="home.faq" className="sec">
        <div className="wrap faq-split">
          <div className="rv">
            <div className="kicker">Questions</div>
            <h2 className="h2">What buyers ask before a demo.</h2>
          </div>
          <FaqList items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <Cta data-aa-section="home.cta" lede="See Live Campaigns, Raise Ledger and Theia on a demo raise, then talk through your own channels." />
    </>
  )
}
