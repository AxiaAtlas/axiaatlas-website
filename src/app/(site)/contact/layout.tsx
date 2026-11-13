import type { Metadata } from 'next'
import { pageTitle, social } from '@/lib/seo'

const DESCRIPTION =
  'Questions about Axia Atlas or Theia? Send us a message and read answers on the platform, Theia, data privacy and getting started. We reply within 24 hours.'

export const metadata: Metadata = {
  title: 'Contact Axia Atlas About Campaign Analytics',
  description: DESCRIPTION,
  alternates: { canonical: '/contact' },
  ...social({ title: pageTitle('Contact Axia Atlas About Campaign Analytics'), description: DESCRIPTION, path: '/contact' }),
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
