'use client'

import { useEffect, useRef, useState } from 'react'

/* Always-visible cartographic route line for the Services page.
   A single elegant line runs down the left margin, threading a waypoint at every
   service, then curves across and down into the Book-a-Demo location pin in the
   CTA band below — leading the eye into the demo CTA.
   Geometry is measured once from the real service icons + the CTA pin (and again
   on resize) so it always stays aligned. It is fully STATIC: drawn complete with
   no scroll listener, and styled identically in both light and dark themes. */

type Geo = {
  w: number
  h: number
  d: string // the full route path (px coordinates)
  nodes: { x: number; y: number }[]
  pin: { x: number; y: number } | null
}

export default function ServiceRouteLine() {
  const ref = useRef<HTMLDivElement>(null)
  const [geo, setGeo] = useState<Geo | null>(null)

  useEffect(() => {
    const root = ref.current?.parentElement
    if (!root) return

    const icons = () =>
      Array.from(root.querySelectorAll<HTMLElement>('.service-detail .service-icon'))

    // Build the route path + waypoint geometry, all relative to the flow container.
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
      // text column — never at or right of the text (would hurt legibility).
      const CLEAR = 26
      const X = Math.max(6, iconLeft - CLEAR)
      // Gentle meander, but ONLY leftward (into the empty margin), capped by how
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

      // Waypoints ride the spine at each icon's vertical center.
      const nodePts = centers.map((c) => ({ x: X, y: c.y }))

      // Gentle meander through the waypoints (leftward-only bow so it stays clear
      // of the text), a clean vertical drop past the last block, then a soft
      // S-curve that sweeps across the empty CTA margin into the pin.
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
        // Drop straight down the margin, past all service text, then ease across
        // the empty CTA margin and settle into the centered pin — one long, soft
        // cubic with vertical tangents at both ends so the approach rounds gently
        // into the pin instead of cornering hard into it.
        const span = pin.y - safeY
        d += ` L ${X.toFixed(1)} ${safeY.toFixed(1)}`
        d += ` C ${X.toFixed(1)} ${(safeY + span * 0.5).toFixed(1)}`
        d += ` ${pin.x.toFixed(1)} ${(pin.y - span * 0.62).toFixed(1)}`
        d += ` ${pin.x.toFixed(1)} ${pin.y.toFixed(1)}`
      }

      setGeo({ w: root.offsetWidth, h: root.offsetHeight, d, nodes: nodePts, pin })
    }

    measure()
    window.addEventListener('resize', measure)
    // Re-measure once layout/fonts have settled (no scroll listener — fully static).
    const settle = setTimeout(measure, 350)

    return () => {
      window.removeEventListener('resize', measure)
      clearTimeout(settle)
    }
  }, [])

  return (
    <div ref={ref} className="route-line" aria-hidden="true">
      {geo && (
        <svg className="route-svg" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}>
          {/* faint continuous track underlay, then the dotted "travel" route on top */}
          <path className="route-track" d={geo.d} />
          <path className="route-path" d={geo.d} />
          {geo.pin && (
            <circle className="route-pin" cx={geo.pin.x} cy={geo.pin.y} r={9} />
          )}
          {geo.nodes.map((n, i) => (
            <rect
              key={i}
              className="route-node"
              x={n.x - 5}
              y={n.y - 5}
              width={10}
              height={10}
            />
          ))}
        </svg>
      )}
    </div>
  )
}
