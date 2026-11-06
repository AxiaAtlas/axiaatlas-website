# Axia Atlas Website: Site Plan

Status: plan only, no code. Branch `feat/site-update`. Written 2026-11-06.

Sources read: every file under `src/` (pages, nav, footer, components, chat widget, SelectBridge, `data-aa-section` marks), `next.config.mjs`, `src/middleware.ts`, `src/app/sitemap.ts`, `supabase/migrations/*` (blog seed, case studies), the live `/blog` index, the platform's `src/lib/pricing.ts` (catalogue, tiers, add-ons, modules, offboarding, executed to read the real values), `src/lib/website/seo-contract.ts`, the platform's `scripts/site-map.mjs`, and the Theia handoff (`README.md`, brand guide, screenshots, `Theia (interactive).html`).

---

## 1. Hard rules (apply to every page and every line of proposed copy)

1. Never the word "AI". Say automation, answer-engine optimization, intelligent systems.
2. Never name the model provider. Never name the founder.
3. Axia does not manage advertising. It gives visibility into ads the client already runs. Nothing may imply managed ad spend.
4. The CTA is "Book a Demo" everywhere, linking to `/demo`.
5. US English. No em dashes (`npm run check:em-dash` enforces it on prebuild).
6. Brand: Spruce `#354940`, Alabaster `#F1F0EA`, Sage `#C8D1C5`. Display type Montserrat 600, uppercase, tracked. Body Arial.
7. Theia is always written "Theia by Axia Atlas" on first mention per page, and the /theia page carries a footer attribution.
8. Theia and the portal are a relaunch. Nothing live may present Theia as available before "Theia launch".
9. SEO contract (`seo-contract.ts`): title 50 to 60 characters, keyword first, " - Axia Atlas" last; exactly one H1 of 50 to 60 characters that tells the title's story in other words (overlap at least 0.3); H2 per section, H3 under it, no skipped levels; the first 40 to 60 words of the page and of each major section are a self-contained answer; Organization JSON-LD on every page plus the page-kind type (Service, Article, FAQPage).
10. Point and prompt: every `<section>` carries a literal, repo-unique `data-aa-section="<id>"` (the platform's `site-map.mjs` only reads literal strings and flags duplicates and unmarked sections). Re-run `npm run site:map` on the platform after the rebuild.

---

## 2. Inventory of the current site

### 2.1 Pages

| URL | Purpose | Sections (`data-aa-section`) | Services it lists |
|---|---|---|---|
| `/` | Home | `home.hero`, `home.ticker`, `home.problem`, `home.system`, `home.channels`, `home.results`, `home.process`, `cta-band` | Six cards: Website, Portals & Dashboards (both emphasized), Social, SEO & AEO, Competitive Intelligence, Local. H2 "Nine services. One system." |
| `/services` | All nine as rows, price order | `services.hero`, `services.list`, `cta-band` | All nine, Portals & Dashboards first. H1 "Nine Services That Work as One Plan" |
| `/pricing` | Three bundle tiers, no prices | `pricing.hero`, `pricing.tiers`, `pricing.dashboards`, `pricing.note` | Starter / Growth / Command cards with "Custom" price; a band for Portals & Dashboards |
| `/about` | Story, beliefs, latest posts | `about.hero`, `about.why`, `about.seen`, `about.insights`, `about.working` | None by name |
| `/blog`, `/blog/[slug]` | Insights from Supabase `blog_posts` (10 live posts) | `blog.hero`, `blog.empty`, `blog.list`, `post.hero`, `post.body`, `post.more`, `cta-band` | n/a |
| `/contact` | Inboxes, form, 4-group FAQ with FAQPage JSON-LD | `contact.hero`, `contact.info`, `contact.form`, `contact.faq` | FAQ lists all nine; pricing FAQ describes Starter/Growth/Command |
| `/demo` | 3-step survey then on-site booking via portal scheduling API | `demo.copy`, `demo.form` | "Growth areas" dropdown: SEO, AEO/GEO, local, social, founder brand, website, leads |
| `/careers` | 3-step application to `/api/careers` | `careers.hero`, `careers.apply` | Role list mirrors old channels |
| `/privacy`, `/terms` | Legal | `privacy.text`, `terms.text` | Terms section 1 lists services incl. "campaigns" |
| `/links` | Link-in-bio (no site chrome) | `links.hero`, `links.grid`, `links.foot` | None |
| `/go/[slug]` | Short-link fallback (middleware resolves via portal) | `go.not-found` | n/a |
| 404 | Not found | `not-found.message` | n/a |

Shared chrome: `nav` (Services, Pricing, Insights, About, Contact, Client Portal, Book a Demo), `footer` (Services column = all nine `short` names; Company; Get Started), `chat` (ChatWidget, local keyword Q&A, no API), `cta-band`. Root layout injects Organization + WebSite + WebApplication (portal) JSON-LD with an OfferCatalog of the nine names, and mounts `SelectBridge`.

Data: `src/lib/services.ts` mirrors the nine platform names (ids are URL fragments: `dashboards, website, geo, social, leadgen, executive, strategy, intel, local`). Case studies and blog posts live in Supabase (migrations 004 to 006).

### 2.2 Out of date or breaking the rules

Structure and offer
- The whole site sells nine equal services. The decided model is three headline services (Portal, Website Design & Build, Social Media Management) plus grouped add-ons. Home, /services, /pricing, footer, chat widget, contact FAQ and `/demo` growth areas all need regrouping.
- `/pricing` shows Starter / Growth / Command bundles that do not exist in `pricing.ts` (the platform prices each service on its own three tiers) and prints no prices. Its note says "No long lock-ins", but Social, SEO & AEO and Local carry a 3-month minimum and Portals & Dashboards 12 months.
- Contact FAQ and chat widget repeat the invented tiers and their contents ("Command includes a senior strategist", "Growth includes a live dashboard and monthly strategy call"). None of that is in `pricing.ts`.
- The site never presents the portal as something sold, and does not mention SaaS at all. The portal appears only as a login link and a product shot.
- Website care retainer and the six-month build payment plan are not in `pricing.ts` today (see open questions). Website tiers there: Starter Site $3,500, Growth Site $6,500, Authority Site $10,000, one-time; add-ons Extra page $350, E-commerce on a Tier-1 site $2,000, chatbot $1,500, Client CRM/Contacts $0, Email Broadcasts $350.

Hard-rule breaks
- "AI": the platform's website add-on is labelled "AI chatbot add-on" (must be renamed before it can appear on the site). Three live blog posts use Google's product name "AI Overview(s)". The Theia handoff's composer footer reads "AI can make mistakes" and its demo data mentions "AI Overviews" (must not ship on any marketing screenshot).
- Provider name: the model provider appears as an answer engine in the hero ticker ("Named by Claude"), the System card's marquee and its aria-label, the chat widget answers and keywords, the contact FAQ AEO answer, and the root `metadata.keywords`. Decide whether naming it as an answer engine is allowed (open question 3); if not, remove it everywhere, including its logo in `BrandMarquee`.
- Founder: no founder name on the site. The Theia handoff greetings use a real first name ("Good morning, Amit.") and must be replaced with a placeholder in any screenshot.
- Advertising: Organization JSON-LD declares `industry: 'Advertising, Marketing & Digital Services'` and `isicV4: '7310' // Advertising`; Terms and the old Command tier say "campaigns". Nothing currently says we manage ad spend, but these should go. Case studies say "zero ad spend" (fine). The unpublished 001 seed row "2.4x ROAS improvement" must stay unpublished.
- CTA: `/about` ends on "Work With Us", home Problem on "Find Your Gaps", services rows on "Get Started", home hero secondary "See How It Works". All primary CTAs become "Book a Demo".
- Brand type: body is Montserrat (a later `:root` override replaced Arial); display headings are 700 to 800 weight, mixed case, negative tracking. Brand calls for Montserrat 600 uppercase tracked display and Arial body.
- Consistency: chat widget says "fully remote, North America and beyond"; FAQ and schema say "based in Miami, nationwide".

SEO contract gaps (measured against the rules in section 1)
- Home title "Miami Digital Marketing Studio - Axia Atlas" is 43 characters (under 50).
- `/services` H1 is 35 characters; `/pricing` H1 has no prices behind it; most pages have no 40 to 60 word answer block in their first paragraph (home `hero-sub` and `/services` `section-sub` are the closest).
- `/pricing` emits no Service JSON-LD; most pages carry only the site-wide Organization node.

---

## 3. Proposed sitemap

Legend: **NOW** = can go live before Theia launch. **THEIA** = built on this branch, hidden behind a `NEXT_PUBLIC_THEIA_LAUNCH` flag (route returns 404 and is absent from the sitemap and nav until the flag is on).

```
/                           Home                                   NOW (Meet Theia section: THEIA)
/website-design             Website Design & Build (+ care plan)   NOW
/social-media-management    Social Media Management                NOW
/portal                     The Portal (SaaS)                      THEIA
/theia                      Theia by Axia Atlas                     THEIA
/add-ons                    Add-ons, grouped                       NOW
/pricing                    Pricing (headline services + add-ons)  NOW (portal tier: THEIA)
/services                   Overview hub: 3 headline + add-ons     NOW
/about                      About (agency + SaaS story)            NOW
/blog, /blog/[slug]         Insights                                NOW
/demo                       Book a Demo                             NOW
/contact                    Contact + FAQ                           NOW
/careers, /privacy, /terms, /links   unchanged in role              NOW
```

Nav (NOW): Website Design, Social Media, Add-ons, Pricing, Insights, About, Client Portal (login), **Book a Demo**.
Nav (THEIA): Portal and Theia join; order becomes Portal, Website Design, Social Media, Add-ons, Pricing, Theia, Insights, About.

### 3.1 How the add-ons are grouped and where they live

Recommendation: **one `/add-ons` page** (one URL to rank and to link from pricing), grouped by the job the buyer wants done, plus a short "Pairs well with" strip on each headline service page that links to the relevant anchors. Groups:

| Group (H2 on /add-ons) | Add-ons (H3, anchor) | Pairs with |
|---|---|---|
| Get found | SEO & AEO `#seo-aeo`, Local Presence & Maps `#local` | Website, Portal |
| Fill the pipeline | Lead Generation `#lead-generation`, Executive Personal Brand `#executive-brand` | Social |
| Decide with evidence | Competitive Intelligence `#competitive-intelligence`, Strategic Advisory `#strategic-advisory` | All three |
| Custom builds | Portals & Dashboards (custom build) `#custom-dashboards` | Portal |

Each add-on row: one-paragraph answer block, "who it is for" (platform `audience`), the three tier prices read from `pricing.ts`, its own minimum term, and Book a Demo. SEO & AEO is also described as part of the SaaS side (rankings and citations measured inside the portal).

---

## 4. Page outlines

Prices on every page are read from the platform's `pricing.ts` through a generated JSON (a sync script, never typed by hand). Titles and H1s below were character-counted; the build re-checks every page with the platform's `validatePage()`.

### `/` Home (NOW; "Meet Theia" THEIA)
- Purpose: say in one screen that Axia builds your website, runs your social, and gives you a portal to see it all; agency plus software.
- Title: `Miami Marketing Agency and Client Portal - Axia Atlas` (53). H1: `Websites, Social and a Client Portal That Run as One System` (59).
- Sections: `home.hero` (answer block 40 to 60 words, Book a Demo, audit preview artifact) · `home.offer` (three headline service cards; Portal card reads "Coming soon" with no Theia mention until launch) · `home.how` ("Agency and software": what we do for you, what you see yourself) · `home.theia` **THEIA** ("Meet Theia": the way you work with us, lives only in your portal, knows only your business; link to /theia) · `home.addons` (four groups, one line each, link to /add-ons) · `home.results` (case studies, unchanged `id="results"` for the /case-studies 301) · `home.process` (Audit, Plan, Build, Grow; PortalShot) · `cta-band`.
- Reuse: hero, AuditPreview, ResultsSlider, PortalShot, CtaBand, ServiceIcons. Build: three-card offer grid, add-on group strip, Theia section.
- Remove: ticker and System marquee entries that name the model provider (pending Q3); "Nine services" H2.

### `/website-design` Website Design & Build (NOW)
- Title: `Website Design and Build With Care Plans - Axia Atlas` (53). H1: `Website Design and Build, Backed by a Monthly Care Plan` (54).
- Sections: hero + answer block · `website.process` (positioning, copy, design, build; search foundations during the build) · `website.tiers` (Starter Site / Growth Site / Authority Site build fees; "pay once, or spread over six months") · `website.care` (care retainer Starter $250 / Growth $400 / Authority $650 a month, three-month minimum; what it covers) · `website.addons` (extra page, e-commerce, email broadcasts, client CRM; chatbot only once renamed, Q5) · `website.pairs` (SEO & AEO, Local) · FAQ (FAQPage JSON-LD) · `cta-band`.
- Reuse: ArtWebsite artifact, service copy from today's `/services#website`. Build: tier and care-plan cards, FAQ block (reuse contact FAQ markup).

### `/social-media-management` Social Media Management (NOW)
- Title: `Social Media Management for Growing Brands - Axia Atlas` (55). H1: `Social Media Management, Planned, Published and Answered` (55).
- Sections: hero + answer block · `social.how` (pick two or three platforms, pillars, native production, community management) · `social.tiers` (Essentials $1,500 / Growth $2,800 / Authority $4,500 a month, 3-month minimum, meeting and reporting cadence) · `social.addons` (channel setup, 4-reel pack, extra platform) · `social.ads-note` (we report on ads you already run; we do not run or buy them) · `social.pairs` (Executive Brand, Lead Gen) · FAQ · `cta-band`.

### `/portal` The Portal (THEIA)
- Title: `Client Portal for Marketing and Reporting - Axia Atlas` (54). H1: `One Client Portal for Your Results, Approvals and Reports` (57).
- Sections: hero + answer (SaaS: your performance, deliverables, approvals, proofing, reporting in one login) · `portal.features` · `portal.theia` (how Theia works inside it) · `portal.ads-visibility` (see the ads you already run beside everything else; we do not manage spend) · `portal.security` (each client's data scoped to that client; InfraStrip) · `portal.pricing` (portal tiers, Q2) · `cta-band`.
- Reuse: PortalShot, InfraStrip. Build: feature grid, screenshots from the real portal.

### `/theia` Theia by Axia Atlas (THEIA)
- Title: `Theia, the Assistant in Your Client Portal - Axia Atlas` (55). H1: `Meet Theia by Axia Atlas, the Way You Work With Us Every Day` (60).
- Sections: hero (Theia mark, answer block: every client works with Axia through Theia; she runs the services; she lives only inside your portal and knows only your business) · `theia.asks` (ask about your results) · `theia.makes` (slideshows, spreadsheets, whiteboards, charts) · `theia.runs` (scheduled tasks; the services she runs) · `theia.privacy` (one client per Theia; never on your own website) · `cta-band` · footer attribution line "Theia by Axia Atlas".
- Build: Theia mark + lockups from `brand/Theia Logos`, glass card styling from the handoff, scrubbed screenshots (no real names, no "AI" footer, placeholder client).

### `/add-ons` (NOW)
- Title: `Marketing Add-Ons: SEO, Local, Leads and More - Axia Atlas` (58). H1: `Add-On Services for Search, Local, Leads and Strategy` (52).
- Sections: hero + answer · `addons.found` · `addons.pipeline` · `addons.decide` · `addons.custom` · `cta-band`. Service JSON-LD per add-on with Offers.
- Reuse: today's `/services` prose (DETAIL), ServiceIcons, ChannelArt figures for local and SEO.

### `/pricing` (NOW; portal tier THEIA)
- Title: `Website, Social and Client Portal Pricing - Axia Atlas` (54). H1: `Published Prices for Websites, Social and the Portal` (51).
- Sections: hero + answer (ranges computed from data) · `pricing.website` (build fees, six-month option, care plans) · `pricing.social` · `pricing.portal` THEIA · `pricing.addons` (compact table of every add-on's three tiers and minimum term) · `pricing.note` · `cta-band`. Service + Offer JSON-LD, prices only as printed.
- The work stashed as `pre-plan edits` (sync script, `lib/pricing.ts`, generated JSON) is the base for this.

### `/services` (NOW, kept as hub)
- Title: `Marketing Services and Add-Ons Overview - Axia Atlas` (52). H1: `Every Axia Atlas Service, From Website Builds to Advisory` (56).
- Short hub: three headline cards, four add-on groups, all linking out. Keeps the URL's ranking and the ItemList JSON-LD. Includes a small script that forwards old fragments (`/services#geo`) to their new page and anchor, since fragments never reach the server.

### Others
- `/about`: add the agency-plus-SaaS sentence; CTA to Book a Demo; drop "monthly strategy calls, a live dashboard" unless true per tier. H1 to 50 to 60 characters.
- `/contact`: rewrite Services and Pricing FAQ groups for the new model and real prices; Theia FAQ added at launch.
- `/demo`: growth areas become Website, Social, Portal (THEIA), plus "An add-on" and "Not sure yet".
- Chat widget: rewrite answers to the new model, remove invented tiers and provider names, add Theia answers at launch only.
- Footer: columns Services (3), Add-ons (4 groups), Company, Get Started; Theia link at launch.
- Global CSS: Arial body, Montserrat 600 uppercase tracked display; resize display tokens for uppercase.

---

## 5. Redirect map (301, in `next.config.mjs`)

| From | To | Note |
|---|---|---|
| `/services/website` | `/website-design` | replaces the generic `/services/:slug` rule for this slug |
| `/services/social` | `/social-media-management` | |
| `/services/geo`, `/services/seo` | `/add-ons#seo-aeo` | `seo` was an old anchor |
| `/services/local` | `/add-ons#local` | |
| `/services/leadgen` | `/add-ons#lead-generation` | |
| `/services/executive` | `/add-ons#executive-brand` | |
| `/services/intel` | `/add-ons#competitive-intelligence` | |
| `/services/strategy` | `/add-ons#strategic-advisory` | |
| `/services/dashboards` | `/add-ons#custom-dashboards` | |
| `/services/:slug` (anything else) | `/services` | keep the catch-all after the specific rules |
| `/services#<id>` fragments | client-side forward on `/services` | servers never see fragments; same mapping as above |
| `/pricing#<id>` fragments | none needed | anchors kept on the new pricing page |
| `/case-studies`, `/case-studies/*` | `/#results` | unchanged |
| `/website`, `/web-design` | `/website-design` | common guesses |
| `/social`, `/social-media` | `/social-media-management` | |
| `/addons` | `/add-ons` | |
| `/portal` (before THEIA) | none: 404 behind the flag, not a redirect | a redirect would be cached by browsers after launch |

No live URL is removed. `/services` and `/pricing` stay at the same addresses. New pages enter `sitemap.ts` when they go live (THEIA pages only when the flag is on).

---

## 6. Launch split

- **Now:** global type and color pass; `/website-design`, `/social-media-management`, `/add-ons`, new `/pricing` (no portal tier), `/services` hub, home without the Theia section and with the Portal card marked coming soon, nav, footer, contact FAQ, chat widget, demo growth areas, redirects, rule fixes from 2.2.
- **Theia launch (flag `NEXT_PUBLIC_THEIA_LAUNCH`):** `/portal`, `/theia`, home "Meet Theia", portal pricing, Theia FAQ and chat answers, nav and footer entries, sitemap entries.

---

## 7. Open questions

1. Care retainer and the six-month payment plan are not in `pricing.ts`. Should they be added to the platform first (so the site reads them like every other price), and is the six-month plan the same total or a financed total?
2. What is the portal's own price, and is it sold standalone, bundled with every headline service, or both? `pricing.ts` has no portal SKU apart from Portals & Dashboards (the custom build).
3. May the site name the model provider's product as one of the answer engines we get clients cited in (ticker, marquee, FAQ, schema keywords), or must it be removed everywhere?
4. "AI Overviews" is Google's product name and appears in three live blog posts. Rewrite those passages (for example "Google's answer summaries"), or allow the proper noun?
5. The platform's website add-on is named "AI chatbot add-on". Rename it in `pricing.ts` (for example "Website assistant") before it appears on the site, or leave it off the site?
6. Is Theia's mention of SEO data (rankings, leads) enough to call SEO "SaaS", or is SEO & AEO sold as SaaS with its own self-serve tier? This decides whether SEO & AEO stays an add-on or sits with the portal.
7. URL slugs: OK with `/website-design`, `/social-media-management`, `/portal`, `/theia`, `/add-ons`? Or keep services under `/services/<slug>` (which would mean replacing today's catch-all redirect)?
8. Should `/services` stay as a hub (recommended, keeps its ranking) or 301 to the home page?
9. Before Theia launch, should the home page show the Portal card as "Coming soon", or leave the portal out of the headline three until launch?
10. Does the care plan apply only to sites we built, or also to existing sites a client brings?
11. Location claim: "based in Miami, serving the US" (FAQ, schema) or "fully remote, North America and beyond" (chat widget)? One must go.
12. Remove `industry: Advertising` and `isicV4: 7310` from the Organization schema given the no-managed-ads rule? (Recommended: yes.)
13. The demo booking token and scheduling API live in the portal. Does the relaunch change that flow?
14. The `pre-plan edits` stash (pricing sync script and a draft pricing page) was set aside for this plan. Build on it once this plan is approved?
