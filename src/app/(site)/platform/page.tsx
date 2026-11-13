import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import ShotSlot from '@/components/ShotSlot'
import TheiaMark from '@/components/TheiaMark'
import { Arrow } from '@/components/icons'
import { FaqList, JsonLd, PageHero, SectionHead, faqJsonLd } from '@/components/service/Blocks'
import { pageTitle, social, SITE_URL } from '@/lib/seo'
import { PATHS, PRODUCTS, faq } from '@/lib/site'

/* /platform: the investment platform, Live Campaigns and Raise Ledger, with
   Theia built in. Names from saas-copy.md section 0. No platform list: the
   pack marks it [VERIFY] against the live connectors. */

const NAME = 'Investment Campaign Dashboards and Raise Ledger'
const H1 = 'Investment Campaign Dashboards and Raise Ledger, in One View'
const DESCRIPTION =
  'Live Campaigns and Raise Ledger put every ad platform, affiliate and press buy behind your raise in one dashboard, set against reported investments.'

const ANSWER =
  'Axia Atlas is investment campaign analytics software. Live Campaigns shows every platform and every campaign in one dashboard, down to each creative and audience. Raise Ledger sets every dollar you spend, including affiliates, print and press, against the investments your raise platform reports, so cost per investor is clear by channel.'

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
  alternates: { canonical: PATHS.platform },
  ...social({ title: pageTitle(NAME), description: DESCRIPTION, path: PATHS.platform }),
}

const FAQ = faq('cost-per-investor', 'why-not-raise-platform', 'channels', 'ads', 'agencies')

export default function PlatformPage() {
  return (
    <div className="page sv-page">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_URL}${PATHS.platform}`,
        url: `${SITE_URL}${PATHS.platform}`,
        name: pageTitle(NAME),
        description: ANSWER,
        about: { '@id': `${SITE_URL}/#software` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      }} />
      <JsonLd data={faqJsonLd(FAQ.map((f) => ({ q: f.q, a: f.a })))} />

      <PageHero data-aa-section="platform.hero" eyebrow="The investment platform" title={H1} answer={ANSWER}>
        <Link href={PATHS.pricing} className="btn-outline">See the plans</Link>
      </PageHero>

      <section id="live-campaigns" data-aa-section="platform.live" className="sv-section g-raise">
        <div className="section-inner px-split">
          <div>
            <SectionHead
              eyebrow={PRODUCTS.live}
              title="Every ad platform and campaign in one live dashboard."
              lede="Connect the ad platforms behind your raise and see every campaign side by side, kept current, in one place."
            />
            <ul className="px-points">
              <li><strong>Start at the total.</strong> Spend, results and cost per investor across every platform, for any range you pick.</li>
              <li><strong>Drill down.</strong> Open a platform, then a campaign, then each creative and audience.</li>
              <li><strong>Every chart works.</strong> Each one opens, zooms and exports, with the prior period named by its range.</li>
              <li><strong>Prospecting and retargeting</strong> read separately, so you can see which one is bringing new investors.</li>
            </ul>
          </div>
          <ShotSlot id="liveOverview" />
        </div>
        <div className="section-inner px-figure-gap">
          <ShotSlot id="liveDrill" />
        </div>
      </section>

      <section id="raise-ledger" data-aa-section="platform.ledger" className="sv-section g-black">
        <div className="section-inner px-split flip">
          <div>
            <SectionHead
              eyebrow={PRODUCTS.ledger}
              title="Every dollar behind the raise, against every investment."
              lede="Raise Ledger is the one view no ad platform and no raise platform gives you: all of the spend, set against the investments actually reported."
            />
            <ul className="px-points">
              <li><strong>Paid platforms flow in on their own.</strong> No exports, no copy and paste.</li>
              <li><strong>Everything else goes in too.</strong> Affiliates, newspapers, print and press, entered by hand or imported.</li>
              <li><strong>Set against reported investments.</strong> Cost per investor and return, for each channel and in total.</li>
              <li><strong>Live and Manual, labeled.</strong> You always know which figures came from a platform and which were entered.</li>
            </ul>
          </div>
          <ShotSlot id="ledger" />
        </div>
        <div className="section-inner px-figure-gap">
          <ShotSlot id="ledgerManual" />
        </div>
      </section>

      <section data-aa-section="platform.theia" className="sv-section g-spruce">
        <div className="section-inner px-theia">
          <div>
            <TheiaMark className="px-theia-mark" />
            <SectionHead
              eyebrow="Built in"
              title="Theia reads both views and tells you what changed."
              lede="Theia, the proprietary AI-powered analysis assistant in Axia Atlas, answers questions about your campaigns and your raise in seconds and builds your weekly and monthly investor reports."
            />
            <Link href={PATHS.theia} className="btn-primary">Meet Theia <Arrow className="arr" /></Link>
          </div>
          <ShotSlot id="homeTheia" />
        </div>
      </section>

      <section data-aa-section="platform.principle" className="sv-section g-raise">
        <div className="section-inner sv-note">
          <SectionHead
            eyebrow="What we do not do"
            title="We never buy media or run your ads."
            lede="Axia Atlas presents, analyzes and recommends. Your team or your media buyer stays in control of every campaign and every budget. Theia recommends what to review or test; the decision is always yours."
          />
        </div>
      </section>

      <section data-aa-section="platform.faq" className="sv-section g-black">
        <div className="section-inner">
          <SectionHead eyebrow="Questions" title="About the platform." />
          <FaqList items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <CtaBand
        headline="See your raise in one view."
        sub="Book a demo. We walk you through Live Campaigns and Raise Ledger on a demo raise, then map your own channels."
      />
      <Footer />
    </div>
  )
}
