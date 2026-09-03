import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Arrow, Check } from '@/components/icons'
import { pageTitle, social } from '@/lib/seo'

const DESCRIPTION =
  'Three Axia Atlas tiers — Starter, Growth, and Authority — scoped to how fast you want to move. See what each includes; exact pricing is shared on your demo call.'

export const metadata: Metadata = {
  title: 'Digital Marketing Pricing and Packages',
  description: DESCRIPTION,
  alternates: { canonical: '/pricing' },
  ...social({ title: pageTitle('Digital Marketing Pricing and Packages'), description: DESCRIPTION, path: '/pricing' }),
}

const TIERS = [
  {
    name: 'Starter',
    blurb: 'Get momentum on one or two channels and prove the model before you scale.',
    features: [
      'One or two channels (e.g. Local Presence & Maps, or Social)',
      'Strategy and 90-day plan',
      'Monthly content and execution',
      'Core setup: profile, on-page, tracking',
      'Monthly report in plain English',
      'Email support',
    ],
    featured: false,
    cta: 'Start with Starter',
  },
  {
    name: 'Growth',
    blurb: 'A connected multi-channel system — our most popular tier for businesses ready to move.',
    features: [
      'Three to four channels working together',
      'Everything in Starter',
      'Answer Engine Optimization (AEO) included',
      'Website or landing-page work',
      'Monthly strategy call',
      'Live dashboard and priority support',
    ],
    featured: true,
    cta: 'Scope a Growth plan',
  },
  {
    name: 'Authority',
    blurb: 'Full-spectrum visibility, founder brand, and campaigns — for businesses that want to own their category.',
    features: [
      'Full channel coverage',
      'Everything in Growth',
      'Executive personal brand program',
      'Campaign strategy and execution',
      'Lead generation, if it fits',
      'Senior strategist as your lead contact',
    ],
    featured: false,
    /* NOT "Talk about Authority". A top tier's objection is commitment, not
       curiosity: the reader who has got this far already believes the tier is
       good, and is weighing whether clicking starts something they cannot back
       out of. "Talk about X" answers that with a meeting. "Explore your
       options" answers it with a look around — and it is the only one of the
       three CTAs that promises the reader nothing is being decided.

       The two it beat, kept here so the next pass does not re-run the argument:
       "Explore full coverage" (same verb, names what Authority is, but "full"
       re-raises the size question the tier already loses on) and "Own your
       category" (strongest line, straight out of the tier's own blurb, but it
       is a claim on a button — the loudest promise on the page sitting under
       the tier that is hardest to say yes to). */
    cta: 'Explore your options',
  },
]

export default function PricingPage() {
  return (
    <div className="page pricing-page">
      <div className="pricing-hero">
        <div className="section-eyebrow">Pricing</div>
        <h1 className="section-headline">Digital Marketing Packages, Priced in Three Clear Tiers</h1>
      </div>

      <div className="pricing-grid">
        {TIERS.map((t) => (
          <div key={t.name} className={`pricing-card${t.featured ? ' featured' : ''}`}>
            {t.featured && <div className="pricing-flag">Most popular</div>}
            <h2 className="pricing-tier">{t.name}</h2>
            <div className="pricing-amount">Custom <span>/ scoped to you</span></div>
            <p className="pricing-blurb">{t.blurb}</p>
            <ul className="pricing-features">
              {t.features.map((f) => <li key={f}><Check />{f}</li>)}
            </ul>
            <Link
              href="/demo"
              className={t.featured ? 'btn-primary' : 'btn-outline'}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {t.cta} <Arrow className="arr" />
            </Link>
          </div>
        ))}
      </div>

      <p className="pricing-note">
        No long lock-ins and no surprise add-ons. Pricing depends on the channels you choose and how much we&apos;re building — we&apos;ll quote it clearly on your demo call, and you decide from there.
      </p>

      <Footer />
    </div>
  )
}
