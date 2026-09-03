import Link from 'next/link'
import { getCaseStudies } from '@/lib/case-studies'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import ResultsSlider, { type CaseItem } from '@/components/ResultsSlider'
import { Arrow, ServiceIcons } from '@/components/icons'
import BrandMarquee from '@/components/BrandMarquee'
import PortalShot from '@/components/PortalShot'
import SerpGap from '@/components/artifacts/SerpGap'
import AuditPreview from '@/components/artifacts/AuditPreview'

/* The results are read at render, so the page has to be allowed to re-render.
   It was fully static because the CASES array made the read decorative; now
   the read is the only source and a static page would freeze the slider at
   whatever the table held on the last deploy. Same hour as the other
   database-backed pages (/about, /blog). */
export const revalidate = 3600

/* SIX OF THE EIGHT, in the live site's order, because "View all 8 services"
   has to lead somewhere that holds more than the page already showed.
   Executive Personal Brand and Strategic Advisory & Embedded Thinking live on
   /services (anchors #executive, #strategy) and in the footer.

   TWO OF THE SIX ARE EMPHASISED, and no card carries an artifact. The previous
   pass flattened this block to a uniform 3x2 because the version before it was
   eight tiles each with its own small drawing — the busiest thing on the page.
   Flat fixed the noise and lost the argument: six identical cards say the six
   services are interchangeable, which is the opposite of what the page is for.
   The emphasis is scale alone, not a graphic. `emphasis` cells span two of four
   columns and lay their copy out beside the mark instead of under it; 2x2 + 4x1
   is exactly two rows of four, so the grid still tiles.

   WHICH TWO, AND WHY THOSE. Website Design & Build, because /services already
   calls it "the core engagement and the one every other channel points traffic
   at" — the page should not rank it level with the rest while the services page
   ranks it first. And Answer Engine Optimization, which is the service the
   brand is built around: the hero names answer engines, the ticker names four
   of them, the System card runs a whole marquee of their logos, and the audit
   card's second row is Answer Engines. Local Presence & Maps holds an ordinary
   cell — it is a strong service, but it is not one of the two the rest of the
   page is already arguing for. */
const SERVICES = [
  { id: 'social', name: 'Social Media Management', desc: 'Content built for each platform, managed end to end, designed to grow an audience that actually buys.', href: '/services#social' },
  { id: 'intel', name: 'Competitive Intelligence', desc: "Every competitor's positioning, cadence, and visibility tracked and sourced, so you decide on facts rather than hunches.", href: '/services#intel' },
  { id: 'website', name: 'Website Design & Build', desc: 'Positioning, copy, design, and build in one engagement, with search foundations laid from day one.', href: '/services#website', emphasis: true },
  /* "Local Presence & Maps", not "& SEO". The service catalogue in
     app/layout.tsx renamed it; this card and the /services row were the two
     places still carrying the old name, so the site contradicted its own
     structured data. */
  { id: 'local', name: 'Local Presence & Maps', desc: 'Profile, citations, and reviews managed so nearby buyers find you first, not the business down the road.', href: '/services#local' },
  { id: 'geo', name: 'Answer Engine Optimization (AEO)', desc: 'Get cited across leading AI platforms—Claude, ChatGPT, Perplexity, and Gemini—represented accurately and recommended when buyers search your category.', href: '/services#geo', emphasis: true },
  { id: 'leadgen', name: 'Lead Generation', desc: 'Prospects researched against your ideal customer, reached with outreach written for them, tracked from first touch onward.', href: '/services#leadgen' },
]

/* THE TICKER, BACK TO ONE LINE. It was two rows of search-field chips travelling
   in opposite directions, each with a magnifier and a blinking caret — three
   competing motions and a flashing pipe in the middle of the fold. The live
   site's strip is one row of plain phrases separated by a small rotated square,
   and it is better: it reads as a passing list of moments, which is what it is,
   and it stops fighting the section under it. Same ten phrases, same order. */
const MARQUEE = [
  'Searched on Google',
  'Asked on ChatGPT',
  '#1 in the map pack',
  'Cited by Perplexity',
  'Recommended over the competition',
  'Recommended by Gemini',
  'Trusted on LinkedIn',
  'Named by Claude',
  'Discovered on TikTok',
  'Reviews checked before they call',
]

/* The four process stages, drawn as stations on a rail rather than four boxes. */
const PROCESS = [
  { n: '01', title: 'Audit', desc: "We map where you show up today, where you don't, and where the fastest wins are hiding." },
  { n: '02', title: 'Plan', desc: 'A clear 90-day plan: which channels, in what order, measured against goals you care about.' },
  { n: '03', title: 'Build', desc: 'No 30-day warm-up. Work starts in week one and you see real output fast.' },
  { n: '04', title: 'Grow', desc: 'Monthly reviews, plain-English reporting, and steady tuning until every channel pays off.' },
]

export default async function HomePage() {
  /* Eight at most, and no in-code set behind them: the slider shows what
     case_studies publishes, in sort_order. The five that used to sit in this
     file as a CASES array are rows now (migration 004), word for word, and the
     `>= 5` gate went with them -- a threshold only exists to choose between
     two sources. See lib/case-studies.ts. */
  const slides = await getCaseStudies(8)

  return (
    <div className="page">

      {/* ══ HERO ══ ground: near-black · heading: left ═════════════════════
          The pitch left, the thing the CTA produces right.

          THE ARTIFACT IS THE AUDIT, not the portal. The hero's button is "Book
          a Demo" and the audit is literally what booking one gets you, so the
          artifact sits directly under the button that produces it. The portal
          shot it replaced has moved down to How We Work, where the section is
          about the work rather than about the offer.

          IT NO LONGER CARRIES A SAMPLE LABEL, and every row now prints its
          percentage. See the notes in AuditPreview.tsx and Illustrative.tsx:
          the disclaimer was answering a charge nobody makes of a hero
          illustration, and it read as an apology for the graphic.

          THE CAPABILITY LIST IS GONE. "Built to be found in" over Google Search
          / Answer Engines / Local & Maps / Social Feeds sat where a visitor has
          been trained to find customer logos, so it read as proof and delivered
          none — and the audit card's four rows are those same four surfaces,
          carrying a state for each instead of just naming them. One of the two
          had to go and the artifact is the stronger. The hero ends on the CTAs
          now, which puts the artifact further up the fold. */}
      <div className="hero">
        <div className="hero-aura" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            {/* The badge no longer repeats the H1. It said "Digital marketing
                studio", two words of which are the H1's keyword; it carries the
                company's own line instead — already on /about and already in the
                Organization JSON-LD as `slogan`. */}
            <div className="hero-eyebrow"><span className="pulse" /> To be found is to be seen</div>
            <h1 className="hero-headline">
              Digital Marketing That Makes You<br />
              <em>Impossible to Miss</em>
            </h1>
            {/* The line the keyword H1 displaced, restored as a display subhead
                rather than a second H1 — one H1 per page, and this is the better
                sentence, so it keeps display weight without competing for the
                heading level. */}
            <p className="hero-display-sub">Your buyers are looking. Make sure they find you.</p>
            <p className="hero-sub">
              Every day, people search the web, scroll their feeds, and ask answer engines what to buy and who to trust. Axia Atlas puts your business in those moments — for brands, local businesses, and the founders behind them.
            </p>
            <div className="hero-actions">
              <Link href="/demo" className="btn-primary">Book a Demo <Arrow className="arr" /></Link>
              <Link href="/services" className="btn-outline">See How It Works</Link>
            </div>
          </div>

          <div className="hero-artifact">
            <AuditPreview />
          </div>
        </div>
      </div>

      {/* ══ TICKER ══ ground: Deep Spruce ══════════════════════════════════
          One row, no icons, no caret. A thin brand-green band, so the eye reads
          it as the rule between the hero and the argument rather than as a
          section of its own. */}
      <div className="ticker g-spruce" aria-label="Where buyers decide and where you win: Google, ChatGPT, the map pack, Perplexity, Gemini, LinkedIn, Claude, TikTok, reviews">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div className="marquee-group" key={dup} aria-hidden={dup === 1}>
              {MARQUEE.map((m) => (
                <span className="marquee-item" key={m}>{m}<span className="marquee-sep" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══ THE PROBLEM ══ ground: near-black · heading: left ═══════════════
          The argument left, the absence right. The heading belongs over the
          argument it introduces, so it sits left even though the hero above it
          also leads left — the ticker band between them and the change of scale
          are what separate the two, not a change of alignment.

          ONE GRAPHIC, NOT TWO. The three failure-mode cards under the mock are
          gone: the search-result mock already makes the whole argument, and a
          second graphic in the same column turned the evidence into a list. */}
      <section className="problem-section g-black">
        <div className="section-inner problem-split">
          <div className="problem-arg">
            <div className="section-eyebrow">The Problem</div>
            <h2 className="section-headline">Being good isn&apos;t enough<br />if no one can find you.</h2>
            <p>You can have the better product, the fairer price, and the happier customers — and still lose to the business that simply shows up first.</p>
            <p>Attention has moved. Buyers search, scroll, and ask answer engines before they ever call. The companies winning right now aren&apos;t louder. They&apos;re easier to find, in more of the places that matter, more of the time.</p>
            <p>That&apos;s the gap we close.</p>
            <Link href="/demo" className="btn-primary">Find Your Gaps <Arrow className="arr" /></Link>
          </div>

          <div className="problem-evidence">
            <SerpGap />
          </div>
        </div>
      </section>

      {/* ══ THE SYSTEM ══ ground: Deep Spruce · heading: centred ════════════
          Back to the live site's shape, which was the better one: a wide
          approach panel carrying the brand marquee, then Find / Convert /
          Compound in one row beneath it.

          WHAT CAME OUT. The branching diagram — a plan node fanning four curves
          into four channel chips — said the same thing as the paragraph beside
          it and the three steps under it, three times in one section. The
          paragraph ("No scattered tactics...") came out with it.

          The heading is centred here. It is the only full-width statement on
          the page with a symmetric panel under it, and centring one or two
          moments is what stops the other headings from reading as a default. */}
      <section className="system-section g-spruce">
        <div className="section-inner">
          <div className="section-head centred">
            <div className="section-eyebrow">The System</div>
            <h2 className="section-headline">One plan for every place buyers look.</h2>
          </div>
          <div className="bento">
            <div className="bento-card feature">
              <div className="feature-copy">
                <div className="bento-num">The approach</div>
                <h3 className="bento-title">Get found, get chosen, get remembered.</h3>
                <p className="bento-desc">Strategy first — we map where your buyers already are and where you&apos;re missing. Then we build presence in search, answer engines, local, and social, and tie it back to leads and sales you can measure.</p>
              </div>
              <BrandMarquee />
            </div>
            <div className="bento-card">
              <div className="bento-num">01 — Find</div>
              <h3 className="bento-title">Show up first</h3>
              <p className="bento-desc">Rank in search, win local, and get cited by answer engines where buyers are already looking.</p>
            </div>
            <div className="bento-card">
              <div className="bento-num">02 — Convert</div>
              <h3 className="bento-title">Turn attention into customers</h3>
              <p className="bento-desc">A site and content built to move people from curious to booked, not just to bounce.</p>
            </div>
            <div className="bento-card">
              <div className="bento-num">03 — Compound</div>
              <h3 className="bento-title">Build assets that keep paying off</h3>
              <p className="bento-desc">Rankings, reviews, citations, and a founder reputation don&apos;t reset each month — they grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ THE CHANNELS ══ ground: raised near-black · heading: right ══════
          Six cards on a uniform three-column grid, the live site's layout. The
          asymmetric eight-tile version with a small artifact in every emphasis
          cell was the busiest block on the page.

          The heading sits RIGHT here. The grid under it is perfectly symmetric
          and gives a left-aligned head nothing to lean on; pushing the head to
          the far side puts the weight diagonally opposite the "View all"
          button and stops three sections in a row from starting at the same
          x-position.

          The qualifying line ("You don't need all eight...") is removed. */}
      <section className="channels-section g-raise">
        <div className="section-inner">
          <div className="section-head aligned-right">
            <div className="section-eyebrow">The Channels</div>
            <h2 className="section-headline">Eight ways to get found.</h2>
          </div>
          <div className="services-grid">
            {SERVICES.map((s) => {
              const Icon = ServiceIcons[s.id]
              return (
                <div key={s.id} className={`service-card${s.emphasis ? ' emphasis' : ''}`}>
                  {/* Two groups on every card, emphasised or not. On an ordinary
                      cell they stack and the card looks exactly as it did; on a
                      double-wide one the head takes the left column and the
                      prose the right, which is what stops the wide card from
                      being a normal card with a hole in it. */}
                  <div className="sc-head">
                    <div className="service-icon">{Icon && <Icon />}</div>
                    <h3 className="service-name">{s.name}</h3>
                  </div>
                  <div className="sc-body">
                    <p className="service-desc">{s.desc}</p>
                    <Link href={s.href} className="service-link">Learn more <Arrow className="arr" /></Link>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="channels-foot">
            <Link href="/services" className="btn-outline">View all 8 services <Arrow className="arr" /></Link>
          </div>
        </div>
      </section>

      {/* ══ RESULTS ══ ground: Deep Spruce · heading: left ══════════════════
          The /case-studies treatment, moved here and the page deleted. Segment
          above, the headline result, the service beneath it — and on the right
          either the full challenge/work/outcome or a visual, varying by slide.

          THE GLARE IS GONE. Every slide carried a 220px sage radial bloom in
          its top-right corner, which on this ground read as a lens flare over
          the copy rather than as depth.

          THE HEADING NAMES THE TWO THINGS A READER CAN VERIFY. "Measured in
          customers, not vanity metrics" argued against a straw man; a rank and
          a phone call are the two units the slides are actually denominated in,
          and "tracked per location, never averaged" on /services says the same
          thing in the same voice.

          THE SUBHEAD DOES NOT MENTION THE DASHBOARD, and the reason is that it
          would not be true. These five results predate the portal, so the
          clients behind them cannot open anything, and a line inviting a reader
          to imagine they could is a claim the site cannot honour. It says the
          one thing that is true instead: the names are withheld, nothing else
          is. Revisit it when a portal client has a result worth showing.

          `id="results"` is the redirect target for /case-studies. */}
      <section className="results-section g-spruce" id="results">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">Results</div>
            <h2 className="section-headline">Rankings you can check.<br />Calls you can count.</h2>
            <p className="section-sub">Names withheld at the client&apos;s request. Everything else is exactly as it happened.</p>
          </div>
          {/* No slides means the read failed -- there is no in-code set to fall
              back to any more. The section and its heading stay so that the
              /case-studies 308 still lands on something; only the slider,
              which would otherwise be an empty track with no dots, goes. */}
          {slides.length > 0 ? <ResultsSlider slides={slides} /> : null}
        </div>
      </section>

      {/* ══ HOW WE WORK ══ ground: near-black · heading: right ══════════════
          Built out, because this is where the product now lives. It was four
          stations on a rail and nothing else, which was too small a section for
          its position on the page.

          THE PORTAL SHOT SITS HERE. It is the portal's own markup over the
          portal's own stylesheet with the portal's chart components inside it,
          and it belongs beside "how working with us actually goes" rather than
          in the hero, where it was answering a question nobody had asked yet.
          It carries no "Sample data" badge here by direction — see the note at
          the top of PortalShot.tsx.

          The heading is right-aligned over a left-hand graphic: the two lean
          into each other instead of both starting at the gutter. */}
      <section className="process-section g-black">
        <div className="section-inner">
          <div className="process-lead">
            <div className="process-shot">
              <PortalShot />
            </div>
            <div className="section-head aligned-right">
              <div className="section-eyebrow">How We Work</div>
              <h2 className="section-headline">Strategy before spend.<br />Every time.</h2>
              <p className="section-sub">You get direct access to the people doing the work, monthly strategy calls, a live dashboard, and reporting written in language you can actually read.</p>
            </div>
          </div>

          <ol className="rail">
            <div className="rail-line" aria-hidden="true"><span className="rail-fill" /></div>
            {PROCESS.map((st) => (
              <li key={st.n} className="rail-station">
                <span className="rail-node" aria-hidden="true">{st.n}</span>
                <h3 className="process-title">{st.title}</h3>
                <p className="process-desc">{st.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ══ BOOK A DEMO ══ ground: lighter spruce · heading: centred ════════
          The one lighter-green panel on the site, spent on the one moment that
          is asking for something. No artifact: the audit card it used to carry
          is in the hero now, and the band is cleaner as copy and a button. */}
      <CtaBand
        headline="Ready to be seen?"
        sub="Book a demo. Before the call we audit how you show up today — where buyers are looking, where you're missing, and what we'd do about it. You leave with the map either way."
      />

      <Footer />
    </div>
  )
}
