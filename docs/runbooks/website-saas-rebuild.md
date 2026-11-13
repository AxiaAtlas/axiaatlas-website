# Website SaaS rebuild: hand steps

Branch `preview/rebrand`, 2026-11-12. The site now sells Axia Atlas as investment
campaign analytics software (Live Campaigns, Raise Ledger, Theia Reports, Ask
Theia), with website design as one-off projects. Social, SEO, local and the
other agency add-ons are off the site and their URLs 301 (see `next.config.mjs`).

This repo has no staging branch. The pull request's Vercel preview is the
staging check. Nothing here changes a database.

## 1. Fill the screenshot slots (from the demo company Kova)

Every product image is a slot in `src/lib/shots.ts`. Until a slot has a `src`
it renders an empty frame that says "Screenshot coming soon", so do this before
the site goes live.

1. Sign in to staging as a staff user: https://staging-app.axiaatlas.com
2. Open the demo company **Kova** (sample data). Never use a real client.
3. For each entry in `src/lib/shots.ts`, take the screen named in its `take`
   field. 16:9, 2400x1350 or larger. Hide any signed-in name.
4. Save as WebP under `public/shots/<id>.webp` (for example
   `public/shots/liveOverview.webp`) and set that entry's `src` to
   `/shots/<id>.webp`.
5. Check the `alt` still describes what is on screen.

The Theia page follows the Theia design: hero, 01 Ask Theia (2 shots),
02 Theia Reports (4 tabbed shots + the Comment shot), 03 Teams (4 shots),
04 In the portal (3 tabbed shots).

## 2. Platform repo follow-ups (axiaatlas-platform, PR against preview/staging)

- `src/lib/share-links/theia-landing.ts`: the Theia description on
  axiaatlas.com/theia now says "proprietary AI-powered" (house rule). Make the
  landing's description match, word for word:
  `Theia is the proprietary AI-powered analysis assistant in Axia Atlas investment campaign dashboards. Theia Reports and Ask Theia explain your numbers every day and recommend what to review next.`
  The title is unchanged: `Theia: Everything in sight | Axia Atlas`.
- Only after this site is live in production: set `WEBSITE_THEIA_LIVE = true`
  in the same file (docs/theia/LANDING.md step 3).
- `src/lib/brand/organization-schema.ts`: bring the Organization node in line
  with `src/app/layout.tsx` here (description, `slogan: 'Everything in sight'`,
  industry Software, NAICS 513210, knowsAbout, no offer catalog, plus the
  `SoftwareApplication` node `https://axiaatlas.com/#software`). Both domains
  must publish the same entity.

## 3. Vercel

- `NEXT_PUBLIC_THEIA_LAUNCH` is no longer read by this site. Remove it from the
  website project when convenient:
  https://vercel.com/dashboard → axiaatlas-website → Settings → Environment Variables

## 4. Decisions left for Amit

- **Blog.** `/blog` and its posts are still live and still about search and
  local marketing. They are linked from the footer only (not the nav or About).
  Keep, rewrite, or unpublish (set `published = false` in `blog_posts`).
- **Pricing plans.** `/pricing` shows Launch, Campaign and Portfolio with the
  seats, channels and decks from the platform's
  `docs/pricing/pricing-analysis.md` (Option A, recommended, not yet decided).
  No prices are printed. Confirm the inclusions before going live.
- **Terms and Privacy.** Section 1 of the Terms and the first paragraph of the
  Privacy Policy now describe a software company; the rest of both texts was
  written for the agency and wants a legal read for a SaaS product.
- **Channel list.** The site names no ad platforms (the copy pack marks its list
  [VERIFY]). Add names once the live connectors are confirmed.
