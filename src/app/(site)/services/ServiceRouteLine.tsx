'use client'

import { useEffect, useRef, useState } from 'react'

/* A single clean, STRAIGHT vertical line down the services section, connecting
   one service to the next. No curve, no pin — just an elegant spine with a
   small node marker at each service. Geometry is measured from the real service
   icons (and again on resize) so the line and its nodes always line up with the
   content. The spine DRAWS itself as you scroll the section: a scroll-progress
   value (0→1) maps to the line's stroke-dashoffset, and each node fades in as
   the draw reaches it. Styled identically in both themes. */

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
  const [geo, setGeo] = useState<Geo | null>(null)
  // 0 → 1 draw progress, driven by how far the section has scrolled past.
  const [progress, setProgress] = useState(0)

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

      setGeo({
        w: root.offsetWidth,
        h: root.offsetHeight,
        x,
        top: nodes[0],
        bottom: nodes[nodes.length - 1],
        nodes,
      })
    }

    // Map scroll position to draw progress: 0 when the section sits just below
    // the viewport, 1 once it has scrolled fully past the top. rAF-throttled.
    let raf = 0
    const updateProgress = () => {
      raf = 0
      const rect = root.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const p = (vh - rect.top) / (vh + rect.height)
      setProgress(Math.max(0, Math.min(1, p)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateProgress)
    }

    measure()
    updateProgress()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // Re-measure once layout/fonts have settled.
    const settle = setTimeout(() => { measure(); updateProgress() }, 350)

    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      clearTimeout(settle)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const length = geo ? geo.bottom - geo.top : 0

  return (
    <div ref={ref} className="route-line" aria-hidden="true">
      {geo && (
        <svg className="route-svg" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}>
          <line
            className="route-path"
            x1={geo.x}
            y1={geo.top}
            x2={geo.x}
            y2={geo.bottom}
            style={{ strokeDasharray: length, strokeDashoffset: length * (1 - progress) }}
          />
          {geo.nodes.map((y, i) => {
            const frac = length ? (y - geo.top) / length : 0
            return (
              <circle
                key={i}
                className="route-node"
                cx={geo.x}
                cy={y}
                r={4}
                style={{ opacity: progress >= frac - 0.0001 ? undefined : 0 }}
              />
            )
          })}
        </svg>
      )}
    </div>
  )
}
