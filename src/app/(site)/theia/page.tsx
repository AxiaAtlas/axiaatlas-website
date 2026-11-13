import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import ShotSlot from '@/components/ShotSlot'
import ShotTabs from '@/components/theia/ShotTabs'
import TheiaMark, { TheiaLockup } from '@/components/TheiaMark'
import { JsonLd } from '@/components/service/Blocks'
import { social, SITE_URL } from '@/lib/seo'
import { PATHS, PORTAL_URL, PRIVACY_CLAIMS } from '@/lib/site'

/* ════════════════════════════════════════════════════════════════════════════
   /theia: THE CANONICAL PAGE FOR THEIA

   Follows the Theia design ("Theia Website", Claude Design) section for
   section: a sticky Theia bar with anchors, the centred hero over the wave,
   01 Ask Theia, 02 Theia Reports (tabbed, auto-advancing frame), 03 Teams,
   04 In the portal (tabbed frame beside the copy), three trust cards, the
   start block and the proprietary-product line. The page is a dark island in
   both site themes, as the design is.

   The design's words were written for the old agency (SEO, leads, rankings).
   They are rewritten here for investment campaigns, Theia Reports and Ask
   Theia, keeping each block's length and job. The trust cards say only what
   the platform's docs/security/privacy-claims.md allows.

   TITLE AND DESCRIPTION are shared with theia.axiaatlas.com, whose landing
   canonicalizes to this page (platform docs/theia/LANDING.md). The title is
   that file's word for word; it is the one page outside the site's
   "<keyword> - Axia Atlas" title format, on purpose. The description adds
   "proprietary" (house rule); the landing's copy in
   src/lib/share-links/theia-landing.ts must match it.
   ════════════════════════════════════════════════════════════════════════════ */

const TITLE = 'Theia: Everything in sight | Axia Atlas'
const DESCRIPTION =
  'Theia is the proprietary AI-powered analysis assistant in Axia Atlas investment campaign dashboards. Theia Reports and Ask Theia explain your numbers every day and recommend what to review next.'

const ANSWER =
  'Theia is the proprietary AI-powered analysis assistant built into Axia Atlas. With Ask Theia, you ask anything about your campaigns and your raise and get the answer in seconds: what changed, the numbers behind it, and what we recommend. With Theia Reports, your weekly and monthly investor decks build themselves in your brand.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATHS.theia },
  ...social({ title: TITLE, description: DESCRIPTION, path: PATHS.theia }),
}

const BUILDS = [
  { label: 'Weekly report', shot: 'reportWeekly' as const },
  { label: 'Monthly deck', shot: 'reportMonthly' as const },
  { label: 'Spreadsheet', shot: 'reportSheet' as const },
  { label: 'Chart', shot: 'reportChart' as const },
]

const PORTAL = [
  { label: 'Panel', shot: 'panel' as const },
  { label: 'Minimized', shot: 'launcher' as const },
  { label: 'Light theme', shot: 'light' as const },
]

export default function TheiaPage() {
  return (
    <div className="page th-page">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SoftwareApplication',
            '@id': `${SITE_URL}${PATHS.theia}#software`,
            name: 'Theia',
            alternateName: 'Theia by Axia Atlas',
            url: `${SITE_URL}${PATHS.theia}`,
            description: ANSWER,
            applicationCategory: 'BusinessApplication',
            applicationSubCategory: 'Analytics assistant',
            operatingSystem: 'Web browser',
            featureList: ['Ask Theia', 'Theia Reports'],
            isPartOf: { '@id': `${SITE_URL}/#software` },
            publisher: { '@id': `${SITE_URL}/#organization` },
            provider: { '@id': `${SITE_URL}/#organization` },
          },
          {
            '@type': 'WebPage',
            '@id': `${SITE_URL}${PATHS.theia}`,
            url: `${SITE_URL}${PATHS.theia}`,
            name: TITLE,
            description: DESCRIPTION,
            about: { '@id': `${SITE_URL}${PATHS.theia}#software` },
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
        ],
      }} />

      <div className="th-bg" aria-hidden="true" />

      {/* The design's sticky header, under the site nav. */}
      <nav className="th-bar" aria-label="On this page">
        <div className="th-bar-inner">
          <a href="#top" className="th-bar-brand" aria-label="Theia, back to top"><TheiaLockup className="th-bar-lockup" /></a>
          <div className="th-bar-links">
            <a href="#ask">Ask Theia</a>
            <a href="#reports">Theia Reports</a>
            <a href="#together">Teams</a>
            <a href="#anywhere">In the portal</a>
            <Link href={PATHS.demo} className="th-btn th-btn-solid th-btn-sm">Book a demo</Link>
          </div>
        </div>
      </nav>

      <section id="top" data-aa-section="theia.hero" className="th-sec th-hero">
        <TheiaMark className="th-mark" />
        <div className="th-kicker">Theia · inside Axia Atlas</div>
        <h1 className="th-h1">Theia: ask about your raise, get the investor report back.</h1>
        <p className="th-lead">{ANSWER}</p>
        <div className="th-actions">
          <Link href={PATHS.demo} className="th-btn th-btn-solid">Book a demo</Link>
          <a href="#reports" className="th-btn th-btn-line">See what she builds</a>
        </div>
        <div className="th-hero-frame">
          <ShotSlot id="theiaHero" caption={false} priority />
        </div>
      </section>

      <section id="ask" data-aa-section="theia.ask" className="th-sec">
        <div className="th-split th-split-end">
          <div>
            <div className="th-kicker">01 · Ask Theia</div>
            <h2 className="th-h2">Straight answers about your campaigns and your raise.</h2>
          </div>
          <p className="th-body">Ask in plain words, or speak. Theia shows what she is checking while she works, then answers with the figures, the campaigns and creatives behind them, and what we recommend reviewing next.</p>
        </div>
        <div className="th-grid-2">
          <ShotSlot id="askThinking" />
          <ShotSlot id="askAnswer" />
        </div>
        <div className="th-features">
          <div>
            <h3 className="th-feature-title">Voice or text</h3>
            <p>Talk to Theia from the composer, or type. Add files with the + menu.</p>
          </div>
          <div>
            <h3 className="th-feature-title">Follow-up questions</h3>
            <p>Every answer ends with three next questions specific to it, one click away.</p>
          </div>
          <div>
            <h3 className="th-feature-title">Take it with you</h3>
            <p>Copy it, save it to your Library, or download it as PDF, Excel or CSV.</p>
          </div>
        </div>
      </section>

      <section id="reports" data-aa-section="theia.reports" className="th-sec">
        <div className="th-center">
          <div className="th-kicker">02 · Theia Reports</div>
          <h2 className="th-h2">Your investor report builds itself while you watch.</h2>
          <p className="th-body">Press play and the weekly or monthly investor-ready deck builds from your live campaign and raise data, in your brand. Theia flags the slides that matter most that week, so your time goes to reviewing and presenting.</p>
        </div>
        <ShotTabs tabs={BUILDS} autoplay showCaption />

        <div className="th-split th-split-center th-point">
          <ShotSlot id="comment" caption={false} />
          <div>
            <h3 className="th-h3">Point at it. Theia changes it.</h3>
            <p className="th-body">Turn on Comment, click any part of the deck, and say what should change. Theia gets the exact element as context. Or edit by hand. It is the full editor.</p>
          </div>
        </div>
      </section>

      <section id="together" data-aa-section="theia.teams" className="th-sec">
        <div className="th-split th-split-end">
          <div>
            <div className="th-kicker">03 · Teams</div>
            <h2 className="th-h2">Everything you build, kept and shared.</h2>
          </div>
          <p className="th-body">Share a chat or a report with your team or your board, as viewers or editors. Everything Theia makes lands in your Library with a real preview, and the reports you schedule run on their own.</p>
        </div>
        <div className="th-grid-2">
          <ShotSlot id="share" />
          <ShotSlot id="library" />
          <ShotSlot id="scheduled" />
          <ShotSlot id="customize" />
        </div>
      </section>

      <section id="anywhere" data-aa-section="theia.portal" className="th-sec">
        <ShotTabs
          tabs={PORTAL}
          lead={
            <>
              <div className="th-kicker">04 · In the portal</div>
              <h2 className="th-h2">Full screen, or right beside your dashboards.</h2>
              <p className="th-body">Minimize Theia to a panel on any page of Axia Atlas, or to a single button. She follows the portal&apos;s theme, dark or light, and knows who you are and which raise you are working on.</p>
            </>
          }
        />
      </section>

      {/* Three cards, as in the design. Each sentence is from
          privacy-claims.md "May say" (rows 3, 8 and 9, 12). */}
      <section data-aa-section="theia.trust" className="th-sec">
        <h2 className="sr-only">How Theia handles your data</h2>
        <div className="th-trust">
          <div className="th-card">
            <h3 className="th-card-k">Masked</h3>
            <p>{PRIVACY_CLAIMS.r3} {PRIVACY_CLAIMS.r5}</p>
          </div>
          <div className="th-card">
            <h3 className="th-card-k">Encrypted</h3>
            <p>{PRIVACY_CLAIMS.r8} {PRIVACY_CLAIMS.r9}</p>
          </div>
          <div className="th-card">
            <h3 className="th-card-k">Not for training</h3>
            <p>{PRIVACY_CLAIMS.r12} {PRIVACY_CLAIMS.r6}</p>
          </div>
        </div>
      </section>

      <section id="start" data-aa-section="theia.start" className="th-sec th-start">
        <TheiaMark className="th-mark th-mark-sm" />
        <h2 className="th-h2 th-start-h">What are we working on?</h2>
        <p className="th-body">Theia is built into every Axia Atlas plan. See her answer questions about a demo raise, then ask your own.</p>
        <div className="th-actions">
          <Link href={PATHS.demo} className="th-btn th-btn-solid">Book a demo</Link>
          <a href={PORTAL_URL} className="th-btn th-btn-line">Open the portal</a>
        </div>
      </section>

      <div className="th-foot">
        <span>Theia™ is a proprietary product of Axia Atlas Inc. © {new Date().getFullYear()}</span>
      </div>

      <Footer />
    </div>
  )
}
