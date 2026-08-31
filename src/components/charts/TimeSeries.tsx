'use client'

import { useState } from 'react'
import {
  AXIS, CHART_FONT, CURRENT_STYLE, PRIOR_STYLE, niceMax, compact, shortDay, fullDay,
  type SeriesStyle,
} from './theme'
import { shapeOf, pointCount, MIN_POINTS_FOR_LINE, type SeriesPoint } from '@/lib/analytics/series'

/**
 * PORTED FROM axiaatlas-platform/src/components/charts/TimeSeries.tsx.
 *
 * A DAILY SERIES, WITH THE PRIOR WINDOW BEHIND IT.
 *
 * Three refusals are built into this component rather than left to its callers,
 * because a caller under deadline will always choose the graphic that looks
 * finished.
 *
 * 1. FEWER THAN FIVE POINTS GETS DOTS, NOT A LINE. A polyline through four days
 *    draws a trajectory, and a trajectory is a claim about what happens next.
 *
 * 2. A MISSING DAY BREAKS THE PATH. It is not joined across and it is not drawn
 *    at zero. A day the source did not return and a day with no sessions are
 *    different facts.
 *
 * 3. THE PRIOR OVERLAY APPEARS ONLY WHEN IT WAS PASSED. When there is no
 *    overlay, `priorReason` prints in its place — an absent dashed line with no
 *    explanation reads as "nothing happened last month".
 *
 * The prior series is aligned by DAY OFFSET, not by date. The tooltip prints
 * both real dates so the alignment is never mistaken for a date match.
 *
 * TWO CHANGES FROM THE PLATFORM COPY, both mechanical, neither touching what
 * the chart will and will not draw:
 *
 *   1. The alert glyph. The platform pulls it from lucide-react, which this
 *      site does not carry, so it is inlined below at the same 11px weight.
 *
 *   2. `plotWidth`, defaulting to the platform's hard-coded 720. The SVG scales
 *      its whole coordinate system to its container, type included, so a chart
 *      authored for an 800px portal card and dropped into a 355px hero column
 *      renders its 9px axis labels at 4px. Narrowing the viewBox to match the
 *      container keeps the labels at the size they were designed at. Omit it
 *      and this component is the platform's, coordinate for coordinate.
 */

const AlertCircle = ({ size = 11, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}
  >
    <circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" />
  </svg>
)

export type ChartSeries = {
  key: string
  label: string
  points: SeriesPoint[]
  style?: SeriesStyle
  /** Prior-window series render dashed, muted, and underneath. */
  isPrior?: boolean
}

export default function TimeSeries({
  series,
  height = 190,
  unit = '',
  priorReason,
  note,
  fmt,
  plotWidth = 720,
}: {
  series: ChartSeries[]
  height?: number
  /** viewBox width. Set it to roughly the container's CSS width so the chart's
      type renders at its authored size instead of being scaled down with the
      geometry. Defaults to the platform's 720. */
  plotWidth?: number
  /** Printed after the value in the tooltip: "1,204 sessions". */
  unit?: string
  /** Why there is no prior overlay. Printed when no prior series was passed. */
  priorReason?: string | null
  /** Extra context under the chart. */
  note?: string
  fmt?: (n: number) => string
}) {
  const [hi, setHi] = useState<number | null>(null)

  const current = series.filter((s) => !s.isPrior)
  const prior = series.filter((s) => s.isPrior)
  const primary = current[0]
  const n = primary?.points.length || 0

  if (!primary || pointCount(primary.points) === 0) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: AXIS.label, textAlign: 'center', lineHeight: 1.6, padding: '0 16px' }}>
        {note || 'No day in this window returned a figure for this metric.'}
      </div>
    )
  }

  const shape = shapeOf(primary.points)
  const W = plotWidth, H = height, padL = 44, padR = 14, padT = 12, padB = 26
  const plotW = W - padL - padR, plotH = H - padT - padB

  const allValues = series.flatMap((s) => s.points.map((p) => p.value).filter((v): v is number => v != null))
  const maxV = niceMax(Math.max(1, ...allValues))
  const x = (i: number) => padL + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW)
  const y = (v: number) => padT + plotH - (v / maxV) * plotH

  const ticks = 4
  const yVals = Array.from({ length: ticks + 1 }, (_, i) => (maxV / ticks) * i)

  // Contiguous runs of real points. A null ends the run, so the path breaks at
  // the gap instead of stepping over it.
  const runs = (points: SeriesPoint[]): [number, number][] => {
    const out: [number, number][] = []
    let start: number | null = null
    points.forEach((p, i) => {
      if (p.value != null && start == null) start = i
      if ((p.value == null || i === points.length - 1) && start != null) {
        const end = p.value == null ? i - 1 : i
        if (end >= start) out.push([start, end])
        start = null
      }
    })
    return out
  }

  const labelCount = Math.min(6, n)
  const labelIdx = Array.from({ length: labelCount }, (_, i) => Math.round((i / (labelCount - 1 || 1)) * (n - 1)))

  const pct = hi != null ? (x(hi) / W) * 100 : 0
  const tx = pct < 16 ? '0%' : pct > 84 ? '-100%' : '-50%'
  const fv = (v: number) => (fmt ? fmt(v) : Math.round(v).toLocaleString())

  return (
    <div style={{ width: '100%' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <svg
          viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}
          onMouseLeave={() => setHi(null)}
          onMouseMove={(e) => {
            const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
            const relX = ((e.clientX - rect.left) / rect.width) * W
            const i = Math.round(((relX - padL) / plotW) * (n - 1))
            setHi(Math.max(0, Math.min(n - 1, i)))
          }}
        >
          {yVals.map((v, i) => (
            <g key={i}>
              <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke={AXIS.grid} strokeDasharray={i === 0 ? undefined : '3 4'} opacity={i === 0 ? 0.9 : 0.45} />
              <text x={padL - 7} y={y(v) + 3} textAnchor="end" fontSize="9" fill={AXIS.label} fontFamily={CHART_FONT}>{compact(v)}</text>
            </g>
          ))}

          {/* Prior first, so the current window sits on top of its context. */}
          {prior.map((s) => {
            const st = s.style || PRIOR_STYLE
            return runs(s.points).map(([a, b], k) => a === b ? (
              <circle key={`${s.key}-${k}`} cx={x(a)} cy={y(s.points[a].value!)} r={2.4} fill={st.color} opacity={0.85} />
            ) : (
              <polyline
                key={`${s.key}-${k}`}
                points={s.points.slice(a, b + 1).map((p, j) => `${x(a + j).toFixed(1)},${y(p.value!).toFixed(1)}`).join(' ')}
                fill="none" stroke={st.color} strokeWidth="1.5" strokeDasharray={st.dash || '4 3'}
                strokeLinejoin="round" strokeLinecap="round" opacity={0.85}
              />
            ))
          })}

          {current.map((s, si) => {
            const st = s.style || CURRENT_STYLE
            const sShape = shapeOf(s.points)
            if (sShape === 'points') {
              // No line, no area. Just the measurements.
              return s.points.map((p, i) => p.value == null ? null : (
                <circle key={`${s.key}-${i}`} cx={x(i)} cy={y(p.value)} r={3.4} fill={st.color} />
              ))
            }
            return (
              <g key={s.key}>
                {si === 0 && runs(s.points).map(([a, b], k) => (
                  <polygon
                    key={`area-${k}`}
                    points={`${x(a).toFixed(1)},${(padT + plotH).toFixed(1)} ${s.points.slice(a, b + 1).map((p, j) => `${x(a + j).toFixed(1)},${y(p.value!).toFixed(1)}`).join(' ')} ${x(b).toFixed(1)},${(padT + plotH).toFixed(1)}`}
                    fill={st.color} opacity={0.10}
                  />
                ))}
                {runs(s.points).map(([a, b], k) => a === b ? (
                  <circle key={`line-${k}`} cx={x(a)} cy={y(s.points[a].value!)} r={3} fill={st.color} />
                ) : (
                  <polyline
                    key={`line-${k}`}
                    points={s.points.slice(a, b + 1).map((p, j) => `${x(a + j).toFixed(1)},${y(p.value!).toFixed(1)}`).join(' ')}
                    fill="none" stroke={st.color} strokeWidth="2" strokeDasharray={st.dash || undefined}
                    strokeLinejoin="round" strokeLinecap="round"
                  />
                ))}
              </g>
            )
          })}

          {labelIdx.map((i) => (
            <text key={i} x={x(i)} y={H - 6} textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'} fontSize="9" fill={AXIS.label} fontFamily={CHART_FONT}>
              {shortDay(primary.points[i].date)}
            </text>
          ))}

          {hi != null && (
            <g>
              <line x1={x(hi)} y1={padT} x2={x(hi)} y2={padT + plotH} stroke={AXIS.label} strokeWidth="1" opacity={0.35} />
              {series.map((s) => {
                const p = s.points[hi]
                if (!p || p.value == null) return null
                const st = s.style || (s.isPrior ? PRIOR_STYLE : CURRENT_STYLE)
                return <circle key={s.key} cx={x(hi)} cy={y(p.value)} r={3.5} fill={st.color} stroke={AXIS.surface} strokeWidth="1.5" />
              })}
            </g>
          )}
        </svg>

        {hi != null && (
          <div style={{
            position: 'absolute', left: `${pct}%`, top: 0, transform: `translate(${tx}, -8px)`,
            background: AXIS.surface, border: `1px solid ${AXIS.grid}`, borderRadius: 6, padding: '7px 10px',
            pointerEvents: 'none', whiteSpace: 'nowrap', boxShadow: '0 6px 20px rgba(0,0,0,0.35)', zIndex: 5,
          }}>
            {series.map((s) => {
              const p = s.points[hi]
              const st = s.style || (s.isPrior ? PRIOR_STYLE : CURRENT_STYLE)
              return (
                <div key={s.key} style={{ marginBottom: 3 }}>
                  <div style={{ fontSize: 9, color: AXIS.label }}>
                    {p?.date ? fullDay(p.date) : ''}{s.isPrior ? ' · prior' : ''}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: CHART_FONT, fontSize: 12, fontWeight: 700, color: AXIS.fg }}>
                    <span aria-hidden style={{ width: 12, height: 0, borderTop: `2px ${s.isPrior ? 'dashed' : 'solid'} ${st.color}`, flexShrink: 0 }} />
                    {p?.value == null
                      ? <span style={{ fontWeight: 500, fontSize: 11, color: AXIS.label }}>not returned for this day</span>
                      : <span>{fv(p.value)} {unit}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Legend. Line style, not just colour — and it names the basis of each. */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
        {series.map((s) => {
          const st = s.style || (s.isPrior ? PRIOR_STYLE : CURRENT_STYLE)
          return (
            <span key={s.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, color: AXIS.label }}>
              <span aria-hidden style={{ width: 16, height: 0, borderTop: `2px ${s.isPrior ? 'dashed' : 'solid'} ${st.color}`, flexShrink: 0 }} />
              {s.label}
            </span>
          )
        })}
      </div>

      {shape === 'points' && (
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: 10, color: AXIS.label, lineHeight: 1.55, marginTop: 7 }}>
          <AlertCircle size={11} style={{ flexShrink: 0, marginTop: 2 }} />
          <span>
            {pointCount(primary.points)} day{pointCount(primary.points) === 1 ? '' : 's'} returned a figure — plotted as points.
            A line needs {MIN_POINTS_FOR_LINE}; drawing one through these would assert a trajectory this many days cannot carry.
          </span>
        </div>
      )}

      {!prior.length && priorReason && (
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: 10, color: AXIS.label, lineHeight: 1.55, marginTop: 7 }}>
          <AlertCircle size={11} style={{ flexShrink: 0, marginTop: 2 }} />
          <span><strong style={{ color: AXIS.fg }}>No prior period drawn.</strong> {priorReason}</span>
        </div>
      )}

      {note && <div style={{ fontSize: 10, color: AXIS.label, lineHeight: 1.55, marginTop: 7, opacity: 0.85 }}>{note}</div>}
    </div>
  )
}
