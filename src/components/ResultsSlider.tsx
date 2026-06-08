'use client'
import { useEffect, useRef, useState } from 'react'
import { Arrow } from '@/components/icons'

export type ResultSlide = {
  industry: string
  result_headline: string
  result_detail: string
  service_used: string
}

const AUTOPLAY_MS = 5200

/* Auto-advancing results carousel. Pauses on hover/focus, respects
   prefers-reduced-motion (no autoplay), dots + arrows for manual control. */
export default function ResultsSlider({ slides }: { slides: ResultSlide[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useRef(false)
  const count = slides.length

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (paused || count < 2) return
    if (reduce.current) return
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, count])

  const go = (i: number) => setIndex(((i % count) + count) % count)

  return (
    <div
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
