import { Illustrative } from './Illustrative'

/* ────────────────────────────────────────────────────────────────────────────
   SHOW THE ABSENCE.

   "You can have the better product and still lose to the business that shows up
   first" is the whole argument of the Problem section, and it was being made by
   a paragraph. This is that sentence as a picture: a result list where four
   businesses are present and the fifth slot — the one the reader is standing in
   — is empty.

   THE QUERY IS A SEARCH, NOT A SLOT. It read "what you sell, near me", which is
   a placeholder wearing a mock's clothes: every other element in this frame had
   been made concrete and the one line a reader's eye lands on first was still
   the instruction for filling it in. A visitor does not type "what you sell" —
   they type a category and a place, and the whole argument of the graphic
   depends on the reader believing they are looking at a real result page.

   IT IS ONE CATEGORY, AND ANY ONE CATEGORY IS ARBITRARY. Insurance broking is
   chosen because it is the query the four names below already fit: a firm
   ("Bellrock & Partners"), a services company, a group, and a directory are
   exactly who ranks for a considered local search in a category like it. The
   mock argues about SHOWING UP, not about an industry, and the "Not a real
   search" tag says as much.

   AND IT IS SHORT ENOUGH TO RENDER WHOLE AT 390px. `.sg-query` is a single
   nowrap line with `text-overflow: ellipsis`, and the field it sits in gives a
   phone about 260px of it. "commercial insurance broker near me" was the first
   choice and it clipped to "commercial in…" — a truncated query in a mock of a
   search is the same defect as a placeholder, wearing an ellipsis. Any
   replacement has to be checked at 390px, not just read.

   THE ROWS ARE INVENTED BUSINESSES, NOT PLACEHOLDER LABELS. They used to read
   "A competitor / competitor-one.example" and "Another provider", which is a
   description of a mock rather than a mock: a reader sees an unfinished
   component, not a search result they lose. The names below are made up out of
   generic English compounds — none names an industry, so the query above can be
   re-pointed without them going stale — and every host sits on `.example`, the
   TLD RFC 2606 reserves so it can never resolve to anybody's site.

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
          <span className="sg-query">insurance broker near me</span>
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
