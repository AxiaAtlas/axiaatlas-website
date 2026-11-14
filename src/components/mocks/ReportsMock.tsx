'use client'
/* THEIA REPORTS. The monthly deck builds (the pack's "creating" mark loops
   while it does), then plays as a slideshow. The fourth slide is the one Theia
   flagged, and the show stops there with the flag explained. */
import TheiaMark from '@/components/TheiaMark'
import MockFrame from './MockFrame'
import { useScene, seg, ease, rise, money, num, draw } from './scene'
import { CO, CPI_BY_CHANNEL, DECK_TITLE, META_CPI_WEEKS, RAISE, SAMPLE } from './data'

const BUILD = [300, 750, 1200, 1650, 2100]
const BUILT = 2600
const SHOW = [2900, 4900, 6900, 8900]
const FLAG_NOTE = 9500
const END = 11600
const FLAGGED = 3 // zero-based: the fourth slide

const creatingFrame = (t: number) => {
  const f = Math.floor((t / 1000) * 24) % 48
  return `${((f % 8) * 100) / 7}% ${(Math.floor(f / 8) * 100) / 5}%`
}

function activeSlide(t: number) {
  let a = 0
  SHOW.forEach((s, i) => { if (t >= s) a = i })
  return a
}

function Slide({ i, t, enter }: { i: number; t: number; enter: number }) {
  const p = (d = 0, dur = 900) => ease(seg(t, enter + d, enter + d + dur))
  if (i === 0) return (
    <div className="sl sl-cover">
      <div className="sl-kicker">{CO}</div>
      <div className="sl-title sl-title-xl">{DECK_TITLE}</div>
      <div className="sl-sub">Prepared from connected data · Nov 3, 2026</div>
      <div className="sl-foot"><span>{SAMPLE}</span><span>01</span></div>
    </div>
  )
  if (i === 1) {
    const share = RAISE.raised / RAISE.goal
    return (
      <div className="sl">
        <div className="sl-kicker">The raise</div>
        <div className="sl-big">{`$${((RAISE.raised / 1e6) * p()).toFixed(2)}M`}</div>
        <div className="sl-sub">raised of a {money(RAISE.goal / 1e6, 2)}M goal</div>
        <div className="sl-progress"><span style={{ transform: `scaleX(${share * p(150, 1200)})` }} /></div>
        <div className="sl-stats">
          <div><span>Investors</span><b>{num(Math.round(RAISE.investors * p(300)))}</b></div>
          <div><span>Average check</span><b>{money(Math.round(RAISE.avgCheck * p(300)))}</b></div>
          <div><span>Cost per investor</span><b>{money(Math.round(131 * p(300)))}</b></div>
        </div>
        <div className="sl-foot"><span>{SAMPLE}</span><span>02</span></div>
      </div>
    )
  }
  if (i === 2) {
    const rows = [...CPI_BY_CHANNEL].sort((a, b) => b.cpi - a.cpi)
    const max = rows[0].cpi
    return (
      <div className="sl">
        <div className="sl-kicker">Cost per investor by channel</div>
        <div className="sl-title">Google Search brings investors in for the least.</div>
        <ul className="sl-bars">
          {rows.map((r, k) => (
            <li key={r.ch}>
              <span className="sl-bar-k">{r.ch}</span>
              <span className="sl-bar"><span style={{ transform: `scaleX(${(r.cpi / max) * p(120 * k, 800)})` }} /></span>
              <span className="sl-bar-v">{money(r.cpi)}</span>
            </li>
          ))}
        </ul>
        <div className="sl-foot"><span>{SAMPLE}</span><span>03</span></div>
      </div>
    )
  }
  if (i === 3) {
    const W = 520, H = 150, L = 8, R = 56, TOP = 12, B = 22
    const x = (k: number) => L + (k * (W - L - R)) / (META_CPI_WEEKS.length - 1)
    const y = (v: number) => TOP + ((160 - v) / 50) * (H - TOP - B)
    const d = META_CPI_WEEKS.map((v, k) => `${k ? 'L' : 'M'}${x(k).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
    const last = META_CPI_WEEKS.length - 1
    return (
      <div className="sl sl-flagged">
        <div className="sl-kicker">Meta</div>
        <div className="sl-title">Meta’s cost per investor rose 22% in October.</div>
        <svg className="sl-chart" viewBox={`0 0 ${W} ${H}`}>
          {[160, 135, 110].map((g) => <line key={g} x1={L} x2={W - R + 30} y1={y(g)} y2={y(g)} className="mk-grid" />)}
          <path d={d} className="mk-line" style={draw(p(200, 1300))} />
          <text x={x(last) + 8} y={y(META_CPI_WEEKS[last]) + 4} className="mk-end" style={{ opacity: p(1300, 300) }}>$147</text>
          <text x={x(0)} y={y(META_CPI_WEEKS[0]) + 18} className="mk-axis">$120</text>
        </svg>
        <div className="sl-sub">Frequency rose to 4.1 as three creatives passed six weeks.</div>
        <div className="sl-foot"><span>{SAMPLE}</span><span>04</span></div>
      </div>
    )
  }
  return (
    <div className="sl">
      <div className="sl-kicker">What we recommend</div>
      <ol className="sl-recs">
        <li>Test fresh cuts of the three oldest Meta creatives.</li>
        <li>Review frequency on Meta with your media buyer.</li>
        <li>Look at more weight on Google Search, the lowest cost per investor.</li>
      </ol>
      <div className="sl-foot"><span>{SAMPLE}</span><span>05</span></div>
    </div>
  )
}

const THUMBS = ['Cover', 'The raise', 'By channel', 'Meta', 'Recommend']

export default function ReportsMock({ className = '' }: { className?: string }) {
  const scene = useScene(END)
  const { t } = scene
  const active = activeSlide(t)
  const building = t < BUILT

  return (
    <MockFrame
      scene={scene}
      className={`mk-deck ${className}`}
      desc={`Theia Reports. Theia builds the ${DECK_TITLE} for ${CO}, five slides, then plays it as a slideshow: the cover; the raise, ${money(RAISE.raised)} of a ${money(RAISE.goal)} goal from ${num(RAISE.investors)} investors; cost per investor by channel; and a slide Theia flagged: Meta's cost per investor rose 22% in October, from $120 to $147.`}
    >
      <div className="mk-app">
        <div className="mk-deck-top">
          <span className="mk-back">‹ Back to chat</span>
          <span className="mk-title">{DECK_TITLE}</span>
          <span className="mk-status">
            {building
              ? <><span className="mk-creating" style={{ backgroundPosition: creatingFrame(t) }} />Building slide {Math.min(5, BUILD.filter((b) => t >= b).length || 1)} of 5</>
              : <><span className="mk-dot-ok" />Built by Theia · 5 slides</>}
          </span>
          <span className={`mk-chip mk-chip-ink${t >= BUILT && t < SHOW[0] + 300 ? ' pressed' : ''}`}>Present</span>
        </div>

        <div className="mk-deck-body">
          <ol className="mk-rail">
            {THUMBS.map((name, i) => (
              <li key={name} className={`${!building && i === active ? 'on' : ''}${i === FLAGGED ? ' flagged' : ''}`} style={rise(t, BUILD[i], 400)}>
                <span className="mk-rail-n">{i + 1}</span>
                <span className="mk-thumb">
                  <span className="mk-thumb-t">{name}</span>
                  <span className="mk-thumb-l" /><span className="mk-thumb-l s" />
                  {i === FLAGGED && <span className="mk-flag" style={{ opacity: seg(t, BUILD[4] + 200, BUILD[4] + 500) }} />}
                </span>
              </li>
            ))}
          </ol>

          <div className="mk-stage-wrap">
            <div className="mk-stage">
              {THUMBS.map((_, i) => {
                const enter = i < SHOW.length ? SHOW[i] : Infinity
                const leave = i + 1 < SHOW.length ? SHOW[i + 1] : Infinity
                const o = building ? (i === 0 ? seg(t, BUILD[0], BUILD[0] + 500) * 0.35 : 0) : seg(t, enter, enter + 450) * (1 - seg(t, leave, leave + 450))
                return (
                  <div key={i} className="mk-slide" style={{ opacity: o }}>
                    {o > 0 && <Slide i={i} t={t} enter={enter} />}
                  </div>
                )
              })}
              {building && (
                <div className="mk-building" style={{ opacity: 1 - seg(t, BUILT - 300, BUILT) }}>
                  <TheiaMark className="mk-building-mark" />
                  <span>Theia is building your report from connected data</span>
                </div>
              )}
            </div>
            <div className="mk-flagnote" style={rise(t, FLAG_NOTE, 600)}>
              <span className="badge badge-flag">Flagged by Theia</span>
              <p>Worth a look before the board meeting. Meta’s cost per investor rose 22% this month while every other channel held.</p>
            </div>
            <div className="mk-dots">
              {THUMBS.map((n, i) => <span key={n} className={!building && i === active ? 'on' : ''} />)}
            </div>
          </div>
        </div>
      </div>
    </MockFrame>
  )
}
