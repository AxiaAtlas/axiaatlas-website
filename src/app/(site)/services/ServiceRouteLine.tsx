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
      setGeo({ x: Math.max(10, iconLeft - 22), top, length, nodes: centers.map((c) => c - top) })
    }

    // How much of the route is traced, from live scroll position.
    const update = () => {
      const list = icons()
      if (!list.length) return
      const first = list[0].getBoundingClientRect()
      const last = list[list.length - 1].getBoundingClientRect()
      const topV = first.top + first.height / 2
      const len = last.top + last.height / 2 - topV
      const anchor = window.innerHeight * 0.58 // trace follows a point ~58% down the viewport
      setDrawn(reduce ? len : Math.max(0, Math.min(len, anchor - topV)))
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
