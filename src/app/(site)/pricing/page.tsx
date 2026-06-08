import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { Arrow, Check } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Pricing — Three tiers, scoped to you',
  description:
    'Three Axia Atlas tiers — Starter, Growth, and Authority — scoped to how fast you want to move. See what each includes; exact pricing is shared on your demo call.',
  alternates: { canonical: '/pricing' },
}

const TIERS = [
  {
    name: 'Starter',
    blurb: 'Get momentum on one or two channels and prove the model before you scale.',
    features: [
      'One or two channels (e.g. Local + SEO, or Social)',
      'Strategy and 90-day plan',
      'Monthly content and execution',
      'Core setup: profile, on-page, tracking',
      'Monthly report in plain English',
      'Email support',
    ],
    featured: false,
  },
  {
    name: 'Growth',
    blurb: 'A connected multi-channel system — our most popular tier for businesses ready to move.',
    features: [
      'Three to four channels working together',
      'Everything in Starter',
      'Answer-Engine Optimization (GEO/AEO) included',
      'Website or landing-page work',
      'Monthly strategy call',
      'Live dashboard and priority support',
    ],
    featured: true,
  },
  {
    name: 'Authority',
    blurb: 'Full-spectrum visibility, founder brand, and campaigns — for businesses that want to own their category.',
    features: [
      'Full channel coverage',
      'Everything in Growth',
      'Founder / executive brand program',
      'Campaign strategy and execution',
      'Lead generation, if it fits',
      'Senior strategist as your lead contact',
    ],
    featured: false,
  },
]

export default function PricingPage() {
  return (
    <div className="page pricing-page">
      <div className="pricing-hero">
        <div className="section-eyebrow">Pricing</div>
        <h1 className="section-headline">Three tiers. Pick your pace.</h1>
        <p className="section-sub">Every tier is a monthly partnership scoped to your goals. We share exact pricing on your demo call — we audit your presence beforehand, so once we understand what you need, you&apos;ll know precisely what it costs.</p>
      </div>

      <div className="pricing-grid">
        {TIERS.map((t) => (
          <div key={t.name} className={`pricing-card${t.featured ? ' featured' : ''}`}>
            {t.featured && <div className="pricing-flag">Most popular</div>}
            <div className="pricing-tier">{t.name}</div>
            <div className="pricing-amount">Custom <span>/ scoped to you</span></div>
            <p className="pricing-blurb">{t.blurb}</p>
            <ul className="pricing-features">
              {t.features.map((f) => <li key={f}><Check />{f}</li>)}
            </ul>
            <Link
              href="/demo"
              className={t.featured ? "btn-primary" : "btn-dark"}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Book a Demo <Arrow className="arr" />
            </Link>
          </div>
        ))}
      </div>

      <p className="pricing-note">
        No long lock-ins and no surprise add-ons. Pricing depends on the channels you choose and how much we&apos;re building — we&apos;ll quote it clearly on your demo call, and you decide from there.
      </p>

      <CtaBand
        eyebrow="Still deciding?"
        headline="Let's find the right tier together."
        sub="Tell us your goals and we'll recommend the smallest plan that gets you there — and exactly what it costs. No pressure to go bigger than you need."
      />

      <Footer />
    </div>
  )
}
