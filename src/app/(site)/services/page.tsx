import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { Arrow, ServiceIcons } from '@/components/icons'
import ServiceRouteLine from './ServiceRouteLine'

export const metadata: Metadata = {
  title: 'Services — Seven ways to get found',
  description:
    'Seven ways Axia Atlas gets you found and chosen: Social Media, Answer-Engine Optimization (GEO/AEO), SEO & Content, Local Presence, Founder Brand, Website Design, and Lead Generation.',
  alternates: { canonical: '/services' },
}

const SERVICES = [
  {
    id: 'social',
    headline: 'Social Media',
    desc: 'Most "social strategies" are just a posting schedule. We build the whole thing — which platforms fit you, what to say, how it looks — and grow an audience that actually buys, not just a feed that stays busy.',
    who: 'For brands and businesses ready to treat social as a real growth channel, B2B or B2C.',
    points: ['Platform strategy', 'Content planned monthly', 'Made for each platform', 'Community management'],
  },
  {
    id: 'geo',
    headline: 'Answer-Engine Optimization (GEO / AEO)',
    desc: "Your customers ask ChatGPT, Perplexity, and Gemini what to buy and who to hire. If the answer never mentions you, you never had a chance. We get you into those answers.",
    who: 'For any business whose buyers research online before they decide — brands, services, and founders alike.',
    points: ['Visibility audit', 'Content built to be cited', 'Technical setup', 'Citation tracking'],
  },
  {
    id: 'seo',
    headline: 'SEO & Content',
    desc: 'Good SEO pairs technical fundamentals with content that genuinely answers what people search for. We write and publish pages that rank, earn trust, and keep bringing in customers without paying per click.',
    who: "For businesses that want steady traffic and leads they don't have to rent from ad platforms.",
    points: ['Keyword research', 'Articles that rank', 'On-page optimization', 'Plain-English reporting'],
  },
  {
    id: 'local',
    headline: 'Local Presence',
    desc: 'If people find you by searching "near me" or tapping the map, local is the highest-return channel you have. We build the whole footprint so you own your area.',
    who: 'For clinics, trades, shops, restaurants, practices, and any business that serves a local or regional market.',
    points: ['Google Business Profile', 'Reviews that build trust', 'Local pages', 'Map-pack visibility'],
  },
  {
    id: 'executive',
    headline: 'Founder & Executive Brand',
    desc: 'People buy from people they trust. We turn the face of your business into a name buyers recognize before the first call — content in your own voice that builds authority instead of noise.',
    who: 'For founders, owners, and executives who are the front of their business.',
    points: ['Positioning & themes', 'Posts in your voice', 'Thought leadership', 'Engagement strategy'],
  },
  {
    id: 'website',
    headline: 'Website Design',
    desc: "Every channel you run sends people to your site. If it's slow, confusing, or off-brand, that traffic leaks away. We design fast, clear sites built around one job: turning visitors into customers.",
    who: "For businesses launching a new site or fixing one that looks fine but doesn't convert.",
    points: ['Conversion-first design', 'Copy & messaging', 'Technical foundation', 'Built for speed'],
  },
  {
    id: 'leadgen',
    headline: 'Lead Generation',
    desc: "Search and content compound over time. Outbound fills the pipeline now. We build targeted prospecting that finds your ideal customers and warms them up with messages that don't sound like spam.",
    who: 'For B2B and service businesses that know who their best customers are and want more conversations now.',
    points: ['Ideal-customer targeting', 'Researched prospect lists', 'Email + LinkedIn outreach', 'Pipeline you can see'],
  },
]

export default function ServicesPage() {
  return (
    <div className="page services-page">
      <div className="services-hero">
        <div className="section-eyebrow">Services</div>
        <h1 className="section-headline">Seven ways to get found.<br />One plan that fits together.</h1>
        <p className="section-sub">Start with one channel or build the full system. Either way, it begins with strategy — never random tactics.</p>
      </div>

      <div className="services-route">
        <ServiceRouteLine />
        {SERVICES.map((s) => {
          const Icon = ServiceIcons[s.id]
          return (
            <div key={s.id} id={s.id} className="service-detail">
              <div className="service-detail-inner">
                <div>
                  <div className="service-detail-label">
                    <span className="service-icon">{Icon && <Icon />}</span>
                  </div>
                  <h2 className="service-detail-headline">{s.headline}</h2>
                  <p className="service-detail-desc">{s.desc}</p>
                  <p className="service-who">{s.who}</p>
                  <div>
                    <Link href="/demo" className="btn-primary">Get Started <Arrow className="arr" /></Link>
                  </div>
                </div>
                <div className="service-points-col">
                  <div className="deliverables-title">In Practice</div>
                  <div className="service-points">
                    {s.points.map((p) => <span key={p} className="service-point">{p}</span>)}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <CtaBand
        eyebrow="Not sure where to start?"
        headline="We'll tell you what to do first."
        sub="Book a demo. We audit how you show up before the call, then walk you through the two or three channels that will pay off fastest."
      />

      <Footer />
    </div>
  )
}
