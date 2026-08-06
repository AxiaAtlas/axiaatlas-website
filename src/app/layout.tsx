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
  // Two favicon contexts, handled deliberately:
  //  • Browser TAB → the adaptive, transparent vector mark (app/icon.svg). SVG
  //    is listed first and browsers prefer it, so tabs show the bare A-mark.
  //  • SEARCH RESULTS / link previews → the Deep-Spruce filled PNGs (also the
  //    manifest icons). Engines/scrapers that don't take SVG pick these, so the
  //    brand shows on its spruce tile. apple-touch-icon is filled too, since iOS
  //    masks transparent icons onto a black plate.
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/icon-512.png', type: 'image/png', sizes: '512x512' }],
    shortcut: [{ url: '/icon-512.png', type: 'image/png' }],
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

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Axia Atlas',
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      description: DESCRIPTION,
      email: 'partner@axiaatlas.com',
      areaServed: 'Worldwide',
      slogan: 'To be found is to be seen.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        '@id': `${SITE_URL}/services#catalog`,
        name: `Axia Atlas services — ${SERVICE_CATALOG.length} ways to get found`,
        numberOfItems: SERVICE_CATALOG.length,
        itemListElement: SERVICE_CATALOG.map((name, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: { '@type': 'Service', name, serviceType: name },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Axia Atlas',
      description: DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
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
