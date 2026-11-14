'use client'
/* LIVE CAMPAIGNS. All spend in one place: the channel tiles count up, the
   30-day chart draws, then the Meta filter is clicked and the view narrows to
   Meta's own line and its campaigns. */
import MockFrame, { Pointer, useTargets, type Waypoint } from './MockFrame'
import { useScene, seg, ease, rise, count, money, num, draw } from './scene'
import { ALL_CAMPAIGNS, CHANNELS, META_CAMPAIGNS } from './data'

const TILE = [300, 450, 600, 750]
const CHART = 1700
const CLICK = 4600
const VIEW = CLICK + 150
const END = VIEW + 2600
const PATH: Waypoint[] = [{ at: CLICK, to: 'meta', click: true }]

const TOTAL = CHANNELS.reduce((s, c) => s + c.spend, 0)
const ALL_SERIES = CHANNELS[0].series.map((_, i) => CHANNELS.reduce((s, c) => s + c.series[i], 0))
const ALL_TOP = ALL_CAMPAIGNS

/** One series, scaled to its own range so the shape reads at any size. */
function Line({ series, p }: { series: number[]; p: number }) {
  const W = 600, H = 200, TOP = 16, B = 12
  const lo = Math.min(...series), hi = Math.max(...series)
  const span = Math.max(1, hi - lo)
  const x = (i: number) => (i * W) / (series.length - 1)
  const y = (v: number) => TOP + (1 - (v - lo * 0.92 + span * 0.08) / (span * 1.25)) * (H - TOP - B)
  const d = series.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const area = `${d} L${W} ${H} L0 ${H} Z`
  return (
    <>
      <path d={area} className="mk-fill" style={draw(p)} />
      <path d={d} className="mk-line" style={draw(p)} />
    </>
  )
}

const avg = (s: number[]) => Math.round(s.reduce((a, b) => a + b, 0) / s.length)

export default function LiveMock({ className = '' }: { className?: string }) {
  const scene = useScene(END)
  const { t } = scene
  const targets = useTargets(scene.ref)
  const filtered = t >= VIEW
  const swap = seg(t, VIEW, VIEW + 350)
  const meta = CHANNELS[0]
  const spend = filtered ? meta.spend : count(t, TILE[0], TILE[0] + 1400, TOTAL)

  return (
    <MockFrame
      scene={scene}
      className={`mk-live ${className}`}
      desc={`Live Campaigns, played on sample data. Spend for the last 30 days, ${money(TOTAL)} across ${CHANNELS.map((c) => `${c.name} ${money(c.spend)}`).join(', ')}, with a chart of daily spend. Then the Meta filter is chosen and the view shows Meta alone, ${money(meta.spend)}, and its three campaigns.`}
    >
      <div className="mk-app">
        <div className="mk-live-top">
          <div>
            <div className="mk-kicker">Live Campaigns</div>
            <div className="mk-live-total">
              <span className="mk-live-k">{filtered ? 'Spend, Meta' : 'Spend, every channel'}</span>
              <span className="mk-live-v">{money(Math.round(spend))}</span>
            </div>
          </div>
          <span className="mk-chip">Last 30 days</span>
        </div>

        <div className="mk-filters">
          <span className={`mk-filter${filtered ? '' : ' on'}`}>All channels</span>
          {CHANNELS.map((c) => (
            <span key={c.id} data-target={c.id} className={`mk-filter${filtered && c.id === 'meta' ? ' on' : ''}`}>{c.name}</span>
          ))}
        </div>

        <div className="mk-tiles">
          {CHANNELS.map((c, i) => (
            <div key={c.id} className={`mk-tile${filtered && c.id !== 'meta' ? ' dim' : ''}`} style={rise(t, TILE[i], 500)}>
              <div className="mk-tile-head"><span>{c.name}</span><span className={`badge ${c.source === 'live' ? 'badge-live' : 'badge-manual'}`}>{c.source === 'live' ? 'Live' : 'Manual'}</span></div>
              <div className="mk-tile-v">{money(Math.round(count(t, TILE[i], TILE[i] + 1300, c.spend)))}</div>
              <div className="mk-tile-s">{num(Math.round(count(t, TILE[i], TILE[i] + 1300, c.clicks)))} clicks</div>
            </div>
          ))}
        </div>

        <div className="mk-live-body">
          <div className="mk-panel mk-live-chart">
            <div className="mk-panel-head"><span>Daily spend · {filtered ? 'Meta' : 'All channels'}</span><span className="mk-legend">{money(avg(filtered ? meta.series : ALL_SERIES))} a day</span></div>
            <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="mk-area">
              {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2="600" y1={14 + g * 160} y2={14 + g * 160} className="mk-grid" vectorEffect="non-scaling-stroke" />)}
              <g style={{ opacity: 1 - swap }}><Line series={ALL_SERIES} p={ease(seg(t, CHART, CHART + 1600))} /></g>
              <g style={{ opacity: swap }}><Line series={meta.series} p={ease(seg(t, VIEW, VIEW + 1200))} /></g>
            </svg>
            <div className="mk-x"><span>Sep 22</span><span>Oct 6</span><span>Oct 21</span></div>
          </div>

          <div className="mk-panel mk-live-list">
            <div className="mk-panel-head"><span>{filtered ? 'Meta campaigns' : 'Top campaigns'}</span><span className="mk-legend">Spend</span></div>
            <div className="mk-swap">
              <ul style={{ opacity: (1 - swap) * seg(t, CHART + 600, CHART + 1100) }}>
                {ALL_TOP.map((c) => <li key={c.name}><span>{c.name}<em>{c.ch}</em></span><b>{money(c.spend)}</b></li>)}
              </ul>
              <ul style={{ opacity: swap }}>
                {META_CAMPAIGNS.map((c, i) => (
                  <li key={c.name} style={rise(t, VIEW + 200 + i * 160, 420)}><span>{c.name}<em>{c.ctr.toFixed(2)}% click rate</em></span><b>{money(c.spend)}</b></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Pointer t={t} path={PATH} targets={targets} hideAfter={CLICK + 700} />
      </div>
    </MockFrame>
  )
}
