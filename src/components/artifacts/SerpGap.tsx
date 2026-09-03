import { Illustrative } from './Illustrative'

/* ────────────────────────────────────────────────────────────────────────────
   SHOW THE ABSENCE.

   "You can have the better product and still lose to the business that shows up
   first" is the whole argument of the Problem section, and it was being made by
   a paragraph. This is that sentence as a picture: a result list where four
   businesses are present and the fifth slot — the one the reader is standing in
   — is empty.

   THE ROWS ARE INVENTED BUSINESSES, NOT PLACEHOLDER LABELS. They used to read
   "A competitor / competitor-one.example" and "Another provider", which is a
   description of a mock rather than a mock: a reader sees an unfinished
   component, not a search result they lose. The names below are made up out of
   generic English compounds, deliberately category-neutral (nothing here says
   what the business sells, because the query above does not either), and every
   host sits on `.example` — the TLD RFC 2606 reserves so it can never resolve
   to anybody's site.

   NO REAL COMPETITOR NAMES, EVER, and nothing shaped like a real company.
   Putting a real business's name in a mock of them WINNING is an endorsement we
   have not earned the right to make; putting one in a mock of them losing is a
   claim about that business, made in a graphic, on our own marketing site. The
   frame therefore keeps its "Not a real search" tag: the crop that ends up in a
   screenshot has to say what it is.

   The gap row is the focal point, so it is the only row with an accent border,
   and it is announced to assistive tech rather than being a purely visual
   absence — a screen reader gets "Your business: not on this page" instead of
   four results and silence.
   ──────────────────────────────────────────────────────────────────────────── */

const ROWS = [
  { rank: 1, name: 'Northgate Services Co.', host: 'northgate-services.example' },
  { rank: 2, name: 'Bellrock & Partners', host: 'bellrockpartners.example' },
  { rank: 3, name: 'CityList Directory', host: 'citylist-directory.example' },
  { rank: 4, name: 'Harborline Group', host: 'harborline-group.example' },
]

const Magnifier = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="sg-mag">
    <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.6-3.6" />
  </svg>
)

export default function SerpGap() {
  return (
    <figure className="sg" aria-label="An illustration of a search results page listing four invented example businesses and no entry for your business">
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
