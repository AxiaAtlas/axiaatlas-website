'use client'
/* Theia's thinking loop (logo-animation/thinking-transparent, 48 frames at
   24 fps) from an 8 x 6 sprite. Until the page has loaded, and under reduced
   motion, it is the still mark drawn in SVG, so the sprite never competes with
   the page's first paint. Plays only while on screen. */
import { useEffect, useRef, useState } from 'react'
import TheiaMark from '@/components/TheiaMark'

export default function ThinkingMark({ size = 72, className = '' }: { size?: number; className?: string }) {
  const el = useRef<HTMLSpanElement>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Well after first paint: the loop is a flourish, never on the critical path.
    let id = 0
    const go = () => { id = window.setTimeout(() => setLive(true), 1200) }
    if (document.readyState === 'complete') go()
    else window.addEventListener('load', go, { once: true })
    return () => { window.removeEventListener('load', go); clearTimeout(id) }
  }, [])

  useEffect(() => {
    const n = el.current
    if (!n || !live) return
    let raf = 0
    let start = 0
    const loop = (now: number) => {
      if (!start) start = now
      const f = Math.floor(((now - start) / 1000) * 24) % 48
      n.style.backgroundPosition = `${((f % 8) * 100) / 7}% ${(Math.floor(f / 8) * 100) / 5}%`
      raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf)
      if (e.isIntersecting) { start = 0; raf = requestAnimationFrame(loop) }
    })
    io.observe(n)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [live])

  return (
    <span
      ref={el}
      className={`think-mark ${live ? (size > 64 ? 'think-mark-lg' : 'think-mark-sm') : 'think-mark-still'} ${className}`}
      style={{ ['--size' as string]: `${size}px` }}
      aria-hidden="true"
    >
      {!live && <TheiaMark className="think-mark-svg" />}
    </span>
  )
}
