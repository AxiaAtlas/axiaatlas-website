import { AMark, WordmarkText } from './Logo'
import TimeSeries from './charts/TimeSeries'
import Spark from './charts/Spark'
import type { SeriesPoint } from '@/lib/analytics/series'

/* ────────────────────────────────────────────────────────────────────────────
   THE HERO ARTIFACT IS THE PRODUCT.

   Every class name below (.sidebar, .sb-link, .tb-top, .kpi, .card) is the
   portal's own, and the CSS behind them in globals.css is copied from
   axiaatlas-platform/portal-theme.css under a .portal-ui scope. The charts are
   the portal's chart primitives, ported unchanged into src/components/charts.
   Nothing here is an illustration of the portal; it is the portal's markup,
   its tokens and its components, rendered read-only.

   ON THE NUMBERS. We sell measurement, so an unlabeled invented figure on this
   page would be disqualifying. Every figure below is sample data, it says so on
   the artifact itself in a badge that sits in the topbar and cannot be cropped
   out of the composition, and it is internally consistent: the sessions KPI is
   the exact sum of the 28 plotted days, because a summary tile that disagrees
   with the chart under it is the first thing a buyer who knows this work will
   check.
   ──────────────────────────────────────────────────────────────────────────── */

/** Fixed windows. No Date.now() anywhere: the server and the client must draw
    the same axis, and sample data that silently re-dates itself is a moving
    claim. */
const CURRENT_START = '2026-08-04'
const PRIOR_START = '2026-07-07'

/* 28 days. Weekday peaks, weekend troughs, a rising floor. */
const CURRENT_VALUES = [
  118, 131, 126, 140, 109, 88, 96,
  142, 155, 149, 161, 138, 101, 112,
  168, 174, 166, 181, 159, 118, 127,
  191, 203, 197, 212, 188, 141, 152,
]

/* The 28 days before them, drawn dashed and underneath: context, not a second
   claim of equal weight. */
const PRIOR_VALUES = [
  88, 95, 91, 102, 84, 66, 71,
  99, 104, 98, 110, 92, 70, 78,
  106, 112, 108, 118, 99, 76, 83,
  114, 121, 116, 127, 108, 82, 90,
]

/** ISO day n days after an ISO day, in UTC so the result never depends on the
    timezone of whatever machine renders it. */
function isoPlus(start: string, days: number): string {
  const t = Date.parse(`${start}T00:00:00Z`) + days * 86_400_000
  return new Date(t).toISOString().slice(0, 10)
}

const toSeries = (start: string, values: number[]): SeriesPoint[] =>
  values.map((value, i) => ({ date: isoPlus(start, i), value }))

const CURRENT = toSeries(CURRENT_START, CURRENT_VALUES)
const PRIOR = toSeries(PRIOR_START, PRIOR_VALUES)

const SESSIONS_TOTAL = CURRENT_VALUES.reduce((a, b) => a + b, 0)

/* Monoline glyphs at the portal's sidebar weight. The portal pulls these from
   lucide-react; this site does not carry that dependency, so the four it needs
   are drawn here at the same 1.8 stroke and 14px box. */
type G = { className?: string }
const g = {
  width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}
const IconOverview = (p: G) => (<svg {...g} {...p}><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>)
const IconRankings = (p: G) => (<svg {...g} {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>)
const IconContent = (p: G) => (<svg {...g} {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>)
const IconReports = (p: G) => (<svg {...g} {...p}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>)

const NAV = [
  { label: 'Overview', Icon: IconOverview, active: true },
  { label: 'Rankings', Icon: IconRankings },
  { label: 'Content', Icon: IconContent },
  { label: 'Reports', Icon: IconReports },
]

export default function PortalShot() {
  return (
    <div className="portal-ui portal-shot">
      <aside className="sidebar" aria-hidden="true">
        <div className="sb-brand">
          <AMark className="brand-mark" />
          <WordmarkText className="brand-word" />
        </div>
        <div className="sb-nav">
          {NAV.map(({ label, Icon, active }) => (
            <span key={label} className={`sb-link${active ? ' a' : ''}`}>
              <Icon />
              {/* Wrapped so the rail can collapse to icons the way the portal's
                  own sidebar does — a bare text node cannot be hidden. */}
              <span className="sb-label">{label}</span>
            </span>
          ))}
        </div>
      </aside>

      <div className="ps-main">
        <div className="tb-top">
          <div className="tb-left">
            <div className="tb-label">Client Portal</div>
            <div className="tb-title">Overview</div>
          </div>
          <span className="badge ps-sample">Sample data</span>
        </div>

        <div className="content">
          <div className="kpi-grid">
            <div className="kpi">
              <div className="kpi-label">Deliverables</div>
              <div className="kpi-value">24</div>
            </div>
            <div className="kpi">
              <div className="kpi-label">Awaiting your review</div>
              <div className="kpi-value">3</div>
            </div>
            <div className="kpi">
              <div className="kpi-label">Website sessions (28d)</div>
              <div className="kpi-value">{SESSIONS_TOTAL.toLocaleString('en-US')}</div>
              <div className="kpi-spark">
                <Spark points={CURRENT} height={22} ariaLabel="Website sessions across the last 28 days" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">Website sessions</span>
              <span className="ps-range">Last 28 days</span>
            </div>
            <div className="card-body">
              <TimeSeries
                series={[
                  { key: 'now', label: 'This period', points: CURRENT },
                  { key: 'prior', label: 'Prior period', points: PRIOR, isPrior: true },
                ]}
                height={150}
                unit="sessions"
                /* The card body is roughly 355px here, not the portal's 800.
                   Without this the axis labels scale to 4px along with the
                   geometry, and an unreadable axis on a chart that is meant to
                   BE the argument is worse than no axis. */
                plotWidth={380}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
