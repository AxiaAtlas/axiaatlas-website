-- ============================================================================
-- 004 — the five results the home page carried in code become five real rows.
--
-- WHAT WAS TRUE BEFORE THIS
-- -------------------------
-- case_studies held the three rows 001 seeded. src/app/(site)/page.tsx carried
-- a CASES array of five, and handed the database's rows to the slider only at
-- five or more published rows -- which never happened -- so the home page
-- rendered the array and the table was decoration. Two sets of published
-- claims, one of them unreachable, is how the two drift apart.
--
-- WHAT THIS DOES
-- --------------
--  1. Adds the four columns the array carried and the table did not:
--     stat_value / stat_label (the big figure and its caption), callouts (the
--     two supporting lines), and sort_order (the order the slider walks).
--  2. Retires the three 001 seed rows: published = false. They predate the
--     current brand-copy rules and were never on the page -- the threshold
--     hid them. They stay as rows; they just stop being publishable claims.
--  3. Inserts the five, VERBATIM. Every string here was generated from the
--     CASES literal in page.tsx, not retyped, and the em and en dashes inside
--     them are the ones that shipped.
--
-- AFTER THIS the table holds 8 rows, 5 published, and page.tsx has no array.
-- The curation gate is the database's own: published = true, ordered by
-- sort_order.
-- ============================================================================

-- 1 ── the columns the curated set needs ────────────────────────────────────
alter table public.case_studies add column if not exists stat_value  text;
alter table public.case_studies add column if not exists stat_label  text;
alter table public.case_studies add column if not exists callouts    text[];
alter table public.case_studies add column if not exists sort_order  integer;

comment on column public.case_studies.stat_value  is 'Headline figure for the slide, e.g. "340%". Rendered with stat_label; both must be present or the slide falls back to result_headline.';
comment on column public.case_studies.stat_label  is 'Caption under stat_value, e.g. "organic growth in 90 days".';
comment on column public.case_studies.callouts    is 'Short supporting lines listed under the figure. Empty array renders nothing.';
comment on column public.case_studies.sort_order  is 'Slider order, ascending. A published row without one sorts last.';

-- 2 ── the 001 seed rows stop being published claims ────────────────────────
-- Scoped by sort_order IS NULL *and* the three headlines 001 wrote, because
-- one of the five arriving below carries the same headline as the first seed
-- row. At this point in the file the five do not exist yet; the sort_order
-- clause is what keeps a re-run from catching them.
update public.case_studies
   set published = false
 where sort_order is null
   and result_headline in (
     '340% organic growth in 90 days',
     '2.4× ROAS improvement in 60 days',
     'Cited by ChatGPT and Perplexity within 45 days'
   );

-- 3 ── the five, verbatim ───────────────────────────────────────────────────
insert into public.case_studies
  (industry, company_type, stat_value, stat_label, callouts,
   challenge, approach, result_headline, result_detail, service_used,
   sort_order, published)
select v.industry, v.company_type, v.stat_value, v.stat_label, v.callouts,
       v.challenge, v.approach, v.result_headline, v.result_detail, v.service_used,
       v.sort_order, true
  from (values
  ('Professional Services',
   'B2B Consulting',
   '340%',
   'organic growth in 90 days',
   array['~4,200 monthly organic sessions', 'First leads by month 3']::text[],
   'No organic traffic and no social presence — every new client came through referrals, with nothing pulling in buyers on its own.',
   'Built a sharper brand, grew a founder-voice presence on LinkedIn, and published buyer-keyword SEO articles aimed at the questions prospects actually search.',
   '340% organic growth in 90 days',
   'Climbed to roughly 4,200 monthly organic sessions from a near-zero start, with the first inbound leads landing by month three.',
   'SEO + Founder Brand',
   1),

  ('E-commerce',
   'DTC Brand',
   '5.3x',
   'organic growth in under 4 months',
   array['Ranked top 3 on Google for buyer-intent terms', 'Traffic + conversions up month over month']::text[],
   'No organic visibility — invisible for the searches that actually convert, with nothing pulling in buyers on its own.',
   'Built a keyword and content strategy targeting buyer-intent terms, paired with on-site conversion fixes — no paid media.',
   '5.3x organic growth in under 4 months',
   'Grew organic traffic 5.3x in under four months, ranking top three on Google for buyer-intent terms, with conversions climbing month over month — all organic.',
   'SEO + Conversion',
   2),

  ('E-commerce',
   'DTC Brand',
   '+7 pts',
   'above the cart-recovery benchmark — zero ad spend',
   array['7 pts above the 20–30% industry standard', 'Owned channels only — zero ad spend']::text[],
   'High pre-order cart abandonment and a heavy reliance on paid media to recover the sales slipping away.',
   'Built pre-order abandoned-cart recovery across owned channels — email, SMS, and content — with no paid media in the mix.',
   'Beat the cart-recovery benchmark by 7 points — zero ad spend',
   'Recovered abandoned pre-orders at a rate 7 points above the 20–30% industry standard, entirely through owned channels.',
   'Owned Channels + Content',
   3),

  ('Consumer Brand',
   'Lifestyle Brand',
   '6x',
   'follower growth in 60 days',
   array['Outpaced the category average', 'Engagement climbed alongside']::text[],
   'Flat, inconsistent social that left audience growth stalled and the brand easy to scroll past.',
   'Repositioned the voice, built content pillars, and held a consistent multi-platform posting cadence the audience could rely on.',
   '6x follower growth in 60 days',
   'The following grew sixfold in two months — far beyond the typical rate for the category — with engagement climbing alongside it.',
   'Social Media + Brand Voice',
   4),

  ('Food & Hospitality',
   'Local Restaurant',
   '#1',
   'recommended local result in answer engines',
   array['Surfaced first for "near me" queries', 'Ahead on reviews, presence & citations']::text[],
   'Invisible in answer-engine and map results while competitors owned every "near me" search nearby.',
   'Ran an answer-engine optimization audit, added structured content, and tightened reviews and listing presence so the right details were everywhere they needed to be.',
   'The top recommended local result in answer engines',
   'Surfaced first when prospects asked answer engines and maps for the best option nearby — ahead of competitors on reviews, presence, and citations.',
   'Answer Engines + Local Presence',
   5)
  ) as v (industry, company_type, stat_value, stat_label, callouts,
          challenge, approach, result_headline, result_detail, service_used,
          sort_order)
 where not exists (
   select 1 from public.case_studies where sort_order is not null
 );

-- 4 ── refuse to leave the table in a shape the page cannot render ──────────
do $$
declare
  total     integer;
  live      integer;
  ordered   integer;
begin
  select count(*) into total   from public.case_studies;
  select count(*) into live    from public.case_studies where published;
  select count(*) into ordered from public.case_studies where published and sort_order between 1 and 5;

  if live <> 5 or ordered <> 5 then
    raise exception '004: expected exactly 5 published rows ordered 1..5, found % published (% ordered)', live, ordered;
  end if;
  raise notice '004: % rows total, 5 published and ordered 1..5', total;
end $$;

-- Read the result back with:
--   select sort_order, published, industry, company_type, stat_value,
--          stat_label, callouts, result_headline, service_used
--     from public.case_studies
--    order by sort_order nulls last, created_at;
