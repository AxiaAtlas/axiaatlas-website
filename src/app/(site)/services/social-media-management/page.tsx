import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { ArtSocial } from '@/components/artifacts/ChannelArtifacts'
import { PageHero, SectionHead, TierCards, AddonList, FaqList, JsonLd, faqJsonLd, type Faq } from '@/components/service/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { serviceName, serviceHref, HEADLINE_PAGES } from '@/lib/services'
import { ADDON_BLURB, SERVICE_ADDON_COPY } from '@/lib/service-copy'
import { CURRENCY, addOnPrice, addOnsFor, money, monthsWord, pricingFor, range, tierNotes } from '@/lib/pricing'

/* ── SOCIAL MEDIA MANAGEMENT ─────────────────────────────────────────────────
   Tier names, monthly prices, the minimum term, meeting and reporting cadence
   and every add-on come from the platform (lib/pricing). Organic only: this
   page says plainly that Axia does not buy or manage ads. */

const PATH = HEADLINE_PAGES.social
const NAME = serviceName('social')
const S = pricingFor('social')
const [LO, HI] = range('social', 'monthly')
const TERM = S.minTermMonths ? monthsWord(S.minTermMonths) : null

const TITLE = 'Social Media Management for Growing Brands'
const H1 = 'Social Media Management, Planned, Published and Answered'

const ANSWER =
  `Axia Atlas runs your social media from plan to reply. We choose the two or three platforms worth your time, ` +
  `set the content pillars, produce and publish natively for each, and answer comments and messages. ` +
  `Plans run from ${money(LO)} to ${money(HI)} a month` + (TERM ? ` on a ${TERM}-month minimum.` : '.')

const DESCRIPTION =
  `Social media management from ${money(LO)} to ${money(HI)} a month: platform choice, content pillars, native production, publishing and community management.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  ...social({ title: pageTitle(TITLE), description: DESCRIPTION, path: PATH }),
}

const STEPS = [
  { title: 'Pick the platforms', desc: 'Each platform rewards something different: a hook in the first second on TikTok, a defensible opinion on LinkedIn, a look you can recognize at thumbnail size on Instagram. We pick the two or three worth your time and ignore the rest.' },
  { title: 'Set the pillars', desc: 'A handful of recurring content pillars, so the account says one thing consistently instead of a new thing every week.' },
  { title: 'Produce and publish', desc: 'Posts, photos and short video made for each platform natively, then scheduled and published. A month arrives as a plan you approve before anything goes live.' },
  { title: 'Answer the comments', desc: 'We work the comments and messages: answering buying questions in public, and handling complaints so the thread reads as evidence you are good to deal with.' },
]

const FAQ: Faq[] = [
  {
    q: 'How much does social media management cost?',
    a: `${S.tiers.map((t) => `${t.label} is ${money(t.monthly)} a month`).join(', ')}.` +
      (TERM ? ` Every plan has a ${TERM}-month minimum, so the channel has time to compound.` : ''),
  },
  {
    q: 'Which platforms do you manage?',
    a: 'The two or three your buyers actually use, chosen with you on the demo call: usually some mix of Instagram, LinkedIn, TikTok, Facebook and YouTube. More platforms can be added to any plan.',
  },
  {
    q: 'Do you run or manage paid ads?',
    a: 'No. Social Media Management is organic: planning, content, publishing and community management. We do not buy ads or manage ad spend.',
  },
  {
    q: 'How often do we meet and get reports?',
    a: S.tiers.map((t) => `${t.label}: meetings ${t.meetingCadence?.toLowerCase() ?? 'as agreed'}, reports ${t.reportingCadence?.toLowerCase() ?? 'as agreed'}`).join('. ') + '.',
  },
]

const SERVICE_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}${PATH}#service`,
  name: NAME,
  serviceType: 'Social media management',
  url: `${SITE_URL}${PATH}`,
  description: ANSWER,
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  offers: S.tiers.map((t) => ({
    '@type': 'Offer', name: `${NAME}: ${t.label}`, price: t.monthly, priceCurrency: CURRENCY,
    priceSpecification: { '@type': 'UnitPriceSpecification', price: t.monthly, priceCurrency: CURRENCY, unitCode: 'MON' },
  })),
}

export default function SocialMediaPage() {
  return (
    <div className="page sv-page">
      <JsonLd data={SERVICE_LD} />
      <JsonLd data={faqJsonLd(FAQ)} />

      <PageHero section="social.hero" eyebrow={NAME} title={H1} answer={ANSWER}>
        <Link href="#tiers" className="btn-outline">See the plans</Link>
      </PageHero>

      <section data-aa-section="social.how" className="sv-section g-raise">
        <div className="section-inner sv-split">
          <div>
            <SectionHead
              eyebrow="How it works"
              title="One Plan, One Voice, on the Platforms That Matter"
              lede="Publishing stops depending on who has time this week. A month arrives as a plan, in one voice, with the comments and messages answered."
            />
            <ol className="sv-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="sv-step">
                  <span className="sv-step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="sv-step-title">{s.title}</h3>
                    <p className="sv-step-desc">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="sv-figure" aria-hidden="true"><ArtSocial /></div>
        </div>
      </section>

      <section data-aa-section="social.tiers" className="sv-section g-black" id="tiers">
        <div className="section-inner">
          <SectionHead
            eyebrow="Plans"
            title="Three Social Media Plans, Billed Monthly"
            lede={`The plan sets how much we publish and how often we meet and report.${TERM ? ` Every plan has a ${TERM}-month minimum.` : ''}`}
          />
          <TierCards
            tiers={S.tiers.map((t) => ({ name: t.label, amount: money(t.monthly), unit: '/mo', notes: tierNotes(t) }))}
          />
        </div>
      </section>

      <section data-aa-section="social.addons" className="sv-section g-raise">
        <div className="section-inner">
          <SectionHead eyebrow="Add to a plan" title="Social Media Add-Ons for Launches and Growth" />
          <AddonList
            rows={addOnsFor('social').map((a) => ({
              key: a.key,
              name: SERVICE_ADDON_COPY[a.key]?.label ?? a.label,
              price: addOnPrice(a),
              what: SERVICE_ADDON_COPY[a.key]?.what ?? '',
            }))}
          />
        </div>
      </section>

      <section data-aa-section="social.ads-note" className="sv-section sv-note-section g-black">
        <div className="section-inner sv-note">
          <h2 className="sv-note-title">We Do Not Run or Manage Ads</h2>
          <p>Social Media Management is organic. If you run ads yourself, keep running them: we can build a dashboard that shows how they perform next to everything else, but the spend, the targeting and the campaigns stay yours.</p>
          <Link href={serviceHref('dashboards')} className="service-link">About custom dashboards</Link>
        </div>
      </section>

      <section data-aa-section="social.pairs" className="sv-section g-raise">
        <div className="section-inner">
          <SectionHead eyebrow="Pairs well with" title="Turn an Audience Into Conversations and Leads" />
          <AddonList
            rows={(['executive', 'leadgen'] as const).map((id) => ({
              key: id, name: serviceName(id), price: `From ${money(range(id, 'monthly')[0])} a month`,
              what: ADDON_BLURB[id], href: serviceHref(id),
            }))}
          />
        </div>
      </section>

      <section data-aa-section="social.faq" className="sv-section faq-section g-black">
        <div className="section-inner">
          <SectionHead eyebrow="Questions" title="Social Media Management Questions, Answered" />
          <FaqList items={FAQ} />
        </div>
      </section>

      <CtaBand
        headline="Ready to be seen in the feed?"
        sub="Book a demo. Before the call we audit your accounts and your competitors' feeds, then show you the plan we would run."
      />
      <Footer />
    </div>
  )
}
