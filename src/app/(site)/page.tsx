import type { Metadata } from 'next'
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
import { ADDON_GROUPS, ADDONS_PATH, PORTAL_PATH, THEIA_PATH, serviceHref, serviceName } from '@/lib/services'
import { SITE_URL, HOME_TITLE } from '@/lib/seo'
import { THEIA_LAUNCH } from '@/lib/flags'
import { fromPrice, monthsWord, pricingFor } from '@/lib/pricing'

/* The results are read at render, so the page has to be allowed to re-render.
   It was fully static because the CASES array made the read decorative; now
   the read is the only source and a static page would freeze the slider at
   whatever the table held on the last deploy. Same hour as the other
   database-backed pages (/about, /blog). */
export const revalidate = 3600

/* THE HOME PAGE'S OWN CANONICAL.
   It used to arrive by inheritance: app/layout.tsx declared
   `alternates: { canonical: SITE_URL }`, which was correct here and wrong on
   every other page that forgot to override it. The declaration moved to the one
   page it describes.

   SITE_URL AND NOT '/'. A relative '/' resolves against metadataBase to
   "https://axiaatlas.com/" WITH a trailing slash, and the sitemap, the
   Organization node, the WebSite node and og:url all say "https://axiaatlas.com"
   without one. A canonical that disagrees with the sitemap about a trailing
   slash is a second address for this page, which is the thing all of this is
   for. */
export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  alternates: { canonical: SITE_URL },
}

/* ── THE OFFER ───────────────────────────────────────────────────────────────
   Headline services only: Website Design & Build and Social Media Management,
   with the Portal joining at the Theia launch (lib/flags). Everything else is
   an add-on, shown as four groups under the cards. Names, addresses and the
   "From" prices all resolve from lib/services and lib/pricing. */
type OfferCard = { key: string; icon: string; name: string; desc: string; price: string; href: string }

const OFFER: OfferCard[] = [
  ...(THEIA_LAUNCH
    ? [{ key: 'portal', icon: 'dashboards', name: 'The Client Portal', desc: 'One login for your results, approvals and reports, with Theia by Axia Atlas built in to help you understand your data.', price: 'Pricing on request', href: PORTAL_PATH }]
    : []),
  { key: 'website', icon: 'website', name: serviceName('website'), desc: `Positioning, copy, design and build in one engagement, with search foundations laid from day one. Pay once or over ${monthsWord(pricingFor('website').paymentPlanMonths ?? 0)} months, and keep it current with a care plan.`, price: fromPrice('website'), href: serviceHref('website') },
  { key: 'social', icon: 'social', name: serviceName('social'), desc: 'The two or three platforms your buyers use, one voice across them, content made for each, and every comment answered.', price: fromPrice('social'), href: serviceHref('social') },
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
      <div data-aa-section="home.hero" className="hero">
        <div className="hero-aura" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            {/* The badge is the first text on the page, above the H1, on the
                only page most visitors will read before deciding to stay. It
                names the four categories a buyer actually searches for, so it
                does a job a slogan cannot: it says what we are, and it carries
                keywords the H1 does not. It still avoids the H1's keyword,
                which is why the "Digital marketing studio" badge was dropped
                in the first place.

                It also recovers what the deleted "Built to be found in" strip
                was reaching for — naming the surfaces — without occupying a
                proof slot and proving nothing.

                The slogan is not retired, only moved out of the hero: it keeps
                its homes on /about, on /links, and in the Organization JSON-LD
                as `slogan`. Authored in title case because `text-transform:
                uppercase` renders it as SEO · ANSWER ENGINES · LOCAL · SOCIAL
                either way, and the cased source is what a screen reader says.

                Considered and rejected: "Search · Social · Local · Answers"
                (parallel and pretty, but "Search" is the vaguer word and
                "Answers" reads as a promise rather than a surface — nobody
                searches for "answers" as a service), and "Get found where your
                buyers are looking" (a benefit line, so it competes with the
                H1's job instead of adding to it, and carries no keyword at
                all). */}
            <div className="hero-eyebrow"><span className="pulse" /> Website Design · Social Media · Search</div>
            <h1 className="hero-headline">
              {THEIA_LAUNCH ? <>Websites, Social and a Client Portal{' '}<br /><em>That Run as One System</em></> : <>Websites and Social Media That Make You{' '}<br /><em>Impossible to Miss</em></>}
            </h1>
            {/* The line the keyword H1 displaced, restored as a display subhead
                rather than a second H1 — one H1 per page, and this is the better
                sentence, so it keeps display weight without competing for the
                heading level. */}
            <p className="hero-display-sub">Your buyers are looking. Make sure they find you.</p>
            <p className="hero-sub">
              Axia Atlas designs and builds websites and runs social media for businesses that need to be found. We start by auditing how you show up in search, answer engines, maps and feeds, then build the site and the content that close the gaps. Headquartered in Miami, working with clients across the US.
            </p>
            <div className="hero-actions">
              <Link href="/demo" className="btn-primary">Book a Demo <Arrow className="arr" /></Link>
              <Link href="/pricing" className="btn-outline">See Pricing</Link>
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
      <div data-aa-section="home.ticker" className="ticker g-spruce" aria-label="Where buyers decide and where you win: Google, ChatGPT, the map pack, Perplexity, Gemini, LinkedIn, TikTok, reviews">
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
      <section data-aa-section="home.problem" className="problem-section g-black">
        <div className="section-inner problem-split">
          <div className="problem-arg">
            <div className="section-eyebrow">The Problem</div>
            <h2 className="section-headline">Being good isn&apos;t enough<br />if no one can find you.</h2>
            <p>You can have the better product, the fairer price, and the happier customers, and still lose to the business that simply shows up first.</p>
            <p>Attention has moved. Buyers search, scroll, and ask answer engines before they ever call. The companies winning right now aren&apos;t louder. They&apos;re easier to find, in more of the places that matter, more of the time.</p>
            <p>That&apos;s the gap we close.</p>
            <Link href="/demo" className="btn-primary">Book a Demo <Arrow className="arr" /></Link>
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
      <section data-aa-section="home.system" className="system-section g-spruce">
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
                <p className="bento-desc">Strategy first. We map where your buyers already are and where you&apos;re missing. Then we build presence in search, answer engines, local, and social, and tie it back to leads and sales you can measure.</p>
              </div>
              <BrandMarquee />
            </div>
            <div className="bento-card">
              <div className="bento-num">01 · Find</div>
              <h3 className="bento-title">Show up first</h3>
              <p className="bento-desc">Rank in search, win local, and get cited by answer engines where buyers are already looking.</p>
            </div>
            <div className="bento-card">
              <div className="bento-num">02 · Convert</div>
              <h3 className="bento-title">Turn attention into customers</h3>
              <p className="bento-desc">A site and content built to move people from curious to booked, not just to bounce.</p>
            </div>
            <div className="bento-card">
              <div className="bento-num">03 · Compound</div>
              <h3 className="bento-title">Build assets that keep paying off</h3>
              <p className="bento-desc">Rankings, reviews, citations, and a founder reputation don&apos;t reset each month. They grow.</p>
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

          The qualifying line ("You don't need all eight...") is removed.

          THE HEADING IS NO LONGER "EIGHT WAYS TO GET FOUND". It was the
          strongest line on the page and it was a channel claim, which stopped
          being true the moment Portals & Dashboards joined the catalogue: a
          dashboard sits behind a login and is a way to run a business, not a
          way to be found by one. Keeping it would have forced the site to hold
          two counts that rot separately — services, and ways to get found —
          and the second one has no array behind it to keep it honest.

          "Nine services. One system." keeps the numeral where the numeral
          earns its place (six cards are showing; the reader needs to know the
          catalogue is bigger) and trades the channel claim for the claim the
          section is actually making, which the eyebrow, the grid, and the
          whole page already argue: these are bought together.

          THE EYEBROW IS NO LONGER "THE CHANNELS". Nothing on screen was
          false — the cards below are channels — but the eyebrow and the H2
          were counting different things, which is the same two-counts problem
          this pass removed from the heading. "The System" says what the H2
          says, carries no count of its own, and cannot drift when the
          catalogue grows — except that "The System" is already the eyebrow on
          the section above, and two sections cannot share one label. "The
          Services" is the fix: it is the same noun the H2 counts, so the
          eyebrow and the heading are now counting one thing instead of two,
          and it introduces no count of its own. */}
      <section data-aa-section="home.offer" className="channels-section g-raise">
        <div className="section-inner">
          <div className="section-head aligned-right">
            <div className="section-eyebrow">The Services</div>
            <h2 className="section-headline">{THEIA_LAUNCH ? 'Three services. One system.' : 'Your website and your feed, built to sell.'}</h2>
          </div>
          <div className={`sv-cards sv-cards-${OFFER.length}`}>
            {OFFER.map((c) => {
              const Icon = ServiceIcons[c.icon]
              return (
                <Link key={c.key} href={c.href} className="sv-card">
                  <span className="service-icon">{Icon && <Icon />}</span>
                  <h3 className="sv-card-name">{c.name}</h3>
                  <p className="sv-card-desc">{c.desc}</p>
                  <span className="sv-card-price">{c.price}</span>
                  <span className="service-link">Learn more <Arrow className="arr" /></span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {THEIA_LAUNCH && (
        <section data-aa-section="home.theia" className="sv-section g-spruce">
          <div className="section-inner sv-note">
            <div className="sv-head">
              <div className="section-eyebrow">Meet Theia</div>
              <h2 className="section-headline">Theia by Axia Atlas, inside your portal.</h2>
              <p className="sv-lede">Theia is our proprietary assistant. Ask her about your results in plain English, and she helps you build your own reports, decks and plans from your data. She lives only in your portal and knows only your business.</p>
            </div>
            <Link href={THEIA_PATH} className="service-link">Meet Theia <Arrow className="arr" /></Link>
          </div>
        </section>
      )}

      <section data-aa-section="home.addons" className="sv-section g-black">
        <div className="section-inner">
          <div className="sv-head">
            <div className="section-eyebrow">Add-ons</div>
            <h2 className="section-headline">Add only what pays off.</h2>
            <p className="sv-lede">Search, local, leads, research, advisory and custom dashboards, each priced on its own and added when it is worth it.</p>
          </div>
          <div className="sv-groups">
            {ADDON_GROUPS.map((g) => (
              <Link key={g.id} href={`${ADDONS_PATH}#${g.id}`} className="sv-group sv-group-link">
                <h3 className="sv-group-name">{g.name}</h3>
                <p className="sv-group-lede">{g.ids.map(serviceName).join(' · ')}</p>
              </Link>
            ))}
          </div>
          <div className="channels-foot">
            <Link href={ADDONS_PATH} className="btn-outline">See all add-ons <Arrow className="arr" /></Link>
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

          THE EYEBROW IS A TERM PEOPLE SEARCH. "Results" is a word, not a
          query — nobody types it, and it told a reader nothing the heading
          under it did not. "Case Studies" is what this section IS, it is what
          a buyer comparing agencies actually looks for, and it is the term the
          URL already used: /case-studies was a page, and it now 308s to this
          anchor, so the label and the path finally agree.

          Considered and not shipped: "Marketing Case Studies", which carries
          more of the category keyword but breaks the register every other
          eyebrow on this page keeps (The Problem, The System, The Services,
          How We Work — two or three plain words, no stuffing); and "Client
          Results", which is closer to a query than "Results" was but still
          loses to the term buyers use for the artefact itself.

          THE HEADING SAYS WHOSE RESULTS THEY ARE. "Rankings you can check.
          Calls you can count." named the two units the slides are denominated
          in, which was true and was also an argument — it spent a heading
          defending the evidence before the reader had seen any. The slides
          make that case themselves. What a reader needs from the heading is
          the plainer fact: these are clients, these are their numbers, and
          there are more of them than fit here.

          Considered and not shipped: "A few of our clients, and what changed."
          (narrative, and it promises a story each slide has to then tell) and
          "What we did, and what it moved." (drops the client entirely, which
          is the one word doing the work).

          THE CONFIDENTIALITY LINE IS A SUBTITLE NOW, not a lead. It used to
          run at `.section-sub` — 21px on desktop, the same weight as a real
          subhead — so the first thing under the heading was a disclaimer
          competing with it. It is a footnote that has to be visible, not a
          claim, so it sits at 14px directly beneath the heading and tied to
          it. It is not a callout box: this section already carries a slider,
          and a bordered panel would be a third weight in one block.

          IT STILL DOES NOT MENTION THE DASHBOARD, and the reason is that it
          would not be true. These five results predate the portal, so the
          clients behind them cannot open anything, and a line inviting a
          reader to imagine they could is a claim the site cannot honour.

          `id="results"` is the redirect target for /case-studies. */}
      <section data-aa-section="home.results" className="results-section g-spruce" id="results">
        <div className="section-inner">
          <div className="section-head results-head">
            <div className="section-eyebrow">Case Studies</div>
            <h2 className="section-headline">Some of our clients&apos; results.</h2>
            {/* SUBTITLE, NOT A CALLOUT. See the note over `.results-note`. */}
            <p className="results-note">Company identity anonymized per client agreement. All metrics and outcomes reflect unedited performance data.</p>
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
      <section data-aa-section="home.process" className="process-section g-black">
        <div className="section-inner">
          <div className="process-lead">
            <div className="process-shot">
              <PortalShot />
            </div>
            <div className="section-head aligned-right">
              <div className="section-eyebrow">How We Work</div>
              <h2 className="section-headline">Strategy before spend.<br />Every time.</h2>
              <p className="section-sub">You work directly with the people doing the work, approve everything before it goes live, and get reporting written in language you can actually read.</p>
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
        sub="Book a demo. Before the call we audit how you show up today: where buyers are looking, where you're missing, and what we'd do about it. You leave with the map either way."
      />

      <Footer />
    </div>
  )
}
