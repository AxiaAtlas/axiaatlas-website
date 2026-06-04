import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import ChatWidget from '@/components/ChatWidget'
import SiteFX from '@/components/SiteFX'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const SITE_URL = 'https://axiaatlas.com'
const DESCRIPTION =
  'Axia Atlas is a digital marketing studio that makes brands, local businesses, and founders impossible to miss — in search, in answer engines, and in the feeds where buyers decide. Strategy first, then content that compounds.'

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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Axia Atlas',
    title: 'Axia Atlas — Marketing that makes you impossible to miss',
    description: DESCRIPTION,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Axia Atlas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axia Atlas — Marketing that makes you impossible to miss',
    description: DESCRIPTION,
    images: ['/og-image.png'],
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
      email: 'strategy@axiaatlas.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Toronto',
        addressRegion: 'ON',
        addressCountry: 'CA',
      },
      areaServed: 'Worldwide',
      slogan: 'To be found is to be chosen.',
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

// No-FOUC theme bootstrap: runs before paint, honours saved choice then system.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('aa-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        <Nav />
        {children}
        <ChatWidget />
        <SiteFX />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
