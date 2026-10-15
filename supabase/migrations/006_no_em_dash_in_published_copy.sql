-- ============================================================================
-- 006 · NO EM DASH IN THE COPY THE SITE READS FROM THE DATABASE
--
-- WHAT WAS TRUE BEFORE THIS
-- -------------------------
-- scripts/check-no-em-dash.mjs holds every string under src/ at zero, on every
-- build. It cannot see Supabase. 004 inserted the five case studies verbatim
-- from the old page.tsx array, dashes included, so the home page slider still
-- rendered eleven of them after the code went clean.
--
-- blog_posts: 005's ten articles (generated from axiaatlas-platform
-- content/blog) carry none. They are covered by the guard and the constraint
-- below all the same, so a dash written in later, by hand or by a regenerated
-- seed, is refused instead of shipped.
--
-- WHAT THIS DOES
-- --------------
--  1. Rewrites the eleven dashes in the five published case studies. Each
--     update matches the exact old string, so a re-run, or a row already
--     edited by hand, is left alone.
--  2. Refuses to finish if any case study or blog post still holds a dash,
--     naming the rows.
--  3. Adds a CHECK constraint on both tables, so no future insert or update
--     can put one back. This is the database's version of the build check.
--
-- The cart-recovery headline changes here; src/components/artifacts/
-- ResultVisual.tsx looks it up through visualFor(), which matches the old
-- and the new spelling, so the visual survives either order of deploy and
-- migration.
-- ============================================================================

-- 1 ── the five case studies ────────────────────────────────────────────────
update public.case_studies
   set challenge = 'No organic traffic and no social presence. Every new client came through referrals, with nothing pulling in buyers on its own.'
 where challenge = 'No organic traffic and no social presence — every new client came through referrals, with nothing pulling in buyers on its own.';

update public.case_studies
   set challenge = 'No organic visibility: invisible for the searches that actually convert, with nothing pulling in buyers on its own.'
 where challenge = 'No organic visibility — invisible for the searches that actually convert, with nothing pulling in buyers on its own.';

update public.case_studies
   set approach = 'Built a keyword and content strategy targeting buyer-intent terms, paired with on-site conversion fixes and no paid media.'
 where approach = 'Built a keyword and content strategy targeting buyer-intent terms, paired with on-site conversion fixes — no paid media.';

update public.case_studies
   set result_detail = 'Grew organic traffic 5.3x in under four months, ranking top three on Google for buyer-intent terms, with conversions climbing month over month, all organic.'
 where result_detail = 'Grew organic traffic 5.3x in under four months, ranking top three on Google for buyer-intent terms, with conversions climbing month over month — all organic.';

update public.case_studies
   set stat_label = 'above the cart-recovery benchmark, zero ad spend'
 where stat_label = 'above the cart-recovery benchmark — zero ad spend';

update public.case_studies
   set callouts = array_replace(callouts, 'Owned channels only — zero ad spend', 'Owned channels only, zero ad spend')
 where 'Owned channels only — zero ad spend' = any(callouts);

update public.case_studies
   set approach = 'Built pre-order abandoned-cart recovery across owned channels (email, SMS, and content) with no paid media in the mix.'
 where approach = 'Built pre-order abandoned-cart recovery across owned channels — email, SMS, and content — with no paid media in the mix.';

update public.case_studies
   set result_headline = 'Beat the cart-recovery benchmark by 7 points, zero ad spend'
 where result_headline = 'Beat the cart-recovery benchmark by 7 points — zero ad spend';

update public.case_studies
   set result_detail = 'The following grew sixfold in two months, far beyond the typical rate for the category, with engagement climbing alongside it.'
 where result_detail = 'The following grew sixfold in two months — far beyond the typical rate for the category — with engagement climbing alongside it.';

update public.case_studies
   set result_detail = 'Surfaced first when prospects asked answer engines and maps for the best option nearby, ahead of competitors on reviews, presence, and citations.'
 where result_detail = 'Surfaced first when prospects asked answer engines and maps for the best option nearby — ahead of competitors on reviews, presence, and citations.';

-- 2 ── refuse to finish with a dash still in either table ───────────────────
-- Every text column is checked, published or not: the constraint in step 3
-- covers every row, so a retired row holding one would fail it anyway, with
-- a less useful message.
do $$
declare
  cases text;
  posts text;
begin
  select string_agg(coalesce(sort_order::text, 'unordered') || ': ' || coalesce(result_headline, '(no headline)'), '; ')
    into cases
    from public.case_studies
   where position('—' in concat_ws(' ', industry, company_type, stat_value, stat_label,
                                   array_to_string(callouts, ' '), challenge, approach,
                                   result_headline, result_detail, service_used)) > 0;

  select string_agg(slug, ', ')
    into posts
    from public.blog_posts
   where position('—' in concat_ws(' ', title, excerpt, content, category, author)) > 0;

  if cases is not null or posts is not null then
    raise exception '006: em dash still present. case_studies [%] blog_posts [%]',
      coalesce(cases, 'none'), coalesce(posts, 'none');
  end if;
end $$;

-- 3 ── and keep it that way ─────────────────────────────────────────────────
alter table public.case_studies drop constraint if exists case_studies_no_em_dash;
alter table public.case_studies add constraint case_studies_no_em_dash check (
  position('—' in concat_ws(' ', industry, company_type, stat_value, stat_label,
                            array_to_string(callouts, ' '), challenge, approach,
                            result_headline, result_detail, service_used)) = 0
);

alter table public.blog_posts drop constraint if exists blog_posts_no_em_dash;
alter table public.blog_posts add constraint blog_posts_no_em_dash check (
  position('—' in concat_ws(' ', title, excerpt, content, category, author)) = 0
);

-- Read the result back with:
--   select sort_order, stat_label, callouts, result_headline
--     from public.case_studies where published order by sort_order;
