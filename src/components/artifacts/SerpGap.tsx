import { Illustrative } from './Illustrative'

/* ────────────────────────────────────────────────────────────────────────────
   SHOW THE ABSENCE.

   "You can have the better product and still lose to the business that shows up
   first" is the whole argument of the Problem section, and it was being made by
   a paragraph. This is that sentence as a picture: a result list where four
   generic businesses are present and the fifth slot — the one the reader is
   standing in — is empty.

   NO REAL COMPETITOR NAMES, EVER. Every entry is a category placeholder
   ("A competitor", "Another provider") with a greyed pseudo-domain. Putting a
   real business's name in a mock of them losing would be a claim about that
   business, made in a graphic, on our own marketing site. The frame carries an
   "Illustrative" tag for the same reason the hero's chart carries "Sample
   data": the crop that ends up in a screenshot has to say what it is.

   The gap row is the focal point, so it is the only row with an accent border,
   and it is announced to assistive tech rather than being a purely visual
   absence — a screen reader gets "Your business: not on this page" instead of
   four results and silence.
   ──────────────────────────────────────────────────────────────────────────── */

const ROWS = [
  { rank: 1, name: 'A competitor', host: 'competitor-one.example' },
  { rank: 2, name: 'Another provider', host: 'provider-two.example' },
  { rank: 3, name: 'A directory listing', host: 'directory.example' },
  { rank: 4, name: 'A larger chain', host: 'chain-four.example' },
]

const Magnifier = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="sg-mag">
    <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.6-3.6" />
  </svg>
)

export default function SerpGap() {
  return (
    <figure className="sg" aria-label="An illustration of a search results page with four generic competitors listed and no entry for your business">
      <div className="sg-bar">
        <span className="sg-field" aria-hidden="true">
          <Magnifier />
          <span className="sg-query">what you sell, near me</span>
          <span className="sg-caret" />
        </span>
        <Illustrative />
      </div>

      <ol className="sg-list">
        {ROWS.map((r) => (
          <li key={r.rank} className="sg-row">
            <span className="sg-rank">{r.rank}</span>
            <span className="sg-body">
              <span className="sg-name">{r.name}</span>
              <span className="sg-host">{r.host}</span>
            </span>
          </li>
        ))}

        {/* The point of the whole graphic. */}
        <li className="sg-row sg-gap">
          <span className="sg-rank">5</span>
          <span className="sg-body">
            <span className="sg-name sg-missing">Your business, not on this page</span>
            <span className="sg-bar-ghost" aria-hidden="true" />
          </span>
        </li>
      </ol>
    </figure>
  )
}
