import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const SITE_URL = 'https://axiaatlas.com'
const DESCRIPTION =
  'Axia Atlas is a digital marketing studio that makes brands, local businesses, and founders impossible to miss — in search, answer engines, and in the feeds where your buyers decide. Strategy first, then content that compounds.'

// Finished social/link-preview card (1200×630): the side-by-side Axia Atlas
// lockup on Deep Spruce, shipped as a static asset in public/.
const OG_IMAGE = {
  url: '/og-card.png',
  width: 1200,
  height: 630,
  alt: 'Axia Atlas — Digital Marketing',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Axia Atlas — Digital Marketing',
    template: 'Axia Atlas — %s — Digital Marketing',
  },
  description: DESCRIPTION,
  keywords: [
    'digital marketing',
    'SEO',
    'answer engine optimization',
    'AEO',
    'GEO',
    'Claude',
    'ChatGPT',
    'Perplexity',
    'Gemini',
    'social media management',
    'competitive intelligence',
    'local SEO',
    'website design and build',
    'lead generation',
    'executive personal brand',
    'strategic advisory',
    'Axia Atlas',
  ],
  applicationName: 'Axia Atlas',
  authors: [{ name: 'Axia Atlas' }],
  creator: 'Axia Atlas',
  publisher: 'Axia Atlas',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Axia Atlas',
    title: 'Axia Atlas — Digital Marketing',
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axia Atlas — Digital Marketing',
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  alternates: { canonical: SITE_URL },
  // ── ICONS ────────────────────────────────────────────────────────────────
  // TWO ASSETS, TWO JOBS, AND ONE OF THEM IS DELIBERATELY NOT DECLARED.
  //
  //   /icon-light.svg + /icon-dark.svg  transparent, mediated  ->  browser tabs
  //   /favicon.ico                      opaque Deep Spruce     ->  Google
  //
  // THE TAB. The two SVGs below are the only icons this document declares. They
  // carry no ground: Deep Spruce (#354940) ink on the light branch, Bone
  // Alabaster (#F1F0EA) on the dark one, same geometry as the .ico but framed
  // WIDER than it, chosen by the `media` attribute ON THE LINK. The query is
  // evaluated by this document and the browser fetches only the file that
  // matched. On the framing difference, which is deliberate, see THE FRAMING
  // TRADE below.
  //
  // WHY favicon.ico IS NOT IN THIS LIST. Chrome maps favicon.ico to the tab
  // strip whenever it is DECLARED -- regardless of link order, regardless of
  // what else is listed -- and never downloads the SVG at all. That was
  // measured, not assumed: with the .ico declared the tab was the opaque tile
  // and the SVG was never fetched; with only the mediated SVGs declared Chrome
  // fetched and mapped icon-dark.svg. So the .ico is omitted from the HTML. The
  // FILE is byte-unchanged and still served at /favicon.ico, which is where
  // Google looks for a site icon by convention, link or no link -- that is what
  // serves the search result for this domain.
  //
  // RE-DECLARING favicon.ico HERE SILENTLY REVERTS THE TAB TO THE OPAQUE TILE.
  // It will not error and it will not look like a regression in review. Do not
  // add it back.
  //
  // THE KNOWN RISK, STATED. The root-path convention is well established but
  // unproven for this domain. If the icon disappears from our search results
  // over the coming weeks, the revert is one line -- put the favicon.ico
  // descriptor back in `icon` -- and we go back to an opaque tab.
  //
  // TWO EARLIER EXPLANATIONS LIVED HERE AND BOTH WERE WRONG. Browsers do NOT
  // prefer image/svg+xml over ICO in Chrome's tab strip, so link order was
  // never the only lever. And the SVG-internal @media block was not what
  // failed -- crbug.com/1311553 was never reached, because Chrome was taking
  // the declared .ico and never downloading the SVG at all. Undeclaring the
  // .ico is the move that was missing, and it gets us both icons.
  //
  // WHAT STAYS OPAQUE. apple-touch-icon below, the manifest icons and the
  // og-card. A home-screen tile and a search row composite an icon against
  // their own background, so transparency there is not adaptive, it is
  // undefined. All of them are full-bleed squares written by
  // scripts/gen-icons.mjs from the portal's canonical mark geometry, so the
  // marketing site and the portal are one icon.
  //
  // THE FRAMING TRADE, ACCEPTED AND CLOSED -- AND IT APPLIES TO GOOGLE'S FILES
  // ONLY. gen-icons.mjs draws the opaque assets at the brand's own framing --
  // 400 units on a 1024 canvas, MARK_RATIO_OPAQUE 0.39 -- so the favicon is the
  // logo rather than a tighter crop of it. The cost is that at 16px the slot
  // between the mark's two halves is about half a device pixel, so the apex
  // antialiases and the halves fuse. It survives at 32px and up. Search results
  // draw this at 48px and up and are where nearly everyone will ever see it, so
  // brand fidelity in search beats tab crispness. Do not "fix" that seam by
  // cropping in.
  //
  // The two SVGs above are NOT on that framing and never were bound by it, and
  // they carry NO brand-framing obligation of their own. The trade bought brand
  // fidelity where Google reads, and Google does not read them -- it reads
  // /favicon.ico. They are tab-only, so they are framed at MARK_RATIO_TAB 0.80
  // for the one job they have, where the same slot measures 1.07 device pixels
  // and renders as a 47%-ink channel against 100% flanks across seven contiguous
  // rows instead of closing. Measured at 16px on the shipped icon-light.svg; on
  // a 2x strip the channel opens to 0% and becomes an actual gap.
  //
  // 0.80 REPLACED 0.62, WHICH WAS A GUESS RATHER THAN A CONSTRAINT. 0.62 did
  // hold the slot open, but it had never been measured against anything else. It
  // has been now, across 0.39 / 0.62 / 0.70 / 0.75 / 0.80 / 0.85 / 0.90 / 1.00,
  // and 0.80 is better on every count at 16px: 47% centre ink against 58%, seven
  // full-flank rows against four, and a base that reaches 0% instead of 30%.
  //
  // Two ratios, two consumers, on purpose. Do not unify them: pulling the tab
  // pair back to 0.39 returns the wedge, and widening the opaque set to 0.80
  // re-opens the trade above. Raising the TAB ratio alone is safe and is what
  // happened here; raising the OPAQUE one is the move that costs us search.
  icons: {
    icon: [
      { url: '/icon-light.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '192x192' }],
  },
}

// The eight services, in the same order as /services. Kept here so the
// Organization node advertises the full catalog on every page.
const SERVICE_CATALOG = [
  'Website Design & Build',
  'Social Media Management',
  'Competitive Intelligence',
  'Local Presence & SEO',
  'Answer Engine Optimization (AEO)',
  'Lead Generation',
  'Executive Personal Brand',
  'Strategic Advisory & Embedded Thinking',
]

// ── The canonical Organization node ─────────────────────────────────────────
// KEEP IN SYNC with axiaatlas-platform/src/lib/brand/organization-schema.ts,
// which carries the full rationale. The short version: Google's AI Overview for
// "Axia Atlas client portal" was answering with a healthcare company of a
// similar name and offering their patient login, because
//   • the portal domain published no Organization schema at all,
//   • this node had NO sameAs — nothing tied the two domains and the five
//     social profiles into one entity, and
//   • `logo` pointed at the square A-mark icon, which is what Google showed.
// Both domains now declare the SAME organization, same @id, same logo, same
// sameAs set. Consistency across the two domains IS the disambiguation signal;
// two differently-worded nodes would have made it worse.
const ORG_ID = `${SITE_URL}/#organization`
const APP_URL = 'https://app.axiaatlas.com'

// The full side-by-side wordmark lockup on Deep Spruce — NOT the square icon.
// Same file, same bytes, in both repos' public/.
const ORG_LOGO_URL = `${SITE_URL}/logo-organization.png`

// The single most important property here: every profile and domain that is
// this same entity.
const SAME_AS = [
  SITE_URL,
  APP_URL,
  'https://www.linkedin.com/company/axia-atlas',
  'https://www.instagram.com/axiaatlas/',
  'https://www.facebook.com/AxiaAtlas',
  'https://x.com/AxiaAtlas',
  'https://www.youtube.com/@AxiaAtlas',
]

const ORG_NODE = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: 'Axia Atlas',
  legalName: 'Axia Atlas Inc.',
  alternateName: ['Axia Atlas Inc.', 'AxiaAtlas'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: ORG_LOGO_URL,
    contentUrl: ORG_LOGO_URL,
    width: 1508,
    height: 797,
    caption: 'Axia Atlas',
  },
  image: ORG_LOGO_URL,
  description: DESCRIPTION,
  // Names the sector we are confused WITH, not the company. Enough to break the
  // match without putting another business's name in our markup.
  disambiguatingDescription:
    'Axia Atlas is a digital marketing and SEO studio. It is not a healthcare provider, medical group, or patient services organization, and is unaffiliated with any similarly named business in healthcare.',
  slogan: 'To be found is to be seen.',
  email: 'partner@axiaatlas.com',
  areaServed: 'Worldwide',
  // An engine that cannot tell what sector a company is in falls back to
  // whichever same-named entity it DOES have a sector for. Stating it explicitly
  // is what makes a healthcare entity a bad match rather than a plausible one.
  industry: 'Advertising, Marketing & Digital Services',
  naics: '541613', // Marketing Consulting Services
  isicV4: '7310',  // Advertising
  knowsAbout: [
    'Answer Engine Optimization',
    'Generative Engine Optimization',
    'Search Engine Optimization',
    'Local SEO',
    'Social Media Management',
    'Content Marketing',
    'Competitive Intelligence',
    'Lead Generation',
    'Website Design and Development',
    'Executive Personal Branding',
  ],
  sameAs: SAME_AS,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    '@id': `${SITE_URL}/services#catalog`,
    name: `Axia Atlas services — ${SERVICE_CATALOG.length} ways to get found`,
    numberOfItems: SERVICE_CATALOG.length,
    itemListElement: SERVICE_CATALOG.map((name, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: { '@type': 'Service', name, serviceType: name, provider: { '@id': ORG_ID } },
    })),
  },
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    ORG_NODE,
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Axia Atlas',
      description: DESCRIPTION,
      inLanguage: 'en-US',
      publisher: { '@id': ORG_ID },
    },
    // Declares the portal FROM the marketing domain as well. "Axia Atlas client
    // portal" is a query about a specific piece of software; both domains now
    // assert that it exists and whose it is.
    {
      '@type': 'WebApplication',
      '@id': `${APP_URL}/#webapp`,
      name: 'Axia Atlas Client Portal',
      alternateName: 'Axia Atlas Portal',
      url: APP_URL,
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Client Portal',
      operatingSystem: 'Any (web browser)',
      description:
        'The client portal for Axia Atlas, a digital marketing studio. Axia Atlas clients sign in to review deliverables, approve content, and see performance across search, answer engines and social.',
      image: ORG_LOGO_URL,
      provider: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      isAccessibleForFree: false,
      audience: { '@type': 'Audience', audienceType: 'Axia Atlas clients' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  )
}
