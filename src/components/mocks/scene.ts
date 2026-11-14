'use client'
/* ════════════════════════════════════════════════════════════════════════════
   THE MOCK TIMELINE.

   Every mock interaction on the site is a pure function of one number, t (ms
   since it started). useScene owns t:

   - The server and the first client render draw the FINISHED state (t = end),
     so a page without JavaScript, a crawler and a reader who prefers reduced
     motion all get the complete still.
   - With motion allowed, t resets to 0 after hydration and waits. The scene
     plays once, the first time a third of it is on screen.
   - Off screen, or in a background tab, it pauses; back in view it resumes.
   - replay() starts it again from 0.

   Nothing in a mock changes size as t moves: every box is laid out at its
   final size and only opacity, transforms, stroke offsets and text inside a
   reserved box change. So there is no layout shift, at any width.
   ════════════════════════════════════════════════════════════════════════════ */
import { useCallback, useEffect, useRef, useState } from 'react'

export type SceneState = 'still' | 'waiting' | 'playing' | 'paused' | 'done'

export function useScene(end: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [t, setT] = useState(end)
  const [state, setState] = useState<SceneState>('still')
  const clock = useRef({ elapsed: end, last: 0, raf: 0, visible: false, wanted: false })

  const stop = () => {
    cancelAnimationFrame(clock.current.raf)
    clock.current.raf = 0
  }

  const tick = useCallback((now: number) => {
    const c = clock.current
    const dt = c.last ? Math.min(now - c.last, 100) : 16
    c.last = now
    c.elapsed = Math.min(end, c.elapsed + dt)
    setT(c.elapsed)
    if (c.elapsed >= end) {
      c.raf = 0
      c.wanted = false
      setState('done')
      return
    }
    c.raf = requestAnimationFrame(tick)
  }, [end])

  const run = useCallback(() => {
    const c = clock.current
    if (c.raf || !c.visible || document.hidden) return
    c.last = 0
    setState('playing')
    c.raf = requestAnimationFrame(tick)
  }, [tick])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const c = clock.current
    c.elapsed = 0
    c.wanted = true
    setT(0)
    setState('waiting')

    const io = new IntersectionObserver(([e]) => {
      c.visible = e.isIntersecting
      if (c.visible && c.wanted) run()
      else if (!c.visible && c.raf) { stop(); setState('paused') }
    }, { threshold: 0.33 })
    io.observe(el)

    const onVis = () => {
      if (document.hidden && c.raf) { stop(); setState('paused') }
      else if (!document.hidden && c.wanted) run()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); stop() }
  }, [run])

  const replay = useCallback(() => {
    const c = clock.current
    stop()
    c.elapsed = 0
    c.wanted = true
    setT(0)
    run()
  }, [run])

  return { ref, t, state, replay, end }
}

/** 0 before a, 1 after b, linear between. */
export const seg = (t: number, a: number, b: number) => (t <= a ? 0 : t >= b ? 1 : (t - a) / (b - a))
/** Theia's ease (cubic-bezier(0.22, 1, 0.36, 1)), close enough for counters and draws. */
export const ease = (p: number) => 1 - Math.pow(1 - p, 3.2)
/** The first n characters of text, typed at cps characters a second from start. */
export const typed = (text: string, t: number, start: number, cps = 32) =>
  text.slice(0, Math.max(0, Math.floor(((t - start) / 1000) * cps)))
/** Opacity and lift for something that arrives at `at`. */
export const rise = (t: number, at: number, dur = 520) => {
  const p = ease(seg(t, at, at + dur))
  return { opacity: p, transform: `translateY(${(1 - p) * 8}px)` }
}
/** A number counting up to `to` between a and b. */
export const count = (t: number, a: number, b: number, to: number) => to * ease(seg(t, a, b))

export const money = (n: number, digits = 0) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
export const num = (n: number, digits = 0) =>
  n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })

/** A line drawing itself left to right. A clip, not a dash offset: Chrome
    drops the tail of a pathLength dash on a non-scaling stroke. */
export const draw = (p: number) => ({ clipPath: `inset(-24px ${((1 - p) * 100).toFixed(2)}% -24px -24px)` })

/** Frame of the 48-frame thinking loop at 24 fps, as a background-position. */
export const thinkFrame = (t: number) => {
  const f = Math.floor((t / 1000) * 24) % 48
  return `${((f % 8) * 100) / 7}% ${(Math.floor(f / 8) * 100) / 5}%`
}
