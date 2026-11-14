/* ════════════════════════════════════════════════════════════════════════════
   KOVA: THE DEMO RAISE EVERY MOCK IS FED FROM.

   Kova is invented. It is not a client and not based on one, and every mock
   is named beside it. The numbers agree with each other across the
   mocks (the ledger's cost per investor is the report's, the report's flagged
   Meta slide is the click-rate story Ask Theia tells), so a visitor who
   watches all five sees one raise, not five demos.
   ════════════════════════════════════════════════════════════════════════════ */

export const COMPANY = 'Kova'
export const CO = 'Kova'

/* ── The raise ── */
export const RAISE = { raised: 1_839_816, goal: 3_000_000, investors: 1212, avgCheck: 1518 }

/* ── Raise Ledger: every channel, its source, its spend, its investors ── */
export type LedgerRow = { ch: string; source: 'live' | 'manual'; spend: number; investors: number }
export const LEDGER: LedgerRow[] = [
  { ch: 'Meta', source: 'live', spend: 64_800, investors: 441 },
  { ch: 'Google Search', source: 'live', spend: 38_200, investors: 389 },
  { ch: 'Affiliates', source: 'manual', spend: 28_300, investors: 236 },
  { ch: 'Newspaper (print)', source: 'manual', spend: 27_600, investors: 146 },
]
export const LEDGER_SPEND = LEDGER.reduce((s, r) => s + r.spend, 0) // 158,900
export const FUNNEL = [
  { k: 'Spend', v: LEDGER_SPEND, money: true },
  { k: 'Visits', v: 96_400 },
  { k: 'Started investing', v: 4_830 },
  { k: 'Invested', v: RAISE.investors },
]

/* ── Live Campaigns: the last 30 days, per channel ── */
export type Channel = { id: string; name: string; spend: number; clicks: number; source: 'live' | 'manual'; series: number[] }
const wave = (base: number, amp: number, phase: number, drift: number) =>
  Array.from({ length: 30 }, (_, i) => Math.round(base + amp * Math.sin(i / 3.1 + phase) + drift * i + amp * 0.35 * Math.sin(i * 1.7 + phase * 2)))
export const CHANNELS: Channel[] = [
  { id: 'meta', name: 'Meta', spend: 21_640, clicks: 18_320, source: 'live', series: wave(720, 90, 0.4, 1.2) },
  { id: 'google', name: 'Google', spend: 12_880, clicks: 9_960, source: 'live', series: wave(430, 60, 1.6, 0.4) },
  { id: 'linkedin', name: 'LinkedIn', spend: 6_320, clicks: 2_140, source: 'live', series: wave(210, 34, 2.4, -0.3) },
  { id: 'affiliates', name: 'Affiliates', spend: 7_400, clicks: 4_870, source: 'manual', series: wave(246, 40, 0.9, 0.2) },
]
export const META_CAMPAIGNS = [
  { name: 'Prospecting: Founder story', spend: 7_120, ctr: 0.94 },
  { name: 'Retargeting: 7-day visitors', spend: 5_060, ctr: 1.71 },
  { name: 'Lookalike: Investors 1%', spend: 4_310, ctr: 1.02 },
  { name: 'Prospecting: Inside the workshop', spend: 3_180, ctr: 0.88 },
  { name: 'Static: Invest from $250', spend: 1_970, ctr: 0.79 },
]
export const ALL_CAMPAIGNS = [
  { name: 'Prospecting: Founder story', ch: 'Meta', spend: 7_120 },
  { name: 'Search: Invest in Kova', ch: 'Google', spend: 6_240 },
  { name: 'Retargeting: 7-day visitors', ch: 'Meta', spend: 5_060 },
  { name: 'Lookalike: Investors 1%', ch: 'Meta', spend: 4_310 },
  { name: 'Newsletter partners', ch: 'Affiliates', spend: 4_100 },
]

/* ── Ask Theia: why the click rate fell ── */
export const QUESTION = 'Why did our click rate fall over the last three weeks?'
export const CTR_WEEKS = [
  { w: 'Sep 15', v: 1.44 }, { w: 'Sep 22', v: 1.41 }, { w: 'Sep 29', v: 1.42 },
  { w: 'Oct 6', v: 1.21 }, { w: 'Oct 13', v: 1.06 }, { w: 'Oct 20', v: 0.98 },
]
export const CREATIVES = [
  { name: 'Founder story', format: '30s video', weeks: 7, change: -41 },
  { name: 'Inside the workshop', format: 'Carousel', weeks: 6, change: -33 },
  { name: 'Invest from $250', format: 'Static', weeks: 6, change: -29 },
]

/* ── Theia Reports: the October deck ── */
export const DECK_TITLE = 'October investor report'
export const CPI_BY_CHANNEL = LEDGER.map((r) => ({ ch: r.ch, cpi: Math.round(r.spend / r.investors) })).sort((a, b) => a.cpi - b.cpi)
export const META_CPI_WEEKS = [120, 122, 126, 131, 139, 147]
