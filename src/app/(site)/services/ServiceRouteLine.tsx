'use client'

import { useEffect, useRef, useState } from 'react'

/* Scroll-linked "route being traced" spine for the Services page.
   A line runs down the left margin, gently meandering as it threads a node at
   every service, then curves across and down to connect into the Book-a-Demo
   location pin in the CTA band below — leading the eye into the demo CTA.
   As you scroll, the traced (solid) portion grows to follow your progress and
   each node lights up as the route reaches it.
   Geometry is measured from the real service icons + the CTA pin, so it always
   stays aligned. Honors prefers-reduced-motion by drawing the full route. */

type Geo = {
  w: number
  h: number
  d: string // the full route path (px coordinates)
  nodes: { x: number; y: number; frac: number }[]
  pin: { x: number; y: number } | null
}

export default function ServiceRouteLine() {
  const ref = useRef<HTMLDivElement>(null)
  const geoRef = useRef<Geo | null>(null)
  const [geo, setGeo] = useState<Geo | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const root = ref.current?.parentElement
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const icons = () =>
      Array.from(root.querySelectorAll<HTMLElement>('.service-detail .service-icon'))

    // Build the route path + node geometry, all relative to the flow container.
    const measure = () => {
      const list = icons()
      if (!list.length) return
      const rootRect = root.getBoundingClientRect()

      const centers: { x: number; y: number }[] = []
      let iconLeft = Infinity
      for (const ic of list) {
        const r = ic.getBoundingClientRect()
        centers.push({ x: r.left - rootRect.left + r.width / 2, y: r.top - rootRect.top + r.height / 2 })
        iconLeft = Math.min(iconLeft, r.left - rootRect.left)
      }
      // The spine runs down the left margin, a fixed clearance to the LEFT of the
      // text column. It must never sit at or right of the text, so X is the icon
      // edge minus a clearance, floored just inside the canvas (handles tight
      // mobile gutters where the margin is only a few px wide).
      const CLEAR = 26
      const X = Math.max(6, iconLeft - CLEAR)
      // Gentle meander, but ONLY leftward (into the empty margin) — bowing right
      // would push the line across the text and hurt legibility. Capped by how
      // much room remains between the spine and the canvas edge.
      const bowMag = Math.min(14, Math.max(0, X - 8))

      // Y below which it's safe to sweep horizontally toward the centered pin:
      // the bottom of the last service block, so the cross-sweep clears all text.
      const lastDetail = root.querySelector<HTMLElement>('.service-detail:last-of-type')
      const safeY = lastDetail
        ? lastDetail.getBoundingClientRect().bottom - rootRect.top
        : centers[centers.length - 1].y

      // Where the route lands: the CTA "Book a Demo" pin beacon, if present.
      const beacon = root.querySelector<HTMLElement>('.cta-band-beacon')
      let pin: { x: number; y: number } | null = null
      if (beacon) {
        const b = beacon.getBoundingClientRect()
        pin = { x: b.left - rootRect.left + b.width / 2, y: b.top - rootRect.top + b.height / 2 }
      }

      // Nodes ride the spine at each icon's vertical center.
      const nodePts = centers.map((c) => ({ x: X, y: c.y }))
      // Path waypoints used both to draw and to measure node progress: the nodes,
      // then the straight drop to safeY, then the pin.
      const pathPts = pin ? [...nodePts, { x: X, y: safeY }, pin] : nodePts

      // Gentle meander through the service nodes (leftward-only bow so it stays
      // clear of the text), a clean vertical drop past the last block, then a
      // soft S-curve that sweeps across the empty CTA margin into the pin.
      let d = `M ${X.toFixed(1)} ${nodePts[0].y.toFixed(1)}`
      for (let i = 1; i < nodePts.length; i++) {
        const y0 = nodePts[i - 1].y
        const y1 = nodePts[i].y
        const lean = X - (i % 2 === 1 ? bowMag : bowMag * 0.5) // always ≤ X (never toward text)
        d += ` C ${lean.toFixed(1)} ${(y0 + (y1 - y0) * 0.34).toFixed(1)}`
        d += ` ${lean.toFixed(1)} ${(y0 + (y1 - y0) * 0.66).toFixed(1)}`
        d += ` ${X.toFixed(1)} ${y1.toFixed(1)}`
      }
      if (pin) {
        // Drop straight down the margin, past all service text, then sweep into
        // the centered pin with vertical tangents at both ends.
        const midY = safeY + (pin.y - safeY) * 0.5
        d += ` L ${X.toFixed(1)} ${safeY.toFixed(1)}`
        d += ` C ${X.toFixed(1)} ${midY.toFixed(1)}`
        d += ` ${pin.x.toFixed(1)} ${midY.toFixed(1)}`
        d += ` ${pin.x.toFixed(1)} ${pin.y.toFixed(1)}`
      }

      // Node fractions along the polyline (chord-length approximation) so the
      // trace lights each node in step with how much of the path is drawn.
      const cum: number[] = [0]
      for (let i = 1; i < pathPts.length; i++) {
        const dx = pathPts[i].x - pathPts[i - 1].x
        const dy = pathPts[i].y - pathPts[i - 1].y
        cum[i] = cum[i - 1] + Math.hypot(dx, dy)
      }
      const total = cum[cum.length - 1] || 1
      const nodes = nodePts.map((p, i) => ({ x: p.x, y: p.y, frac: cum[i] / total }))

      const next: Geo = { w: root.offsetWidth, h: root.offsetHeight, d, nodes, pin }
      geoRef.current = next
      setGeo(next)
    }

    // How much of the route is traced, from live scroll position. The trace
    // deliberately lags: progress is spread across the section height and eased,
    // so the line reveals slowly — roughly filling as the CTA comes into view.
    const update = () => {
      const g = geoRef.current
      if (!g) return
      if (reduce) {
        setProgress(1)
        return
      }
      const vh = window.innerHeight
      const rootTop = root.getBoundingClientRect().top
      const start = vh * 0.82 // begin drawing as the route enters from ~82% down
      const drive = root.offsetHeight + vh * 0.18 // scroll distance to fill (looser = slower)
      let p = (start - rootTop) / drive
      p = Math.max(0, Math.min(1, p))
      // easeInOutSine — gentle, even reveal without a steep mid-section jump
      const eased = -(Math.cos(Math.PI * p) - 1) / 2
      setProgress(eased)
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }
    const onResize = () => {
      measure()
      update()
    }

    measure()
    update()
    if (!reduce) window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    // Re-measure once layout/fonts have settled.
    const settle = setTimeout(onResize, 350)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      clearTimeout(settle)
    }
  }, [])

  return (
    <div ref={ref} className="route-line" aria-hidden="true">
      {geo && (
        <svg className="route-svg" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}>
          <path className="route-track" d={geo.d} />
          <path
            className="route-trace"
            d={geo.d}
            pathLength={1}
            style={{ strokeDashoffset: 1 - progress }}
          />
          {geo.pin && (
            <circle
              className={`route-pin${progress >= 0.995 ? ' on' : ''}`}
              cx={geo.pin.x}
              cy={geo.pin.y}
              r={9}
            />
          )}
          {geo.nodes.map((n, i) => (
            <rect
              key={i}
              className={`route-node${progress >= n.frac - 0.01 ? ' on' : ''}`}
              x={n.x - 5.5}
              y={n.y - 5.5}
              width={11}
              height={11}
            />
          ))}
        </svg>
      )}
    </div>
  )
}
