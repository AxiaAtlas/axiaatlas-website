'use client'
/* The frame every mock sits in: Theia's panel glass, the company name,
   the replay control and a sentence for screen readers. The animated window
   itself is aria-hidden: it repeats what the sentence says. */
import { useCallback, useEffect, useState, type ReactNode, type RefObject } from 'react'
import type { useScene } from './scene'
import { SAMPLE } from './data'

type Scene = ReturnType<typeof useScene>

export default function MockFrame({ scene, desc, className = '', children, note }: {
  scene: Scene
  /** What the mock shows, in one or two sentences, for screen readers. */
  desc: string
  className?: string
  children: ReactNode
  /** A line under the frame, beside the sample-data note. */
  note?: ReactNode
}) {
  return (
    <figure className={`mock ${className}`} data-state={scene.state}>
      <div ref={scene.ref} className="mock-window" aria-hidden="true">
        {children}
      </div>
      <figcaption className="mock-cap">
        <span className="sr-only">{desc}</span>
        <span className="mock-sample">{SAMPLE}</span>
        {note && <span className="mock-note">{note}</span>}
        {scene.state !== 'still' && (
          <button type="button" className="mock-replay" onClick={scene.replay} disabled={scene.state === 'playing'}>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8a4.5 4.5 0 1 0 1.32-3.18M3.5 2.5v2.75h2.75" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {scene.state === 'playing' ? 'Playing' : 'Replay'}
          </button>
        )}
      </figcaption>
    </figure>
  )
}

/* ── The pointer: moves between named targets inside the window ──────────────
   Targets are elements carrying data-target="<name>". Their centres are
   measured on mount and on resize, so the pointer lands on the real control at
   every width. */
export type Waypoint = { at: number; to: string; click?: boolean }

export function useTargets(root: RefObject<HTMLElement>) {
  const [map, setMap] = useState<Record<string, { x: number; y: number }>>({})
  const measure = useCallback(() => {
    const el = root.current
    if (!el) return
    const box = el.getBoundingClientRect()
    if (!box.width) return
    const next: Record<string, { x: number; y: number }> = {}
    el.querySelectorAll<HTMLElement>('[data-target]').forEach((n) => {
      const r = n.getBoundingClientRect()
      next[n.dataset.target!] = { x: ((r.left + r.width / 2 - box.left) / box.width) * 100, y: ((r.top + r.height / 2 - box.top) / box.height) * 100 }
    })
    setMap(next)
  }, [root])
  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (root.current) ro.observe(root.current)
    return () => ro.disconnect()
  }, [measure, root])
  return map
}

const TRAVEL = 650

export function Pointer({ t, path, targets, hideAfter }: { t: number; path: Waypoint[]; targets: Record<string, { x: number; y: number }>; hideAfter: number }) {
  if (!path.length || !targets[path[0].to]) return null
  const pos = (i: number) => targets[path[i].to] ?? { x: 50, y: 50 }
  let x = pos(0).x + 8
  let y = pos(0).y + 14
  let clickAt = -1
  for (let i = 0; i < path.length; i++) {
    const to = pos(i)
    const from = i === 0 ? { x: to.x + 8, y: to.y + 14 } : pos(i - 1)
    const start = path[i].at - TRAVEL
    if (t < start) break
    const p = Math.min(1, (t - start) / TRAVEL)
    const e = 1 - Math.pow(1 - p, 3)
    x = from.x + (to.x - from.x) * e
    y = from.y + (to.y - from.y) * e
    if (path[i].click && t >= path[i].at) clickAt = path[i].at
  }
  const first = path[0].at - TRAVEL - 300
  const opacity = t < first ? 0 : t > hideAfter ? Math.max(0, 1 - (t - hideAfter) / 400) : Math.min(1, (t - first) / 300)
  const pulse = clickAt >= 0 ? Math.max(0, 1 - (t - clickAt) / 380) : 0
  return (
    <div className="mock-pointer" style={{ left: `${x}%`, top: `${y}%`, opacity }}>
      {pulse > 0 && <span className="mock-click" style={{ opacity: pulse, transform: `translate(-50%, -50%) scale(${1.6 - pulse * 0.6})` }} />}
      <svg viewBox="0 0 20 22" width="20" height="22"><path d="M2 1.5v16.2l4.3-4.1 2.8 6.6 2.9-1.2-2.8-6.5h6.1z" fill="#F1F0EA" stroke="#000" strokeWidth="1.2" strokeLinejoin="round" /></svg>
    </div>
  )
}
