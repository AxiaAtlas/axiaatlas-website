/* ════════════════════════════════════════════════════════════════════════════
   SCREENSHOT SLOTS

   Every product image on the site is a slot listed here. Real screenshots come
   from the DEMO company Kova on staging (sample data, never a real client).
   Until a slot has a `src`, it renders as an empty frame with its caption, so
   the layout is final and only the pixels are missing.

   To fill one: save the image under public/shots/ (16:9, 2400x1350 or larger,
   PNG or WebP), set `src` to its path, and check the alt text still describes
   what is on screen. docs/runbooks/website-screenshots.md has the shot list.
   ════════════════════════════════════════════════════════════════════════════ */

export type Shot = {
  /** Path under public/, e.g. "/shots/live-campaigns.webp". null until taken. */
  src: string | null
  /** What a screen reader hears once the image is in. */
  alt: string
  /** Shown under the frame, and inside it while the slot is empty. */
  caption: string
  /** Where to take it from, for whoever fills the slot. Never rendered. */
  take: string
}

const slot = (alt: string, caption: string, take: string): Shot => ({ src: null, alt, caption, take })

export const SHOTS = {
  // ── Home and platform ──
  homeHero: slot('Live Campaigns dashboard for the demo company Kova', 'Live Campaigns: every platform behind the raise, in one dashboard.', 'Kova · Live Campaigns overview, last 30 days, dark theme'),
  liveOverview: slot('Live Campaigns overview with spend, investors and cost per investor by platform', 'Start at the total and drill down to each creative and audience.', 'Kova · Live Campaigns, platform table expanded'),
  liveDrill: slot('A campaign opened down to its creatives and audiences', 'Every chart opens, zooms and exports.', 'Kova · one campaign → creatives tab, chart zoomed'),
  ledger: slot('Raise Ledger showing paid and manual spend against reported investments', 'Raise Ledger: every dollar behind the raise, set against the investments reported.', 'Kova · Raise Ledger, all channels, cost per investor column visible'),
  ledgerManual: slot('Adding an affiliate or press invoice to Raise Ledger by hand', 'Affiliates, print and press, entered by hand or imported.', 'Kova · Raise Ledger → add manual spend dialog'),
  homeTheia: slot('Ask Theia answering a question about the raise', 'Ask Theia: the answer, the numbers behind it, and what we recommend.', 'Kova · Theia full screen, an answer with a table'),

  // ── Theia page (follows the Theia design: hero, 01 to 04, trust, start) ──
  theiaHero: slot('Theia home screen in the Axia Atlas portal', 'Theia, full screen inside Axia Atlas.', 'Kova · Theia home, dark, no signed-in name visible'),
  askThinking: slot('Theia showing each step while she works', 'You see each step while she works.', 'Kova · Theia mid-answer, steps visible'),
  askAnswer: slot('A Theia answer with findings, a table of figures and recommendations', 'Findings, a table of the figures and what we recommend.', 'Kova · finished answer with table and follow-up questions'),
  reportWeekly: slot('A weekly investor report building in Theia Reports', 'The weekly investor report, built from live campaign and raise data in your brand.', 'Kova · Theia Reports weekly deck, building'),
  reportMonthly: slot('A finished monthly investor deck with flagged slides', 'The monthly deck, with the slides that matter flagged. Present it or export it.', 'Kova · Theia Reports monthly deck, ready, flags visible'),
  reportSheet: slot('An answer table turned into a spreadsheet', 'Every table in an answer can become a sheet with real numbers, formulas and charts.', 'Kova · spreadsheet built from an answer'),
  reportChart: slot('A cost per investor chart built by Theia', 'Charts of cost per investor by channel, ready for the board.', 'Kova · chart artifact, cost per investor by channel'),
  comment: slot('Commenting on one slide to ask Theia for a change', 'Point at any part of the file and say what should change.', 'Kova · Comment mode on a slide'),
  share: slot('Sharing a Theia report with viewers and editors', 'Share with your team or your board, as viewers or editors.', 'Kova · Share dialog'),
  library: slot('The Library of decks, sheets, charts and reports', 'Library: decks, sheets, charts and reports, each with a real preview.', 'Kova · Library'),
  scheduled: slot('Scheduled weekly and monthly reports', 'Scheduled: weekly summaries and monthly reports that run on their own.', 'Kova · Scheduled tasks'),
  customize: slot('Customizing what Theia calls you and how she responds', 'Customize: what to call you, instructions and response style.', 'Kova · Settings → Customize'),
  panel: slot('Theia as a panel beside a Live Campaigns page', 'A panel beside your dashboards.', 'Kova · Live Campaigns with Theia panel open'),
  launcher: slot('Theia minimized to a single button', 'Minimized to a single button.', 'Kova · any page with the Theia launcher'),
  light: slot('Theia in the light theme', 'Light theme, or dark: Theia follows the portal.', 'Kova · Theia, light theme, a report open'),

  // ── Website design ──
  website: slot('A campaign website designed by Axia Atlas', 'A campaign website, designed and built as a one-off project.', 'A finished demo site, desktop, hero in view (no client work without consent)'),
} satisfies Record<string, Shot>

export type ShotId = keyof typeof SHOTS
