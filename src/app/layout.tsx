import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  title: 'Axia Atlas — Growth, Engineered',
  description: 'Strategy-first digital marketing agency. Social Media, GEO/AEO, SEO, Local, Executive Brand, Website Design, Campaigns, Lead Generation.',
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Nav />
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
