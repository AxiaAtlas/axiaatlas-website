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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Axia Atlas — Marketing that makes you impossible to miss',
    template: '%s · Axia Atlas',
  },
  description: DESCRIPTION,
  keywords: [
    'digital marketing',
    'SEO',
    'answer-engine optimization',
    'AEO',
    'GEO',
    'social media marketing',
    'local SEO',
    'content marketing',
    'founder brand',
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
    title: 'Axia Atlas — Marketing that makes you impossible to miss',
    description: DESCRIPTION,
    // og:image is supplied by app/opengraph-image.tsx (Deep Spruce brand card).
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axia Atlas — Marketing that makes you impossible to miss',
    description: DESCRIPTION,
    // twitter:image is supplied by app/twitter-image.tsx.
  },
  alternates: { canonical: SITE_URL },
}

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
