import { supabase } from '@/lib/supabase/client'

/* ────────────────────────────────────────────────────────────────────────────
   THE ONE PLACE THE RESULTS COME FROM.

   There were three copies of these five results in this repo: a RESULTS array
   on the home page, a PLACEHOLDERS array on /case-studies, and the
   case_studies table -- which both pages read but neither ever used, because
   each sat behind a `>= 5 published rows` gate the table's three seed rows
   never met. The two arrays had already drifted: the same five results carried
   different headlines on the two pages.

   Migration 004 put the five in the table verbatim and retired the seed rows.
   Both arrays are gone, both gates are gone, and this module is what replaced
   them. Curation is the table's own now -- published = true, walked in
   sort_order -- so retiring a result or reordering the slider is an UPDATE,
   not a deploy.

   Reads run on the server (both callers are server components) and errors are
   logged with their message rather than swallowed: a surface with no results
   is a failure worth seeing in the logs, not a quiet blank.
   ──────────────────────────────────────────────────────────────────────────── */

export type CaseStudy = {
  id: string
  industry: string
  company_type: string | null
  /* Both halves or neither: a slide with a value and no label renders the
     headline instead of a broken figure. */
  stat: { value: string; label: string } | null
  callouts: string[]
  challenge: string
  approach: string
  result_headline: string
  result_detail: string
  service_used: string
}

type Row = Omit<CaseStudy, 'stat' | 'callouts'> & {
  stat_value: string | null
  stat_label: string | null
  callouts: string[] | null
}

const COLUMNS =
  'id, industry, company_type, stat_value, stat_label, callouts, challenge, approach, result_headline, result_detail, service_used'

function toCaseStudy(r: Row): CaseStudy {
  return {
    id: r.id,
    industry: r.industry,
    company_type: r.company_type,
    stat: r.stat_value && r.stat_label ? { value: r.stat_value, label: r.stat_label } : null,
    callouts: r.callouts ?? [],
    challenge: r.challenge,
    approach: r.approach,
    result_headline: r.result_headline,
    result_detail: r.result_detail,
    service_used: r.service_used,
  }
}

/* `limit` caps the home slider; /case-studies passes nothing and takes the set.
   A published row with no sort_order sorts last rather than disappearing. */
export async function getCaseStudies(limit?: number): Promise<CaseStudy[]> {
  let query = supabase
    .from('case_studies')
    .select(COLUMNS)
    .eq('published', true)
    .order('sort_order', { ascending: true, nullsFirst: false })

  if (limit !== undefined) query = query.limit(limit)

  const { data, error } = await query
  if (error) {
    console.error('[case-studies] read failed:', error.message)
    return []
  }
  return (data as Row[] | null)?.map(toCaseStudy) ?? []
}
