'use client'

import { AXIS, CURRENT_STYLE } from './theme'
import { shapeOf, pointCount, type SeriesPoint } from '@/lib/analytics/series'

/**
 * PORTED FROM axiaatlas-platform/src/components/charts/Spark.tsx.
 *
 * THE LINE THAT MAKES A NUMBER CARRY ITS DIRECTION.
 *
 * A KPI tile with a single number tells you where you are and nothing about how
 * you got there. 1,204 sessions is a different fact depending on whether last
 * week was 400 or 4,000, and the tile has no way to say which.
 *
 * Same floor as the full chart: below five real points this draws dots, not a
 * line. A sparkline is the most persuasive trend graphic on any page precisely
 * because it is too small to interrogate — which is exactly why it must not be
 * allowed to imply a trajectory the sample cannot support.
 *
 * Missing days break the line rather than dropping to the floor. At this size a
 * dip to zero and a gap look identical if drawn identically, and they are not
 * the same thing.
 */
export default function Spark({
  points,
  color = CURRENT_STYLE.color,
  width = 96,
  height = 26,
  ariaLabel,
}: {
  points: SeriesPoint[]
  color?: string
  width?: number
  height?: number
  ariaLabel?: string
}) {
  const real = points.filter((p) => p.value != null)
  if (!real.length) return null

  const shape = shapeOf(points)
  const values = real.map((p) => p.value!)
  const max = Math.max(...values), min = Math.min(...values)
  const span = max - min || 1
  const pad = 3
  const n = points.length
  const x = (i: number) => pad + (n === 1 ? (width - pad * 2) / 2 : (i / (n - 1)) * (width - pad * 2))
  const y = (v: number) => height - pad - ((v - min) / span) * (height - pad * 2)

  // Contiguous runs, so a gap is a break rather than a plunge.
  const segs: number[][] = []
  let cur: number[] = []
  points.forEach((p, i) => {
    if (p.value == null) { if (cur.length) segs.push(cur); cur = [] } else cur.push(i)
  })
  if (cur.length) segs.push(cur)

  const lastIdx = points.map((p, i) => (p.value != null ? i : -1)).filter((i) => i >= 0).pop()!

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`} width="100%" height={height}
      preserveAspectRatio="none" style={{ display: 'block', overflow: 'visible' }}
      role="img" aria-label={ariaLabel || `${pointCount(points)} data points`}
    >
      {shape === 'points'
        ? points.map((p, i) => p.value == null ? null : <circle key={i} cx={x(i)} cy={y(p.value)} r={1.9} fill={color} />)
        : segs.map((seg, k) => seg.length === 1
            ? <circle key={k} cx={x(seg[0])} cy={y(points[seg[0]].value!)} r={1.9} fill={color} />
            : <polyline
                key={k}
                points={seg.map((i) => `${x(i).toFixed(1)},${y(points[i].value!).toFixed(1)}`).join(' ')}
                fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round"
              />)}
      {/* The end point, so the eye lands on "now" rather than on the peak. */}
      <circle cx={x(lastIdx)} cy={y(points[lastIdx].value!)} r={2.4} fill={color} stroke={AXIS.surface} strokeWidth={1} />
    </svg>
  )
}
