import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import ResultsSlider, { type ResultSlide } from '@/components/ResultsSlider'
import { Arrow, ServiceIcons } from '@/components/icons'

async function getCaseStudies() {
  try {
    const { data } = await supabase
      .from('case_studies')
      .select('industry,result_headline,result_detail,service_used')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(8)
    return data || []
  } catch {
    return []
  }
}

const SERVICES = [
  { id: 'social', name: 'Social Media', desc: 'Content built for each platform, managed end to end, designed to grow an audience that actually buys.', href: '/services#social' },
  { id: 'geo', name: 'Answer-Engine Optimization', desc: 'Get cited by ChatGPT, Perplexity, and Gemini. When buyers ask an answer engine, you want to be the answer.', href: '/services#geo' },
  { id: 'seo', name: 'SEO & Content', desc: 'Articles and pages that rank, earn trust, and turn readers into customers — month after month.', href: '/services#seo' },
  { id: 'local', name: 'Local Presence', desc: 'Win the map pack and the "near me" searches. Google Business Profile, reviews, and local pages.', href: '/services#local' },
  { id: 'executive', name: 'Founder Brand', desc: 'Turn the face of your business into a name people trust before the first conversation.', href: '/services#executive' },
  { id: 'website', name: 'Website Design', desc: 'Fast, clean sites built to convert the traffic every other channel sends you.', href: '/services#website' },
]

/* Curated results for the home slider. The Supabase library takes over once it
   holds a real set (≥5 published rows) — the original seed rows predate the
   current brand-copy rules. */
const RESULTS: ResultSlide[] = [
  { industry: 'Professional Services', result_headline: '340% organic growth in 90 days', result_detail: 'A B2B consulting firm went from near-zero to roughly 4,200 monthly organic sessions — with the first inbound leads landing by month three.', service_used: 'SEO + Founder Brand' },
  { industry: 'E-commerce', result_headline: 'First page of Google for buyer-intent terms in under 4 months', result_detail: 'A DTC brand with no organic visibility targeted buyer-intent terms with a keyword and content strategy plus on-site conversion fixes — ranking page one within four months, all organic.', service_used: 'SEO + Conversion' },
  { industry: 'E-commerce', result_headline: '7 points above the benchmark — zero ad spend', result_detail: 'A DTC brand recovered abandoned pre-orders across email, SMS, and content — landing 7 points above the 20–30% industry standard with no paid media.', service_used: 'Owned Channels + Content' },
  { industry: 'Consumer Brand', result_headline: 'Audience growth far above average in 60 days', result_detail: 'A consumer brand fixed its voice, built content pillars, and held a steady multi-platform cadence — and its following grew well beyond the category norm.', service_used: 'Social Media + Brand Voice' },
  { industry: 'Food & Hospitality', result_headline: 'The top recommended local result in answer engines', result_detail: 'A local restaurant surfaced first when prospects asked answer engines and maps for the best option nearby — ahead of competitors on reviews and presence.', service_used: 'Answer Engines + Local Presence' },
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
  'Discovered on TikTok',
  'Reviews checked before they call',
]

/* Animated growth graph inside the green "system" feature card — an ascending
   performance line (find → convert → compound) that draws on a loop and ends in
   an arrowhead pointing up and to the right, reading as a rising chart. */
function SystemMap() {
  return (
    <div className="system-map" aria-hidden="true">
      <svg viewBox="0 0 520 300" preserveAspectRatio="xMidYMid meet">
        <g className="sm-grid">
          <line x1="0" y1="75" x2="520" y2="75" /><line x1="0" y1="150" x2="520" y2="150" /><line x1="0" y1="225" x2="520" y2="225" />
          <line x1="130" y1="0" x2="130" y2="300" /><line x1="260" y1="0" x2="260" y2="300" /><line x1="390" y1="0" x2="390" y2="300" />
        </g>
        {/* an ascending line graph — overall up-and-to-the-right with two small
            pullbacks, like a real performance chart climbing the grid */}
        <path className="sm-route" pathLength={1} d="M 36 250 L 110 224 L 170 234 L 240 188 L 310 196 L 380 138 L 462 70" />
        <g className="sm-wp w1">
          <circle className="sm-dot" cx="36" cy="250" r="6" />
          <circle className="sm-halo" cx="36" cy="250" r="13" />
          <text className="sm-label" x="52" y="255">Find</text>
        </g>
        <g className="sm-wp w2">
          <circle className="sm-dot" cx="240" cy="188" r="6" />
          <circle className="sm-halo" cx="240" cy="188" r="13" />
          <text className="sm-label" x="256" y="193">Convert</text>
        </g>
        <g className="sm-wp w3">
          {/* the rising line IS the growth — an arrowhead rides its tip,
              pointing up and to the right like a performance chart */}
          <path className="sm-arrow" d="M449 74 L462 70 L456 83" />
          <text className="sm-label" x="384" y="58">Compound</text>
        </g>
      </svg>
    </div>
  )
}

export default async function HomePage() {
  const db = await getCaseStudies()
  const slides: ResultSlide[] = db.length >= 5 ? (db as ResultSlide[]) : RESULTS

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
            Every day, your customers search Google, scroll their feeds, and ask answer engines what to buy and who to trust. Axia Atlas puts your business in those moments — for brands, local businesses, and the founders behind them.
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
      <div className="hero-marquee" aria-label="Where buyers decide and where you win: Google, ChatGPT, the map pack, Perplexity, Gemini, LinkedIn, TikTok, reviews">
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
                { title: 'Left out of the answers', desc: 'ChatGPT, Perplexity, and Gemini recommend businesses every day. If they don\'t know you, you\'re not in the running.' },
                { title: 'Forgettable feeds', desc: 'Posting without a plan fills a calendar but builds nothing. Reach fades the moment you stop paying.' },
              ].map((c) => (
                <div key={c.title} className="problem-card">
                  <div className="problem-card-title">{c.title}</div>
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
                <div className="bento-title">Get found, get chosen, get remembered.</div>
                <p className="bento-desc">Strategy first — we map where your buyers already are and where you&apos;re missing. Then we build presence in search, answer engines, local, and social, and tie it back to leads and sales you can measure.</p>
              </div>
              <SystemMap />
            </div>
            <div className="bento-card">
              <div className="bento-num">01 — Find</div>
              <div className="bento-title">Show up first</div>
              <p className="bento-desc">Rank in search, win local, and get cited by answer engines where buyers are already looking.</p>
            </div>
            <div className="bento-card">
              <div className="bento-num">02 — Convert</div>
              <div className="bento-title">Turn attention into customers</div>
              <p className="bento-desc">A site and content built to move people from curious to booked, not just to bounce.</p>
            </div>
            <div className="bento-card">
              <div className="bento-num">03 — Compound</div>
              <div className="bento-title">Build assets that keep paying off</div>
              <p className="bento-desc">Rankings, reviews, citations, and a founder reputation don&apos;t reset each month — they grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-alt">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">What We Do</div>
            <h2 className="section-headline">Seven ways to get found.</h2>
            <p className="section-sub">Pick the channels that fit your business. Most clients combine three or four into one plan.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s) => {
              const Icon = ServiceIcons[s.id]
              return (
                <div key={s.id} className="service-card">
                  <div className="service-icon">{Icon && <Icon />}</div>
                  <div className="service-name">{s.name}</div>
                  <p className="service-desc">{s.desc}</p>
                  <Link href={s.href} className="service-link">Learn more <Arrow className="arr" /></Link>
                </div>
              )
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <Link href="/services" className="btn-dark">View all 7 services <Arrow className="arr" /></Link>
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
          <ResultsSlider slides={slides} />
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
            {[
              { n: '01', title: 'Audit', desc: "We map where you show up today, where you don't, and where the fastest wins are hiding." },
              { n: '02', title: 'Plan', desc: 'A clear 90-day plan: which channels, in what order, measured against goals you care about.' },
              { n: '03', title: 'Build', desc: 'No 30-day warm-up. Work starts in week one and you see real output fast.' },
              { n: '04', title: 'Grow', desc: 'Monthly reviews, plain-English reporting, and steady tuning until every channel pays off.' },
            ].map((s) => (
              <div key={s.n} className={`process-step${s.n === '04' ? ' featured' : ''}`}>
                <div className="process-num">{s.n}</div>
                <div className="process-title">{s.title}</div>
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
