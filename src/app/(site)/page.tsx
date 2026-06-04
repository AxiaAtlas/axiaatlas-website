import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import Footer from '@/components/Footer'
import { Arrow, ServiceIcons } from '@/components/icons'

async function getCaseStudies() {
  try {
    const { data } = await supabase
      .from('case_studies')
      .select('id,industry,result_headline,result_detail,service_used,company_type')
      .eq('published', true)
      .limit(2)
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

const PLACEHOLDER_CASES = [
  { industry: 'Home Services', result_headline: '5× more booked jobs', result_detail: 'A local trades business went from page three to the top of the map pack — and filled its calendar in 90 days.', service_used: 'Local Presence + Website' },
  { industry: 'Consumer Brand', result_headline: 'Cited by ChatGPT in 6 weeks', result_detail: 'A DTC brand became the answer engines give for its category, lifting organic discovery and on-site sales.', service_used: 'Answer Engines + SEO' },
]

function HeroTopo() {
  return (
    <div className="hero-topo" aria-hidden="true">
      <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        <path d="M-50 180 Q 300 80 600 200 T 1250 160" />
        <path d="M-50 250 Q 300 150 600 270 T 1250 230" />
        <path d="M-50 320 Q 300 220 600 340 T 1250 300" />
        <path d="M-50 390 Q 300 290 600 410 T 1250 370" />
        <path d="M-50 460 Q 300 360 600 480 T 1250 440" />
        <path d="M-50 530 Q 300 430 600 550 T 1250 510" />
      </svg>
    </div>
  )
}

export default async function HomePage() {
  const caseStudies = await getCaseStudies()
  const displayCases = caseStudies.length > 0 ? caseStudies : PLACEHOLDER_CASES

  return (
    <div className="page">

      {/* ── HERO ── */}
      <div className="hero">
        <HeroTopo />
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
            <Link href="/demo" className="btn-primary">Book a Free Audit <Arrow className="arr" /></Link>
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

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        {[
          { value: '8', label: 'Channels we cover' },
          { value: 'Week 1', label: 'Work starts, not onboarding' },
          { value: 'B2B + B2C', label: 'Brands, local, and founders' },
          { value: 'Always', label: 'Reporting you can read' },
        ].map((s) => (
          <div key={s.label} className="stat-item">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
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
            <h2 className="section-headline">One plan. Every place buyers look.</h2>
            <p className="section-sub">We don&apos;t sell random tactics. We build a connected system across the channels that move your business — then make each part work harder every month.</p>
          </div>
          <div className="bento">
            <div className="bento-card feature">
              <div>
                <div className="bento-num">The approach</div>
                <div className="bento-title">Get found, get chosen, get remembered.</div>
              </div>
              <p className="bento-desc">Strategy first — we map where your buyers already are and where you&apos;re missing. Then we build presence in search, answer engines, local, and social, and tie it back to leads and sales you can measure.</p>
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
            <div className="bento-card wide">
              <div className="bento-num">03 — Compound</div>
              <div className="bento-title">Build assets that keep paying off</div>
              <p className="bento-desc">Rankings, reviews, citations, and a founder reputation don&apos;t reset each month — they grow. We optimize the system until every channel pulls its weight.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-alt">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">What We Do</div>
            <h2 className="section-headline">Eight ways to get found.</h2>
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
            <Link href="/services" className="btn-dark">View all 8 services <Arrow className="arr" /></Link>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="results-section">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">Results</div>
            <h2 className="section-headline">Measured in customers,<br />not vanity metrics.</h2>
          </div>
          <div className="case-grid">
            {displayCases.map((c: any, i: number) => (
              <div key={i} className="case-card">
                <div className="case-tag">{c.industry}</div>
                <div className="case-result">{c.result_headline}</div>
                <p className="case-desc">{c.result_detail}</p>
                <div className="case-service">{c.service_used}</div>
              </div>
            ))}
          </div>
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
              <div key={s.n} className="process-step">
                <div className="process-num">{s.n}</div>
                <div className="process-title">{s.title}</div>
                <p className="process-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="section-eyebrow">Free Audit</div>
          <h2 className="section-headline">See exactly where you&apos;re invisible.</h2>
          <p className="section-sub">Book a 30-minute audit. We&apos;ll show you where buyers are looking for what you sell, where you&apos;re missing, and the three moves that would change it. No pitch deck, no pressure.</p>
          <Link href="/demo" className="btn-primary">Book Your Free Audit <Arrow className="arr" /></Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
