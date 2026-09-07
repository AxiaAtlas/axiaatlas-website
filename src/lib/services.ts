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
   print a service name calls `serviceName(id)`.

   ── THE ID IS THE ANCHOR, THE KEY IS THE PLATFORM'S ─────────────────────────
   `id` is this site's URL fragment (/services#geo) and has been stable since
   launch — inbound links and the chat widget's deep links depend on it, so it
   is not renamed to match the platform. `key` is the platform's pricing key,
   recorded so the two tables can be diffed by hand without guessing which row
   is which. They differ deliberately in three places (geo/aeo_seo,
   leadgen/lead_gen, dashboards/client_dashboards) and neither side is wrong.

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
}

/* In price order, highest first. See the note above. */
export const SERVICES: ServiceEntry[] = [
  { id: 'dashboards', key: 'client_dashboards',  name: 'Portals & Dashboards' },
  { id: 'website',    key: 'website',            name: 'Website Design & Build' },
  { id: 'geo',        key: 'aeo_seo',            name: 'SEO & Answer Engine Optimization (AEO)' },
  { id: 'social',     key: 'social',             name: 'Social Media Management' },
  { id: 'leadgen',    key: 'lead_gen',           name: 'Lead Generation' },
  { id: 'executive',  key: 'executive',          name: 'Executive Personal Brand' },
  { id: 'strategy',   key: 'advisory',           name: 'Strategic Advisory & Embedded Thinking' },
  { id: 'intel',      key: 'competitive_intel',  name: 'Competitive Intelligence' },
  { id: 'local',      key: 'local',              name: 'Local Presence & Maps' },
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

/** How many services there are. The only place the site's count comes from. */
export const SERVICE_COUNT = SERVICES.length
