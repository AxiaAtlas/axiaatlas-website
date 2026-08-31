// ============================================================================
// PORTED FROM axiaatlas-platform/src/components/charts/theme.ts
//
// ONE CHART PALETTE, BUILT FOR THE DARK GROUND.
//
// The portal's charts sit on a near-black page (#070C09) inside cards a shade
// above it (#131A15). Everything here is chosen to hold contrast against that
// card. The marketing site now sits on the same ground, so the same palette
// applies unchanged — which is the point: no second palette means no second
// thing to keep accessible and no chance for a series to change identity
// between the site and the product.
//
// COLOUR IS NEVER THE ONLY CHANNEL.
//
// Every series carries a dash pattern and a marker shape alongside its hue, and
// the legend prints the same three together.
//
// Two encodings are reserved and must not be reused for an ordinary series:
//
//   DASHED (4 3)  — the prior comparison period. Always.
//   HATCH         — below the evidence floor, or not comparable. Always.
//
// KEEP IN SYNC with the platform copy.
// ============================================================================

export type SeriesStyle = {
  color: string
  /** SVG stroke-dasharray. Empty string = solid. */
  dash: string
  /** Marker drawn at each point when the series is plotted as points. */
  marker: 'circle' | 'square' | 'diamond' | 'triangle'
}

/**
 * Categorical series, in assignment order. Six is the working limit — past that
 * a reader is matching swatches rather than reading a chart.
 */
export const SERIES: SeriesStyle[] = [
  { color: '#7FB69A', dash: '', marker: 'circle' },    // sage — the brand-adjacent default
  { color: '#D9B37C', dash: '', marker: 'square' },    // sand
  { color: '#7FA6CC', dash: '', marker: 'diamond' },   // sky
  { color: '#C98F82', dash: '', marker: 'triangle' },  // clay
  { color: '#AC9CCB', dash: '', marker: 'circle' },    // lilac
  { color: '#A8BE73', dash: '', marker: 'square' },    // moss
]

export function seriesStyle(i: number): SeriesStyle {
  return SERIES[i % SERIES.length]
}

/** The current window's primary line. */
export const CURRENT_STYLE: SeriesStyle = SERIES[0]

/**
 * The prior window. Muted, dashed, and drawn underneath — it is context for the
 * current line, not a second claim of equal weight.
 */
export const PRIOR_STYLE: SeriesStyle = { color: 'var(--spruce-mid)', dash: '4 3', marker: 'circle' }

/** Axis, gridline and label colours, all from theme tokens. */
export const AXIS = {
  grid: 'var(--border)',
  label: 'var(--spruce-mid)',
  fg: 'var(--fg-primary)',
  surface: 'var(--card-bg)',
} as const

export const CHART_FONT = "'Montserrat',Arial,sans-serif"

/** A round number at or above `v`, for the top of a y-axis. */
export function niceMax(v: number): number {
  if (!isFinite(v) || v <= 0) return 1
  const mag = Math.pow(10, Math.floor(Math.log10(v)))
  const n = v / mag
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10
  return step * mag
}

/** 1.2k / 14.3k / 1.1M — axis labels have no room for a full number. */
export function compact(n: number): string {
  const a = Math.abs(n)
  if (a >= 1_000_000) return `${Math.round(n / 100_000) / 10}M`
  if (a >= 1_000) return `${Math.round(n / 100) / 10}k`
  return String(Math.round(n * 10) / 10)
}

/** "Mar 4" for an ISO day. */
export function shortDay(iso: string): string {
  const d = new Date(`${String(iso).slice(0, 10)}T00:00:00`)
  if (isNaN(d.getTime())) return String(iso || '')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** "Wed, Mar 4 2026" for a tooltip. */
export function fullDay(iso: string): string {
  const d = new Date(`${String(iso).slice(0, 10)}T00:00:00`)
  if (isNaN(d.getTime())) return String(iso || '')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}
