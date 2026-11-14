'use client'
/* A stage that stays on screen while the copy beside it scrolls past, and
   changes what it shows as each step reaches the middle of the screen.

   Wide screens: the steps scroll on the left, the stage is sticky on the right
   and mounts only the active step's screen, so each mock plays from the start
   when its step arrives. Narrow screens: no pinning; each step shows its own
   screen under its words. Both are in the markup and CSS picks one, so nothing
   moves when the script loads. */
import { useEffect, useRef, useState, type ReactNode } from 'react'

export type Step = { id?: string; kicker: string; title: string; body: ReactNode; extra?: ReactNode; stage: ReactNode }

export default function PinnedStage({ steps, mark }: { steps: Step[]; mark: string }) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
      })
    }, { rootMargin: '-45% 0px -45% 0px' })
    refs.current.forEach((r) => r && io.observe(r))
    return () => io.disconnect()
  }, [])

  return (
    <div className="pin" data-aa-section={mark}>
      <div className="pin-steps">
        {steps.map((s, i) => (
          <div key={s.title} id={s.id} data-i={i} ref={(el) => { refs.current[i] = el }} className={`pin-step${i === active ? ' on' : ''}`}>
            <div className="pin-copy">
              <div className="kicker">{s.kicker}</div>
              <h2 className="h2 pin-title">{s.title}</h2>
              <div className="lede">{s.body}</div>
              {s.extra}
            </div>
            <div className="pin-inline">{s.stage}</div>
          </div>
        ))}
      </div>
      <div className="pin-stage" aria-hidden="false">
        <div className="pin-frame">
          {steps.map((s, i) => (
            <div key={s.title} className={`pin-layer${i === active ? ' on' : ''}`}>
              {i === active && s.stage}
            </div>
          ))}
        </div>
        <ol className="pin-dots" aria-hidden="true">
          {steps.map((s, i) => <li key={s.title} className={i === active ? 'on' : ''}>{s.kicker}</li>)}
        </ol>
      </div>
    </div>
  )
}
