import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/icons'
import MarkReveal from '@/components/site/MarkReveal'
import FilmSlot from '@/components/site/FilmSlot'
import Shot from '@/components/site/Shot'
import LiveMock from '@/components/mocks/LiveMock'
import LedgerMock from '@/components/mocks/LedgerMock'
import AskTheiaMock from '@/components/mocks/AskTheiaMock'
import { Cta, FaqList, Head, JsonLd, faqJsonLd } from '@/components/site/Blocks'
import { SITE_URL, HOME_TITLE } from '@/lib/seo'
import { PATHS, PITCH_50, PRIVACY_CLAIMS, PRODUCTS, TAGLINE, faq } from '@/lib/site'

/* The home page's own canonical, SITE_URL with no trailing slash, to match the
   sitemap and the Organization node (see app/layout.tsx). */
export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  alternates: { canonical: SITE_URL },
}

const GAP = [
  { k: 'Ad platforms', t: 'Record spend, not investors', d: 'Each platform reports its own clicks and costs. None of them knows who invested.' },
  { k: 'Raise platform', t: 'Records investments, not spend', d: 'It shows who invested and how much. It cannot see the marketing that brought them.' },
  { k: 'Affiliates, print, press', t: 'Live in invoices', d: 'Spend no media buyer touches sits in spreadsheets, outside every report.' },
]

const FAQ = faq('what', 'cost-per-investor', 'why-not-raise-platform', 'theia', 'ads', 'agencies')

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQ.map((f) => ({ q: f.q, a: f.a })))} />

      <section data-aa-section="home.hero" className="hero">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <MarkReveal className="hero-mark" />
          <h1 className="display">
            {TAGLINE}
            <span className="h1-sub">Investment campaign analytics for companies raising capital</span>
          </h1>
          <p className="lede">{PITCH_50}</p>
          <div className="actions">
            <Link href={PATHS.demo} className="btn btn-ink">Book a demo <Arrow className="arr" /></Link>
            <Link href={PATHS.platform} className="btn btn-quiet">See the platform</Link>
          </div>
        </div>
        <div className="wrap hero-stage rv">
          <FilmSlot id="home-hero">
            <LiveMock />
          </FilmSlot>
        </div>
      </section>

      <section data-aa-section="home.gap" className="sec">
        <div className="wrap">
          <Head
            kicker="The gap"
            title="Your spend and your investors live in different places."
            lede="Most issuers learn what worked only after the budget is gone. Axia Atlas brings all three together, so you see what each channel returned while the raise is still running."
          />
          <div className="trio">
            {GAP.map((g, i) => (
              <div key={g.k} className="rv" style={{ ['--d' as string]: `${i * 90}ms` }}>
                <div className="label">{g.k}</div>
                <h3 className="h3">{g.t}</h3>
                <p>{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-aa-section="home.ledger" className="sec">
        <div className="wrap split split-rev">
          <div className="split-copy rv">
            <div className="kicker">{PRODUCTS.ledger}</div>
            <h2 className="h2">Cost per investor, by channel, while it still matters.</h2>
            <p className="lede">Every dollar behind the raise, from ads to affiliates, print and press, set against the investments your raise platform reports.</p>
            <div className="actions"><Link href={`${PATHS.platform}#raise-ledger`} className="link-arrow">Explore {PRODUCTS.ledger} <Arrow className="arr" /></Link></div>
          </div>
          <div className="rv">
            <FilmSlot id="raise-ledger"><LedgerMock /></FilmSlot>
          </div>
        </div>
      </section>

      <section data-aa-section="home.theia" className="sec">
        <div className="wrap">
          <Head
            center
            kicker="Meet Theia"
            title="Ask why. Theia answers in seconds."
            lede="Theia is our proprietary AI-powered analysis assistant, built into Axia Atlas. She explains what changed, shows the numbers behind it, and says what we recommend. The decision stays yours."
          />
          <div className="rv">
            <FilmSlot id="ask-theia"><AskTheiaMock /></FilmSlot>
          </div>
        </div>
      </section>

      <section data-aa-section="home.reports" className="sec">
        <div className="wrap split">
          <div className="split-copy rv">
            <div className="kicker">{PRODUCTS.reports}</div>
            <h2 className="h2">The investor report builds itself.</h2>
            <p className="lede">Weekly and monthly decks, in your brand, from live campaign and raise data. Theia flags the slides that matter most, so you review and present instead of assembling.</p>
            <div className="actions"><Link href={`${PATHS.theia}#reports`} className="link-arrow">See {PRODUCTS.reports} <Arrow className="arr" /></Link></div>
          </div>
          <figure className="figure rv">
            <div className="frame frame-flush"><Shot id="theia-deck" sizes="(max-width: 960px) 100vw, 720px" /></div>
            <figcaption>A deck Theia built, open in the slide editor beside the chat that asked for it.</figcaption>
          </figure>
        </div>
      </section>

      <section data-aa-section="home.principle" className="sec">
        <div className="wrap statement rv">
          <div className="kicker">How we work</div>
          <h2 className="h2">We present, analyze and recommend. You decide.</h2>
          <p className="lede">Axia Atlas never buys media, runs ads or manages ad spend. Your team or your media buyer stays in control of every campaign.</p>
        </div>
      </section>

      <section data-aa-section="home.security" className="sec">
        <div className="wrap">
          <Head kicker="Security and privacy" title={PRIVACY_CLAIMS.r3} />
          <ul className="claims rv">
            <li><span className="label">Masked</span><p>{PRIVACY_CLAIMS.r1}</p></li>
            <li><span className="label">Never trained on</span><p>{PRIVACY_CLAIMS.r12}</p></li>
            <li><span className="label">In transit</span><p>{PRIVACY_CLAIMS.r8}</p></li>
            <li><span className="label">At rest</span><p>{PRIVACY_CLAIMS.r9}</p></li>
          </ul>
          <div className="actions rv" style={{ marginTop: 32 }}><Link href={PATHS.security} className="link-arrow">How we protect your data <Arrow className="arr" /></Link></div>
        </div>
      </section>

      <section data-aa-section="home.faq" className="sec">
        <div className="wrap">
          <Head kicker="Questions" title="What buyers ask before a demo." />
          <FaqList items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <Cta data-aa-section="home.cta" lede="We walk you through Live Campaigns, Raise Ledger and Theia on a demo raise, then talk through your own channels." />
    </>
  )
}
