/* ════════════════════════════════════════════════════════════════════════════
   WHAT EACH PLAN INCLUDES, AND WHAT A WEBSITE PROJECT COSTS.

   Software plans: axiaatlas-platform docs/pricing/pricing-analysis.md,
   "Option A, plans with included seats" (origin/preview/staging, 2026-11-14).
   The inclusions are shown WITHOUT numbers: no seat counts, channel counts,
   analyst hours or software prices until Amit sets the price book. "Book a demo for a quote" is said once on the page.

   Website projects: axiaatlas-platform src/lib/pricing.ts, service `website`
   (origin/preview/staging). Tier names, page counts (web_page qty) and
   revision rounds are copied as written there.

   THE WEBSITE NEVER SHOWS A PRICE (Amit, 2026-11-14). No dollar figure for
   anything we sell: there is deliberately no price field in this file, so one
   cannot be rendered by mistake. Pricing is discussed on a demo.
   scripts/check-no-prices.mjs (npm test) fails the build on a dollar figure in
   page copy, metadata, structured data, llms.txt or the chat widget.
   ════════════════════════════════════════════════════════════════════════════ */

export type Plan = {
  name: string
  for: string
  raises: string
  channels: string
  cadence: string
  fullSeats: string
  viewSeats: string
  analyst: string
}

export const PLANS: Plan[] = [
  {
    name: 'Launch',
    for: 'An issuer running its first raise, with a small team and a couple of paid channels live.',
    raises: 'One raise',
    channels: 'Your first ad channels read live',
    cadence: 'A monthly investor report',
    fullSeats: 'for a small team',
    viewSeats: 'for your board',
    analyst: 'Analyst review each month',
  },
  {
    name: 'Campaign',
    for: 'A raise in full swing across several platforms, reported to the board every week.',
    raises: 'One raise',
    channels: 'More ad channels read live',
    cadence: 'Weekly investor reports',
    fullSeats: 'for the whole marketing team',
    viewSeats: 'for the board and partners',
    analyst: 'More analyst review each month',
  },
  {
    name: 'Portfolio',
    for: 'An issuer with several raises, or an agency reporting on raises for many clients.',
    raises: 'Several raises or clients, each in its own workspace',
    channels: 'The most ad channels read live',
    cadence: 'Weekly reports across every raise',
    fullSeats: 'across every raise',
    viewSeats: 'for each raise\u2019s board and partners',
    analyst: 'The most analyst review each month',
  },
]

/** Rows of the side-by-side table. */
export const PLAN_ROWS: { k: string; get: (p: Plan) => string }[] = [
  { k: 'Raises', get: (p) => p.raises },
  { k: 'Ad channels read live', get: (p) => p.channels.replace(' ad channels read live', '') },
  { k: 'Investor reports', get: (p) => p.cadence },
  { k: 'Full seats, with Theia', get: (p) => 'Included, ' + p.fullSeats },
  { k: 'View-only seats, without Theia', get: (p) => 'Included, ' + p.viewSeats },
  { k: 'Analyst review', get: (p) => p.analyst.replace(/ ?analyst review/i, '').trim().replace(/^./, (c) => c.toUpperCase()) },
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
export type SiteTier = { name: string; pages: number; revisions: number; shop: boolean; for: string }

export const SITE_TIERS: SiteTier[] = [
  { name: 'Starter Site', pages: 5, revisions: 2, shop: false, for: 'A clear, fast site for a company or a single raise.' },
  { name: 'Growth Site', pages: 9, revisions: 3, shop: true, for: 'Room for the full story: product, team, the raise and its questions.' },
  { name: 'Authority Site', pages: 16, revisions: 4, shop: true, for: 'A complete company site that can carry every audience and offer.' },
]


export const SITE_ADDONS = [
  { t: 'Extra page', d: 'One more page, designed and built.' },
  { t: 'Online shop on a Starter Site', d: 'Growth and Authority sites include one.' },
  { t: 'Website assistant', d: 'An assistant on your site that answers visitors’ questions.' },
  { t: 'Care plan', d: 'Updates, checks, backups and small edits, priced by the site’s tier. Three-month minimum. Only for sites we built.' },
]

