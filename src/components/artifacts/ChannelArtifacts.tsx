/* ────────────────────────────────────────────────────────────────────────────
   ONE SMALL ARTIFACT PER CHANNEL.

   A grid of eight cards that differ only in their words is eight of the same
   card. Each of these shows the SHAPE of the work instead: a rank row looks
   nothing like a citation line, which looks nothing like a posting calendar,
   and that difference is the point — it is what tells a reader that "Local
   Presence" and "Answer Engine Optimization" are not the same service with two
   names.

   NOT ONE OF THESE CARRIES A FIGURE. No session counts, no percentages, no
   follower numbers. They draw structure — positions, cells, bars, a cursor —
   because structure can be honest without a source and a number cannot. The
   only digits anywhere are rank positions (1, 2, 3), which are the ordinal
   labels of the rows themselves rather than a measurement of anything.

   They are decorative in the accessibility sense: the card's real heading and
   description carry the meaning, so every one of these is aria-hidden. A screen
   reader gets the service, not a description of a drawing of the service.
   ──────────────────────────────────────────────────────────────────────────── */

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

/* Website — a browser frame with a wireframe inside it. */
export const ArtWebsite = (_: A) =>
  wrap(
    <div className="ch-browser">
      <div className="ch-chrome"><i /><i /><i /></div>
      <div className="ch-wire">
        <span className="w1" /><span className="w2" /><span className="w3" />
      </div>
    </div>,
  )

/* Local — a map field with a pin cluster and one lit pin. */
export const ArtLocal = (_: A) =>
  wrap(
    <div className="ch-map">
      <span className="ch-pin a" /><span className="ch-pin b" />
      <span className="ch-pin c" /><span className="ch-pin lit" />
    </div>,
  )

/* AEO — a citation line: an answer paragraph with the cited source underlined. */
export const ArtGeo = (_: A) =>
  wrap(
    <div className="ch-answer">
      <span className="ch-line" /><span className="ch-line short" />
      <span className="ch-cite">
        <span className="ch-cite-mark" />
        <span className="ch-cite-rule" />
      </span>
    </div>,
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
