# Axia Atlas — Design System

The source of truth for the Axia Atlas marketing site's visual language. All tokens
live in `src/app/globals.css` under `:root` (light) and `[data-theme="dark"]`.
This document explains the intent so future work stays cohesive.

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
- **Both light and dark themes are first-class.** Every surface, border, and text
  color is a semantic token that flips with the theme. Never hardcode a hex in a
  component when a token exists.

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

### Semantic tokens (theme-aware — always use these in components)
| Token | Role |
|---|---|
| `--bg`, `--bg-alt` | Page canvas + alternating section background |
| `--surface`, `--surface-2`, `--surface-hover` | Cards, inputs, raised panels |
| `--text`, `--text-muted`, `--text-faint` | Text hierarchy |
| `--border`, `--border-strong`, `--hairline` | Dividers and outlines |
| `--primary`, `--primary-hover`, `--on-primary` | Solid CTA button |
| `--accent`, `--accent-soft` | Eyebrows, links, icon tint, focus ring fill |
| `--ring` | Focus outline color |
| `--inverse-*` | "Dark panel" family (hero, CTA, footer, featured pricing, case cards) — stays a dark surface in **both** themes, with its own text/border/accent tokens |
| `--grid-line`, `--glow-a`, `--glow-b` | Cartographic grid + ambient glows |
| `--shadow-sm/md/lg` | Elevation |

**Inverse panels** are the key cross-theme device: hero, CTA, footer, case cards,
and the featured pricing card use `--inverse-bg/-text/-border/-accent`. In light
theme they read as confident dark panels on a light page; in dark theme they remain
a slightly distinct deep surface with a sage hairline + glow, so rhythm survives.

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
  glows, and faint SVG contour ("topo") lines.
- **Micro-interactions:** buttons lift 1px + nudge their `.arr` arrow 3px; cards lift
  3px with shadow; links grow their arrow gap.

---

## 6. Component patterns

- **Buttons:** `.btn-primary` (solid), `.btn-dark` (alias), `.btn-outline` (hairline).
  On dark panels they auto-swap to inverse tokens (`.hero`, `.cta-section`,
  `.on-inverse`, `.btn-on-inverse`). Include an `<Arrow className="arr" />` for the nudge.
- **Eyebrow:** `.section-eyebrow` / `.hero-eyebrow` — uppercase, leading rule, accent color.
- **Cards:** `--surface` bg, `--border`, `--r`, lift + spotlight on hover.
- **Bento:** `.bento` grid; `.bento-card.feature` is the 2×2 inverse hero cell.
- **Process:** numbered nodes on a dashed connector (cartographic route line).
- **Pricing:** featured card is an inverse panel with a sage glow and pill flag.
- **Icons:** monoline SVG set in `components/icons.tsx`, `stroke: currentColor`,
  1.6 weight. **No emoji** anywhere in UI. Service icons map by id via `ServiceIcons`.
- **Logo:** `components/Logo.tsx` renders the wordmark / a-mark inline with
  `fill: currentColor` so they adapt to theme automatically.

---

## 7. Theming mechanics

- `<html data-theme="light|dark">` is the single switch.
- A blocking inline script in `layout.tsx` sets it before paint (no flash),
  honoring `localStorage['aa-theme']` then `prefers-color-scheme`.
- `ThemeToggle.tsx` flips the attribute and persists the choice.
- `color-scheme` is set per theme so native form controls/scrollbars match.

---

## 8. SEO & analytics

- Per-page `title` + `description` via Next Metadata; root sets a title template,
  Organization + WebSite **JSON-LD**, OpenGraph/Twitter. Blog posts use
  `generateMetadata`. No `noindex` anywhere.
- `app/sitemap.ts` → `/sitemap.xml` (static routes + published posts);
  `app/robots.ts` → `/robots.txt` (allows all, disallows `/api/`, points to sitemap).
- **GA4** via `components/GoogleAnalytics.tsx`, gated on `NEXT_PUBLIC_GA_ID`
  (renders nothing when unset). IP anonymization on.

---

## 9. Accessibility

- Visible focus ring (`:focus-visible`, 2px accent, 3px offset).
- Color contrast AA; motion respects `prefers-reduced-motion`.
- All icons decorative or labeled; logos carry `aria-label`; nav marks `aria-current`.
- Theme toggle and chat controls are real `<button>`s with labels.

---

## 10. Do / Don't

**Do** use semantic tokens, keep corners sharp, lean on whitespace and type scale,
add restrained motion, write copy in plain language.

**Don't** introduce new accent colors, use emoji as UI, hardcode hex in components,
say "AI", ship default-looking shadcn/template sections, or animate without a
`prefers-reduced-motion` fallback.
