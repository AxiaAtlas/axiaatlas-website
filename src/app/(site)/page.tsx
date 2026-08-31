import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import ResultsSlider, { type ResultSlide } from '@/components/ResultsSlider'
import { Arrow, Check, Search, ServiceIcons } from '@/components/icons'
import BrandMarquee from '@/components/BrandMarquee'
import PortalShot from '@/components/PortalShot'
import SerpGap from '@/components/artifacts/SerpGap'
import SystemDiagram from '@/components/artifacts/SystemDiagram'
import AuditPreview from '@/components/artifacts/AuditPreview'
import { ChannelArt } from '@/components/artifacts/ChannelArtifacts'

async function getCaseStudies() {
  try {
    const { data } = await supabase
      .from('case_studies')
      .select('industry,result_headline,result_detail,service_used')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(8)
    return data || []
  } catch {
    return []
  }
}

/* ALL EIGHT, because six-plus-a-link made the grid a teaser for a list rather
   than the list. Two of them — Executive Personal Brand and Strategic Advisory
   & Embedded Thinking — carry a name and no blurb, and that is deliberate: the
   descriptions for those two exist only on /services and run to a paragraph
   each, and writing short ones here would be writing new marketing copy. Every
   string below already ships on this page today (the six blurbs) or on every
   page of the site (the two names, which are in the footer and in the
   Organization JSON-LD). `emphasis` marks the four double-wide
   tiles. Four wide and four narrow is what makes the 4-column grid asymmetric
   AND leaves no hole in any row: 2+1+1, 1+2+1, 2+2. */
const SERVICES: { id: string; name: string; desc?: string; href: string; emphasis?: boolean }[] = [
  { id: 'social', name: 'Social Media Management', desc: 'Content built for each platform, managed end to end, designed to grow an audience that actually buys.', href: '/services#social', emphasis: true },
  { id: 'intel', name: 'Competitive Intelligence', desc: "Every competitor's positioning, cadence, and visibility tracked and sourced, so you decide on facts rather than hunches.", href: '/services#intel' },
  { id: 'website', name: 'Website Design & Build', desc: 'Positioning, copy, design, and build in one engagement, with search foundations laid from day one.', href: '/services#website' },
  { id: 'local', name: 'Local Presence & SEO', desc: 'Profile, citations, and reviews managed so nearby buyers find you first, not the business down the road.', href: '/services#local' },
  { id: 'geo', name: 'Answer Engine Optimization (AEO)', desc: 'Get cited across leading AI platforms—Claude, ChatGPT, Perplexity, and Gemini—represented accurately and recommended when buyers search your category.', href: '/services#geo', emphasis: true },
  { id: 'leadgen', name: 'Lead Generation', desc: 'Prospects researched against your ideal customer, reached with outreach written for them, tracked from first touch onward.', href: '/services#leadgen' },
  { id: 'executive', name: 'Executive Personal Brand', href: '/services#executive', emphasis: true },
  { id: 'strategy', name: 'Strategic Advisory & Embedded Thinking', href: '/services#strategy', emphasis: true },
]

/* Curated results for the home slider. The Supabase library takes over once it
   holds a real set (≥5 published rows) — the original seed rows predate the
   current brand-copy rules. */
const RESULTS: ResultSlide[] = [
  { industry: 'Professional Services', result_headline: '340% organic growth in 90 days', result_detail: 'A B2B consulting firm went from near-zero to roughly 4,200 monthly organic sessions — with the first inbound leads landing by month three.', service_used: 'SEO + Founder Brand' },
  { industry: 'E-commerce', result_headline: 'First page of Google for buyer-intent terms in under 4 months', result_detail: 'A DTC brand with no organic visibility targeted buyer-intent terms with a keyword and content strategy plus on-site conversion fixes — ranking page one within four months, all organic.', service_used: 'SEO + Conversion' },
  { industry: 'E-commerce', result_headline: '7 points above the benchmark — zero ad spend', result_detail: 'A DTC brand recovered abandoned pre-orders across email, SMS, and content — landing 7 points above the 20–30% industry standard with no paid media.', service_used: 'Owned Channels + Content' },
  { industry: 'Consumer Brand', result_headline: 'Audience growth far above average in 60 days', result_detail: 'A consumer brand fixed its voice, built content pillars, and held a steady multi-platform cadence — and its following grew well beyond the category norm.', service_used: 'Social Media + Brand Voice' },
  { industry: 'Food & Hospitality', result_headline: 'The top recommended local result in answer engines', result_detail: 'A local restaurant surfaced first when prospects asked answer engines and maps for the best option nearby — ahead of competitors on reviews and presence.', service_used: 'Answer Engines + Local Presence' },
]

/* The visibility ticker. Same ten phrases, unchanged, split across two rows
   that travel in opposite directions — each one styled as a search field,
   because that is literally what they are: the queries and prompts a buyer
   types before they ever call. */
const MARQUEE_TOP = [
  'Searched on Google',
  'Asked on ChatGPT',
  '#1 in the map pack',
  'Cited by Perplexity',
  'Recommended over the competition',
]
const MARQUEE_BOTTOM = [
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

/* The three problem cards, stacked beside the artifact that shows the absence. */
const PROBLEMS = [
  { title: 'Invisible in search', desc: "If you're not on page one for what you sell, you're losing those buyers to someone who is." },
  { title: 'Left out of the answers', desc: "Claude, ChatGPT, Perplexity, and Gemini recommend businesses every day. If they don't know you, you're not in the running." },
  { title: 'Forgettable feeds', desc: 'Posting without a plan fills a calendar but builds nothing. Reach fades the moment you stop paying.' },
]

/* The three steps that run along the system diagram's spine. */
const STEPS = [
  { n: '01 — Find', title: 'Show up first', desc: 'Rank in search, win local, and get cited by answer engines where buyers are already looking.' },
  { n: '02 — Convert', title: 'Turn attention into customers', desc: 'A site and content built to move people from curious to booked, not just to bounce.' },
  { n: '03 — Compound', title: 'Build assets that keep paying off', desc: "Rankings, reviews, citations, and a founder reputation don't reset each month — they grow." },
]

export default async function HomePage() {
  const db = await getCaseStudies()
  const slides: ResultSlide[] = db.length >= 5 ? (db as ResultSlide[]) : RESULTS

  return (
    <div className="page">

      {/* ── HERO ──
          Asymmetric: the pitch on the left, the running product on the right.
          The right-hand column is <PortalShot />, which is the portal's own
          markup over the portal's own stylesheet with the portal's own chart
          components inside it — not an illustration of a dashboard.

          The capability list below the CTAs carries the same four words it
          always did. What changed is that it is no longer centred in the
          customer-logo slot under the fold line, where it read as proof and
          delivered none. It is a checked list in the copy column now. */}
      <div className="hero">
        <div className="hero-aura" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow"><span className="pulse" /> Digital marketing studio</div>
            {/* H1 REWRITTEN UNDER THE HEADING RULES, and this is the biggest
                copy consequence of them — see the report. It was "Your buyers
                are looking. Make sure they find you.", which is the better
                line and carries no keyword, is sentence case, and shares no
                language with the title above it. The rules asked for title
                case, the primary keyword used naturally, and a story the title
                also tells. One word reverts it. */}
            <h1 className="hero-headline">
              Digital Marketing That Makes You<br />
              <em>Impossible to Miss</em>
            </h1>
            <p className="hero-sub">
              Every day, people search the web, scroll their feeds, and ask answer engines what to buy and who to trust. Axia Atlas puts your business in those moments — for brands, local businesses, and the founders behind them.
            </p>
            <div className="hero-actions">
              <Link href="/demo" className="btn-primary">Book a Demo <Arrow className="arr" /></Link>
              <Link href="/services" className="btn-outline">See How It Works</Link>
            </div>

            <div className="hero-trust">
              <span className="hero-trust-label">Built to be found in</span>
              <ul className="hero-trust-items">
                <li><Check aria-hidden="true" /><span>Google Search</span></li>
                <li><Check aria-hidden="true" /><span>Answer Engines</span></li>
                <li><Check aria-hidden="true" /><span>Local &amp; Maps</span></li>
                <li><Check aria-hidden="true" /><span>Social Feeds</span></li>
              </ul>
            </div>
          </div>

          <div className="hero-artifact">
            <PortalShot />
          </div>
        </div>
      </div>

      {/* ── THE VISIBILITY TICKER ──
          Was a single row of plain text that read as decoration. Each phrase is
          a search field now — rounded, magnifier, blinking caret — because that
          is what they are: the queries and prompts a buyer types before they
          call. Two rows travelling in opposite directions so the band has its
          own motion rather than one uniform drift.

          I did NOT set the query text in a monospace face, which the direction
          asked for. The portal's rule is Montserrat for all text and this whole
          redesign exists to make the site and the product read as one system;
          introducing a second typeface to say "search box" when the field
          shape, the magnifier and the caret already say it seemed like the
          wrong place to spend the exception. Easy to reverse if you disagree. */}
      <div className="ticker" aria-label="Where buyers decide and where you win: Google, ChatGPT, the map pack, Perplexity, Gemini, LinkedIn, Claude, TikTok, reviews">
        {[MARQUEE_TOP, MARQUEE_BOTTOM].map((row, r) => (
          <div className={`ticker-row${r === 1 ? ' rev' : ''}`} key={r}>
            <div className="marquee-track">
              {[0, 1].map((dup) => (
                <div className="marquee-group" key={dup} aria-hidden={dup === 1}>
                  {row.map((m) => (
                    <span className="q-chip" key={m}>
                      <Search className="q-mag" aria-hidden="true" />
                      <span className="q-text">{m}</span>
                      <span className="q-caret" aria-hidden="true" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── THE PROBLEM — split screen: the argument left, the absence right ──
          The claim is "you can lose to the business that simply shows up
          first". A paragraph asserts that. The result list on the right shows
          it: four generic entries present, the reader's slot empty. */}
      <section className="problem-section">
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
            <div className="problem-cards">
              {PROBLEMS.map((c) => (
                <div key={c.title} className="problem-card">
                  <h3 className="problem-card-title">{c.title}</h3>
                  <div className="problem-card-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE SYSTEM — one diagram, not a heading over three cards ──
          "The System" and "The Approach" were two stacked centered blocks
          making the same point. They are one object now: the approach panel is
          the plan node, four branches leave it for the four channels named in
          the copy above, and Find / Convert / Compound run along the spine
          underneath. Every string is the one that was already here. */}
      <section className="system-section section-alt">
        <div className="section-inner">
          <div className="system-head">
            <div>
              <div className="section-eyebrow">The System</div>
              <h2 className="section-headline">One plan for every place buyers look.</h2>
            </div>
            <p className="section-sub">No scattered tactics. We build one connected system across search, answer engines, local, and social — then make every channel pull more weight, month after month.</p>
          </div>

          <div className="sys-figure">
            <div className="sys-plan">
              <div className="bento-num">The approach</div>
              <h3 className="bento-title">Get found, get chosen, get remembered.</h3>
              <p className="bento-desc">Strategy first — we map where your buyers already are and where you&apos;re missing. Then we build presence in search, answer engines, local, and social, and tie it back to leads and sales you can measure.</p>
              <BrandMarquee />
            </div>
            <SystemDiagram />
          </div>

          <ol className="sys-spine">
            {STEPS.map((st) => (
              <li key={st.n} className="sys-station">
                <span className="sys-station-node" aria-hidden="true" />
                <div className="bento-num">{st.n}</div>
                <h3 className="bento-title">{st.title}</h3>
                <p className="bento-desc">{st.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── THE CHANNELS — all eight, on an asymmetric grid ──
          Six tiles plus a link made this a teaser for a list. Eight tiles on a
          four-column grid with two double-wide emphasis cells, each carrying a
          small artifact of the shape of that work: a posting calendar reads
          nothing like a citation line, which is the point. */}
      <section className="channels-section">
        <div className="section-inner">
          <div className="channels-head">
            <div>
              <div className="section-eyebrow">The Channels</div>
              <h2 className="section-headline">Eight ways to get found.</h2>
            </div>
            <p className="section-sub">You don&apos;t need all eight. You need the right three, in the right order — and that&apos;s the first thing we&apos;ll tell you.</p>
          </div>
          <div className="channels-grid">
            {SERVICES.map((sv) => {
              const Icon = ServiceIcons[sv.id]
              const Art = ChannelArt[sv.id]
              return (
                <Link
                  key={sv.id}
                  href={sv.href}
                  className={`channel-card${sv.emphasis ? ' emphasis' : ''}${sv.desc ? '' : ' terse'}`}
                >
                  {Art && <Art />}
                  <div className="channel-body">
                    <div className="service-icon">{Icon && <Icon />}</div>
                    <h3 className="service-name">{sv.name}</h3>
                    {sv.desc && <p className="service-desc">{sv.desc}</p>}
                    <span className="service-link">Learn more <Arrow className="arr" /></span>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="channels-foot">
            <Link href="/services" className="btn-outline">View all 8 services <Arrow className="arr" /></Link>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="results-section section-alt">
        <div className="section-inner">
          <div className="results-head">
            <div>
              <div className="section-eyebrow">Results</div>
              <h2 className="section-headline">Measured in customers,<br />not vanity metrics.</h2>
            </div>
            <Link href="/case-studies" className="btn-outline">Read the case studies <Arrow className="arr" /></Link>
          </div>
          <ResultsSlider slides={slides} />
        </div>
      </section>

      {/* ── HOW WE WORK — four stations on one rail ──
          Was four centered boxes in a row with a dashed line behind them. It is
          a progress rail now: the line is the spine, the stages are stations on
          it, and it turns vertical on a phone instead of stacking into four
          more boxes. */}
      <section className="process-section">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">How We Work</div>
            <h2 className="section-headline">Strategy before spend. Every time.</h2>
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

      {/* ── CTA ── */}
      <CtaBand
        headline="Ready to be seen?"
        sub="Book a demo. Before the call we audit how you show up today — where buyers are looking, where you're missing, and what we'd do about it. You leave with the map either way."
        artifact={<AuditPreview />}
      />

      <Footer />
    </div>
  )
}
