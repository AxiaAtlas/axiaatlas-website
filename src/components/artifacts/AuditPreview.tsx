/* ────────────────────────────────────────────────────────────────────────────
   WHAT THE PRE-CALL AUDIT ACTUALLY PRODUCES.

   The CTA band promises "we audit how you show up today — where buyers are
   looking, where you're missing". This is the shape of that deliverable, so the
   promise arrives with something attached to it rather than as a sentence above
   a button.

   THE FOUR ROW LABELS ARE THE FOUR CHANNELS the site already names.

   EVERY ROW NOW CARRIES ITS NUMBER. The bar drew a percentage and the right-
   hand column named a state, so the one quantity in the card was the only thing
   a reader had to estimate off a 6px track. The number is printed. The state
   word stays beside it, because "12%" alone does not say whether 12 is a
   disaster or a decent start in that channel — the pair is the finding, and the
   colour ties them together.

   NO "SAMPLE DATA" TAG. It read as an apology for a graphic nobody was going to
   mistake for their own audit: this is a hero illustration on a marketing page,
   under a headline and beside a "Book a Demo" button, for a visitor who has not
   given us a domain yet. There is nothing here to attribute and nobody to
   mislead. The label rule still holds where it earns its place — see the note
   in Illustrative.tsx, and the mock result list, which keeps its tag because a
   crop of it could be read as a real search.
   ──────────────────────────────────────────────────────────────────────────── */

const ROWS: { label: string; state: 'gap' | 'partial' | 'ok'; fill: number }[] = [
  { label: 'Search', state: 'partial', fill: 46 },
  { label: 'Answer Engines', state: 'gap', fill: 12 },
  { label: 'Local & Maps', state: 'ok', fill: 78 },
  { label: 'Social Feeds', state: 'partial', fill: 38 },
]

const STATE_LABEL = { gap: 'Gap', partial: 'Partial', ok: 'Covered' } as const

export default function AuditPreview() {
  return (
    <div className="portal-ui audit-card">
      <div className="card">
        <div className="card-header">
          <span className="card-title">Visibility audit</span>
        </div>
        <div className="card-body">
          <ul className="audit-rows">
            {ROWS.map((r) => (
              <li key={r.label} className={`audit-row ${r.state}`}>
                <span className="audit-label">{r.label}</span>
                <span className="audit-track" aria-hidden="true">
                  <span className="audit-fill" style={{ width: `${r.fill}%` }} />
                </span>
                <span className="audit-pct">{r.fill}%</span>
                <span className="audit-state">{STATE_LABEL[r.state]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
