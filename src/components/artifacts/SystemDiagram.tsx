/* ────────────────────────────────────────────────────────────────────────────
   DRAW THE CLAIM INSTEAD OF ASSERTING IT.

   "One connected system across search, answer engines, local, and social" was a
   sentence in a centered paragraph, sitting above three cards that had no
   visible connection to each other or to it. This is that sentence as one
   object: a plan node on the left, four channel branches fanning out of it, and
   the Find / Convert / Compound spine running underneath.

   The four channel names come straight out of the sentence they illustrate.
   Nothing here reports a measurement, so there is no sample-data label and
   there must never be a number in it — this is a diagram of a method, and the
   moment a diagram of a method starts carrying figures it is quietly making
   claims it cannot source.

   THE DRAW IS A SCROLL REVEAL, NOT A LOOP. `.sys-svg` gets `.in` from SiteFX
   when the section enters the viewport, which releases the dash offset once.
   Under prefers-reduced-motion SiteFX adds `.in` immediately and the CSS
   transition is neutralised globally, so the finished diagram is simply there.
   ──────────────────────────────────────────────────────────────────────────── */

const CHANNELS = ['Search', 'Answer Engines', 'Local', 'Social']

export default function SystemDiagram() {
  return (
    <div
      className="sys-branch"
      role="img"
      aria-label="One plan branching into four channels: search, answer engines, local, and social."
    >
      <svg className="sys-svg" viewBox="0 0 260 320" preserveAspectRatio="none" aria-hidden="true">
        {/* Four curves from the plan node's edge (x=0, mid) to each channel
            chip's left edge (x=260, evenly spaced). One path each so the draw
            can be staggered. */}
        {[40, 120, 200, 280].map((y, i) => (
          <path
            key={y}
            className={`sys-path p${i}`}
            d={`M0 160 C 110 160, 150 ${y}, 260 ${y}`}
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <circle className="sys-origin" cx="0" cy="160" r="4" vectorEffect="non-scaling-stroke" />
      </svg>

      <ul className="sys-channels">
        {CHANNELS.map((c) => (
          <li key={c} className="sys-channel">
            <span className="sys-dot" aria-hidden="true" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
}
