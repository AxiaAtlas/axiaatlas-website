import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import ShotSlot from '@/components/ShotSlot'
import TheiaMark from '@/components/TheiaMark'
import { Arrow } from '@/components/icons'
import { FaqList, JsonLd, SectionHead, faqJsonLd } from '@/components/service/Blocks'
import { SITE_URL, HOME_TITLE } from '@/lib/seo'
import { PATHS, PITCH_50, PRODUCTS, TAGLINE, faq } from '@/lib/site'

/* The home page's own canonical, SITE_URL with no trailing slash, to match the
   sitemap and the Organization node (see app/layout.tsx). */
export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  alternates: { canonical: SITE_URL },
}

const GAP = [
  { k: 'Ad platforms', t: 'Record spend, not investors', d: 'Each platform reports its own clicks and costs. None of them knows who invested.' },
  { k: 'Raise platform', t: 'Records investments, not spend', d: 'It shows who invested and how much. It cannot see the marketing that brought them.' },
  { k: 'Affiliates, print, press', t: 'Live in invoices', d: 'Spend no media buyer touches sits in spreadsheets, out of every report.' },
]

const FAQ = faq('what', 'cost-per-investor', 'why-not-raise-platform', 'theia', 'ads', 'agencies')

export default function HomePage() {
  return (
    <div className="page">
      <JsonLd data={faqJsonLd(FAQ.map((f) => ({ q: f.q, a: f.a })))} />

      <div data-aa-section="home.hero" className="hero">
        <div className="hero-aura" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow"><span className="pulse" /> {PRODUCTS.live} · {PRODUCTS.ledger} · Theia</div>
            <h1 className="hero-headline">Investment Campaign Analytics for Companies Raising Capital</h1>
            <div className="hero-display-sub">{TAGLINE}.</div>
            <p className="hero-sub">{PITCH_50}</p>
            <div className="hero-actions">
              <Link href={PATHS.demo} className="btn-primary">Book a Demo <Arrow className="arr" /></Link>
              <Link href={PATHS.platform} className="btn-outline">See the platform</Link>
            </div>
          </div>
          <div className="hero-artifact">
            <ShotSlot id="homeHero" priority />
          </div>
        </div>
      </div>

      <section data-aa-section="home.problem" className="sv-section g-raise">
        <div className="section-inner">
          <SectionHead
            eyebrow="The gap"
            title="Your spend and your investors live in different places."
            lede="Most issuers learn what worked only after the budget is gone. Axia Atlas is built to bring all three together, so you can see what each channel actually returned while the raise is still running."
          />
          <div className="sv-cards sv-cards-3">
            {GAP.map((g) => (
              <div key={g.k} className="sv-card sv-card-static">
                <div className="bento-num">{g.k}</div>
                <h3 className="sv-card-name">{g.t}</h3>
                <p className="sv-card-desc">{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-aa-section="home.platform" className="sv-section g-black">
        <div className="section-inner">
          <SectionHead
            eyebrow="The platform"
            title="Every dollar behind your raise, in one view."
            lede="Two modules, one dashboard. Paid platforms flow in on their own; anything a media buyer did not buy is entered by hand or imported."
          />
          <div className="px-pair">
            <Link href={`${PATHS.platform}#live-campaigns`} className="sv-card">
              <ShotSlot id="liveOverview" caption={false} />
              <h3 className="sv-card-name">{PRODUCTS.live}</h3>
              <p className="sv-card-desc">Every ad platform and every campaign in one live dashboard. Drill from the total to each creative and audience; every chart opens, zooms and exports.</p>
              <span className="service-link">Explore {PRODUCTS.live} <Arrow className="arr" /></span>
            </Link>
            <Link href={`${PATHS.platform}#raise-ledger`} className="sv-card">
              <ShotSlot id="ledger" caption={false} />
              <h3 className="sv-card-name">{PRODUCTS.ledger}</h3>
              <p className="sv-card-desc">Every dollar behind the raise, from ads to affiliates, print and press, set against the investments your raise platform reports. Cost per investor and return, by channel.</p>
              <span className="service-link">Explore {PRODUCTS.ledger} <Arrow className="arr" /></span>
            </Link>
          </div>
        </div>
      </section>

      <section data-aa-section="home.theia" className="sv-section g-spruce">
        <div className="section-inner px-theia">
          <div>
            <TheiaMark className="px-theia-mark" />
            <div className="section-eyebrow">Meet Theia</div>
            <h2 className="section-headline">Theia explains what changed and what we recommend.</h2>
            <p className="sv-lede">Theia is the proprietary AI-powered analysis assistant built into Axia Atlas. She answers in seconds and builds your investor reports. Our analysts are still there when you want a person.</p>
            <ul className="px-points">
              <li><strong>{PRODUCTS.ask}.</strong> Ask anything about your campaigns and your raise. Get the answer, the numbers behind it, and what we recommend reviewing next.</li>
              <li><strong>{PRODUCTS.reports}.</strong> Press play and your weekly and monthly investor-ready decks build themselves in your brand, with the slides that matter flagged.</li>
            </ul>
            <div className="sv-hero-actions px-figure-gap">
              <Link href={PATHS.theia} className="btn-primary">Meet Theia <Arrow className="arr" /></Link>
            </div>
          </div>
          <ShotSlot id="homeTheia" />
        </div>
      </section>

      <section data-aa-section="home.who" className="sv-section g-black">
        <div className="section-inner">
          <SectionHead eyebrow="Who it is for" title="Built for issuers, and for the agencies behind them." />
          <div className="sv-cards">
            <div className="sv-card sv-card-static">
              <div className="bento-num">Companies raising capital</div>
              <h3 className="sv-card-name">Reg CF, Reg A+ and Reg D issuers</h3>
              <p className="sv-card-desc">See cost per investor by channel while the raise is running, and walk into every board meeting with a deck that built itself.</p>
            </div>
            <div className="sv-card sv-card-static">
              <div className="bento-num">Marketing agencies</div>
              <h3 className="sv-card-name">Agencies that run raise campaigns</h3>
              <p className="sv-card-desc">Show each client every dollar behind their raise against the investments it produced, with a weekly and monthly deck in that client&apos;s brand.</p>
            </div>
          </div>
        </div>
      </section>

      <section data-aa-section="home.principle" className="sv-section g-raise">
        <div className="section-inner sv-note">
          <SectionHead
            eyebrow="How we work"
            title="We present, analyze and recommend. You decide."
            lede="Axia Atlas never buys media, runs ads or manages ad spend. Your team or your media buyer stays in control of every campaign. We show how each one is performing against the investments your raise is actually receiving, and what we recommend reviewing next."
          />
          <Link href={PATHS.security} className="service-link">How we protect your data <Arrow className="arr" /></Link>
        </div>
      </section>

      <section data-aa-section="home.faq" className="sv-section g-black">
        <div className="section-inner">
          <SectionHead eyebrow="Questions" title="What buyers ask before a demo." />
          <FaqList items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <CtaBand
        headline={`${TAGLINE}.`}
        sub="Book a demo. We walk you through Live Campaigns, Raise Ledger and Theia on a demo raise, then talk through your own channels."
      />

      <Footer />
    </div>
  )
}
