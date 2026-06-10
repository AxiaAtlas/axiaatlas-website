'use client'

import { useEffect, useRef, useState } from 'react'

/* Scroll-linked "route being traced" spine for the Services page.
   A vertical line runs down the left margin, threading a node at every service.
   As you scroll, the traced (solid) portion grows to follow your progress and
   each node lights up as the route reaches it — fitting the Atlas theme.
   Geometry is measured from the real service icons, so it always stays aligned.
   Honors prefers-reduced-motion by drawing the full route statically. */

type Geo = { x: number; top: number; length: number; nodes: number[] }

export default function ServiceRouteLine() {
  const ref = useRef<HTMLDivElement>(null)
  const geoRef = useRef<Geo | null>(null)
  const [geo, setGeo] = useState<Geo | null>(null)
  const [drawn, setDrawn] = useState(0)

  useEffect(() => {
    const root = ref.current?.parentElement
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const icons = () =>
      Array.from(root.querySelectorAll<HTMLElement>('.service-detail .service-icon'))

    // Layout geometry, relative to the route container (scroll-invariant).
    const measure = () => {
      const list = icons()
      if (!list.length) return
      const rootRect = root.getBoundingClientRect()
      const centers: number[] = []
      let iconLeft = Infinity
      for (const ic of list) {
        const r = ic.getBoundingClientRect()
        centers.push(r.top - rootRect.top + r.height / 2)
        iconLeft = Math.min(iconLeft, r.left - rootRect.left)
      }
      const top = centers[0]
      const length = centers[centers.length - 1] - top
      const next: Geo = { x: Math.max(10, iconLeft - 22), top, length, nodes: centers.map((c) => c - top) }
      geoRef.current = next
      setGeo(next)
    }

    // How much of the route is traced, from live scroll position.
    // The trace deliberately lags the scroll: progress is spread across the full
    // height of the section (not pinned 1:1 to a viewport line) and eased, so the
    // line reveals gradually — roughly filling as the last service comes into
    // view. `drawn` is scaled off the SAME measured length the nodes use, so a
    // completed trace always reaches (and lights) the final node.
    const update = () => {
      const g = geoRef.current
      if (!g) return
      if (reduce) {
        setDrawn(g.length)
        return
      }
      const vh = window.innerHeight
      const rootTop = root.getBoundingClientRect().top
      const start = vh * 0.82 // begin drawing as the route enters from ~82% down
      const drive = root.offsetHeight + vh * 0.24 // scroll distance to fill (looser = slower)
      let p = (start - rootTop) / drive
      p = Math.max(0, Math.min(1, p))
      // easeInOutSine — gentle, even reveal without a steep mid-section jump
      const eased = -(Math.cos(Math.PI * p) - 1) / 2
      setDrawn(eased * g.length)
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
        <>
          <span className="route-track" style={{ left: geo.x, top: geo.top, height: geo.length }} />
          <span className="route-trace" style={{ left: geo.x, top: geo.top, height: drawn }} />
          {geo.nodes.map((ny, i) => (
            <span
              key={i}
              className={`route-node${drawn >= ny - 1 ? ' on' : ''}`}
              style={{ left: geo.x, top: geo.top + ny }}
            />
          ))}
        </>
      )}
    </div>
  )
}
