'use client'

import { useEffect, useRef, useState } from 'react'

/* A single straight vertical spine down the services section, joining the eight
   service-icon nodes. The spine DRAWS as you scroll: empty at the first icon,
   full at the last.

   One source of truth for progress: the live viewport position of the first and
   last nodes. A fixed reference line sits at REF * viewport-height; progress is
   0 when the first node passes that line and 1 when the last node reaches it —
   a pure, clamped function of scroll position, so it reverses perfectly on the
   way back up with no stutter and no short-stop.

   Geometry is measured from the real icons (once, and again on resize), so the
   SVG renders a single time. The per-frame paint — stroke-dashoffset for the
   spine, opacity for each node — is applied imperatively via refs inside a
   requestAnimationFrame, so there is no React re-render and no CSS transition
   lagging behind the scroll. */

// The spine starts drawing when the first node is low in the viewport and
// finishes when the last node is high in it. Using two well-separated
// reference lines (instead of one) stretches the draw across the whole
// section height PLUS a full lead-in/out, so it fills gradually and completes
// near the end of the section rather than early.
const REF_START = 0.9 // first node crosses here (near the bottom) → progress 0
const REF_END = 0.12 // last node crosses here (near the top) → progress 1
const FADE = 0.04 // span (in progress units) over which a node fades in

// Symmetric ease — slow at both ends, so the fill eases in and out smoothly and
// reverses identically on the way back up (smoothstep: 3t² − 2t³).
const ease = (t: number) => t * t * (3 - 2 * t)

type Geo = {
  w: number
  h: number
  x: number // x of the spine (px, relative to the container)
  top: number // y of the first node
  bottom: number // y of the last node
  nodes: number[] // y of every node
}

export default function ServiceRouteLine() {
  const ref = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const geoRef = useRef<Geo | null>(null)
  const [geo, setGeo] = useState<Geo | null>(null)

  useEffect(() => {
    const root = ref.current?.parentElement
    if (!root) return

    // ── paint one frame ──────────────────────────────────────────────────
    // Reads live layout + scroll, touches no React state, so it is safe to run
    // every animation frame.
    const draw = () => {
      const g = geoRef.current
      const line = lineRef.current
      if (!g || !line) return

      const rect = root.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight

      // Both nodes move together with scroll, so progress is a pure function of
      // rect.top: 0 when the first node sits at REF_START * vh, 1 when the last
      // node reaches REF_END * vh. The gap between those two lines is the extra
      // lead-in/out that slows the draw down.
      const topAtStart = vh * REF_START - g.top
      const topAtEnd = vh * REF_END - g.bottom
      const span = topAtEnd - topAtStart || -1

      const raw = Math.max(0, Math.min(1, (rect.top - topAtStart) / span))
      const p = ease(raw)

      const len = g.bottom - g.top
      line.style.strokeDashoffset = String(len * (1 - p))

      line.parentElement
        ?.querySelectorAll<SVGCircleElement>('.route-node')
        .forEach((n) => {
          const frac = Number(n.dataset.frac || 0)
          // Full opacity exactly as the head arrives, fading in over the short
          // FADE window just before — and back out on the way up.
          n.style.opacity = String(Math.max(0, Math.min(1, (p - frac) / FADE + 1)))
        })
    }

    // ── measure geometry from the real icons ─────────────────────────────
    const measure = () => {
      const icons = Array.from(
        root.querySelectorAll<HTMLElement>('.service-detail .service-icon'),
      )
      if (!icons.length) return

      const rootRect = root.getBoundingClientRect()
      const nodes: number[] = []
      let iconLeft = Infinity
      for (const ic of icons) {
        const r = ic.getBoundingClientRect()
        nodes.push(r.top - rootRect.top + r.height / 2)
        iconLeft = Math.min(iconLeft, r.left - rootRect.left)
      }

      // Sit a fixed clearance to the left of the icon column; clamp so the
      // spine stays on-canvas on narrow viewports.
      const x = Math.max(6, iconLeft - 26)

      geoRef.current = {
        w: root.offsetWidth,
        h: root.offsetHeight,
        x,
        top: nodes[0],
        bottom: nodes[nodes.length - 1],
        nodes,
      }
      setGeo(geoRef.current)
    }

    // ── wire up: one paint per frame, in sync with the browser ───────────
    let raf = 0
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0
          draw()
        })
    }
    const onResize = () => {
      measure()
      draw()
    }

    measure()
    draw()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    const settle = setTimeout(onResize, 350) // re-measure once fonts settle

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      clearTimeout(settle)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // On (re)measure the SVG re-renders fully hidden — sync the paint to the
  // current scroll position on the next frame.
  useEffect(() => {
    if (!geo || !lineRef.current) return
    const id = requestAnimationFrame(() => window.dispatchEvent(new Event('scroll')))
    return () => cancelAnimationFrame(id)
  }, [geo])

  const length = geo ? geo.bottom - geo.top : 0

  return (
    <div ref={ref} className="route-line" aria-hidden="true">
      {geo && (
        <svg className="route-svg" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}>
          <line
            ref={lineRef}
            className="route-path"
            x1={geo.x}
            y1={geo.top}
            x2={geo.x}
            y2={geo.bottom}
            style={{ strokeDasharray: length, strokeDashoffset: length }}
          />
          {geo.nodes.map((y, i) => (
            <circle
              key={i}
              className="route-node"
              data-frac={length ? (y - geo.top) / length : 0}
              cx={geo.x}
              cy={y}
              r={4}
              style={{ opacity: 0 }}
            />
          ))}
        </svg>
      )}
    </div>
  )
}
