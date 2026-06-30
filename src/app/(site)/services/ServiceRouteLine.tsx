'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/* A single clean, STRAIGHT vertical line down the services section, connecting
   one service to the next. No curve, no pin — just an elegant spine with a
   small node marker at each service. Geometry is measured from the real service
   icons (and again on resize) so the line and its nodes always line up with the
   content.

   The spine DRAWS itself as you scroll. There is ONE source of progress: the
   section's bounding box measured against the viewport. Progress is 0 the
   instant the section's top edge enters from the bottom of the viewport, and
   reaches exactly 1 when the section's bottom edge reaches the bottom of the
   viewport — so the line travels the full length of the section and completes
   right at the end. The value is clamped to 0–1 and is a pure function of
   scroll position, so it reverses perfectly on scroll-up. It is applied
   imperatively each animation frame (stroke-dashoffset for the spine, opacity
   for the nodes), with no per-frame React re-render and no CSS transition to lag
   behind — so the draw tracks the scroll tightly and never stutters. */

type Geo = {
  w: number
  h: number
  x: number // the spine's x position (px)
  top: number // y of the first node
  bottom: number // y of the last node
  nodes: number[] // y of each node
}

export default function ServiceRouteLine() {
  const ref = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const geoRef = useRef<Geo | null>(null)
  const [geo, setGeo] = useState<Geo | null>(null)

  // Read live geometry + scroll position and paint the draw. No React state is
  // touched here, so this can run every frame without re-rendering.
  const draw = useCallback(() => {
    const root = ref.current?.parentElement
    const g = geoRef.current
    const line = lineRef.current
    if (!root || !g || !line) return

    const rect = root.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    const span = rect.height || 1

    // SINGLE progress source: section box vs viewport, clamped 0→1.
    // 0 when the top edge sits at the viewport bottom (section entering),
    // 1 when the bottom edge reaches the viewport bottom (section's end).
    const p = Math.max(0, Math.min(1, (vh - rect.top) / span))

    const len = g.bottom - g.top
    line.style.strokeDashoffset = String(len * (1 - p))

    const nodes = line.parentElement?.querySelectorAll<SVGCircleElement>('.route-node')
    nodes?.forEach((n) => {
      const frac = Number(n.dataset.frac || 0)
      // Each node reaches full opacity exactly as the draw arrives at it,
      // fading in over the short stretch just before — and back out on reverse.
      n.style.opacity = String(Math.max(0, Math.min(1, (p - frac) / 0.04 + 1)))
    })
  }, [])

  useEffect(() => {
    const root = ref.current?.parentElement
    if (!root) return

    const icons = () =>
      Array.from(root.querySelectorAll<HTMLElement>('.service-detail .service-icon'))

    const measure = () => {
      const list = icons()
      if (!list.length) return
      const rootRect = root.getBoundingClientRect()

      const nodes: number[] = []
      let iconLeft = Infinity
      for (const ic of list) {
        const r = ic.getBoundingClientRect()
        nodes.push(r.top - rootRect.top + r.height / 2)
        iconLeft = Math.min(iconLeft, r.left - rootRect.left)
      }

      // The spine sits a fixed clearance to the LEFT of the icon column so it
      // never crowds the text, clamped to stay on-canvas on narrow viewports.
      const CLEAR = 26
      const x = Math.max(6, iconLeft - CLEAR)

      const next: Geo = {
        w: root.offsetWidth,
        h: root.offsetHeight,
        x,
        top: nodes[0],
        bottom: nodes[nodes.length - 1],
        nodes,
      }
      geoRef.current = next
      setGeo(next)
    }

    // rAF-throttled scroll handler — one paint per frame, in sync with the
    // browser's own scroll rendering, so the draw never stutters.
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
    // Re-measure once layout/fonts have settled.
    const settle = setTimeout(onResize, 350)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      clearTimeout(settle)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [draw])

  // After geometry changes (mount, resize) the SVG re-renders with the line
  // fully hidden; sync the draw to the current scroll position right away.
  useEffect(() => {
    draw()
  }, [geo, draw])

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
          {geo.nodes.map((y, i) => {
            const frac = length ? (y - geo.top) / length : 0
            return (
              <circle
                key={i}
                className="route-node"
                data-frac={frac}
                cx={geo.x}
                cy={y}
                r={4}
                style={{ opacity: 0 }}
              />
            )
          })}
        </svg>
      )}
    </div>
  )
}
