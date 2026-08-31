'use client'

import Spark from '@/components/charts/Spark'
import type { SeriesPoint } from '@/lib/analytics/series'

/* ────────────────────────────────────────────────────────────────────────────
   THE CHART BESIDE A CASE STUDY, AND THE ARGUMENT AGAINST IT.

   Each result slide now pairs its claim with a chart drawn on the portal's own
   TimeSeries primitive. I want the reservation recorded next to the code rather
   than only in a message, because whoever reads this next deserves to know it
   was a decision and not an oversight:

   WE DO NOT HOLD THE UNDERLYING SERIES FOR ANY OF THESE FIVE RESULTS. So every
   chart here is a SHAPE, not a report. It is generated from a curve — the
   growth factor named in the headline, spread over the period named in the
   headline — and it is labelled "Sample shape" inside its own frame. It cannot
   be read as client data, and nothing in it is presented as measured.

   The risk that remains, and the reason I would still cut these: a chart next
   to a real, sourced claim borrows that claim's authority even while labelled.
   A reader who skims sees a number and a rising line and concludes the line
   evidences the number. It does not. The honest version of this section is the
   claim on its own, or a chart built from the real series once we hold them.
   When those series exist, replace `shapeFor` with the data and drop the tag.

   Until then: this uses the portal's Spark rather than its TimeSeries, and that
   is the whole reason. TimeSeries prints y-axis ticks, and the ticks for a made
   up series are made up figures sitting on an axis, unlabelled, which is the
   exact thing we refuse to put on this site. Spark draws the shape and prints
   no number anywhere. The tag sits inside the frame, and the series moves in
   the direction the headline states and asserts nothing else.
   ──────────────────────────────────────────────────────────────────────────── */

const START = '2026-04-06'

function isoPlus(start: string, days: number): string {
  const t = Date.parse(`${start}T00:00:00Z`) + days * 86_400_000
  return new Date(t).toISOString().slice(0, 10)
}

/**
 * A rising curve with weekly texture. `lift` is the end/start ratio the
 * headline names; nothing else about the shape is claimed.
 */
export function shapeFor(lift: number, weeks = 13): SeriesPoint[] {
  const n = weeks
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    // ease-out growth, so the curve does not read as a straight extrapolation
    const base = 1 + (lift - 1) * (1 - Math.pow(1 - t, 1.9))
    const wobble = 1 + 0.045 * Math.sin(i * 1.7)
    return { date: isoPlus(START, i * 7), value: Math.round(100 * base * wobble) }
  })
}

export default function ResultShape({ lift, label }: { lift: number; label: string }) {
  return (
    <div className="portal-ui result-shape">
      <div className="card">
        <div className="card-header">
          <span className="card-title">{label}</span>
          <span className="artifact-tag">Sample shape</span>
        </div>
        <div className="card-body">
          <Spark
            points={shapeFor(lift)}
            width={360}
            height={92}
            ariaLabel="An illustrative rising curve. Sample shape, not client data."
          />
          <p className="result-shape-note">
            Shape only, drawn to the direction and period stated in the result. Not the client&apos;s series.
          </p>
        </div>
      </div>
    </div>
  )
}
