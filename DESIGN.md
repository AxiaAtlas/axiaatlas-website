# Axia Atlas — Design System

The source of truth for the Axia Atlas marketing site's visual language. All tokens
live in `src/app/globals.css` under `:root`. The site ships a single, committed
theme (no toggle). This document explains the intent so future work stays cohesive.

> **Design north star:** *Cartographic editorial.* The brand is an atlas — maps,
> coordinates, contour lines, "to be found is to be chosen." Confident typography,
> generous whitespace, sharp corners, restrained palette, tasteful motion.
> Quality bar: Linear · Palantir · Stripe · Anthropic. Never generic or templated.

---

## 1. Brand rules (non-negotiable)

- **Never say "AI" in client-facing copy** (pages, chat widget, metadata, alt text).
  Use **"answer engines"**, **"answer-engine optimization (AEO/GEO)"**,
  **"intelligent content system"**, or **"automation"**. Product names
  (ChatGPT, Perplexity, Gemini) are fine.
- **Palette is spruce / alabaster / sage only.** No gold, no off-brand accents.
- **Alabaster/neutral is the dominant surface.** Deep Spruce is an *accent* and a
  *depth* color — reserved for the hero, page heroes, the footer, and
  a couple of single accent panels (featured pricing card, bento feature cell).
  Sage is the secondary accent; the **CTA band is the one sage section** on each
  page, deliberately distinct from the dark footer. Aim for contrast and breathing
  room, not green fill.
- **Single committed theme.** Every surface, border, and text color is a semantic
  token. Never hardcode a hex in a component when a token exists.

---

## 2. Color

### Brand constants (raw palette — do not theme)
| Token | Hex | Use |
|---|---|---|
| `--spruce` | `#354940` | Primary brand green |
| `--spruce-700/800/900/950` | `#2d3f37 … #16221d` | Deeper spruce steps |
| `--alabaster` | `#f1f0ea` | Bone neutral / on-dark text |
| `--sage` | `#c8d1c5` | Accent / on-dark eyebrows |
| `--sage-soft` | `#e4e9e3` | Soft sage tint |

### Semantic tokens (always use these in components)
| Token | Role |
|---|---|
| `--bg` `#f4f3ed`, `--bg-alt` `#eae9e1` | Dominant page canvas + alternating sections |
| `--surface`, `--surface-2`, `--surface-hover` | Cards, inputs, raised panels |
| `--text`, `--text-muted`, `--text-faint` | Text hierarchy |
| `--border`, `--border-strong`, `--hairline` | Dividers and outlines |
| `--primary`, `--primary-hover`, `--on-primary` | Solid spruce CTA button |
| `--accent` `#41685a`, `--accent-soft` | Eyebrows, links, icon tint, focus ring fill |
| `--ring` | Focus outline color |
| `--inverse-*` | Depth-panel family (deep spruce). Text/border/accent tokens for the few dark sections |
| `--grid-line`, `--glow-a`, `--glow-b` | Cartographic grid + ambient glows |
| `--shadow-sm/md/lg` | Elevation |

**Depth panels** (`--inverse-*`) are deep spruce and used *sparingly* for contrast:
the home hero, every page hero, and the footer — plus two single accent panels
(the featured pricing card and the full-width bento feature cell). The **CTA band**
(`.cta-band`, `components/CtaBand.tsx`) is *not* a depth panel: it's a sage-soft
gradient section with dark text, a pulsing beacon, drifting grid, and an emphasized
spruce CTA — the one light-green moment on each page, so it never reads as the
footer. Everything else is alabaster/white surfaces with spruce/sage accents.
Ambient sage glows (including at the bottom of the footer) sit on the dark panels.

### Contrast
Body text targets WCAG AA (≥ 4.5:1); large display text ≥ 3:1. `--text-muted` is
reserved for secondary copy, never for primary reading at small sizes.

---

## 3. Typography

- **Display / UI:** Montserrat (`--font-head`), loaded via `next/font/google`
  (weights 400–800), exposed as `--font-montserrat`.
- **Body:** Arial / system (`--font-body`).

### Type scale (fluid, `clamp()`)
| Token | Range | Use |
|---|---|---|
| `--t-display` | 44 → 88px | Home hero |
| `--t-h1` | 36 → 60px | Page-hero headlines, post titles |
| `--t-h2` | 30 → 50px | Section headlines |
| `--t-h3` | 21 → 26px | Card/detail headlines |
| `--t-lead` | 17 → 20px | Section/hero subcopy |
| `--t-body` | 16px | Running text |
| `--t-sm` / `--t-xs` | 14 / 12px | Meta, captions |
| `--t-eyebrow` | 11px | Eyebrows (uppercase, `0.22em` tracking) |

Headlines: weight 700, `letter-spacing: -0.025em`, `line-height ≈ 1.05`, `text-wrap: balance`.
Body: `line-height 1.6–1.85`, `text-wrap: pretty`.

---

## 4. Space, layout, radius

- **Radius:** `--r: 4px`, `--r-sm: 2px`, `--r-pill: 999px` (pills for tags/badges only). Sharp and premium — never large rounding.
- **Gutter:** `--gutter` 40 → 20px responsive.
- **Section rhythm:** `--section-y` `clamp(72px, 9vw, 132px)`.
- **Containers:** `--maxw: 1180px`; `--maxw-narrow: 760px` for prose (about, blog post).
- **Grids:** 3-col services/blog/case/pricing; 2-col problem; bento uses a 3-col grid with a 2×2 `feature` cell.

---

## 5. Motion

- Tokens: `--ease`, `--ease-out` (custom cubic-beziers), `--dur`.
- **Scroll reveal** (`SiteFX.tsx`): JS adds `.reveal` to a curated selector set, then
  `.in` via `IntersectionObserver` (fade + 16px rise, 70ms sibling stagger).
  Progressive enhancement — no JS, nothing hidden. Fully disabled under
  `prefers-reduced-motion`.
- **Nav** gains `.scrolled` (stronger blur + hairline + shadow) past 12px scroll.
- **Spotlight:** pointer position feeds `--mx/--my` to drive a radial highlight on
  `.bento-card`, `.service-card`, `.spotlight`.
- **Hero:** drifting grid (`gridDrift`), pulsing live-dot (`pulse`), layered radial
  glows, faint SVG contour ("topo") lines, and the **hero beacon** — an animated
  cartographic mark (rotating dashed dials, scanning crosshair, marching-ants route,
  expanding ripples, floating pin, "You are here") shown ≥1200px only.
- **Marquee:** the strip under the hero (`.hero-marquee`) loops the moments buyers
  decide ("Searched on Google · Asked on ChatGPT · …"); pauses on hover; edge-masked.
- **System map:** the full-width bento feature cell draws a looping route
  (Find → Convert → Compound) with waypoints popping in sequence (`smRoute`/`smPop*`).
- **Results slider:** auto-advancing carousel (5.2s), pauses on hover/focus, no
  autoplay under reduced motion (`ResultsSlider.tsx`).
- **CTA band:** pulsing pin beacon (`ctaRing`), drifting grid, soft button pulse
  (`ctaPulse`), shine sweep on `.btn-primary` hover (`btnShine`).
- **Micro-interactions:** buttons lift 1px + nudge their `.arr` arrow 3px + shine
  sweep; cards lift 3px with shadow; service icons lift/tilt and fill spruce on card
  hover; the process connector's dashes slowly march (`antsSlide`); links grow their
  arrow gap.

---

## 6. Component patterns

- **Buttons:** `.btn-primary` (solid spruce), `.btn-dark` (alias), `.btn-outline`
  (hairline). On depth panels they auto-swap to inverse tokens (`.hero`,
  `.cta-section`, `.on-inverse`, `.btn-on-inverse`). Include an `<Arrow className="arr" />`.
- **Eyebrow:** `.section-eyebrow` / `.hero-eyebrow` — uppercase, leading rule, accent color.
- **Cards:** `--surface` bg, `--border`, `--r`, lift + spotlight on hover.
- **Bento:** `.bento` grid; `.bento-card.feature` is the single full-width spruce
  accent cell (copy left, animated system map right); the 01/02/03 cards sit in one
  row beneath it.
- **Process:** numbered nodes on a dashed connector (cartographic route line).
- **Results:** `ResultsSlider` — one slide per result (tag + big spruce number +
  detail), dot + arrow controls under the viewport.
- **Pricing:** featured card is the one spruce depth panel (sage glow + pill flag);
  the other tiers are light surface cards.
- **Case study cards (`.cs-card`):** light surfaces, 2-col grid — gridded sage-glow
  header with the big spruce result number, then Challenge → What We Did → Result
  as a dashed route timeline (`.cs-route`/`.cs-step`); spruce is reserved for the
  result number and accents, never the whole card.
- **CTA band:** `CtaBand` component (eyebrow/headline/sub/cta props) — sage section,
  beacon, emphasized CTA, reassurance note. Used on home, services, case studies,
  and pricing.
- **Services page:** light overview rows — icon, headline, short desc, who-for
  callout, and "In Practice" capability pills (`.service-point`). No numbered
  labels, tier badges, or exhaustive deliverable lists.
- **FAQ:** native `<details>` accordion (`.faq-item`); the `Plus` icon rotates to ×.
- **Demo survey:** two-step `.demo-card` with `.demo-steps` progress + confirmation.
- **Icons:** monoline SVG set in `components/icons.tsx`, `stroke: currentColor`,
  1.6 weight. **No emoji** anywhere in UI. Service icons map by id via `ServiceIcons`.
- **Logo:** `components/Logo.tsx` renders the wordmark / a-mark inline with
  `fill: currentColor`.

---

## 7. Single theme

- One committed theme (alabaster-dominant, spruce depth). No toggle, no
  `data-theme`, no `prefers-color-scheme` switching. `color-scheme: light` is set
  once on `:root` so native form controls/scrollbars match.

---

## 8. Routing: demo vs contact

- **`/demo`** is the audit-request funnel — a two-step survey that writes a lead to
  the Supabase **`prospects`** table (so it appears in the portal) and mirrors a row
  into `contact_submissions` (`POST /api/demo`). Every primary / "Book a Free Audit" /
  "Book a Demo" CTA points here.
- **`/contact`** is a general message form (`POST /api/contact`) plus an FAQ
  accordion. The nav "Contact" link and footer "Contact" point here.

---

## 9. SEO & analytics

- Per-page `title` + `description` via Next Metadata; root sets a title template,
  Organization + WebSite **JSON-LD**, OpenGraph/Twitter. Blog posts use
  `generateMetadata`. No `noindex` anywhere.
- `app/sitemap.ts` → `/sitemap.xml` (static routes + published posts);
  `app/robots.ts` → `/robots.txt` (allows all, disallows `/api/`, points to sitemap).
- **Favicons (two contexts):** the browser **tab** uses the adaptive transparent
  vector mark (`public/icon.svg`, Deep Spruce → Bone in dark mode), listed first
  in `app/layout` `metadata.icons` so browsers prefer the SVG. **Search results /
  link previews** use the Deep-Spruce *filled* PNGs (`public/icon-{192,512}.png`,
  Bone mark on a spruce tile) — declared as PNG `icon` links and as the manifest
  icons, so engines/scrapers that skip SVG render the branded tile. The
  `apple-touch-icon` is the filled 512 (iOS masks transparent icons to black).
  No static `favicon.ico`. Filled PNGs are regenerated by `scripts/gen-icons.mjs`.
- **GA4** via `components/GoogleAnalytics.tsx`, gated on `NEXT_PUBLIC_GA_ID`
  (renders nothing when unset). IP anonymization on.

---

## 10. Accessibility

- Visible focus ring (`:focus-visible`, 2px accent, 3px offset).
- Color contrast AA; motion respects `prefers-reduced-motion`.
- All icons decorative or labeled; logos carry `aria-label`; nav marks `aria-current`.
- Chat, FAQ, and form controls are real semantic elements with labels.

---

## 11. Do / Don't

**Do** keep the page predominantly alabaster, use spruce as deliberate punctuation,
use semantic tokens, keep corners sharp, lean on whitespace and type scale, add
restrained motion, write copy in plain language.

**Don't** flood sections with spruce, introduce new accent colors (no gold), use
emoji as UI, hardcode hex in components, say "AI", reintroduce a theme toggle, ship
default-looking template sections, or animate without a `prefers-reduced-motion` fallback.
