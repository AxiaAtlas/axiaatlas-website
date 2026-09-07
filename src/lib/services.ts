/* ════════════════════════════════════════════════════════════════════════════
   THE SERVICE CATALOGUE — NAMES AND ORDER, IN ONE PLACE

   KEEP IN SYNC with axiaatlas-platform/src/lib/pricing.ts `SERVICES`, which is
   the source of truth for every name and every price in the business. That
   table is behind a login and this repo cannot import across it, so this file
   is the website's MIRROR of it — and mirroring it once, here, is the whole
   point: before this file existed the nine display names were typed out in
   five places (the home grid, the /services rows, the Organization catalog in
   app/layout.tsx, the footer, the chat widget), and a rename in the platform
   left the site contradicting its own structured data until somebody found
   every copy. The platform's own 2026-09-06 rename commit is the proof: it had
   to touch thirty files because a name was read off a stored snapshot rather
   than resolved from one table.

   So: names are DERIVED here, never typed at a call site. A page that wants to
   print a service name calls `serviceName(id)`, or `serviceShort(id)` where the
   slot is too narrow for the full one.

   ── THE ID IS THE ANCHOR, THE KEY IS THE PLATFORM'S ─────────────────────────
   `id` is this site's URL fragment (/services#geo) and has been stable since
   launch — inbound links and the chat widget's deep links depend on it, so it
   is not renamed to match the platform. `key` is the platform's pricing key,
   recorded so the two tables can be diffed by hand without guessing which row
   is which. They differ deliberately in three places (geo/aeo_seo,
   leadgen/lead_gen, dashboards/client_dashboards) and neither side is wrong.

   ── TWO SHORT NAMES: ONE OUTWARD, ONE FOR DIFFING ───────────────────────────
   `short` is THIS SITE'S compact name, authored here for a stranger to read.
   `platformShort` is the platform's, recorded verbatim and printed nowhere.

   They used to be one field holding the platform's copy, and that was the
   right instinct for a first pass — the reason `key` is recorded is that the
   two tables have to be diffable by hand, and a short name edited to read
   better breaks the diff. But the field is not an internal note; it is the
   text on a public footer, and the platform is a logged-in board whose
   register is not a stranger's. "Comp Intel" and "Advisory" are correct on a
   CSM screen and jargon under a marketing site. Splitting the field keeps both
   properties: the mirror still diffs, and the site says its own words.

   `platformShort` is the one field here that no call site may print. Nothing
   resolves it, there is no accessor for it, and that is deliberate.

   As of 2026-09-07 `geo`'s two shorts happen to hold the same string. That is a
   coincidence of one rename, not a sign the fields collapsed: they are still
   answering different questions, and the next platform-side shortening will pull
   them apart again. Do not merge them.

   ── HOW THE OUTWARD SHORT NAMES WERE CHOSEN ─────────────────────────────────
   The rule, in order: print the catalogue name where it fits; where it does
   not, drop words from it; where dropping words leaves jargon or nonsense,
   reword into the plainest English that names the same service. No
   abbreviations and no initialisms a first-time reader cannot expand — SEO is
   the single exception, and it is deliberate: the catalogue says SEO out loud
   because that is the word buyers search for.

   The slot that sets the budget is the footer's Services column, 158.45px wide
   at a 1024px viewport — 1fr of a `2fr 1fr 1fr 1.2fr` grid in a 1180px-capped
   container with 40px gutters and 40px gaps: (1024 - 80 - 120) / 5.2. The
   links render in MONTSERRAT 14px/500, not the Arial that `--font-body`
   declares at the top of globals.css: the dark theme's `:root` block further
   down redeclares --font-body to Montserrat ("Montserrat for ALL text"), and
   Montserrat sets appreciably wider than Arial at the same size. Measuring the
   wrong stack is not a rounding error — it moves the answer. These widths were
   taken in a browser, on a clone of a real footer link, so every inherited
   property is the live one.

   MEASURED, seven of the nine catalogue names overflow the column:

     Search & Answer Eng. Optimization (SEO, AEO)  352.73px  overflows
     Strategic Advisory & Embedded Thinking   291.59px   overflows
     Social Media Management                  189.52px   overflows
     Executive Personal Brand                 181.28px   overflows
     Competitive Intelligence                 174.69px   overflows
     Website Design & Build                   166.67px   overflows
     Local Presence & Maps                    162.14px   overflows by 3.7px
     Portals & Dashboards                     152.06px   fits
     Lead Generation                          117.38px   fits

   So two rows print the catalogue name and seven are authored:

     dashboards  Portals & Dashboards  152.06  the catalogue name. 6.4px of
                                               headroom, the tightest row here.
     website     Website Design        112.11  "& Build" is the part of the
                                               engagement a buyer learns on
                                               /services, not in a footer.
     geo         SEO & AEO              78.36  the catalogue's own acronyms,
                                               in the catalogue's own order.
                                               This row said "SEO & AI Search"
                                               while the catalogue name was
                                               "SEO & Answer Engine
                                               Optimization (AEO)": "(AEO)" was
                                               an initialism the name mentioned
                                               once and explained nowhere, so
                                               the footer reworded it into
                                               "AI Search", which is what a
                                               stranger already called it.
                                               The 2026-09-07 rename removed
                                               the reason. The name now spells
                                               BOTH halves out in plain words
                                               and carries both acronyms in its
                                               parenthetical, so a reader meets
                                               "AEO" expanded on /services and
                                               in the chat widget before this
                                               column ever abbreviates it. That
                                               is the condition the no-
                                               initialisms rule was protecting,
                                               and it is now met — which is why
                                               this is the one row that prints
                                               acronyms rather than words.
                                               It is also the reason to stop
                                               saying "AI Search" here: the
                                               catalogue names the ANSWER
                                               ENGINES as the subject of the
                                               work, and "AI Search" reads as a
                                               claim about how the work is
                                               done. 80px of headroom, the
                                               loosest row in the column.
     social      Social Media           89.20  "Management" is how it is sold,
                                               not what it is.
     leadgen     Lead Generation       117.38  the catalogue name.
     executive   Executive Brand       115.58  "Personal" is the word carrying
                                               least, and the one in the way.
     strategy    Strategic Advisory    128.31  the head of the name. "Embedded
                                               Thinking" needs the /services
                                               copy to mean anything at all.
     intel       Competitor Research   150.59  "Competitive Intelligence" is a
                                               category term a buyer inside the
                                               category knows. This says the
                                               same thing to everyone else.
     local       Local Search & Maps   145.02  the catalogue name misses by
                                               3.7px. "Local Presence" would
                                               fit by dropping a word but loses
                                               Maps, which is the concrete half
                                               and the half the 2026-09-01
                                               rename went out of its way to
                                               put in.

   Widest row 152.06px against 158.45px. `short` is also the chat widget's link
   label ("<short> details"), so each of these has to survive that sentence
   too — which is the second reason `website` is not the full catalogue name.

   IF A NAME CHANGES, RE-MEASURE. The budget is a number, not a style rule, and
   the column is the narrowest slot either name appears in.

   The two figures added on 2026-09-07 (the new catalogue name at 352.73px and
   `geo`'s new short at 78.36px) were computed from the Montserrat Medium advance
   widths at 14px rather than read off a browser, and are cross-checked against
   every one of the nine browser figures above: the method reads high by 0.2px to
   1.2px, never low, on all nine. Both new numbers are far enough from the 158.45
   budget that a 1.2px bias cannot change the answer. A row landing within ~3px of
   the budget still needs a real browser.

   ── THE ORDER IS PRICE, HIGHEST FIRST ───────────────────────────────────────
   /services renders this array in this order, and it is ranked by what the
   service costs at its top tier, read off the platform table:

     dashboards   $18,000 build + $900/mo      the largest engagement we sell
     website      $10,000 one-time
     geo          $5,500/mo
     social       $4,500/mo
     leadgen      $3,800/mo
     executive    $2,800/mo   (per person)
     strategy     $2,500/mo
     intel        $1,500/mo   ─┐ tied at the top tier; intel is ahead on both
     local        $1,500/mo   ─┘ lower tiers ($950/$500 against $900/$450)

   NO PRICE IS PRINTED ON THIS SITE, and none is recorded here either — a
   second copy of a number is a number that will one day disagree, and the
   pricing page already says so. The ORDER carries the ranking; the figures
   above are a comment explaining how the order was arrived at, and they are
   checked against the platform whenever it reprices, not read by any code.
   ════════════════════════════════════════════════════════════════════════════ */

export type ServiceId =
  | 'dashboards' | 'website' | 'geo' | 'social' | 'leadgen'
  | 'executive' | 'strategy' | 'intel' | 'local'

export type ServiceEntry = {
  /** This site's URL fragment: /services#<id>. Stable, never renamed. */
  id: ServiceId
  /** The platform pricing key this row mirrors. */
  key: string
  /** The display name. Mirrors `label` in the platform's SERVICES table. */
  name: string
  /** THIS SITE'S compact name, for a slot too narrow for `name`. Authored
      here for a public reader, measured against the footer column — see the
      note on short names above. */
  short: string
  /** The platform's own compact name, recorded so the two tables stay
      diffable by hand. NEVER PRINTED: there is no accessor for it. */
  platformShort: string
}

/* In price order, highest first. See the note above. */
export const SERVICES: ServiceEntry[] = [
  { id: 'dashboards', key: 'client_dashboards', name: 'Portals & Dashboards',                   short: 'Portals & Dashboards', platformShort: 'Dashboards' },
  { id: 'website',    key: 'website',           name: 'Website Design & Build',                 short: 'Website Design',       platformShort: 'Website' },
  { id: 'geo',        key: 'aeo_seo',           name: 'Search & Answer Engine Optimization (SEO, AEO)', short: 'SEO & AEO',            platformShort: 'SEO & AEO' },
  { id: 'social',     key: 'social',            name: 'Social Media Management',                short: 'Social Media',         platformShort: 'Social' },
  { id: 'leadgen',    key: 'lead_gen',          name: 'Lead Generation',                        short: 'Lead Generation',      platformShort: 'Lead Gen' },
  { id: 'executive',  key: 'executive',         name: 'Executive Personal Brand',               short: 'Executive Brand',      platformShort: 'Exec Brand' },
  { id: 'strategy',   key: 'advisory',          name: 'Strategic Advisory & Embedded Thinking', short: 'Strategic Advisory',   platformShort: 'Advisory' },
  { id: 'intel',      key: 'competitive_intel', name: 'Competitive Intelligence',               short: 'Competitor Research',  platformShort: 'Comp Intel' },
  { id: 'local',      key: 'local',             name: 'Local Presence & Maps',                  short: 'Local Search & Maps',  platformShort: 'Local' },
]

const BY_ID = new Map(SERVICES.map((s) => [s.id, s]))

/** The one way to print a service name. Throws at build time on a bad id, which
    is what stops a typo from shipping as a blank heading. */
export function serviceName(id: ServiceId): string {
  const svc = BY_ID.get(id)
  if (!svc) throw new Error(`Unknown service id: ${id}`)
  return svc.name
}

/** Every name, in price order. Used by the Organization catalog in
    app/layout.tsx and by /services' ItemList, so the machine-readable catalog
    and the page a visitor reads can never list different names. */
export const SERVICE_NAMES: string[] = SERVICES.map((s) => s.name)

/** The one way to print a service's COMPACT name — a footer column, a chat
    link label, any slot too narrow for the full catalogue name. Returns this
    site's authored `short`, never `platformShort`. Throws on a bad id for the
    same reason serviceName() does. */
export function serviceShort(id: ServiceId): string {
  const svc = BY_ID.get(id)
  if (!svc) throw new Error(`Unknown service id: ${id}`)
  return svc.short
}

/** How many services there are. The only place the site's count comes from. */
export const SERVICE_COUNT = SERVICES.length
