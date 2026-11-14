'use client'
/* RAISE LEDGER. The investor funnel fills, then every channel behind the raise
   lines up against the investors it brought: the ad platforms read live, the
   affiliates and the newspaper entered by hand. A Live badge and a Manual
   badge are shown and explained in one line. */
import MockFrame from './MockFrame'
import { useScene, seg, ease, rise, count, money, num } from './scene'
import { FUNNEL, LEDGER, LEDGER_SPEND, RAISE } from './data'

const STAGES = FUNNEL.slice(1) // visits, started, invested
const FILL = [300, 800, 1300]
const ROWS = [2200, 2450, 2700, 2950]
const LEGEND = 3700
const LIVE_HI = 4000
const MANUAL_HI = 5000
const END = 6600
const WIDTHS = [1, 0.66, 0.4]

export default function LedgerMock({ className = '' }: { className?: string }) {
  const scene = useScene(END)
  const { t } = scene
  const cpi = Math.round(LEDGER_SPEND / RAISE.investors)
  const liveOn = t >= LIVE_HI && t < MANUAL_HI + 400
  const manualOn = t >= MANUAL_HI && t < END - 400

  return (
    <MockFrame
      scene={scene}
      className={`mk-ledger ${className}`}
      desc={`Raise Ledger, played on sample data. ${money(LEDGER_SPEND)} of spend behind the raise brought ${num(STAGES[0].v)} visits, ${num(STAGES[1].v)} people who started investing and ${num(RAISE.investors)} investors, ${money(cpi)} per investor. By channel: ${LEDGER.map((r) => `${r.ch}, ${r.source === 'live' ? 'live' : 'entered manually'}, ${money(r.spend)}, ${r.investors} investors, ${money(Math.round(r.spend / r.investors))} each`).join('; ')}. A Live badge means the figures are read from a connected platform; a Manual badge means they were entered by hand or imported.`}
    >
      <div className="mk-app">
        <div className="mk-live-top">
          <div>
            <div className="mk-kicker">Raise Ledger</div>
            <div className="mk-live-total">
              <span className="mk-live-k">Cost per investor</span>
              <span className="mk-live-v">{money(Math.round(count(t, 300, 2000, cpi)))}</span>
            </div>
          </div>
          <div className="mk-ledger-sum">
            <div><span>Spend</span><b>{money(Math.round(count(t, 300, 1800, LEDGER_SPEND)))}</b></div>
            <div><span>Raised</span><b>${(count(t, 300, 1800, RAISE.raised) / 1e6).toFixed(2)}M</b></div>
          </div>
        </div>

        <div className="mk-ledger-body">
          <div className="mk-panel mk-funnel">
            <div className="mk-panel-head"><span>Investor funnel</span><span className="mk-legend">All channels</span></div>
            <ol>
              {STAGES.map((s, i) => {
                const p = ease(seg(t, FILL[i], FILL[i] + 700))
                const prev = i ? STAGES[i - 1].v : 0
                return (
                  <li key={s.k}>
                    <div className="mk-funnel-row">
                      <span className="mk-funnel-k">{s.k}</span>
                      <span className="mk-funnel-v">{num(Math.round(s.v * p))}</span>
                    </div>
                    <div className="mk-funnel-track" style={{ width: `${WIDTHS[i] * 100}%` }}>
                      <span style={{ transform: `scaleX(${p})` }} />
                    </div>
                    {i > 0 && <div className="mk-funnel-rate" style={{ opacity: seg(t, FILL[i] + 500, FILL[i] + 800) }}>{((s.v / prev) * 100).toFixed(1)}% of the step before</div>}
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="mk-panel mk-ledger-table">
            <div className="mk-panel-head"><span>Every channel behind the raise</span></div>
            <div className="mk-tr mk-th"><span>Channel</span><span>Spend</span><span className="mk-col-inv">Investors</span><span>Per investor</span></div>
            {LEDGER.map((r, i) => {
              const hi = (r.source === 'live' && i === 0 && liveOn) || (r.source === 'manual' && i === 2 && manualOn)
              return (
                <div key={r.ch} className={`mk-tr${hi ? ' hi' : ''}`} style={rise(t, ROWS[i], 420)}>
                  <span className="mk-ch">{r.ch}<span className={`badge ${r.source === 'live' ? 'badge-live' : 'badge-manual'}`}>{r.source === 'live' ? 'Live' : 'Manual'}</span></span>
                  <span>{money(r.spend)}</span>
                  <span className="mk-col-inv">{num(r.investors)}</span>
                  <span>{money(Math.round(r.spend / r.investors))}</span>
                </div>
              )
            })}
            <div className="mk-tr mk-total" style={rise(t, ROWS[3] + 300, 420)}>
              <span className="mk-ch">All channels</span>
              <span>{money(LEDGER_SPEND)}</span>
              <span className="mk-col-inv">{num(RAISE.investors)}</span>
              <span>{money(cpi)}</span>
            </div>
            <div className="mk-cpi">
              <div className="mk-panel-head"><span>Cost per investor</span><span className="mk-legend">Highest first</span></div>
              {[...LEDGER].sort((x, y) => y.spend / y.investors - x.spend / x.investors).map((r, i) => {
                const v = Math.round(r.spend / r.investors)
                return (
                  <div key={r.ch} className="mk-cpi-row">
                    <span>{r.ch}</span>
                    <span className="mk-cpi-bar"><span style={{ transform: `scaleX(${(v / 189) * ease(seg(t, ROWS[3] + 500 + i * 120, ROWS[3] + 1300 + i * 120))})` }} /></span>
                    <span>{money(v)}</span>
                  </div>
                )
              })}
            </div>
            <div className="mk-key" style={rise(t, LEGEND, 500)}>
              <span className={liveOn ? 'on' : ''}><span className="badge badge-live">Live</span> read from a connected platform</span>
              <span className={manualOn ? 'on' : ''}><span className="badge badge-manual">Manual</span> entered by hand or imported</span>
            </div>
          </div>
        </div>
      </div>
    </MockFrame>
  )
}
