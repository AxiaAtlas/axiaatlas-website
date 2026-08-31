// ============================================================================
// PORTED FROM axiaatlas-platform/src/lib/analytics/series.ts
//
// The marketing site draws the same charts the product draws, from the same
// primitives, so the visuals on this page are literally the thing being sold.
// Only the parts the ported chart components call are carried over; the
// windowing, densify and prior-alignment helpers stay in the platform, where
// there is real data to window.
//
// KEEP IN SYNC with the platform copy. If the refusals below change there,
// they change here — a chart that is honest in the product and generous on the
// marketing site is worse than no chart at all.
// ============================================================================

/**
 * Below this many real points, a line is not drawn.
 *
 * A polyline through four days draws a trajectory, and a trajectory is a claim
 * about what happens next. The dots carry the same numbers and make no such
 * claim.
 */
export const MIN_POINTS_FOR_LINE = 5

/** null = the source returned nothing for this day. Never conflated with 0. */
export type SeriesPoint = { date: string; value: number | null }

export type SeriesShape = 'line' | 'points' | 'empty'

/** Real (non-null) points in a series. */
export function pointCount(points: SeriesPoint[]): number {
  return points.filter((p) => p.value != null).length
}

/**
 * Whether this series has earned a line.
 *
 * 'points' is not a degraded 'line' — it is the honest rendering of a sample
 * that has values but no demonstrable trajectory.
 */
export function shapeOf(points: SeriesPoint[]): SeriesShape {
  const n = pointCount(points)
  if (n === 0) return 'empty'
  return n >= MIN_POINTS_FOR_LINE ? 'line' : 'points'
}
