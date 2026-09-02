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
The site is dark. `:root` carries the portal's system — `color-scheme: dark` — and
every token below resolves against a near-black page, not the alabaster one this
document described before the redesign.

| Token | Role |
|---|---|
| `--bg` `#070C09`, `--bg-alt` `#0b120e` | Page ground + its barely-separated sibling |
| `--surface` `#131a15`, `--surface-2`, `--surface-hover` | Cards, inputs, raised panels |
| `--text` `#f1f0ea`, `--text-muted`, `--text-faint` | Text hierarchy. Muted is light sage, not spruce |
| `--border`, `--border-strong`, `--hairline` | Dividers and outlines |
| `--primary`, `--primary-hover`, `--on-primary` | CTA button. Inverts to bone-on-dark, because solid spruce disappears on `#070C09` |
| `--accent`, `--accent-soft` | Eyebrows, links, icon tint, focus ring fill |
| `--ring` | Focus outline color |
| `--grid-line`, `--glow-a`, `--glow-b` | Cartographic grid + ambient glows |

### The four grounds
`#070C09` and `#0b120e` are four values apart. That is not a rhythm, and nine
sections stacked on it read as one scrolling panel. Every section now picks one of
four declared grounds (`globals.css`, "SECOND PASS — GROUNDS, ALIGNMENT, AND THE
HEADER ARTIFACT"):

| Class | Hex | Use |
|---|---|---|
| `.g-black` | `#070C09` | The page. The default, and still the most common |
| `.g-raise` | `#101812` | A lifted near-black. Clearly not the page. Cards on it lift again |
| `.g-spruce` | `#354940` | Deep Spruce, the brand primary, at full strength |
| `.g-lift` | `#47614F` | A lighter spruce. **Emphasis only** — at most one section per page |

**Adjacent sections never share a ground.** Home reads
`black · spruce · black · spruce · raise · spruce · black · lift · black`.

Each ground **redeclares the semantic tokens** rather than restyling its children,
so every `var(--text-muted)` / `var(--surface)` / `var(--border)` already in the
file resolves correctly inside it and nothing downstream needs to know where it
landed. On Deep Spruce, cards go **down** rather than up: a lighter card on a
mid-green ground reads as a sticker, a darker one as a recess, and the portal
already teaches the eye that a card is the darker thing.

### Contrast
Body text targets WCAG AA (≥ 4.5:1); large display text ≥ 3:1. `--text-muted` is
reserved for secondary copy, never for primary reading at small sizes.

**Alpha is set per ground**, because one value cannot clear 4.5:1 on all four. The
`rgba(..., 0.62)` that reads as quiet on near-black lands at 3.1:1 on spruce. So
muted runs `0.62` on the near-blacks, `0.76` on `.g-spruce`, and `0.84` on
`.g-lift` — the lighter the ground, the higher the alpha has to run, since `0.76`
lands at 4.1:1 on `#47614F` and only `0.84` clears it. Changing a ground's hex
means re-checking its alphas; they are not decoration.

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
  autoplay under reduced motion (`ResultsSlider.tsx`). **Autoplay starts on
  scroll into view, not on mount** — the slider sits four sections down, and a
  timer running from page load meant it had cycled through the results twice
  before anyone reached it. The observer stops it again when it leaves view.
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

## 7. Theme: the portal's system, site-wide

- **The whole site runs the portal's dark system.** It began scoped to a
  `.home-dark` wrapper on `/` while the rest of the site was still alabaster;
  that scope is gone and the tokens now live on `:root` (`globals.css`, "THIS IS
  THE SITE'S ONE COMMITTED THEME"). There is no toggle, no `data-theme`, no
  `prefers-color-scheme` switching — `color-scheme: dark` is set once so native
  form controls and scrollbars match. Any page reached from the nav is dark.
- What it inherits from `axiaatlas-platform`:

  | | Portal | Site |
  |---|---|---|
  | Page ground | `#070C09` | same |
  | Card | `#131A15` | same |
  | Emphasis panel | `#354940` (Deep Spruce) | same, plus `#47614F` above it — see the four grounds |
  | Radius | 6px | same (`--r`) |
  | Content width | 1280px | same (`--maxw`) |
  | Font | Montserrat for **all** text | same (`--font-body` too) |
  | Muted ink | light sage, not spruce | same |

  Two values are the site's own and are marked as such in the CSS: the footer
  takes the portal's dark sidebar ground `#0a110d` so it does not merge with the
  section above it, and `--text-faint` sits at 0.58 alpha rather than the light
  theme's equivalent, because the same alpha that reads as quiet on alabaster
  lands under 3:1 on near-black.
- **The nav** is shared chrome rendered as a sibling of the page. It is styled
  with the rest of the dark system now that the theme is global.

### 7a. The hero artifact and the chart primitives

`components/PortalShot.tsx` is the right-hand column of the home hero. It is not
a drawing of the portal: the class names (`.sidebar`, `.sb-link`, `.tb-top`,
`.kpi`, `.card`, `.badge`) are the portal's, the CSS behind them is copied from
`axiaatlas-platform/portal-theme.css` under a `.portal-ui` scope, and the charts
are the portal's own primitives ported into `components/charts/` (`TimeSeries`,
`Spark`, `theme.ts`) plus the refusals in `lib/analytics/series.ts`. **Keep those
files in sync with the platform.** The only intentional divergence is
`TimeSeries`'s `plotWidth` prop, which defaults to the platform's hard-coded 720
and exists because an SVG scales its type along with its geometry.

**Any number shown is sample data and says so on the artifact**, in a badge in
the topbar rather than a caption underneath, because the crop that ends up in a
deck never includes the caption. The sessions KPI is the exact sum of the 28
plotted days. We sell measurement; an unlabeled invented figure here would be
disqualifying.

### 7b. Heading placement

Every section head used to start at the left gutter, which made nine sections
land on the same vertical line. `.section-head` now takes an alignment chosen
against **what sits beside it**:

| Modifier | Use |
|---|---|
| *(none)* | Left. The head introduces a left-hand column |
| `.centred` | The thing below is symmetric and full width |
| `.aligned-right` | The head has a graphic or a grid to lean against |

**This is a rotation, not an alternation** — three sections in a row may share one
if the page reads better that way. Right-alignment is a compositional device, so
it is reverted below **820px**: once the column is the whole screen there is
nothing left beside it to balance against, and a ragged-left paragraph on a phone
is harder to read for no gain. Below that breakpoint `.aligned-right` returns to
`text-align: left`, full width, with its eyebrow flipped back to `row`.

Section heads also no longer draw a decorative `::before`. The page-hero ellipse
that painted a hard-edged pale rectangle under the heading on Services, Pricing,
Insights, About and Contact is removed outright rather than retuned.

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
- **Favicons — one mark, two jobs, at parity with the portal.** The opaque set is
  written by `scripts/gen-icons.mjs` from the portal's canonical mark geometry: a
  full-bleed Deep-Spruce square with the Bone mark, no alpha channel, no
  rounding. `/favicon.ico` (16/32/48/96, each rasterized from the vector at its
  own size rather than shrunk), `public/icon-{48,96,192,512}.png`, and
  `public/apple-icon.png`. Do not hand-edit anything in `public/`; change the
  script and re-run `npm run icons`. The generator is kept in sync with
  `axiaatlas-platform/scripts/gen-icons.mjs` and every emitted asset is checked
  against the portal's pixel-for-pixel.
  - **`src/app/icon.svg` is the tab icon, and it is transparent on purpose.**
    Hand-maintained, not generated: its ink flips between Deep Spruce and Bone
    Alabaster on `prefers-color-scheme`. A tab strip is a known background; a
    search-result row is not. Browsers prefer `image/svg+xml` over any PNG
    regardless of link order, so the SVG wins the tab and the opaque set is what
    remains for Google, the PWA and bookmarks. Do not delete it to make the
    opaque set the only icon.
  - **Declaration order matches the portal's exactly** — `favicon.ico`,
    `icon.svg`, `icon-192.png`, `icon-48.png`. Declaring `icon.svg` explicitly
    is what suppresses Next's file-convention duplicate `<link>`. Do not reorder
    one property without the other.
  - **Chromium always draws the SVG's light ink in the tab strip.** It
    rasterizes favicons outside any document, so `prefers-color-scheme` resolves
    light there no matter the OS theme ([crbug 1311553](https://crbug.com/1311553)).
    Known and accepted; there is no fix. The adaptive behavior is for Firefox,
    Safari and direct loads. Full rationale in `app/layout.tsx`.
  - **`MARK_RATIO` is 0.39** — the brand asset's own 400/1024 framing, so the
    favicon is the logo rather than a tighter crop of it. It costs a clean split
    at 16px (the apex antialiases to a seam, under one device pixel, unfixable by
    any rendering method). Brand fidelity in search beats tab-icon crispness. Do
    not raise it back.
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

**Do** keep the page predominantly near-black (alabaster is the ink now, not the
ground), use spruce as deliberate punctuation, give adjacent sections different
grounds, use semantic tokens, keep corners sharp, lean on whitespace and type
scale, add restrained motion, write copy in plain language.

**Don't** flood sections with spruce, put `.g-lift` on more than one section per
page, repeat a ground on two adjacent sections, introduce new accent colors (no
gold), use emoji as UI, hardcode hex in components, say "AI", reintroduce a theme
toggle, ship default-looking template sections, or animate without a
`prefers-reduced-motion` fallback.
