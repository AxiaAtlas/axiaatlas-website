'use client'
import { useCallback, useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import { Arrow } from '@/components/icons'

const GROWTH_AREAS = [
  'Get found in search (SEO)',
  'Get cited by answer engines (AEO/GEO)',
  'Win local / "near me" customers',
  'Grow on social media',
  'Build a founder / executive brand',
  'Launch or rebuild my website',
  'Generate more leads / pipeline',
  'Not sure yet — help me figure it out',
]

/* On-site booking. After the survey saves the lead to Prospects, step 3 fetches
   live availability from the portal scheduling API and lets the prospect pick a
   time without leaving the site. On submit we POST a request; the portal handles
   confirmation and sends the calendar invite + Meet link — this site sends no
   email. CORS is enabled for axiaatlas.com on these endpoints. */
const SCHED_BASE = 'https://app.axiaatlas.com/api/scheduling'
const BOOKING_TOKEN = '4e9c1a7b8f2d4c6e9a0b3d5f7c1e2a4b'

type Slot = { start: string; end: string }

type Form = {
  // Step 1 — person
  firstName: string; lastName: string; email: string; phone: string
  // Step 2 — business
  companyName: string; websiteUrl: string; noWebsite: boolean; position: string
  linkedin: string; instagram: string; facebook: string; x: string; noSocials: boolean
  growthArea: string
}

const EMPTY: Form = {
  firstName: '', lastName: '', email: '', phone: '',
  companyName: '', websiteUrl: '', noWebsite: false, position: '',
  linkedin: '', instagram: '', facebook: '', x: '', noSocials: false,
  growthArea: '',
}

export default function DemoPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<Form>(EMPTY)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const socialCount = [form.linkedin, form.instagram, form.facebook, form.x].filter((v) => v.trim()).length

  // ── Step 3 — on-site booking picker ──────────────────────────────────────
  const [slots, setSlots] = useState<Slot[]>([])
  const [tz, setTz] = useState('America/New_York')
  const [slotsState, setSlotsState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [selected, setSelected] = useState<Slot | null>(null)
  const [booking, setBooking] = useState<'idle' | 'submitting' | 'done'>('idle')
  const [bookingError, setBookingError] = useState('')
  // Calendar view state — the visible month and the day whose times are open.
  const [viewMonth, setViewMonth] = useState<{ y: number; m: number } | null>(null)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const loadSlots = useCallback(async () => {
    setSlotsState('loading')
    setBookingError('')
    try {
      const res = await fetch(`${SCHED_BASE}/slots`, { cache: 'no-store' })
      if (!res.ok) throw new Error('slots')
      const data = await res.json()
      setSlots(Array.isArray(data?.slots) ? data.slots : [])
      if (data?.tz) setTz(data.tz)
      setSlotsState('ready')
    } catch {
      setSlotsState('error')
    }
  }, [])

  // Fetch availability the moment the survey is saved and step 3 opens.
  useEffect(() => {
    if (step === 3) loadSlots()
  }, [step, loadSlots])

  const fullName = [form.firstName, form.lastName].filter(Boolean).join(' ').trim()

  // Group slots by day, formatted + ordered in the portal's timezone.
  const dayFmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'long', month: 'long', day: 'numeric' })
  const timeFmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit' })
  const tzLabel = (() => {
    try {
      const ref = slots[0]?.start ?? new Date().toISOString()
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' }).formatToParts(new Date(ref))
      return parts.find((p) => p.type === 'timeZoneName')?.value ?? tz
    } catch {
      return tz
    }
  })()

  // Map every slot onto its calendar day, keyed YYYY-MM-DD in the portal's
  // timezone, so the calendar grid can light up days that have availability.
  const dayKeyFmt = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' })
  const slotsByDay = new Map<string, Slot[]>()
  for (const s of slots) {
    const k = dayKeyFmt.format(new Date(s.start))
    const arr = slotsByDay.get(k)
    if (arr) arr.push(s)
    else slotsByDay.set(k, [s])
  }
  const availableKeys = Array.from(slotsByDay.keys()).sort()

  // When availability arrives (or refreshes), open the month of the first free
  // day and pre-select that day so times are visible right away.
  useEffect(() => {
    if (slotsState !== 'ready' || availableKeys.length === 0) return
    if (selectedDay && slotsByDay.has(selectedDay)) return
    const first = availableKeys[0]
    const [y, m] = first.split('-').map(Number)
    setViewMonth({ y, m })
    setSelectedDay(first)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotsState, availableKeys.join(','), selectedDay])

  const shiftMonth = (delta: number) =>
    setViewMonth((v) => {
      if (!v) return v
      const idx = v.y * 12 + (v.m - 1) + delta
      return { y: Math.floor(idx / 12), m: (idx % 12) + 1 }
    })

  async function submitBooking() {
    if (!selected || booking === 'submitting') return
    setBooking('submitting')
    setBookingError('')
    try {
      const res = await fetch(`${SCHED_BASE}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: BOOKING_TOKEN,
          name: fullName,
          email: form.email.trim(),
          company: form.companyName.trim(),
          slotStart: selected.start,
          slotEnd: selected.end,
          note: form.growthArea ? `Growth focus: ${form.growthArea}` : undefined,
        }),
      })
      if (res.ok) { setBooking('done'); return }
      if (res.status === 409) {
        // Slot was taken between fetch and submit — refresh and let them re-pick.
        setSelected(null)
        setBooking('idle')
        setBookingError('That time was just taken. We’ve refreshed the available times — please pick another.')
        loadSlots()
        return
      }
      throw new Error('request')
    } catch {
      setBooking('idle')
      setBookingError('Something went wrong booking that time. Please try again, or email partner@axiaatlas.com.')
    }
  }

  // Step 1 → 2: require first name + email (the only required person fields)
  function nextFromPerson(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.firstName.trim()) { setError('Please add your first name.'); return }
    if (!form.email.trim()) { setError('Please add your email.'); return }
    setStep(2)
  }

  // Step 2 → 3: validate, save the survey, then show the calendar
  async function submitSurvey(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.companyName.trim()) { setError('Please add your company name.'); return }
    if (!form.noWebsite && !form.websiteUrl.trim()) { setError('Please add your website, or check that you don’t have one yet.'); return }
    if (!form.growthArea) { setError('Please pick the area you need growth in.'); return }
    if (!form.noSocials && socialCount < 2) { setError('Please add at least two social platforms, or check that you don’t have a social presence.'); return }
    setSending(true)
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setStep(3)
      else setError('Something went wrong. Please email partner@axiaatlas.com directly.')
    } catch {
      setError('Network error. Please email partner@axiaatlas.com directly.')
    }
    setSending(false)
  }

  const stepClass = (n: number) => (step === n ? 'active' : step > n ? 'done' : '')

  return (
    <div className="page demo-page">
      {/* THE H1 NO LONGER REPEATS THE HOME PAGE'S KEYWORD. It was "Book a
          Digital Marketing Demo and Visibility Audit", and "Digital Marketing"
          is the home page's H1 keyword — two pages competing for one term. This
          page's own term is the thing it uniquely offers, and it is already the
          page title in demo/layout.tsx, so the H1 now matches it rather than
          introducing a third wording. */}
      {/* ONE SECTION, NOT TWO. The page was a centred hero and then, after a
          full hero bottom padding plus a full body top padding, the card — so
          the thing the page exists for started below the fold on a laptop and
          the head it belonged to had already scrolled away. There is one block
          now: the head on the left, the questionnaire on the right, and no seam
          between them to pay for twice.

          THE SUBTEXT MOVED AND SHRANK. It used to sit in the right-hand column
          of the hero grid, level with the H1 — which is where the card is now,
          and it was competing at lead size with the headline anyway. It runs
          under the eyebrow and the free-audit headline, at body-small, as the
          note it always was.

          THE CARD AND EVERYTHING INSIDE IT IS UNTOUCHED — same markup, same
          handlers, same endpoints, same mount point. This is the wrapper only. */}
      <div className="demo-hero demo-lead">
        <div className="demo-lead-copy">
          <div className="section-eyebrow">Book a Demo</div>
          <h1 className="section-headline">Book a Demo and a Free Visibility Audit</h1>
          <p className="demo-lead-note">Before we meet, we audit how you show up across search, answer engines, local, and social — so we arrive with the gaps mapped and real solutions, not a pitch deck.</p>
        </div>

        <div className="demo-lead-form">
        <div className="demo-card">
          <>
              <p className="demo-steps-intro">Three quick steps to a call worth your time.</p>
              <div className="demo-steps" aria-hidden="true">
                <div className={`demo-step-dot ${stepClass(1)}`}>
                  <span className="num">{step > 1 ? '✓' : '1'}</span> About you
                </div>
                <div className="demo-step-bar" />
                <div className={`demo-step-dot ${stepClass(2)}`}>
                  <span className="num">{step > 2 ? '✓' : '2'}</span> Your business
                </div>
                <div className="demo-step-bar" />
                <div className={`demo-step-dot ${stepClass(3)}`}>
                  <span className="num">3</span> Book time
                </div>
              </div>

              {step === 1 && (
                <form onSubmit={nextFromPerson}>
                  <h2 className="demo-step-title">First, a little about you</h2>
                  <div className="demo-step-sub">So we know who we&apos;re talking to and how to reach you.</div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>First name *</label>
                      <input value={form.firstName} onChange={set('firstName')} placeholder="Your first name" required autoFocus />
                    </div>
                    <div className="form-row">
                      <label>Last name</label>
                      <input value={form.lastName} onChange={set('lastName')} placeholder="Your last name" />
                    </div>
                  </div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>Email *</label>
                      <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" required />
                    </div>
                    <div className="form-row">
                      <label>Phone <span className="form-hint">(optional)</span></label>
                      <input type="tel" value={form.phone} onChange={set('phone')} placeholder="(555) 123-4567" inputMode="tel" />
                    </div>
                  </div>

                  {error && <div className="demo-error">{error}</div>}

                  <div className="demo-actions">
                    <div className="spacer" />
                    <button type="submit" className="btn-primary">Continue <Arrow className="arr" /></button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={submitSurvey}>
                  <h2 className="demo-step-title">Tell us about your business</h2>
                  <div className="demo-step-sub">Just the basics so we can take a look before we talk. Add the links you have — skip the ones you don&apos;t.</div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>Company name *</label>
                      <input value={form.companyName} onChange={set('companyName')} placeholder="Your company" required autoFocus />
                    </div>
                    <div className="form-row">
                      <label>Website {form.noWebsite ? <span className="form-hint">(none)</span> : '*'}</label>
                      <input
                        value={form.websiteUrl}
                        onChange={set('websiteUrl')}
                        placeholder="https://yourcompany.com"
                        inputMode="url"
                        disabled={form.noWebsite}
                        required={!form.noWebsite}
                      />
                      <label className="demo-check">
                        <input
                          type="checkbox"
                          checked={form.noWebsite}
                          onChange={(e) => setForm((f) => ({ ...f, noWebsite: e.target.checked, websiteUrl: e.target.checked ? '' : f.websiteUrl }))}
                        />
                        <span>I don&apos;t have a website</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-row">
                    <label>Position / role <span className="form-hint">(optional)</span></label>
                    <input value={form.position} onChange={set('position')} placeholder="Founder, Marketing Lead…" />
                  </div>

                  <div className="form-row">
                    <label>
                      Social profiles {form.noSocials ? <span className="form-hint">(none)</span> : <span className="form-hint">(add at least 2)</span>}
                    </label>
                  </div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>LinkedIn</label>
                      <input value={form.linkedin} onChange={set('linkedin')} placeholder="@yourcompany" disabled={form.noSocials} />
                    </div>
                    <div className="form-row">
                      <label>Instagram</label>
                      <input value={form.instagram} onChange={set('instagram')} placeholder="@yourbrand" disabled={form.noSocials} />
                    </div>
                  </div>

                  <div className="form-2col">
                    <div className="form-row">
                      <label>Facebook</label>
                      <input value={form.facebook} onChange={set('facebook')} placeholder="@yourbrand" disabled={form.noSocials} />
                    </div>
                    <div className="form-row">
                      <label>X (Twitter)</label>
                      <input value={form.x} onChange={set('x')} placeholder="@yourbrand" disabled={form.noSocials} />
                    </div>
                  </div>

                  <label className="demo-check">
                    <input
                      type="checkbox"
                      checked={form.noSocials}
                      onChange={(e) => setForm((f) => ({
                        ...f,
                        noSocials: e.target.checked,
                        ...(e.target.checked ? { linkedin: '', instagram: '', facebook: '', x: '' } : {}),
                      }))}
                    />
                    <span>I don&apos;t have a social media presence</span>
                  </label>

                  <div className="form-row demo-growth-row">
                    <label>What areas do you need growth in? *</label>
                    <select value={form.growthArea} onChange={set('growthArea')} required>
                      <option value="">— Select an area —</option>
                      {GROWTH_AREAS.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>

                  {error && <div className="demo-error">{error}</div>}

                  <div className="demo-actions">
                    <button type="button" className="btn-outline" onClick={() => { setError(''); setStep(1) }}>← Back</button>
                    <div className="spacer" />
                    <button type="submit" className="btn-primary" disabled={sending} style={{ opacity: sending ? 0.7 : 1 }}>
                      {sending ? 'Saving…' : <>Continue to booking <Arrow className="arr" /></>}
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && booking === 'done' && (
                <div className="demo-done">
                  <div className="demo-done-check" aria-hidden="true">✓</div>
                  <h2 className="demo-step-title">Request received{form.firstName ? `, ${form.firstName}` : ''}</h2>
                  <div className="demo-step-sub">
                    Thanks — we&apos;ve got your request for{' '}
                    <strong>{selected ? `${dayFmt.format(new Date(selected.start))} at ${timeFmt.format(new Date(selected.start))} (${tzLabel})` : 'your chosen time'}</strong>.
                    We&apos;ll confirm shortly and send the calendar invite with your Google Meet link to {form.email || 'your email'}. We&apos;ll arrive with the gaps mapped and real recommendations, not a pitch deck.
                  </div>
                  <div className="demo-booking-foot">No need to do anything else — watch your inbox for the confirmation.</div>
                </div>
              )}

              {step === 3 && booking !== 'done' && (
                <div className="demo-book">
                  <h2 className="demo-step-title">You&apos;re all set{form.firstName ? `, ${form.firstName}` : ''} — pick your time</h2>
                  <div className="demo-step-sub">
                    Choose a slot for your demo below. We&apos;ll confirm it and send the calendar invite with your Google Meet link.
                    {slotsState === 'ready' && slots.length > 0 ? <> All times shown in {tzLabel}.</> : null}
                  </div>

                  {slotsState === 'loading' && (
                    <div className="slot-status">Loading available times…</div>
                  )}

                  {slotsState === 'error' && (
                    <div className="slot-status">
                      We couldn&apos;t load available times.{' '}
                      <button type="button" className="slot-retry" onClick={loadSlots}>Try again</button>
                      {' '}or email <a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a>.
                    </div>
                  )}

                  {slotsState === 'ready' && availableKeys.length === 0 && (
                    <div className="slot-status">
                      No times are open right now. Email <a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a> and we&apos;ll find a time that works.
                    </div>
                  )}

                  {slotsState === 'ready' && availableKeys.length > 0 && viewMonth && (() => {
                    const pad = (n: number) => String(n).padStart(2, '0')
                    const monthStart = new Date(Date.UTC(viewMonth.y, viewMonth.m - 1, 1))
                    const monthLabel = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(monthStart)
                    const firstWeekday = monthStart.getUTCDay()
                    const daysInMonth = new Date(Date.UTC(viewMonth.y, viewMonth.m, 0)).getUTCDate()
                    const [fy, fm] = availableKeys[0].split('-').map(Number)
                    const [ly, lm] = availableKeys[availableKeys.length - 1].split('-').map(Number)
                    const atMin = viewMonth.y === fy && viewMonth.m === fm
                    const atMax = viewMonth.y === ly && viewMonth.m === lm
                    const cells: (number | null)[] = []
                    for (let i = 0; i < firstWeekday; i++) cells.push(null)
                    for (let d = 1; d <= daysInMonth; d++) cells.push(d)
                    const daySlots = selectedDay ? slotsByDay.get(selectedDay) ?? [] : []
                    const dayLabel = daySlots.length ? dayFmt.format(new Date(daySlots[0].start)) : ''
                    return (
                      <>
                        <div className="demo-calendar">
                          <div className="cal-head">
                            <button type="button" className="cal-nav" onClick={() => shiftMonth(-1)} disabled={atMin} aria-label="Previous month">‹</button>
                            <div className="cal-month">{monthLabel}</div>
                            <button type="button" className="cal-nav" onClick={() => shiftMonth(1)} disabled={atMax} aria-label="Next month">›</button>
                          </div>
                          <div className="cal-grid cal-weekdays" aria-hidden="true">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((w) => (
                              <div key={w} className="cal-weekday">{w}</div>
                            ))}
                          </div>
                          <div className="cal-grid">
                            {cells.map((d, i) => {
                              if (d == null) return <div key={`e${i}`} className="cal-cell empty" />
                              const key = `${viewMonth.y}-${pad(viewMonth.m)}-${pad(d)}`
                              const has = slotsByDay.has(key)
                              const isSel = selectedDay === key
                              return (
                                <button
                                  key={key}
                                  type="button"
                                  className={`cal-day${has ? ' has' : ''}${isSel ? ' selected' : ''}`}
                                  disabled={!has}
                                  onClick={() => { setSelectedDay(key); setSelected(null); setBookingError('') }}
                                  aria-pressed={isSel}
                                >
                                  <span className="cal-num">{d}</span>
                                  {has && <span className="cal-dot" aria-hidden="true" />}
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        {selectedDay && daySlots.length > 0 && (
                          <div className="cal-times">
                            <div className="cal-times-head">{dayLabel}</div>
                            <div className="slot-times">
                              {daySlots.map((s) => (
                                <button
                                  key={s.start}
                                  type="button"
                                  className={`slot-chip${selected?.start === s.start ? ' selected' : ''}`}
                                  onClick={() => { setSelected(s); setBookingError('') }}
                                  aria-pressed={selected?.start === s.start}
                                >
                                  {timeFmt.format(new Date(s.start))}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {bookingError && <div className="demo-error">{bookingError}</div>}

                        <div className="demo-actions slot-actions">
                          <div className="slot-selected-label">
                            {selected
                              ? <>Selected: <strong>{dayFmt.format(new Date(selected.start))}, {timeFmt.format(new Date(selected.start))} ({tzLabel})</strong></>
                              : 'Select a time to continue.'}
                          </div>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={submitBooking}
                            disabled={!selected || booking === 'submitting'}
                            style={{ opacity: !selected || booking === 'submitting' ? 0.7 : 1 }}
                          >
                            {booking === 'submitting' ? 'Requesting…' : <>Request this time <Arrow className="arr" /></>}
                          </button>
                        </div>
                      </>
                    )
                  })()}
                </div>
              )}
            </>
        </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
