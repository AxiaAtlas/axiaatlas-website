# Axia Atlas — Marketing Website

Marketing site for **Axia Atlas**, a digital marketing studio that makes brands, local businesses, and founders impossible to miss — in search, in answer engines, and in the feeds where buyers decide.

Built with Next.js (App Router) and a hand-built CSS design system, with Supabase powering the contact form, case studies, and blog.

The full visual language (tokens, type scale, spacing, component patterns, theming) lives in [`DESIGN.md`](./DESIGN.md).

## Stack

- **Next.js 14** (App Router, server components)
- **Hand-built design system** in `src/app/globals.css` (see `DESIGN.md`); Tailwind available for utilities
- **Supabase** for contact submissions, case studies, and blog posts
- **GA4** analytics (gated on `NEXT_PUBLIC_GA_ID`)
- Deployed on **Vercel**

## Brand

Single source of truth lives in the `:root` / `[data-theme="dark"]` tokens in `src/app/globals.css`, documented in `DESIGN.md`.

- Deep Spruce `#354940` (primary) · Bone Alabaster `#F1F0EA` · Sage `#C8D1C5` (no other accents)
- Montserrat for display/UI, Arial for body copy
- 0–4px radii, bento-grid layouts, generous whitespace
- First-class **light and dark** themes; cartographic-editorial motion
- Brand rule: never say "AI" in client-facing copy — use "answer engines" / "AEO"

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase values
npm run dev
```

Open http://localhost:3000.

### Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_GA_ID=            # optional — Google Analytics 4 measurement ID
```

The Supabase values are public (browser-safe) config; `NEXT_PUBLIC_GA_ID` is optional and analytics is skipped when unset. There are **no server-side secrets** in this app.

## Project layout

```
src/app/            Routes: /, /services, /pricing, /case-studies, /about, /blog, /contact
src/app/api/contact Contact form → Supabase (contact_submissions + prospects)
src/components/      Nav, Footer, ChatWidget (local Q&A, no API), NewsletterForm
src/lib/supabase/    Supabase browser client
supabase/migrations/ SQL schema
public/              Logos, favicon set, OG image
```

## Client portal

The app/client portal lives separately at **https://app.axiaatlas.com** (linked from the nav and footer).

## Build

```bash
npm run build
```
