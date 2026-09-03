import Link from 'next/link'
import { getCaseStudies } from '@/lib/case-studies'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import ResultsSlider from '@/components/ResultsSlider'
import { Arrow, ServiceIcons } from '@/components/icons'
import BrandMarquee from '@/components/BrandMarquee'

/* The results are read at render, so the page has to be allowed to re-render.
   It was fully static because the RESULTS array made the read decorative; now
   the read is the only source and a static page would freeze the slider at
   whatever the table held on the last deploy. */
export const revalidate = 3600

/* A SELECTION, not the full list — six of the eight, so "View all 8 services"
   leads somewhere with more than this page already showed. Executive Personal
   Brand and Strategic Advisory live on /services (anchors #executive, #strategy).
   Two rows of three in the 3-col grid. */
const SERVICES = [
  { id: 'social', name: 'Social Media Management', desc: 'Content built for each platform, managed end to end, designed to grow an audience that actually buys.', href: '/services#social' },
  { id: 'intel', name: 'Competitive Intelligence', desc: "Every competitor's positioning, cadence, and visibility tracked and sourced, so you decide on facts rather than hunches.", href: '/services#intel' },
  { id: 'website', name: 'Website Design & Build', desc: 'Positioning, copy, design, and build in one engagement, with search foundations laid from day one.', href: '/services#website' },
  { id: 'local', name: 'Local Presence & SEO', desc: 'Profile, citations, and reviews managed so nearby buyers find you first, not the business down the road.', href: '/services#local' },
  { id: 'geo', name: 'Answer Engine Optimization (AEO)', desc: 'Get cited across leading AI platforms—Claude, ChatGPT, Perplexity, and Gemini—represented accurately and recommended when buyers search your category.', href: '/services#geo' },
  { id: 'leadgen', name: 'Lead Generation', desc: 'Prospects researched against your ideal customer, reached with outreach written for them, tracked from first touch onward.', href: '/services#leadgen' },
]

/* Phrases for the strip under the hero — the moments buyers decide. */
const MARQUEE = [
  'Searched on Google',
  'Asked on ChatGPT',
  '#1 in the map pack',
  'Cited by Perplexity',
  'Recommended over the competition',
  'Recommended by Gemini',
  'Trusted on LinkedIn',
  'Named by Claude',
  'Discovered on TikTok',
  'Reviews checked before they call',
]

export default async function HomePage() {
  /* Eight at most, and no in-code set behind them: the slider shows what
     case_studies publishes, in sort_order. See lib/case-studies.ts. */
  const slides = await getCaseStudies(8)

  return (
    <div className="page">

      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-aura" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-eyebrow"><span className="pulse" /> Digital marketing studio</div>
          <h1 className="hero-headline">
            Your buyers are looking.<br />
            <em>Make sure they find you.</em>
          </h1>
          <p className="hero-sub">
            Every day, people search the web, scroll their feeds, and ask answer engines what to buy and who to trust. Axia Atlas puts your business in those moments — for brands, local businesses, and the founders behind them.
          </p>
          <div className="hero-actions">
            <Link href="/demo" className="btn-primary">Book a Demo <Arrow className="arr" /></Link>
            <Link href="/services" className="btn-outline">See How It Works</Link>
          </div>

          <div className="hero-trust">
            <span className="hero-trust-label">Built to be found in</span>
            <div className="hero-trust-items">
              <span>Google Search</span>
              <span>Answer Engines</span>
              <span>Local &amp; Maps</span>
              <span>Social Feeds</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MARQUEE — the moments buyers decide ── */}
      <div className="hero-marquee" aria-label="Where buyers decide and where you win: Google, ChatGPT, the map pack, Perplexity, Gemini, LinkedIn, Claude, TikTok, reviews">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div className="marquee-group" key={dup} aria-hidden={dup === 1}>
              {MARQUEE.map((m) => (
                <span className="marquee-item" key={m}>{m}<span className="marquee-sep" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── THE PROBLEM ── */}
      <section className="problem-section carto-grid">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">The Problem</div>
            <h2 className="section-headline">Being good isn&apos;t enough<br />if no one can find you.</h2>
          </div>
          <div className="problem-grid">
            <div className="problem-text">
              <p>You can have the better product, the fairer price, and the happier customers — and still lose to the business that simply shows up first.</p>
              <p>Attention has moved. Buyers search, scroll, and ask answer engines before they ever call. The companies winning right now aren&apos;t louder. They&apos;re easier to find, in more of the places that matter, more of the time.</p>
              <p>That&apos;s the gap we close.</p>
              <Link href="/demo" className="btn-primary">Find Your Gaps <Arrow className="arr" /></Link>
            </div>
            <div className="problem-cards">
              {[
                { title: 'Invisible in search', desc: "If you're not on page one for what you sell, you're losing those buyers to someone who is." },
                { title: 'Left out of the answers', desc: "Claude, ChatGPT, Perplexity, and Gemini recommend businesses every day. If they don't know you, you're not in the running." },
                { title: 'Forgettable feeds', desc: 'Posting without a plan fills a calendar but builds nothing. Reach fades the moment you stop paying.' },
              ].map((c) => (
                <div key={c.title} className="problem-card">
                  <h3 className="problem-card-title">{c.title}</h3>
                  <div className="problem-card-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE SYSTEM (bento) ── */}
      <section className="services-section">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">The System</div>
            <h2 className="section-headline">One plan for every place buyers look.</h2>
            <p className="section-sub">No scattered tactics. We build one connected system across search, answer engines, local, and social — then make every channel pull more weight, month after month.</p>
          </div>
          <div className="bento">
            <div className="bento-card feature">
              <div className="feature-copy">
                <div className="bento-num">The approach</div>
                <h3 className="bento-title">Get found, get chosen, get remembered.</h3>
                <p className="bento-desc">Strategy first — we map where your buyers already are and where you&apos;re missing. Then we build presence in search, answer engines, local, and social, and tie it back to leads and sales you can measure.</p>
              </div>
              <BrandMarquee />
            </div>
            <div className="bento-card">
              <div className="bento-num">01 — Find</div>
              <h3 className="bento-title">Show up first</h3>
              <p className="bento-desc">Rank in search, win local, and get cited by answer engines where buyers are already looking.</p>
            </div>
            <div className="bento-card">
              <div className="bento-num">02 — Convert</div>
              <h3 className="bento-title">Turn attention into customers</h3>
              <p className="bento-desc">A site and content built to move people from curious to booked, not just to bounce.</p>
            </div>
            <div className="bento-card">
              <div className="bento-num">03 — Compound</div>
              <h3 className="bento-title">Build assets that keep paying off</h3>
              <p className="bento-desc">Rankings, reviews, citations, and a founder reputation don&apos;t reset each month — they grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-alt">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">The Channels</div>
            <h2 className="section-headline">Eight ways to get found.</h2>
            <p className="section-sub">You don&apos;t need all eight. You need the right three, in the right order — and that&apos;s the first thing we&apos;ll tell you.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s) => {
              const Icon = ServiceIcons[s.id]
              return (
                <div key={s.id} className="service-card">
                  <div className="service-icon">{Icon && <Icon />}</div>
                  <h3 className="service-name">{s.name}</h3>
                  <p className="service-desc">{s.desc}</p>
                  <Link href={s.href} className="service-link">Learn more <Arrow className="arr" /></Link>
                </div>
              )
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <Link href="/services" className="btn-dark">View all 8 services <Arrow className="arr" /></Link>
          </div>
        </div>
      </section>

      {/* ── RESULTS (auto-advancing slider) ── */}
      <section className="results-section">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">Results</div>
            <h2 className="section-headline">Measured in customers,<br />not vanity metrics.</h2>
          </div>
          {/* No slides means the read failed -- there is no array to fall back
              to any more. The section keeps its heading so the page still
              reads; only the slider, which would be an empty track with no
              dots, goes. */}
          {slides.length > 0 ? <ResultsSlider slides={slides} /> : null}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/case-studies" className="btn-dark">Read the case studies <Arrow className="arr" /></Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="process-section">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">How We Work</div>
            <h2 className="section-headline">Strategy before spend. Every time.</h2>
          </div>
          <div className="process-steps">
            {/* Clip window for the marching ants; the dashes are its ::before. */}
            <div className="process-ants" aria-hidden="true" />
            {[
              { n: '01', title: 'Audit', desc: "We map where you show up today, where you don't, and where the fastest wins are hiding." },
              { n: '02', title: 'Plan', desc: 'A clear 90-day plan: which channels, in what order, measured against goals you care about.' },
              { n: '03', title: 'Build', desc: 'No 30-day warm-up. Work starts in week one and you see real output fast.' },
              { n: '04', title: 'Grow', desc: 'Monthly reviews, plain-English reporting, and steady tuning until every channel pays off.' },
            ].map((s) => (
              <div key={s.n} className={`process-step${s.n === '04' ? ' featured' : ''}`}>
                <div className="process-num">{s.n}</div>
                <h3 className="process-title">{s.title}</h3>
                <p className="process-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaBand
        headline="Ready to be seen?"
        sub="Book a demo. Before the call we audit how you show up today — where buyers are looking, where you're missing, and what we'd do about it. You leave with the map either way."
      />

      <Footer />
    </div>
  )
}
