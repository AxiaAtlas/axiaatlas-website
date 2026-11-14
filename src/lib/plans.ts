/* ════════════════════════════════════════════════════════════════════════════
   WHAT EACH PLAN INCLUDES, AND WHAT A WEBSITE PROJECT COSTS.

   Software plans: axiaatlas-platform docs/pricing/pricing-analysis.md,
   "Option A, plans with included seats" (origin/preview/staging, 2026-11-14).
   The inclusions are shown; the software prices are NOT, until Amit sets the
   price book. "Book a demo for a quote" is said once on the page.

   Website projects: axiaatlas-platform src/lib/pricing.ts, service `website`
   (origin/preview/staging). Tiers, setup prices, page counts (web_page qty),
   revision rounds and the six-month payment plan are copied as written there.
   Change them there first, then here.
   ════════════════════════════════════════════════════════════════════════════ */

export type Plan = {
  name: string
  for: string
  raises: string
  channels: string
  cadence: string
  fullSeats: number
  viewSeats: number
  analyst: string
}

export const PLANS: Plan[] = [
  {
    name: 'Launch',
    for: 'An issuer running its first raise, with a small team and a couple of paid channels live.',
    raises: 'One raise',
    channels: '2 ad channels read live',
    cadence: 'A monthly investor report',
    fullSeats: 3,
    viewSeats: 10,
    analyst: '1.5 hours of analyst review a month',
  },
  {
    name: 'Campaign',
    for: 'A raise in full swing across several platforms, reported to the board every week.',
    raises: 'One raise',
    channels: '4 ad channels read live',
    cadence: 'Weekly investor reports',
    fullSeats: 6,
    viewSeats: 25,
    analyst: '3 hours of analyst review a month',
  },
  {
    name: 'Portfolio',
    for: 'An issuer with several raises, or an agency reporting on raises for many clients.',
    raises: 'Several raises or clients, each in its own workspace',
    channels: '6 ad channels read live',
    cadence: 'Weekly reports across every raise',
    fullSeats: 15,
    viewSeats: 60,
    analyst: '6 hours of analyst review a month',
  },
]

/** Rows of the side-by-side table. */
export const PLAN_ROWS: { k: string; get: (p: Plan) => string }[] = [
  { k: 'Raises', get: (p) => p.raises },
  { k: 'Ad channels read live', get: (p) => p.channels.split(' ')[0] },
  { k: 'Investor reports', get: (p) => p.cadence },
  { k: 'Full seats, with Theia', get: (p) => String(p.fullSeats) },
  { k: 'View-only seats, without Theia', get: (p) => String(p.viewSeats) },
  { k: 'Analyst review', get: (p) => p.analyst.replace(' of analyst review', '') },
  { k: 'Live Campaigns and Raise Ledger', get: () => 'Included' },
  { k: 'Ask Theia and Theia Reports', get: () => 'Included' },
  { k: 'Manual and imported channels', get: () => 'Included' },
  { k: 'Single sign-on (Google or Microsoft)', get: () => 'Included' },
]

export const PLAN_ADDONS = [
  { t: 'Extra full seat', d: 'Another person who asks Theia questions, builds reports and shares them.' },
  { t: 'Extra view-only seat', d: 'Another board member or partner who reads every dashboard and report, without Theia.' },
  { t: 'Another channel', d: 'One more ad platform read live, or a channel with no connector, such as an affiliate network, imported from its export.' },
  { t: 'A platform we do not read yet', d: 'A new connector built for you. Quoted on a call.' },
]

/* ── Website projects (pricing.ts, service `website`) ── */
export type SiteTier = { name: string; price: number; pages: number; revisions: number; shop: boolean; for: string }

export const SITE_TIERS: SiteTier[] = [
  { name: 'Starter Site', price: 3500, pages: 5, revisions: 2, shop: false, for: 'A clear, fast site for a company or a single raise.' },
  { name: 'Growth Site', price: 6500, pages: 9, revisions: 3, shop: true, for: 'Room for the full story: product, team, the raise and its questions.' },
  { name: 'Authority Site', price: 10000, pages: 16, revisions: 4, shop: true, for: 'A complete company site that can carry every audience and offer.' },
]

/** Same total as paying once, spread over six months, not financed. */
export const SITE_PAYMENT_MONTHS = 6

export const SITE_ADDONS = [
  { t: 'Extra page', price: '$350', d: 'One more page, designed and built.' },
  { t: 'Online shop on a Starter Site', price: '$2,000', d: 'Growth and Authority sites include one.' },
  { t: 'Website assistant', price: '$1,500', d: 'An assistant on your site that answers visitors’ questions.' },
  { t: 'Care plan', price: '$250, $400 or $650 a month', d: 'Updates, checks, backups and small edits, priced by the site’s tier. Three-month minimum. Only for sites we built.' },
]

export const usd = (n: number) => '$' + n.toLocaleString('en-US')
