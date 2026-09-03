/* ────────────────────────────────────────────────────────────────────────────
   ONE SMALL ARTIFACT PER CHANNEL.

   A grid of cards that differ only in their words is the same card repeated.
   Each of these shows the SHAPE of the work instead: a local listing looks
   nothing like an assistant answering a question, which looks nothing like a
   posting calendar, and that difference is the point — it is what tells a
   reader that "Local Presence" and "Answer Engine Optimization" are not the
   same service with two names.

   THIRD PASS: THREE OF THEM STOPPED BEING ABSTRACT.

   Only three of these ship today, on /services — website, local, geo — and all
   three were drawing the IDEA of the service rather than the thing the service
   buys. A grid of dots with one pin lit is a diagram of "local"; it is not what
   a buyer sees. So:

     website   a browser, and a page inside it. Chrome, an address pill, a nav
               bar, a hero with a heading and a button, a row of cards. It reads
               as a website because it is drawn as one.
     local     a Google local result: name, rating, review count, address, and
               today's hours. That result IS the deliverable — winning it is
               what the money buys — so it is what the figure shows.
     geo       a short back-and-forth: a buyer's question, and an answer that
               names a business. That exchange is literally the product.

   WHAT THAT COST, AND WHY IT IS PAID. The old rule here was "not one of these
   carries a figure" — no counts, no percentages — because structure can be
   honest without a source and a number cannot. A star rating and a review count
   break it. They are not measurements of anything of ours: they are furniture
   of the surface being drawn, and a local result without them is not a local
   result. The two figures that now mock a real search surface with a business
   name in it therefore carry a tag inside their frame, the same way the SERP
   mock on the home page does. That is the site's standing rule (Illustrative.tsx)
   and it applies exactly here — to a graphic a crop of which could be mistaken
   for a record of somebody.

   THE BUSINESS IS INVENTED, AND IT IS THE SAME INVENTED BUSINESS the home
   page's mock search result uses. One fictional company across the site reads
   as a deliberate stand-in; four different plausible names read as four claims.

   They are decorative in the accessibility sense: the card's real heading and
   description carry the meaning, so every one of these is aria-hidden. A screen
   reader gets the service, not a description of a drawing of the service.
   ──────────────────────────────────────────────────────────────────────────── */

/* The stand-in. Generic English compounds, no category, nothing that resolves. */
const MOCK_BUSINESS = 'Northgate Services Co.'

type A = { className?: string }

const wrap = (children: React.ReactNode) => (
  <div className="ch-art" aria-hidden="true">{children}</div>
)

/* Social — a posting calendar: a month of cells with a cadence lit up. */
export const ArtSocial = (_: A) =>
  wrap(
    <div className="ch-cal">
      {Array.from({ length: 28 }, (_, i) => (
        <span key={i} className={`ch-cell${[1, 3, 8, 10, 15, 17, 22, 24].includes(i) ? ' on' : ''}`} />
      ))}
    </div>,
  )

/* Competitive Intelligence — tracked rivals as stacked bars of differing reach. */
export const ArtIntel = (_: A) =>
  wrap(
    <div className="ch-bars">
      {[62, 88, 41, 74, 33].map((w, i) => (
        <span key={i} className="ch-bar"><span style={{ width: `${w}%` }} /></span>
      ))}
    </div>,
  )

/* Website — a browser, and a page inside it. Chrome with an address pill, then
   the page: a nav bar with a mark and links, a hero with two heading lines and
   a button, and a row of three cards under it. Three grey bars in a frame was
   "a wireframe"; this is a website. */
export const ArtWebsite = (_: A) =>
  wrap(
    <div className="ch-browser">
      <div className="ch-chrome">
        <i /><i /><i />
        <span className="ch-url" />
      </div>
      <div className="ch-page">
        <div className="ch-nav">
          <span className="ch-mark" />
          <span className="ch-navlinks"><i /><i /><i /></span>
          <span className="ch-navcta" />
        </div>
        <div className="ch-heroblock">
          <span className="ch-hl" /><span className="ch-hl short" />
          <span className="ch-hbtn" />
        </div>
        <div className="ch-cards"><span /><span /><span /></div>
      </div>
    </div>,
  )

/* One star, drawn once and reused five times. The fifth is dimmed rather than
   half-filled: a clipped half-star at 11px reads as a rendering artefact. */
const Star = ({ dim }: { dim?: boolean }) => (
  <svg viewBox="0 0 24 24" className={`ch-star${dim ? ' dim' : ''}`} aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2.6l2.9 5.88 6.49.95-4.7 4.58 1.11 6.46L12 17.42 6.2 20.47l1.11-6.46-4.7-4.58 6.49-.95z"
    />
  </svg>
)

/* Local — the Google local result itself: name, rating, review count, address,
   and today's hours, with the listing photo on the right. This is the thing the
   service buys, and it is what a buyer actually sees; the abstract map grid
   with one pin lit was a diagram of the word "local". */
export const ArtLocal = (_: A) =>
  wrap(
    <>
      <div className="ch-listing">
        <div className="ch-listing-main">
          <div className="ch-listing-name">{MOCK_BUSINESS}</div>
          <div className="ch-listing-rate">
            <span className="ch-rate-num">4.8</span>
            <span className="ch-stars">
              <Star /><Star /><Star /><Star /><Star dim />
            </span>
            <span className="ch-reviews">128 reviews</span>
          </div>
          <div className="ch-listing-meta">Northgate Ave · 0.6 mi</div>
          <div className="ch-listing-meta">
            <span className="ch-open">Open</span> · Closes 6 PM
          </div>
        </div>
        <span className="ch-listing-thumb" aria-hidden="true" />
      </div>
      <span className="ch-art-tag">Not a real listing</span>
    </>,
  )

/* AEO — the exchange, not a diagram of it. A buyer asks an assistant who to
   use; the assistant answers and names a business. That is the whole product,
   and an answer paragraph with a rule under it never said so. */
export const ArtGeo = (_: A) =>
  wrap(
    <>
      <div className="ch-chat">
        <div className="ch-ask">Who should I go with near me?</div>
        <div className="ch-reply">
          <span className="ch-spark" aria-hidden="true" />
          <span className="ch-reply-text">
            I&apos;d start with <b>{MOCK_BUSINESS}</b> — strong reviews and they cover your area.
          </span>
        </div>
      </div>
      <span className="ch-art-tag">Not a real answer</span>
    </>,
  )

/* Lead Generation — a pipeline narrowing through three stages. */
export const ArtLeadgen = (_: A) =>
  wrap(
    <div className="ch-funnel">
      <span className="f1" /><span className="f2" /><span className="f3" />
    </div>,
  )

/* Executive Personal Brand — a profile row above a published post. */
export const ArtExecutive = (_: A) =>
  wrap(
    <div className="ch-post">
      <div className="ch-post-head"><span className="ch-avatar" /><span className="ch-handle" /></div>
      <span className="ch-line" /><span className="ch-line short" />
    </div>,
  )

/* Strategic Advisory — a decision log: three entries on a dated rail. */
export const ArtStrategy = (_: A) =>
  wrap(
    <div className="ch-log">
      {[0, 1, 2].map((i) => (
        <span key={i} className="ch-log-row">
          <span className="ch-log-node" />
          <span className="ch-log-line" />
        </span>
      ))}
    </div>,
  )

/* Rank rows — used by the Local/SEO detail on the services page. */
export const ArtRank = (_: A) =>
  wrap(
    <div className="ch-rank">
      {[1, 2, 3].map((n) => (
        <span key={n} className={`ch-rank-row${n === 1 ? ' you' : ''}`}>
          <span className="ch-rank-n">{n}</span>
          <span className="ch-rank-bar" />
        </span>
      ))}
    </div>,
  )

export const ChannelArt: Record<string, (p: A) => JSX.Element> = {
  social: ArtSocial,
  intel: ArtIntel,
  website: ArtWebsite,
  local: ArtLocal,
  geo: ArtGeo,
  leadgen: ArtLeadgen,
  executive: ArtExecutive,
  strategy: ArtStrategy,
  rank: ArtRank,
}
