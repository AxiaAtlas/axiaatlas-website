# Axia Atlas — Marketing Website

Marketing site for **Axia Atlas**, a digital marketing studio that makes brands, local businesses, and founders impossible to miss — in search, in AI answers, and in the feeds where buyers decide.

Built with Next.js (App Router) + Tailwind, with Supabase powering the contact form, case studies, and blog.

## Stack

- **Next.js 14** (App Router, server components)
- **Tailwind CSS** + a hand-built design system in `src/app/globals.css`
- **Supabase** for contact submissions, case studies, and blog posts
- Deployed on **Vercel**

## Brand

Single source of truth lives in the `:root` tokens in `src/app/globals.css`.

- Deep Spruce `#354940` (primary) · Bone Alabaster `#F1F0EA` · Sage `#C8D1C5` · Gold accent `#b8893a`
- Montserrat for display/UI, Arial for body copy
- 0–4px radii, bento-grid layouts, generous whitespace

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
```

Both are public (browser-safe) Supabase config. There are **no server-side secrets** in this app.

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
