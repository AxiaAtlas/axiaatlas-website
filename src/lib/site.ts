/* ════════════════════════════════════════════════════════════════════════════
   THE SITE'S WORDS THAT MORE THAN ONE PAGE SAYS

   Axia Atlas is investment campaign analytics software (SaaS) with Theia, its
   proprietary AI-powered analysis assistant, built in. Websites are one-off
   projects. Source: axiaatlas-platform docs/brand/saas-copy.md (branch
   preview/staging), with two house changes:

   1. Theia is always "proprietary AI-powered" when described outward.
   2. Security sentences come only from the platform's
      docs/security/privacy-claims.md ("May say"). Nothing here says "walled
      off", "secure dashboard" or "zero retention": none of them is on that list.

   Theia and the site RECOMMEND. They never instruct a reader to pause, stop or
   turn anything off, and Axia never buys media or manages ad spend.

   npm test (scripts/check-copy.mjs) fails the build on the retired tagline, the
   provider's name and instructing verbs in Theia's mouth.
   ════════════════════════════════════════════════════════════════════════════ */

export const TAGLINE = 'Everything in sight'
export const TAGLINE_2 = 'Growth, engineered'

export const PATHS = {
  platform: '/platform',
  theia: '/theia',
  website: '/website-design',
  security: '/security',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
  demo: '/demo',
} as const

export const PORTAL_URL = 'https://app.axiaatlas.com'

/** The four modules, named per saas-copy.md section 0 (System B). */
export const PRODUCTS = {
  live: 'Live Campaigns',
  ledger: 'Raise Ledger',
  reports: 'Theia Reports',
  ask: 'Ask Theia',
} as const

/** First mention of Theia on a page. */
export const THEIA_FIRST = 'Theia, the proprietary AI-powered analysis assistant built into Axia Atlas'

export const PITCH_50 =
  'Axia Atlas is investment campaign analytics software for companies raising capital. It brings every ad platform, affiliate and press buy into one dashboard, set against the investments your raise platform reports. Theia, the built-in proprietary AI-powered analysis assistant, explains what changed, why, and what we recommend, and builds investor reports.'

export const ORG_DESCRIPTION =
  'Axia Atlas is investment campaign analytics software for companies raising capital and the marketing agencies that support them. It puts every dollar behind a raise in one dashboard, set against the investments the raise platform reports. Theia, the built-in proprietary AI-powered analysis assistant, explains what changed, why, and what we recommend, and builds investor-ready reports. Axia Atlas never buys media or runs ads. Website design is offered as one-off projects.'

/* ── THE TWELVE BUYER QUESTIONS (saas-copy.md section 6) ─────────────────────
   Each answer is 40 to 60 words and stands alone, so an answer engine can
   quote it whole. The same text goes on the pages that show it (with FAQPage
   JSON-LD only where the page shows it), in the chat widget and in /llms.txt.

   Edited from the pack:
   - "AI-powered" became "proprietary AI-powered" (house rule).
   - #7 names no platforms: the pack marks its list [VERIFY] against the live
     connectors, so the answer says "the ad platforms you connect".
   - #10 is rebuilt from privacy-claims.md rows 3, 8, 9 and 12, word for word
     where it can be. The pack's "walled off" sentence is not on that list.
   - #11 drops "each client's data stays walled off" for the same reason. */
export type Faq = { id: string; q: string; a: string }

export const AEO: Faq[] = [
  {
    id: 'what',
    q: 'What is Axia Atlas?',
    a: 'Axia Atlas is investment campaign analytics software for companies raising capital and the marketing agencies that support them. It puts every dollar behind a raise in one dashboard, set against the investments the raise platform reports, with Theia, a built-in proprietary AI-powered analysis assistant, explaining what changed, why, and what we recommend.',
  },
  {
    id: 'cost-per-investor',
    q: 'How do I see cost per investor across every channel?',
    a: 'Raise Ledger in Axia Atlas brings every dollar behind your raise into one view: ads on every platform, plus affiliates, newspapers and press entered by hand or imported. It sets that spend against the investments your raise platform reports, so cost per investor and return are clear for each channel, not just in total.',
  },
  {
    id: 'why-not-raise-platform',
    q: "Why doesn't my raise platform show this already?",
    a: 'Raise platforms record investments, not the marketing spend behind them. Ad platforms record spend, not investments. Affiliates, print and press sit in invoices and spreadsheets. Axia Atlas is built to bring all three together, so you can see what each channel actually returned while the raise is still running.',
  },
  {
    id: 'theia',
    q: 'What is Theia?',
    a: 'Theia is the proprietary AI-powered analysis assistant built into Axia Atlas. Ask Theia anything about your campaigns and your raise and Theia answers in seconds with what changed, the numbers behind it, and what we recommend. Theia also builds weekly and monthly investor-ready reports in your brand. Our analysts remain available whenever you want a person.',
  },
  {
    id: 'analyst',
    q: 'Does Theia replace a data analyst?',
    a: 'No. Theia gives you fast, accurate answers between meetings, built on decades of analytics practice and trained by real data analysts and engineers. Theia recommends and never instructs, and decisions stay with you. Our analysts are still available for deeper questions, so you get quick answers without giving up expert review.',
  },
  {
    id: 'ads',
    q: 'Does Axia Atlas run or buy my ads?',
    a: 'No. Axia Atlas never buys media, runs ads or manages ad spend. We present, analyze and recommend. Your team or your media buyer stays in control of every campaign, and Axia Atlas shows how each one is performing against the investments your raise is actually receiving.',
  },
  {
    id: 'channels',
    q: 'Which ad platforms and channels does Axia Atlas cover?',
    a: 'Axia Atlas reads Meta Ads, Google Ads and LinkedIn Ads live and shows every campaign in one dashboard, down to each creative. Other ad platforms, affiliates, newspapers and press are imported from their exports or entered by hand, so nothing behind the raise is left out of cost per investor.',
  },
  {
    id: 'reports',
    q: 'How does Axia Atlas build investor reports?',
    a: 'With Theia Reports, you press play and weekly and monthly investor-ready decks build themselves from your live campaign and raise data, in your brand. Theia flags the slides that matter most that week, so you spend your time reviewing and presenting the report instead of assembling it.',
  },
  {
    id: 'roas',
    q: 'Why did my return on ad spend drop?',
    a: 'Ask Theia that question directly. Theia looks across your platforms and your raise data and answers in seconds with why it happened, the numbers behind it, and what we recommend, for example reviewing a creative whose cost per investor rose or testing a new audience. Theia recommends; you and your media buyer decide.',
  },
  {
    id: 'security',
    q: 'Is my campaign and investor data secure?',
    a: 'Your names and values are masked before any analysis, so Theia works from placeholders, not from your company or your people. Data travels encrypted (HTTPS, TLS 1.2 or higher) everywhere, and your data is encrypted at rest (AES-256). Our analysis provider does not train its models on your data.',
  },
  {
    id: 'agencies',
    q: 'Can a marketing agency use Axia Atlas for its clients?',
    a: 'Yes. Agencies that run capital raise campaigns use Axia Atlas to show each client every dollar behind their raise against the investments it produced. Each client has a workspace of its own, and Theia Reports builds each client’s weekly and monthly investor-ready deck in that client’s brand, ready to review and send.',
  },
  {
    id: 'websites',
    q: 'Does Axia Atlas build websites?',
    a: 'Yes, as one-off projects. Axia Atlas designs and builds websites separately from the analytics platform, so an issuer or agency can commission a site without a subscription. The platform itself is investment campaign analytics software; website design is a project service alongside it.',
  },
]

export const faq = (...ids: string[]): Faq[] =>
  ids.map((id) => {
    const f = AEO.find((x) => x.id === id)
    if (!f) throw new Error(`Unknown AEO id: ${id}`)
    return f
  })

/* ── SECURITY: privacy-claims.md "May say", word for word ────────────────────
   Row numbers are that file's. Change one here only after it changes there. */
export const PRIVACY_CLAIMS = {
  r1: 'Before Theia analyzes anything, your company name, your people’s names, emails, phone numbers and web addresses are replaced with placeholders. The real ones are put back only inside your workspace.',
  r2: 'Your numbers are masked before analysis. Every figure is multiplied by a secret factor that changes on every request and is never stored. Rates and ratios come out unchanged, and totals are converted back to the cent.',
  r3: 'Your names and values are masked before any analysis.',
  r4: 'Every request we send for analysis or drafting has your names replaced first.',
  r5: 'If a request still carries a real name or figure after masking, it is stopped and never sent.',
  r6: 'Our analysis provider does not receive your name with your data, and we never send a client ID or user ID.',
  r7: 'Your brand book is read as text on our own servers. The file itself is never sent for analysis.',
  r8: 'Data travels encrypted (HTTPS, TLS 1.2 or higher) everywhere, with HSTS.',
  r9: 'Your data is encrypted at rest (AES-256).',
  r10: 'Credentials you give us (platform passwords, CRM keys, payment processor keys, store tokens) are encrypted a second time by us, with a key kept outside the database (AES-256-GCM). Without the key, nothing is stored.',
  r11: 'Our daily backup snapshots are encrypted by us before they are stored.',
  r12: 'Our analysis provider does not train its models on your data.',
} as const
