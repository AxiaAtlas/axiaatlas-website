import { Sample } from './Illustrative'

/* ────────────────────────────────────────────────────────────────────────────
   WHAT THE PRE-CALL AUDIT ACTUALLY PRODUCES.

   The CTA band promises "we audit how you show up today — where buyers are
   looking, where you're missing". This is the shape of that deliverable, so the
   promise arrives with something attached to it rather than as a sentence above
   a button.

   THE FOUR ROW LABELS ARE THE FOUR CHANNELS the site already names, and the
   states are the three states an audit can return. The scores are made up and
   the card says so, in the frame, at the top — an audit graphic on the page of
   a company that sells audits is exactly where an unlabelled invented figure
   would do the most damage.
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
          <Sample />
        </div>
        <div className="card-body">
          <ul className="audit-rows">
            {ROWS.map((r) => (
              <li key={r.label} className={`audit-row ${r.state}`}>
                <span className="audit-label">{r.label}</span>
                <span className="audit-track" aria-hidden="true">
                  <span className="audit-fill" style={{ width: `${r.fill}%` }} />
                </span>
                <span className="audit-state">{STATE_LABEL[r.state]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
