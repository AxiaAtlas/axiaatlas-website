import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Arrow, Check, ServiceIcons } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Services — Eight ways to get found',
  description:
    'Eight ways Axia Atlas gets you found and chosen: Social Media, Answer-Engine Optimization (GEO/AEO), SEO & Content, Local Presence, Founder Brand, Website Design, Campaigns, and Lead Generation.',
  alternates: { canonical: '/services' },
}

const SERVICES = [
  {
    id: 'social',
    label: '01 — Social Media',
    headline: 'Social Media',
    desc: 'Most "social strategies" are just a posting schedule. We build the whole thing: which platforms fit you, what to say, how it looks, and a steady stream of content that actually grows an audience — not just a feed that stays busy.',
    who: 'For brands and businesses ready to treat social as a real growth channel, B2B or B2C.',
    deliverables: [
      'Platform and channel strategy',
      'Monthly content calendar (30+ posts)',
      'Content made for each platform: Instagram, LinkedIn, TikTok, Facebook, X',
      'Community management and replies',
      'Trend-driven, reactive content',
      'Monthly report in plain English',
    ],
    tier: 'Starter, Growth, Authority',
  },
  {
    id: 'geo',
    label: '02 — Answer Engines',
    headline: 'Answer-Engine Optimization (GEO / AEO)',
    desc: "Your customers ask ChatGPT, Perplexity, and Gemini what to buy and who to hire. If the answer never mentions you, you never had a chance. We find where you're missing, publish content built to be quoted, and get you into those answers.",
    who: 'For any business whose buyers research online before they decide — brands, services, and founders alike.',
    deliverables: [
      'Answer-engine visibility audit — where you\'re missing and why',
      '6–12 articles built to be cited by answer engines',
      'Schema markup and technical setup',
      'Citation tracking, month over month',
      'Question-and-answer content for your category',
      'Competitor citation analysis',
    ],
    tier: 'Growth, Authority',
  },
  {
    id: 'seo',
    label: '03 — SEO & Content',
    headline: 'SEO & Content',
    desc: 'Good SEO today means pairing technical fundamentals with content that genuinely answers what people are searching for. We research, write, and publish pages that rank, build trust, and keep bringing in customers without you paying per click.',
    who: "For businesses that want steady traffic and leads they don't have to rent from ad platforms.",
    deliverables: [
      'Keyword and opportunity research',
      '4–8 articles per month (800–3,000 words)',
      'On-page optimization for every page',
      'Internal linking structure',
      'Refresh plan for existing pages',
      'Monthly rankings and traffic report',
    ],
    tier: 'Starter, Growth, Authority',
  },
  {
    id: 'local',
    label: '04 — Local',
    headline: 'Local Presence',
    desc: 'If people find you by searching "near me" or tapping the map, local is the highest-return channel you have. We build the whole local footprint — profile, citations, reviews, and local pages — so you own your area.',
    who: 'For clinics, trades, shops, restaurants, practices, and any business that serves a local or regional market.',
    deliverables: [
      'Google Business Profile setup and optimization',
      'Local citations across 50+ directories',
      'Review strategy and management',
      'Local landing pages with schema',
      'Map-pack ranking analysis',
      'Monthly local rankings report',
    ],
    tier: 'Starter, Growth',
  },
  {
    id: 'executive',
    label: '05 — Founder Brand',
    headline: 'Founder & Executive Brand',
    desc: 'People buy from people they trust. We turn the face of your business into a name buyers recognize before the first call — through content in your own voice that builds authority instead of just adding noise.',
    who: 'For founders, owners, and executives who are the front of their business.',
    deliverables: [
      'LinkedIn profile and positioning',
      'Personal brand strategy and themes',
      '12–16 posts per month in your voice',
      'Thought-leadership articles',
      'Engagement and connection strategy',
      'Monthly reach, follower, and inbound report',
    ],
    tier: 'Growth, Authority',
  },
  {
    id: 'website',
    label: '06 — Website',
    headline: 'Website Design',
    desc: "Every channel you run sends people to your site. If it's slow, confusing, or off-brand, that traffic leaks away. We design fast, clear sites built around one job: turning visitors into customers.",
    who: "For businesses launching a new site or fixing one that looks fine but doesn't convert.",
    deliverables: [
      'Strategy session and buyer-journey mapping',
      'Conversion-focused design and build',
      'Copywriting and messaging',
      'Technical SEO foundation',
      'Speed and Core Web Vitals tuning',
      'CMS setup and training',
    ],
    tier: 'Growth, Authority',
  },
  {
    id: 'campaigns',
    label: '07 — Campaigns',
    headline: 'Campaigns',
    desc: 'A launch, a season, a big event — some moments deserve a real push. We plan and run integrated campaigns across every channel you use: social, email, ads, and landing pages, all pointed at one goal.',
    who: 'For brands and businesses with a launch, promotion, or seasonal moment that needs full-channel firepower.',
    deliverables: [
      'Campaign strategy and creative brief',
      'Content across social, email, and ads',
      'Ad copy and creative for paid channels',
      'Landing page or microsite copy',
      'Retargeting sequences',
      'Campaign reporting and recap',
    ],
    tier: 'Growth, Authority',
  },
  {
    id: 'leadgen',
    label: '08 — Lead Generation',
    headline: 'Lead Generation',
    desc: 'Search and content compound over time. Outbound fills the pipeline now. We build targeted prospecting that finds your ideal customers and warms them up with messages that don\'t sound like spam.',
    who: 'For B2B and service businesses that know who their best customers are and want more conversations now.',
    deliverables: [
      'Ideal-customer profile and targeting',
      '250–500 verified, researched contacts',
      'Five-step outreach (email + LinkedIn)',
      'Personalization playbook',
      'A/B testing on subject lines and messaging',
      'Weekly pipeline report',
    ],
    tier: 'Starter, Growth, Authority',
  },
]

export default function ServicesPage() {
  return (
    <div className="page services-page">
      <div className="services-hero">
        <div className="section-eyebrow">Services</div>
        <h1 className="section-headline">Eight ways to get found.<br />One plan that fits together.</h1>
        <p className="section-sub">Start with one channel or build the full system. Either way, it begins with strategy — never random tactics.</p>
      </div>

      {SERVICES.map((s) => {
        const Icon = ServiceIcons[s.id]
        return (
          <div key={s.id} id={s.id} className="service-detail">
            <div className="service-detail-inner">
              <div>
                <div className="service-detail-label">
                  <span className="service-icon">{Icon && <Icon />}</span>
                  {s.label}
                </div>
                <h2 className="service-detail-headline">{s.headline}</h2>
                <p className="service-detail-desc">{s.desc}</p>
                <p className="service-who">{s.who}</p>
                <div className="service-tier-badge">Available in: {s.tier}</div>
                <div>
                  <Link href="/demo" className="btn-primary">Get Started <Arrow className="arr" /></Link>
                </div>
              </div>
              <div>
                <div className="deliverables-title">What You Get</div>
                <ul className="deliverables-list">
                  {s.deliverables.map((d) => <li key={d}><Check />{d}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )
      })}

      <section className="cta-section">
        <div className="cta-inner">
          <div className="section-eyebrow">Not sure where to start?</div>
          <h2 className="section-headline">We&apos;ll tell you what to do first.</h2>
          <p className="section-sub">Book a free 30-minute audit. We review what you have, find the gaps, and recommend the two or three channels that will pay off fastest for your business.</p>
          <Link href="/demo" className="btn-primary">Book a Free Audit <Arrow className="arr" /></Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
