'use client'
import { useEffect, useRef, useState } from 'react'
import { Arrow } from '@/components/icons'
import ResultShape from '@/components/artifacts/ResultShape'

export type ResultSlide = {
  industry: string
  result_headline: string
  result_detail: string
  service_used: string
}

const AUTOPLAY_MS = 5200

/* The end/start ratio each slide's shape is drawn to. These are read off the
   direction each result states and nothing more — they scale a curve, they are
   not a measurement, and the card they render into says "Sample shape" inside
   its own frame. See components/artifacts/ResultShape.tsx for why I would still
   argue for cutting these charts entirely. */
const LIFT = [4.4, 2.6, 1.9, 3.1, 2.2]

/* Auto-advancing results carousel. Pauses on hover/focus, respects
   prefers-reduced-motion (no autoplay), dots + arrows for manual control.

   AUTOPLAY STARTS ON SCROLL INTO VIEW, NOT ON MOUNT. The slider sits four
   sections down the home page. Advancing on a timer from the moment the page
   loads meant that by the time anyone reached it, it had already cycled
   through the results twice with nobody watching — a visitor arriving at slide
   three has no way to know slides one and two exist, and the motion has spent
   itself on an empty room. The observer also stops the timer once the section
   leaves the viewport again, for the same reason and for the frames. */
export default function ResultsSlider({ slides }: { slides: ResultSlide[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const reduce = useRef(false)
  const count = slides.length

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    const el = rootRef.current
    // No IntersectionObserver (or no element) must not mean no carousel: fall
    // back to the old on-mount behaviour rather than a slider that never moves.
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !inView || count < 2) return
    if (reduce.current) return
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, inView, count])

  const go = (i: number) => setIndex(((i % count) + count) % count)

  return (
    <div
      ref={rootRef}
      className="results-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client results"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="rs-viewport">
        <div className="rs-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((s, i) => (
            <div key={i} className="rs-slide" aria-hidden={i !== index}>
              <div className="rs-main">
                <div className="case-tag">{s.industry}</div>
                <div className="rs-result">{s.result_headline}</div>
                <div className="rs-service">{s.service_used}</div>
              </div>
              <div className="rs-detail">
                <p>{s.result_detail}</p>
                <ResultShape lift={LIFT[i % LIFT.length]} label={s.industry} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rs-controls">
        <button type="button" className="rs-arrow prev" aria-label="Previous result" onClick={() => go(index - 1)}>
          <Arrow />
        </button>
        <div className="rs-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`rs-dot ${i === index ? 'active' : ''}`}
              aria-label={`Go to result ${i + 1} of ${count}`}
              aria-current={i === index}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button type="button" className="rs-arrow" aria-label="Next result" onClick={() => go(index + 1)}>
          <Arrow />
        </button>
      </div>
    </div>
  )
}
