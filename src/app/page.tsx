import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import Footer from '@/components/Footer'

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
  { icon: '📱', name: 'Social Media Strategy', desc: 'Platform-native content, full calendar management, and data-driven creative that actually builds an audience.', href: '/services#social' },
  { icon: '🤖', name: 'GEO / AEO', desc: 'Get cited by ChatGPT, Perplexity, and Gemini. Be the answer, not just a result.', href: '/services#geo' },
  { icon: '✍️', name: 'SEO & Content', desc: 'Long-form articles that rank, build authority, and convert readers into buyers.', href: '/services#seo' },
  { icon: '📍', name: 'Local Presence', desc: 'Google Business Profile, local citations, and review management — dominate your market.', href: '/services#local' },
  { icon: '👤', name: 'Executive Brand', desc: 'Turn your founder into a category authority on LinkedIn. Content that builds trust at scale.', href: '/services#executive' },
  { icon: '🌐', name: 'Website Design', desc: 'Direct-response websites built to convert. No bloat — just strategy and speed.', href: '/services#website' },
]

const PLACEHOLDER_CASES = [
  { industry: 'Professional Services', result_headline: '340% organic growth in 90 days', result_detail: 'B2B consulting firm — from zero organic traffic to 4,200 monthly sessions.', service_used: 'Social Media + SEO' },
  { industry: 'Technology / SaaS', result_headline: 'Cited by ChatGPT in 45 days', result_detail: 'SaaS startup — founder LinkedIn grew from 200 to 2,800 followers in 4 months.', service_used: 'GEO/AEO + Executive Brand' },
]

export default async function HomePage() {
  const caseStudies = await getCaseStudies()
  const displayCases = caseStudies.length > 0 ? caseStudies : PLACEHOLDER_CASES

  return (
    <div className="page">

      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">Growth, Engineered</div>
          <h1 className="hero-headline">
            Not more content.<br />
            <em>A signal that compounds.</em>
          </h1>
          <p className="hero-sub">
            Axia Atlas is a strategy-first digital marketing agency. We engineer compounding growth — not vanity metrics. Every tactic we deploy is designed to build momentum that pays off for years.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn-primary">Book a Free Audit →</Link>
            <Link href="/services" className="btn-outline">See Our Services</Link>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        {[
          { value: '3×', label: 'Average pipeline growth' },
          { value: '8', label: 'Integrated services' },
          { value: 'Day 1', label: 'Execution from onboarding' },
          { value: '100%', label: 'Outcome-focused billing' },
        ].map(s => (
          <div key={s.label} className="stat-item">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── THE PROBLEM ── */}
      <section className="problem-section">
        <div className="section-inner">
          <div className="section-eyebrow">The Problem</div>
          <h2 className="section-headline">You&apos;re active.<br />You&apos;re not growing.</h2>
          <div className="problem-grid">
            <div className="problem-text">
              <p>Most marketing agencies optimise for activity — posts, reports, meetings. You get deliverables. You don&apos;t get growth.</p>
              <p>The businesses compounding fastest right now have one thing in common: they&apos;re building signal architecture, not just publishing content. They show up in AI answers, dominate local search, and have founders people trust before they ever get on a call.</p>
              <p>That&apos;s what we build.</p>
              <Link href="/contact" className="btn-primary" style={{ marginTop: 8 }}>Fix Your Growth Architecture →</Link>
            </div>
            <div className="problem-cards">
              {[
                { title: 'Content without strategy', desc: 'Publishing consistently but reaching nobody new. The algorithm isn\'t the problem — your architecture is.' },
                { title: 'Invisible to AI search', desc: 'ChatGPT, Perplexity, and Gemini answer buyer questions. If you\'re not cited, you don\'t exist to that buyer.' },
                { title: 'No compounding asset', desc: 'Every tactic resets. Your competitors are building assets — authority, rankings, trust — that work harder every month.' },
              ].map(c => (
                <div key={c.title} className="problem-card">
                  <div className="problem-card-title">{c.title}</div>
                  <div className="problem-card-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services-section">
        <div className="section-inner">
          <div className="section-eyebrow">Our Services</div>
          <h2 className="section-headline">Eight ways we engineer growth</h2>
          <p className="section-sub">Each service is designed to compound. Most clients combine 3–4 services for full-spectrum growth architecture.</p>
          <div className="services-grid">
            {SERVICES.map(s => (
              <div key={s.name} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <div className="service-name">{s.name}</div>
                <p className="service-desc">{s.desc}</p>
                <Link href={s.href} className="service-link">Learn more →</Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/services" className="btn-dark">View all 8 services →</Link>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="case-studies-section">
        <div className="section-inner">
          <div className="section-eyebrow">Results</div>
          <h2 className="section-headline">Built for outcomes.<br />Measured in growth.</h2>
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
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/case-studies" className="btn-dark">Read all case studies →</Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="process-section">
        <div className="section-inner">
          <div className="section-eyebrow">How We Work</div>
          <h2 className="section-headline">Strategy before execution. Every time.</h2>
          <div className="process-steps">
            {[
              { n: '01', title: 'Growth Audit', desc: 'We map your current signal architecture — what\'s working, what\'s invisible, and where your biggest compounding opportunities are.' },
              { n: '02', title: 'Architecture Design', desc: 'We build a 90-day growth plan: which services, which sequence, which metrics. Strategy first, execution second.' },
              { n: '03', title: 'Day 1 Execution', desc: 'No 30-day onboarding. Work starts immediately. You see deliverables in week one.' },
              { n: '04', title: 'Compound & Optimise', desc: 'Monthly reviews, live dashboards, and continuous iteration. We optimise until every channel compounds.' },
            ].map(s => (
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
        <div className="section-eyebrow">Free Growth Audit</div>
        <h2 className="section-headline">Find out exactly where your growth is leaking.</h2>
        <p className="section-sub">A 30-minute audit call. We map your signal architecture and show you the 3 highest-leverage moves you could make right now. No pitch, no fluff.</p>
        <Link href="/contact" className="btn-primary" style={{ background: 'var(--bone)', color: 'var(--midnight)' }}>Book Your Free Audit →</Link>
      </section>

      <Footer />
    </div>
  )
}
