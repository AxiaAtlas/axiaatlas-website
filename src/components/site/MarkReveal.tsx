'use client'
/* The Theia mark building in: the pack's 36-frame reveal (logo-animation/
   reveal-on-black), played once at 24 fps from a 6 x 6 sprite onto a canvas.
   Its black ground drops out with mix-blend-mode: screen, so the waves show
   through. The last frame stays. Without JavaScript, or with reduced motion,
   the last frame is the image. */
import { useEffect, useRef, useState } from 'react'

const FRAMES = 36
const COLS = 6
const TILE = 360
const FPS = 24

export default function MarkReveal({ className = '', delay = 150 }: { className?: string; delay?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const c = canvas.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return
    setAnimate(true)
    const img = new Image()
    img.decoding = 'async'
    let raf = 0
    let timer = 0
    img.onload = () => {
      let start = 0
      const draw = (now: number) => {
        if (!start) start = now
        const f = Math.min(FRAMES - 1, Math.floor(((now - start) / 1000) * FPS))
        ctx.clearRect(0, 0, TILE, TILE)
        ctx.drawImage(img, (f % COLS) * TILE, Math.floor(f / COLS) * TILE, TILE, TILE, 0, 0, TILE, TILE)
        if (f < FRAMES - 1) raf = requestAnimationFrame(draw)
      }
      timer = window.setTimeout(() => { raf = requestAnimationFrame(draw) }, delay)
    }
    img.src = '/media/mark/reveal.webp'
    return () => { cancelAnimationFrame(raf); clearTimeout(timer) }
  }, [delay])

  return (
    <div className={`mark-seq mark-seq-screen ${className}`} role="img" aria-label="Theia">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/mark/reveal-still.webp" alt="" width={720} height={720} style={{ opacity: animate ? 0 : 1 }} fetchPriority="high" />
      <canvas ref={canvas} width={TILE} height={TILE} />
    </div>
  )
}
