import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { SITE_URL, HOME_TITLE, BRAND_TAIL, OG_IMAGE } from '@/lib/seo'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const DESCRIPTION =
  'Axia Atlas is a digital marketing studio that makes brands, local businesses, and founders impossible to miss — in search, answer engines, and in the feeds where your buyers decide. Strategy first, then content that compounds.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Page name first, brand second. The template covers metadata.title only —
  // og:title and twitter:title are built per page with lib/seo's social().
  // See lib/seo.ts for why.
  title: {
    default: HOME_TITLE,
    template: `%s - ${BRAND_TAIL}`,
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
    title: HOME_TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  alternates: { canonical: SITE_URL },
  // ── ICONS ────────────────────────────────────────────────────────────────
  // ONE artwork, one generator, three containers. Every file below is written
  // by scripts/gen-icons.mjs from the portal's canonical mark geometry, is a
  // full-bleed square on a solid Deep Spruce ground, and carries no alpha
  // channel. Do not add a second icon source, and do not add a transparent one.
  //
  // History, so this is not undone twice. First there were FIVE competing
  // declarations led by `shortcut: '/icon-512.png'`, a rounded tile with
  // transparent corners at a size Google rejects. Removing that left a subtler
  // version of the same bug: an adaptive, transparent /icon.svg. Browsers
  // prefer image/svg+xml over any PNG no matter where it sits in the list, so
  // the tab drew the bare mark against the tab strip while Google drew THE SAME
  // FILE against its own result-row background. Identical bytes, two different
  // icons. The SVG is deleted, not merely reordered.
  //
  // /favicon.ico is first because it is the URL Google probes for a site icon
  // and the one that must never move. It carried a 404 on this domain until
  // now, which is why the search result was never stable in the first place.
  // It now carries four frames, 16 through 96, each drawn from the vector
  // rather than shrunk from a bigger raster, so a 16px tab gets a 16px drawing.
  //
  // DO NOT ADD AN SVG ICON HERE, and do not restore public/icon.svg. This is a
  // trade we made with our eyes open, not an oversight. An adaptive
  // prefers-color-scheme SVG is the nicer browser tab: it flips ink color with
  // the tab strip. It is also the one file Google can select and composite
  // against its own result-row background, which is how the same bytes end up
  // looking like two different icons. Browsers prefer image/svg+xml over any
  // PNG no matter where it sits in this list, so there is no ordering that
  // keeps the SVG for the tab and the PNGs for search. We sell search
  // visibility. The search icon wins over the tab icon.
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon', sizes: '16x16 32x32 48x48 96x96' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-48.png', type: 'image/png', sizes: '48x48' },
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
