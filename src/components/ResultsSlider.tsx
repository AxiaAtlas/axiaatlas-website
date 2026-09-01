'use client'
import { useEffect, useRef, useState } from 'react'
import { Arrow } from '@/components/icons'
import { RESULT_VISUALS } from '@/components/artifacts/ResultVisual'

/* ────────────────────────────────────────────────────────────────────────────
   THE RESULTS SECTION IS NOW THE CASE STUDIES.

   /case-studies was a page that repeated what this section already gave, with
   five entries behind it — not enough to be a library, and enough to make the
   home page read like a teaser for a fuller list that did not exist. The page
   is deleted and redirected here; this component is the treatment that page
   had, moved up, wording untouched.

   WHAT EACH SLIDE CARRIES. The left column is fixed: the segment it happened
   in, the headline result, and the service that produced it. The right column
   VARIES, and that is deliberate — three of the five carry the challenge, the
   work and the outcome in full, and two carry a visual instead. A slider where
   every slide is built the same way stops being read by the third one.

   THE VISUALS DRAW ONLY QUOTED NUMBERS. See artifacts/ResultVisual.tsx: the
   decorative "sample shape" curve that used to sit beside every claim is gone,
   and a result with no precisely stated endpoints gets the text, not a shape.
   ──────────────────────────────────────────────────────────────────────────── */

export type CaseItem = {
  id?: string | number
  industry: string
  company_type?: string
  stat?: { value: string; label: string } | null
  result_headline: string
  callouts?: string[]
  challenge: string
  approach: string
  result_detail: string
  service_used: string
}

const AUTOPLAY_MS = 7800

/* AUTOPLAY STARTS ON SCROLL INTO VIEW, NOT ON MOUNT, and stops when the section
   leaves again. This sits well down the page: advancing on a timer from load
   means that by the time anyone arrives it has already cycled through the
   results with nobody watching, and a visitor landing on slide four has no way
   to know slides one to three exist. No autoplay at all under
   prefers-reduced-motion. */
export default function ResultsSlider({ slides }: { slides: CaseItem[] }) {
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
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !inView || count < 2 || reduce.current) return
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
          {slides.map((c, i) => {
            const visual = RESULT_VISUALS[c.result_headline]
            return (
              <article key={c.id ?? i} className="rs-slide" aria-hidden={i !== index}>
                <div className="rs-main">
                  <div className="case-tag">
                    {c.industry}{c.company_type ? ` · ${c.company_type}` : ''}
                  </div>
                  {/* The slide's own heading. Without one the page jumped H2 ->
                      H3 at "The Challenge", a skipped level on every slide. */}
                  {c.stat ? (
                    <h3 className="rs-stat">
                      <span className="rs-stat-value">{c.stat.value}</span>
                      <span className="rs-stat-label">{c.stat.label}</span>
                    </h3>
                  ) : (
                    <h3 className="rs-result">{c.result_headline}</h3>
                  )}
                  {c.callouts?.length ? (
                    <ul className="rs-callouts">
                      {c.callouts.map((co) => <li key={co}>{co}</li>)}
                    </ul>
                  ) : null}
                  <div className="rs-service">{c.service_used}</div>
                </div>

                <div className="rs-detail">
                  {visual ?? (
                    <div className="rs-route">
                      <div className="rs-step">
                        <h4 className="rs-label">The Challenge</h4>
                        <p className="rs-text">{c.challenge}</p>
                      </div>
                      <div className="rs-step">
                        <h4 className="rs-label">What We Did</h4>
                        <p className="rs-text">{c.approach}</p>
                      </div>
                      <div className="rs-step result">
                        <h4 className="rs-label">The Result</h4>
                        <p className="rs-text">{c.result_detail}</p>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
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
