'use client'

import { useId, useState } from 'react'

/* ────────────────────────────────────────────────────────────────────────────
   VISUALS THAT RESTATE A FIGURE, NEVER INVENT ONE.

   The slider these sit in used to pair every claim with a rising curve drawn
   from a growth ratio — a shape, labelled "Sample shape", with an invented
   middle. That is gone. A chart standing beside a real, sourced claim borrows
   the claim's authority, and a reader who skims sees a number and a line and
   concludes the line evidences the number.

   The rule these two obey instead: A VISUAL MAY ONLY DRAW NUMBERS THE RESULT
   ITSELF ALREADY STATES. Both of the shapes below are geometry over figures
   that are printed, in words, in the case study beside them:

     BeforeAfter   two bars, start and end, from the two endpoints the result
                   names. There is no path between them because we do not hold
                   one, and drawing a curve there would be the invention.

     Benchmark     a band at the industry range the result cites, and a marker
                   at the stated distance above it. Every number on it is quoted.

   So neither carries a "sample" tag: nothing here is sampled. Each carries the
   source of its own figures instead, which is the stronger label.

   INTERACTIVE, meaning the figures are revealed by pointer AND by keyboard —
   every hit target below is a real <button> in the tab order with its own
   accessible name, so the numbers are reachable without a mouse and are read
   out rather than merely drawn.
   ──────────────────────────────────────────────────────────────────────────── */

type Marks = { label: string; value: string; hint: string }[]

/** Shared shell so both visuals sit in the portal's card, like the hero does. */
function VisualCard({ title, source, children }: { title: string; source: string; children: React.ReactNode }) {
  return (
    <div className="portal-ui result-visual">
      <div className="card">
        <div className="card-header">
          <span className="card-title">{title}</span>
        </div>
        <div className="card-body">
          {children}
          <p className="result-visual-src">{source}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Two endpoints, no path ────────────────────────────────────────────────
   `from` and `to` are the two figures the result states. The bars are scaled
   to `to`, so the ratio between them is the ratio between the quoted numbers
   and nothing else. */
export function BeforeAfter({
  title,
  source,
  from,
  to,
}: {
  title: string
  source: string
  from: { label: string; value: number; display: string }
  to: { label: string; value: number; display: string }
}) {
  const [open, setOpen] = useState<number | null>(null)
  const bars = [from, to]
  const max = Math.max(from.value, to.value) || 1

  return (
    <VisualCard title={title} source={source}>
      <div className="rv-cols">
        {bars.map((b, i) => (
          <button
            key={b.label}
            type="button"
            className={`rv-col${open === i ? ' on' : ''}`}
            onMouseEnter={() => setOpen(i)}
            onMouseLeave={() => setOpen(null)}
            onFocus={() => setOpen(i)}
            onBlur={() => setOpen(null)}
            aria-label={`${b.label}: ${b.display}`}
          >
            <span className="rv-col-value" aria-hidden="true">{b.display}</span>
            <span
              className="rv-col-bar"
              /* A floor of 3% so a "near zero" start is still a visible bar
                 rather than nothing at all — it must read as small, not absent. */
              style={{ height: `${Math.max(3, (b.value / max) * 100)}%` }}
              aria-hidden="true"
            />
            <span className="rv-col-label" aria-hidden="true">{b.label}</span>
          </button>
        ))}
      </div>
    </VisualCard>
  )
}

/* ── A cited range, and a stated distance above it ─────────────────────────
   `bandFrom`/`bandTo` are the industry range the result quotes; `marker` is
   where the result puts the client relative to it. `scaleTo` only sets how
   much empty road is drawn either side. */
export function Benchmark({
  title,
  source,
  bandFrom,
  bandTo,
  marker,
  scaleTo,
  bandLabel,
  markerLabel,
}: {
  title: string
  source: string
  bandFrom: number
  bandTo: number
  marker: number
  scaleTo: number
  bandLabel: string
  markerLabel: string
}) {
  const [open, setOpen] = useState<'band' | 'marker' | null>(null)
  const pct = (n: number) => (n / scaleTo) * 100
  const id = useId()

  return (
    <VisualCard title={title} source={source}>
      <div className="rv-scale">
        <div className="rv-track" aria-hidden="true">
          <span
            className={`rv-band${open === 'band' ? ' on' : ''}`}
            style={{ left: `${pct(bandFrom)}%`, width: `${pct(bandTo - bandFrom)}%` }}
          />
          <span className={`rv-marker${open === 'marker' ? ' on' : ''}`} style={{ left: `${pct(marker)}%` }} />
        </div>

        {/* The two readable facts, as real controls rather than tooltips on a
            decorative bar. */}
        <ul className="rv-keys">
          <li>
            <button
              type="button"
              className={`rv-key band${open === 'band' ? ' on' : ''}`}
              onMouseEnter={() => setOpen('band')}
              onMouseLeave={() => setOpen(null)}
              onFocus={() => setOpen('band')}
              onBlur={() => setOpen(null)}
              aria-describedby={`${id}-band`}
            >
              <span className="rv-key-swatch" aria-hidden="true" />
              <span className="rv-key-text" id={`${id}-band`}>{bandLabel}</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`rv-key marker${open === 'marker' ? ' on' : ''}`}
              onMouseEnter={() => setOpen('marker')}
              onMouseLeave={() => setOpen(null)}
              onFocus={() => setOpen('marker')}
              onBlur={() => setOpen(null)}
              aria-describedby={`${id}-marker`}
            >
              <span className="rv-key-swatch" aria-hidden="true" />
              <span className="rv-key-text" id={`${id}-marker`}>{markerLabel}</span>
            </button>
          </li>
        </ul>
      </div>
    </VisualCard>
  )
}

/* ── Which result gets which visual ────────────────────────────────────────
   Keyed by result_headline so a row swapped in from Supabase simply falls
   through to the explanatory text rather than being drawn with another
   result's numbers. Only two of the five are here, deliberately: these are the
   two whose endpoints are stated precisely enough to draw. The rest carry the
   longer text, which is the honest treatment when we hold a claim and not a
   measurement. */
export const RESULT_VISUALS: Record<string, React.ReactNode> = {
  '340% organic growth in 90 days': (
    <BeforeAfter
      title="Monthly organic sessions"
      source="Both figures are quoted from the result beside this. No series between them is shown, because we do not hold one."
      /* value 0, not a guess at what "near-zero" was: the result does not put a
         number on the start, so neither does this. The 3% floor in the bar
         gives it a visible sliver without inventing a figure for it. */
      from={{ label: 'At the start', value: 0, display: 'Near zero' }}
      to={{ label: 'Day 90', value: 4200, display: '~4,200' }}
    />
  ),
  'Beat the cart-recovery benchmark by 7 points — zero ad spend': (
    <Benchmark
      title="Pre-order cart recovery"
      source="The 20–30% range and the 7-point gap are both quoted from the result beside this."
      bandFrom={20}
      bandTo={30}
      marker={37}
      scaleTo={50}
      bandLabel="20–30% industry standard"
      markerLabel="7 points above it, owned channels only"
    />
  ),
}
