'use client'

import { useEffect, useRef, useState } from 'react'

/* A single straight vertical spine down the services section, joining the seven
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

const REF = 0.6 // reference line, as a fraction of viewport height
const FADE = 0.04 // span (in progress units) over which a node fades in

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
      const refY = vh * REF

      // Live viewport y of the first and last nodes.
      const firstY = rect.top + g.top
      const lastY = rect.top + g.bottom
      const travel = lastY - firstY || 1

      // 0 when the first node crosses the reference line, 1 when the last does.
      const p = Math.max(0, Math.min(1, (refY - firstY) / travel))

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
