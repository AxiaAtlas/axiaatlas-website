import Link from 'next/link'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="page">
      <div className="about-hero">
        <div className="section-eyebrow">About</div>
        <h1 className="section-headline">We started Axia Atlas because the agency model was broken.</h1>
      </div>

      <div className="about-section">
        <div className="about-inner">
          <h2 className="about-headline">The founding story</h2>
          <div className="about-body">
            <p>Amit Arbili founded Axia Atlas after watching too many good businesses get mediocre marketing results. Not because their agencies were lazy — but because the model was built around billing hours, not delivering growth.</p>
            <p>The typical agency relationship looks like this: you pay a retainer, you get a content calendar, you get a monthly report. Activity is delivered. Growth is not guaranteed. Six months later, you have a library of posts and no new clients.</p>
            <p>That model works for agencies. It doesn&apos;t work for businesses.</p>
            <p>Axia Atlas is built differently. Every engagement starts with strategy. Every tactic is selected because it compounds. Every month, we ask one question: is this building something that will work harder next month than it did this month?</p>
            <p>We don&apos;t take on clients whose growth we can&apos;t architect. We don&apos;t sell services that don&apos;t fit the business. And we don&apos;t disappear into a reporting dashboard — we work in your business, with you, until the signal compounds.</p>
          </div>
        </div>
      </div>

      <div className="about-section" style={{ background: 'var(--app-bg-light)' }}>
        <div className="about-inner">
          <h2 className="about-headline">&quot;To be found is to be seen.&quot;</h2>
          <div className="about-body">
            <p>That&apos;s the principle behind everything we build. Visibility that compounds — in search engines, in AI answers, in your market, in the mind of your ideal buyer — is the most durable competitive advantage a business can build.</p>
            <p>It&apos;s not glamorous. It&apos;s not fast. But it&apos;s real. And once it&apos;s built, it&apos;s yours.</p>
          </div>
          <div className="beliefs-grid">
            {[
              { n: '01', title: 'Outcomes over activity', desc: 'We measure success in pipeline, revenue, and compounding assets — not posts published or hours billed.' },
              { n: '02', title: 'Strategy before execution', desc: 'We don\'t start writing until we understand what you\'re building, who you\'re building it for, and how each tactic compounds.' },
              { n: '03', title: 'Intelligence before action', desc: 'We run data, read signals, and study your competitors before we recommend anything. Action without intelligence is just noise.' },
            ].map(b => (
              <div key={b.n} className="belief-card">
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
          <h2 className="about-headline">How we work</h2>
          <div className="about-body">
            <p>Every client engagement starts with a Growth Audit. We map your current marketing architecture, identify the signals you&apos;re missing, and design a 90-day growth plan built around compounding tactics.</p>
            <p>Then we execute — fast. No 30-day onboarding. No committee approvals. Work starts in week one.</p>
            <p>We operate as an extension of your team, not a vendor. You get direct access to the people doing the work. Monthly strategy calls, live dashboards, and clear attribution so you always know what&apos;s driving growth.</p>
            <p>We take on fewer clients than most agencies. Intentionally. It means we can go deep, not wide. And deep is what compounds.</p>
          </div>
          <div style={{ marginTop: 36 }}>
            <Link href="/contact" className="btn-primary">Work With Us →</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
