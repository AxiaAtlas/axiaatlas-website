import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import ChatWidget from '@/components/ChatWidget'

const SITE_URL = 'https://axiaatlas.com'
const DESCRIPTION =
  'Axia Atlas is a digital marketing studio that makes brands, local businesses, and founders impossible to miss — in search, in AI answers, and in the feeds where buyers decide. Strategy first, then content that compounds.'

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
    'AI search optimization',
    'GEO',
    'AEO',
    'social media marketing',
    'local SEO',
    'content marketing',
    'founder brand',
    'Axia Atlas',
  ],
  applicationName: 'Axia Atlas',
  authors: [{ name: 'Axia Atlas' }],
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
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Axia Atlas' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axia Atlas — Marketing that makes you impossible to miss',
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  alternates: { canonical: SITE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
