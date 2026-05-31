import Link from 'next/link'
import Footer from '@/components/Footer'

const SERVICES = [
  {
    id: 'social',
    icon: '📱',
    label: '01 — Social Media',
    headline: 'Social Media Strategy',
    tagline: 'From platform-specific content to full calendar management',
    desc: 'Most social media "strategies" are just posting schedules. We build architecture: platform selection, content pillars, voice, creative frameworks, and a system that compounds reach every month.',
    who: 'For: B2B and B2C businesses ready to invest in organic social as a growth channel.',
    deliverables: [
      'Platform strategy and channel selection',
      'Monthly content calendar (30+ posts)',
      'Platform-native content: LinkedIn, Instagram, X, Facebook',
      'Engagement and community management',
      'Monthly performance report with insights',
      'Trend monitoring and reactive content',
    ],
    tier: 'Starter / Growth / Authority',
  },
  {
    id: 'geo',
    icon: '🤖',
    label: '02 — GEO / AEO',
    headline: 'Generative Engine Optimisation',
    tagline: 'Get cited by ChatGPT, Perplexity, and Gemini',
    desc: 'AI models answer questions your buyers are asking right now. If you\'re not in those answers, you\'re invisible. We audit your citation gaps, build structured content, and get you into AI answers in 30–60 days.',
    who: 'For: Founders, agencies, consultants, and B2B service businesses who want to own AI search.',
    deliverables: [
      'AEO/GEO audit — identify your citation gaps',
      '6–12 structured articles targeting AI-indexed queries',
      'Schema markup and technical AEO setup',
      'Monthly citation tracking report',
      'Prompt engineering for featured AI answers',
      'Competitor citation analysis',
    ],
    tier: 'Growth / Authority',
  },
  {
    id: 'seo',
    icon: '✍️',
    label: '03 — SEO & Content',
    headline: 'SEO & Content Marketing',
    tagline: 'Long-form articles that rank, educate, and convert',
    desc: 'SEO in 2025 means combining technical excellence with content that actually answers buyer intent. We research, write, and publish articles that rank and build domain authority over time.',
    who: 'For: Businesses that want sustainable organic traffic without depending on paid ads.',
    deliverables: [
      'Keyword research and gap analysis',
      '4–8 long-form SEO articles per month (800–3,000 words)',
      'On-page optimisation for all content',
      'Internal linking architecture',
      'Monthly rankings and traffic report',
      'Content refresh strategy for existing pages',
    ],
    tier: 'Starter / Growth / Authority',
  },
  {
    id: 'local',
    icon: '📍',
    label: '04 — Local',
    headline: 'Local Digital Presence',
    tagline: 'Google Business Profile, citations, and review management',
    desc: 'For businesses that serve a local or regional market, local SEO is the highest-ROI channel available. We build complete local signal architecture: GBP, citations, reviews, and local content.',
    who: 'For: Service businesses, professional practices, retail, and any company with a physical location or local market.',
    deliverables: [
      'Google Business Profile setup and optimisation',
      'Local citation building (50+ directories)',
      'Review acquisition strategy and management',
      'Local landing pages with schema markup',
      'Competitor local ranking analysis',
      'Monthly local rankings report',
    ],
    tier: 'Starter / Growth',
  },
  {
    id: 'executive',
    icon: '👤',
    label: '05 — Executive Brand',
    headline: 'Executive Brand',
    tagline: 'LinkedIn authority for founders and executives',
    desc: 'The founders who win in 2025 are the ones buyers trust before they ever get on a call. We build that trust through LinkedIn content that establishes authority, not just presence.',
    who: 'For: Founders, partners, executives, and professionals who want to build a personal brand that drives business.',
    deliverables: [
      'LinkedIn profile optimisation',
      'Personal brand strategy and content pillars',
      '12–16 posts per month in founder voice',
      'Thought leadership articles',
      'Engagement and connection strategy',
      'Monthly analytics: reach, followers, inbound leads',
    ],
    tier: 'Growth / Authority',
  },
  {
    id: 'website',
    icon: '🌐',
    label: '06 — Website',
    headline: 'Website Design',
    tagline: 'Conversion-optimised, direct-response websites',
    desc: 'Your website is the floor, not the ceiling. It should convert traffic from every channel you operate. We design sites built on direct-response principles — no bloat, just strategy, speed, and conversion.',
    who: 'For: Businesses launching new sites or redesigning an underperforming site.',
    deliverables: [
      'Strategy session: buyer journey mapping',
      'Conversion-focused website design and development',
      'Copywriting and messaging architecture',
      'SEO technical foundation',
      'Page speed and Core Web Vitals optimisation',
      'CMS setup and content management training',
    ],
    tier: 'Growth / Authority',
  },
  {
    id: 'campaigns',
    icon: '🎯',
    label: '07 — Campaigns',
    headline: 'Campaign Strategy & Execution',
    tagline: 'Full campaign strategy, creative, and execution',
    desc: 'Seasonal campaigns, product launches, event promotions — we plan and execute integrated campaigns across every channel you operate: social, email, ads, and PR.',
    who: 'For: Businesses with a key event, launch, or seasonal moment that needs full-channel execution.',
    deliverables: [
      'Campaign strategy and creative brief',
      'Multi-channel content creation (social, email, ads)',
      'Ad copy and creative for paid channels',
      'Landing page or microsite copy',
      'Campaign reporting and post-mortem',
      'Retargeting content and sequences',
    ],
    tier: 'Growth / Authority',
  },
  {
    id: 'leadgen',
    icon: '🔍',
    label: '08 — Lead Generation',
    headline: 'Lead Generation',
    tagline: 'Outbound systems that find and warm your ideal clients',
    desc: 'Inbound takes time to compound. Outbound fills the pipeline now. We build targeted prospecting systems: ICP definition, list building, personalised outreach sequences, and warm-up strategy.',
    who: 'For: B2B businesses with a defined ideal client profile who need pipeline growth now.',
    deliverables: [
      'ICP definition and targeting criteria',
      'Prospect list building (250–500 verified contacts)',
      'Outreach sequence (email + LinkedIn, 5-step)',
      'Personalisation playbook',
      'A/B testing of subject lines and messaging',
      'Weekly pipeline report',
    ],
    tier: 'Starter / Growth / Authority',
  },
]

export default function ServicesPage() {
  return (
    <div className="page">
      <div className="services-hero">
        <div className="section-eyebrow">Services</div>
        <h1 className="section-headline">Eight services.<br />One growth architecture.</h1>
        <p className="section-sub">Each service is designed to compound. Most clients combine 3–4 for full-spectrum growth.</p>
      </div>

      {SERVICES.map((s, i) => (
        <div key={s.id} id={s.id} className="service-detail">
          <div className="service-detail-inner">
            <div>
              <div className="service-detail-label">{s.label}</div>
              <h2 className="service-detail-headline">{s.headline}</h2>
              <p className="service-detail-desc">{s.desc}</p>
              <p className="service-who">{s.who}</p>
              <div className="service-tier-badge">Available in: {s.tier}</div>
              <br />
              <Link href="/contact" className="btn-primary">Get Started →</Link>
            </div>
            <div>
              <div className="deliverables-title">What You Get</div>
              <ul className="deliverables-list">
                {s.deliverables.map(d => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ))}

      <section className="cta-section">
        <div className="section-eyebrow">Not sure where to start?</div>
        <h2 className="section-headline">Let us map your architecture.</h2>
        <p className="section-sub">A free 30-minute audit call. We review what you have, identify the gaps, and recommend the 2–3 services that will compound fastest for your business.</p>
        <Link href="/contact" className="btn-primary" style={{ background: 'var(--bone)', color: 'var(--midnight)' }}>Book a Free Audit →</Link>
      </section>

      <Footer />
    </div>
  )
}
