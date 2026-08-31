'use client'
import { useEffect, useRef, useState } from 'react'
import { Arrow } from '@/components/icons'

/* The full case studies, in the same slider language the home Results section
   speaks — one result at a time, all five present, wording untouched.

   SAME AUTOPLAY RULE AS THE HOME SLIDER: it starts when the section scrolls
   into view and stops when it leaves, never on load, and it does not autoplay
   at all under prefers-reduced-motion. A slider that has advanced twice before
   anyone reaches it has shown its later slides to nobody.

   NO CHART HERE. The home slider pairs each claim with a labelled sample shape;
   these full cards already carry the challenge, the approach and the result in
   the client's own words, and a made-up curve beside three paragraphs of real
   detail would be the least honest graphic on the site. */

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

export default function CaseSlider({ cases }: { cases: CaseItem[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const reduce = useRef(false)
  const count = cases.length

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.25 },
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
      className="results-slider cs-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client case studies"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="rs-viewport">
        <div className="rs-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {cases.map((c, i) => (
            <article key={c.id ?? i} className="rs-slide cs-slide" aria-hidden={i !== index}>
              <div className="cs-slide-head">
                <div className="case-tag">{c.industry}{c.company_type ? ` · ${c.company_type}` : ''}</div>
                {/* The slide's own H2. Without it the page jumped H1 -> H3 at
                    "The Challenge", which is a skipped level on every slide. */}
                {c.stat ? (
                  <h2 className="cs-stat">
                    <span className="cs-stat-value">{c.stat.value}</span>
                    <span className="cs-stat-label">{c.stat.label}</span>
                  </h2>
                ) : (
                  <h2 className="cs-result-headline">{c.result_headline}</h2>
                )}
                {c.callouts?.length ? (
                  <div className="cs-callouts">
                    {c.callouts.map((co, k) => <span key={k} className="cs-callout">{co}</span>)}
                  </div>
                ) : null}
                <span className="cs-service-badge">{c.service_used}</span>
              </div>

              <div className="cs-slide-body">
                <div className="cs-route">
                  <div className="cs-step">
                    <h3 className="cs-label">The Challenge</h3>
                    <p className="cs-text">{c.challenge}</p>
                  </div>
                  <div className="cs-step">
                    <h3 className="cs-label">What We Did</h3>
                    <p className="cs-text">{c.approach}</p>
                  </div>
                  <div className="cs-step result">
                    <h3 className="cs-label">The Result</h3>
                    <p className="cs-text">{c.result_detail}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rs-controls">
        <button type="button" className="rs-arrow prev" aria-label="Previous case study" onClick={() => go(index - 1)}>
          <Arrow />
        </button>
        <div className="rs-dots">
          {cases.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`rs-dot ${i === index ? 'active' : ''}`}
              aria-label={`Go to case study ${i + 1} of ${count}`}
              aria-current={i === index}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button type="button" className="rs-arrow" aria-label="Next case study" onClick={() => go(index + 1)}>
          <Arrow />
        </button>
      </div>
    </div>
  )
}
