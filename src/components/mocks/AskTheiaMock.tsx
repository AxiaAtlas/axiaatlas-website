'use client'
/* ASK THEIA. A question types itself, Theia thinks (her looping mark, from the
   pack's thinking frames), and the answer writes in under four headings: what
   happened, where it fell (a chart draws), why (three creatives are named) and
   what we recommend. She recommends; she never instructs. */
import { useEffect, useRef } from 'react'
import TheiaMark from '@/components/TheiaMark'
import MockFrame from './MockFrame'
import { useScene, seg, ease, typed, rise, thinkFrame, draw } from './scene'
import { CO, CREATIVES, CTR_WEEKS, QUESTION } from './data'

const T = {
  type: 600,
  send: 600 + (QUESTION.length / 30) * 1000 + 250,
  get ask() { return this.send + 250 },
  get think() { return this.ask + 450 },
  get steps() { return [this.think + 450, this.think + 1250, this.think + 2050] },
  get thought() { return this.think + 3000 },
  get h1() { return this.thought + 250 },
  get p1() { return this.h1 + 250 },
  get h2() { return this.p1 + 2300 },
  get chart() { return this.h2 + 250 },
  get h3() { return this.chart + 2000 },
  get p3() { return this.h3 + 250 },
  get rows() { return [this.p3 + 1500, this.p3 + 1800, this.p3 + 2100] },
  get h4() { return this.p3 + 2700 },
  get p4() { return this.h4 + 250 },
  get end() { return this.p4 + 2900 },
}

const STEPS = [`Reading Meta, Google and LinkedIn for ${CO}`, 'Comparing click rate week by week', 'Checking frequency and creative age']
const P1 = 'Click rate fell from 1.42% to 0.98% over the last three weeks. Spend held steady, so each click cost 38% more.'
const P3 = 'Three Meta creatives carry most of the drop. Each has run six weeks or more, and Meta frequency rose to 4.1.'
const P4 = 'We recommend testing fresh cuts of these three and reviewing frequency with your media buyer. Google Search held its click rate.'

/** Typed text in a box already the size of the whole sentence. */
function Typed({ text, t, at, cps = 60 }: { text: string; t: number; at: number; cps?: number }) {
  const shown = typed(text, t, at, cps)
  return <>{shown}<span className="ghost">{text.slice(shown.length)}</span></>
}

function Chart({ t }: { t: number }) {
  const W = 600, H = 190, L = 44, R = 70, TOP = 18, B = 34
  const min = 0.8, max = 1.6
  const x = (i: number) => L + (i * (W - L - R)) / (CTR_WEEKS.length - 1)
  const y = (v: number) => TOP + ((max - v) / (max - min)) * (H - TOP - B)
  const d = CTR_WEEKS.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(p.v).toFixed(1)}`).join(' ')
  const p = ease(seg(t, T.chart, T.chart + 1500))
  const last = CTR_WEEKS.length - 1
  return (
    <svg className="mk-chart" viewBox={`0 0 ${W} ${H}`} role="presentation">
      {[1.6, 1.2, 0.8].map((g) => (
        <g key={g}>
          <line x1={L} x2={W - R + 20} y1={y(g)} y2={y(g)} className="mk-grid" />
          <text x={L - 10} y={y(g) + 4} className="mk-axis" textAnchor="end">{g.toFixed(1)}%</text>
        </g>
      ))}
      {CTR_WEEKS.map((p, i) => (
        <text key={p.w} x={x(i)} y={H - 10} className="mk-axis" textAnchor="middle">{p.w}</text>
      ))}
      <rect x={x(2)} y={TOP} width={x(last) - x(2)} height={H - TOP - B} className="mk-band" style={{ opacity: seg(t, T.chart + 900, T.chart + 1500) }} />
      <path d={d} className="mk-line" style={draw(p)} />
      {CTR_WEEKS.map((pt, i) => (
        <circle key={pt.w} cx={x(i)} cy={y(pt.v)} r={3.5} className="mk-dot" style={{ opacity: p >= i / last - 0.001 ? 1 : 0 }} />
      ))}
      <text x={x(last) + 10} y={y(CTR_WEEKS[last].v) + 4} className="mk-end" style={{ opacity: seg(t, T.chart + 1300, T.chart + 1700) }}>0.98%</text>
    </svg>
  )
}

export default function AskTheiaMock({ className = '' }: { className?: string }) {
  const scene = useScene(T.end)
  const { t, state } = scene
  const view = useRef<HTMLDivElement>(null)

  /* Keep the newest part of the answer in view while it writes, the way the
     chat does. A still frame starts at the top so it reads from the question. */
  useEffect(() => {
    const v = view.current
    if (!v) return
    if (state === 'still' || state === 'waiting') { v.scrollTop = 0; return }
    let target = 0
    v.querySelectorAll<HTMLElement>('[data-at]').forEach((n) => {
      if (Number(n.dataset.at) <= t) target = Math.max(target, n.offsetTop + n.offsetHeight - v.clientHeight + 24)
    })
    if (Math.abs(v.scrollTop - target) > 2) v.scrollTo({ top: Math.max(0, target), behavior: 'smooth' })
  }, [t, state])

  const asked = t >= T.ask
  const thinking = t >= T.think && t < T.thought
  const draft = typed(QUESTION, t, T.type, 30)

  return (
    <MockFrame
      scene={scene}
      className={`mk-ask ${className}`}
      desc={`Ask Theia, played on sample data. The question "${QUESTION}" is typed and sent. Theia thinks, then answers under four headings. What happened: ${P1} Where it fell: a chart of weekly click rate from 1.44% to 0.98%. Why: ${P3} The three creatives are ${CREATIVES.map((c) => `${c.name} (${c.format}, ${c.change}%)`).join(', ')}. What we recommend: ${P4}`}
    >
      <div className="mk-app">
        <aside className="mk-side">
          <div className="mk-brand"><TheiaMark className="mk-brand-mark" /><span>Theia</span></div>
          <div className="mk-newchat"><TheiaMark className="mk-ico" /> New chat</div>
          <div className="mk-side-label">Recent</div>
          <ul className="mk-side-list">
            <li className={asked ? 'on' : ''}>{asked ? 'Click rate, last three weeks' : 'Weekly summary'}</li>
            <li>Meta frequency check</li>
            <li>October investor report</li>
            <li>Cost per investor by channel</li>
          </ul>
        </aside>

        <div className="mk-main">
          <div className="mk-top">
            <span className="mk-title">{asked ? QUESTION : 'New chat'}</span>
            <span className="mk-chip">Share</span>
          </div>

          <div className="mk-view" ref={view}>
            <div className="mk-greet" style={{ opacity: 1 - seg(t, T.send, T.ask) }}>
              <TheiaMark className="mk-greet-mark" />
              <div className="mk-greet-line">Good evening.</div>
              <div className="mk-greet-sub">Ask about your campaigns and your raise.</div>
            </div>

            <div className="mk-thread" style={{ opacity: asked ? 1 : 0 }}>
              <div className="mk-q" data-at={T.ask} style={rise(t, T.ask)}>{QUESTION}</div>

              <div className="mk-think" data-at={T.think} style={rise(t, T.think)}>
                <span className="think-mark" style={{ ['--size' as string]: '1.9em', backgroundPosition: thinking ? thinkFrame(t - T.think) : '0% 0%', opacity: thinking ? 1 : 0.9 }} />
                <div className="mk-think-body">
                  <div className="mk-kicker">{thinking ? 'Theia · Thinking' : 'Thought for 3s'}</div>
                  <ul className={`mk-steps${t >= T.thought + 300 ? ' folded' : ''}`} style={{ opacity: 1 - seg(t, T.thought, T.thought + 300) }}>
                    {STEPS.map((s, i) => (
                      <li key={s} style={{ opacity: seg(t, T.steps[i], T.steps[i] + 300) }} className={t >= T.steps[i] + 700 ? 'done' : ''}>
                        <span className="mk-tick" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mk-answer">
                <div className="mk-h" data-at={T.h1} style={rise(t, T.h1)}>What happened</div>
                <p data-at={T.p1}><Typed text={P1} t={t} at={T.p1} /></p>

                <div className="mk-h" data-at={T.h2} style={rise(t, T.h2)}>Where it fell</div>
                <div className="mk-chart-box" data-at={T.chart} style={{ opacity: seg(t, T.chart - 100, T.chart + 200) }}>
                  <div className="mk-chart-head"><span>Click rate, all channels, weekly</span><span className="mk-neg">−31%</span></div>
                  <Chart t={t} />
                </div>

                <div className="mk-h" data-at={T.h3} style={rise(t, T.h3)}>Why</div>
                <p data-at={T.p3}><Typed text={P3} t={t} at={T.p3} /></p>
                <ol className="mk-creatives">
                  {CREATIVES.map((c, i) => (
                    <li key={c.name} data-at={T.rows[i]} style={rise(t, T.rows[i], 420)}>
                      <span className="mk-cr-name">{c.name}</span>
                      <span className="mk-cr-meta">{c.format} · {c.weeks} weeks</span>
                      <span className="mk-neg">{c.change.toString().replace('-', '−')}%</span>
                    </li>
                  ))}
                </ol>

                <div className="mk-h" data-at={T.h4} style={rise(t, T.h4)}>What we recommend</div>
                <p data-at={T.p4}><Typed text={P4} t={t} at={T.p4} /></p>
              </div>
            </div>
          </div>

          <div className="mk-composer">
            <span className="mk-plus">+</span>
            <span className="mk-input">
              {!asked && draft ? <>{draft}<span className="mk-caret" /></> : <span className="mk-ph">{asked ? 'Ask a follow-up' : 'Ask Theia'}</span>}
            </span>
            <span className={`mk-send${t >= T.send - 150 && t < T.ask ? ' on' : ''}`}>Send</span>
          </div>
        </div>
      </div>
    </MockFrame>
  )
}
