'use client'
import { useEffect, useRef, useState } from 'react'
import { SHOTS, type ShotId } from '@/lib/shots'
import ShotSlot from '@/components/ShotSlot'

/* The Theia design's two tabbed frames: "What it builds" (auto-advances every
   6s until someone picks a tab, caption under the frame) and "In the portal"
   (manual only). Frames cross-fade at 600ms, as in the design. Autoplay waits
   until the frame is on screen and never runs under reduced motion. */
export default function ShotTabs({
  tabs,
  autoplay = false,
  showCaption = false,
  lead,
}: {
  tabs: { label: string; shot: ShotId }[]
  autoplay?: boolean
  showCaption?: boolean
  /** Copy for the left column. With it, the tabs sit under the copy and the
      frame takes the right column ("In the portal"); without it, the tabs are
      centred over the frame ("What it builds"). */
  lead?: React.ReactNode
}) {
  const [i, setI] = useState(0)
  const held = useRef(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!autoplay) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let visible = false
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0.3 })
    if (root.current) io.observe(root.current)
    const iv = window.setInterval(() => {
      if (!held.current && visible) setI((n) => (n + 1) % tabs.length)
    }, 6000)
    return () => { window.clearInterval(iv); io.disconnect() }
  }, [autoplay, tabs.length])

  const pick = (n: number) => { held.current = true; setI(n) }

  const tablist = (
    <div role="tablist" className="th-tablist" aria-label="Examples">
      {tabs.map((t, n) => (
        <button
          key={t.label}
          role="tab"
          type="button"
          aria-selected={n === i}
          className={`th-tab${n === i ? ' on' : ''}`}
          onClick={() => pick(n)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
  const stack = (
    <div className="th-stack">
      {tabs.map((t, n) => (
        <div key={t.label} className={`th-layer${n === i ? ' on' : ''}`} aria-hidden={n !== i}>
          <ShotSlot id={t.shot} caption={false} />
        </div>
      ))}
    </div>
  )

  if (lead) {
    return (
      <div ref={root} className="th-split th-split-center">
        <div>{lead}{tablist}</div>
        {stack}
      </div>
    )
  }
  return (
    <div ref={root} className="th-tabs">
      {tablist}
      {stack}
      {showCaption && <p className="th-build-cap" aria-live="polite">{SHOTS[tabs[i].shot].caption}</p>}
    </div>
  )
}
