import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Arrow, Check } from '@/components/icons'
import { pageTitle, social } from '@/lib/seo'

const DESCRIPTION =
  'Three Axia Atlas tiers — Starter, Growth, and Command — scoped to how fast you want to move. See what each includes; exact pricing is shared on your demo call.'

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
    name: 'Command',
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
    /* NOT "Talk about Command". A top tier's objection is commitment, not
       curiosity: the reader who has got this far already believes the tier is
       good, and is weighing whether clicking starts something they cannot back
       out of. "Talk about X" answers that with a meeting. "Explore your
       options" answers it with a look around — and it is the only one of the
       three CTAs that promises the reader nothing is being decided.

       The two it beat, kept here so the next pass does not re-run the argument:
       "Explore full coverage" (same verb, names what Command is, but "full"
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

      {/* ── CLIENT DASHBOARDS — A BAND, NOT A FOURTH CARD ──────────────────
          A fourth card in that grid would say "fourth rung of the same
          ladder", and that is exactly the wrong claim. Starter, Growth, and
          Command are three sizes of one thing: channels, bought monthly,
          scoped to how fast you want to move. A client dashboard is not a
          bigger version of any of them — it is software built for the client's
          own operation, it is not a way to be found, and it is priced on a
          shape the ladder does not have. Putting it beside the three would
          have made a reader compare it to Command, which is the one
          comparison that teaches them nothing true.

          A band reads as "and separately", which is the relationship.

          NO FIGURES. Same rule as the three cards above and the same reason:
          the build fee, the monthly, and the term all live in the platform's
          SERVICES table, which is the source of truth and moves without this
          repo. What this band publishes is the SHAPE of the price — that there
          is a build fee, that the monthly buys upkeep rather than hosting, and
          that there is a term — because the shape is what a reader needs to
          know before a call and it is the part that does not move.

          WEBSITE DESIGN & BUILD IS NOT IN HERE, and it is the same shape: a
          build fee, then a monthly, sold outside the three tiers. That it is
          not represented on this page is a real gap, and closing it is a
          separate decision rather than something to slip in beside this one. */}
      <section className="pricing-band" aria-labelledby="pricing-band-head">
        <div className="pricing-band-inner">
          <div className="pb-copy">
            <div className="section-eyebrow">Outside the tiers</div>
            <h2 className="pb-head" id="pricing-band-head">Client Dashboards are priced on a different shape.</h2>
            <p className="pb-lede">
              The three plans above buy channels, month to month. A client dashboard is software
              built for your own operation — it sits behind your login and is indexed by nobody —
              so it is quoted the way software is quoted, not slotted into a tier.
            </p>
            <div className="pb-links">
              <Link href="/services#dashboards" className="btn-outline">What it is <Arrow className="arr" /></Link>
              <Link href="/demo" className="btn-primary">Scope a build <Arrow className="arr" /></Link>
            </div>
          </div>
          <dl className="pb-terms">
            <div className="pb-term">
              <dt>Build fee</dt>
              <dd>Scoped to the views you actually run on and the systems they have to read from. Quoted once, in full, before anything starts.</dd>
            </div>
            <div className="pb-term">
              <dt>Monthly</dt>
              <dd>Integration upkeep. Your store admin, your CRM, and your spreadsheet all change underneath a dashboard, and the mapping has to change with them. This is not hosting.</dd>
            </div>
            <div className="pb-term">
              <dt>Minimum term</dt>
              <dd>A dashboard is retained, not delivered. Keeping it right as your tools move is the work, so it is bought for a term rather than signed off at handover.</dd>
            </div>
          </dl>
        </div>
      </section>

      <p className="pricing-note">
        No long lock-ins and no surprise add-ons. Pricing depends on the channels you choose and how much we&apos;re building — we&apos;ll quote it clearly on your demo call, and you decide from there.
      </p>

      <Footer />
    </div>
  )
}
