import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Arrow } from '@/components/icons'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Axia Atlas is a digital marketing studio built on one idea: to be found is to be seen. We help brands, local businesses, and founders show up where their buyers are looking.',
  alternates: { canonical: '/about' },
}

/* Animated cartographic figure for the about hero — rotating compass dials and
   a route plotting itself toward a marked location. CSS-animated; the global
   reduced-motion rule rests it on its drawn base state. */
function AboutFigure() {
  return (
    <div className="about-figure" aria-hidden="true">
      <svg viewBox="0 0 440 440">
        <g className="af-grid">
          <line x1="0" y1="110" x2="440" y2="110" /><line x1="0" y1="220" x2="440" y2="220" /><line x1="0" y1="330" x2="440" y2="330" />
          <line x1="110" y1="0" x2="110" y2="440" /><line x1="220" y1="0" x2="220" y2="440" /><line x1="330" y1="0" x2="330" y2="440" />
        </g>
        <circle className="af-dial" cx="220" cy="216" r="150" />
        <circle className="af-dial inner" cx="220" cy="216" r="106" />
        {/* compass ticks */}
        <line className="af-tick" x1="220" y1="44" x2="220" y2="62" />
        <line className="af-tick" x1="220" y1="370" x2="220" y2="388" />
        <line className="af-tick" x1="48" y1="216" x2="66" y2="216" />
        <line className="af-tick" x1="374" y1="216" x2="392" y2="216" />
        {/* a route plotting toward the mark */}
        <path className="af-route" pathLength={1} d="M 70 348 C 150 332, 168 232, 250 214 S 360 150, 326 96" />
        <g><circle className="af-dot" cx="70" cy="348" r="6" /><circle className="af-halo" cx="70" cy="348" r="13" /></g>
        <g><circle className="af-dot" cx="250" cy="214" r="5.5" /><circle className="af-halo" cx="250" cy="214" r="12" /></g>
        <g className="af-pin">
          <path d="M326 66a20 20 0 0 0-20 20c0 14 20 33 20 33s20-19 20-33a20 20 0 0 0-20-20z" />
          <circle cx="326" cy="85" r="6.5" />
        </g>
        <text className="af-label" x="64" y="372">Found</text>
        <text className="af-label faint" x="28" y="40">41.0082° N — 28.9784° E</text>
      </svg>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="page">
      <div className="about-hero">
        <div className="about-grid" aria-hidden="true" />
        <AboutFigure />
        <div className="about-hero-text">
          <div className="section-eyebrow">About</div>
          <h1 className="section-headline">We started Axia Atlas because most marketing sells activity, not results.</h1>
        </div>
      </div>

      <div className="about-section">
        <div className="about-inner">
          <h2 className="about-headline">Why we exist</h2>
          <div className="about-body">
            <p>Axia Atlas was founded after watching too many good businesses get mediocre results from agencies that were busy, not effective. The reason was rarely effort — it was the model. Most agencies bill for hours and deliverables, so that&apos;s what they optimize for.</p>
            <p>The usual relationship goes like this: you pay a retainer, you get a content calendar, you get a monthly report full of charts. Plenty of activity. No promise that any of it brings you a single new customer. Six months later you have a library of posts and not much else.</p>
            <p>That works for the agency. It doesn&apos;t work for you.</p>
            <p>We do it differently. Every engagement starts with strategy. We only recommend channels we believe will pay off, and every month we ask one question: is this making the business easier to find and quicker to choose than it was last month?</p>
            <p>We take on fewer clients than most agencies — on purpose — so we can go deep instead of wide.</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-inner about-seen">
          <h2 className="about-headline">&quot;To be found is to be seen.&quot;</h2>
          <svg className="about-seen-route" viewBox="0 0 420 26" aria-hidden="true">
            <path className="as-line" pathLength={1} d="M 6 18 C 70 18, 96 8, 170 9 S 300 20, 372 8" />
            <circle className="as-dot" cx="6" cy="18" r="4.5" />
            <path className="as-pin" d="M384 1a9 9 0 0 0-9 9c0 6.4 9 15 9 15s9-8.6 9-15a9 9 0 0 0-9-9z" />
          </svg>
          <div className="about-body">
            <p>That&apos;s the idea behind everything we build. When your business shows up where buyers are already looking — in search, in answer engines, in your local market, in the feeds people scroll — you don&apos;t have to convince anyone you exist. You just have to be the obvious choice.</p>
            <p>Visibility like that isn&apos;t flashy and it isn&apos;t instant. But once it&apos;s built, it&apos;s yours — and it keeps working.</p>
          </div>
          <div className="beliefs-grid">
            {[
              { n: '01', title: 'Results over activity', desc: 'We measure success in customers, rankings, and reputation — not posts published or hours billed.' },
              { n: '02', title: 'Strategy before spend', desc: "We don't start until we understand your business, your buyers, and where the real opportunity is." },
              { n: '03', title: 'Plain talk, always', desc: "No jargon, no smoke. You'll always know what we're doing, why, and whether it's working." },
            ].map((b) => (
              <div key={b.n} className="belief-card spotlight">
                <div className="belief-num">{b.n}</div>
                <div className="belief-title">{b.title}</div>
                <p className="belief-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-inner">
          <h2 className="about-headline">How working with us feels</h2>
          <div className="about-body">
            <p>Every engagement starts with an audit. We map where you show up today, where you don&apos;t, and the fastest wins available — then build a clear 90-day plan around them.</p>
            <p>Then we get to work. No 30-day onboarding, no committee approvals. Real output lands in week one.</p>
            <p>We operate as an extension of your team, not a faceless vendor. You get direct access to the people doing the work, monthly strategy calls, a live dashboard, and reporting written in language you can actually read.</p>
            <p>Whether you&apos;re a growing brand, a local business, or the founder who is the brand — the goal is the same: make you impossible to miss.</p>
          </div>
          <div style={{ marginTop: 36 }}>
            <Link href="/demo" className="btn-primary">Work With Us <Arrow className="arr" /></Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
