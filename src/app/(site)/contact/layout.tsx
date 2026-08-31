import type { Metadata } from 'next'
import { pageTitle, social } from '@/lib/seo'

const DESCRIPTION =
  'Questions about Axia Atlas? Send us a message and read answers to the most common questions on services, process, pricing, and getting started. We reply within 24 hours.'

export const metadata: Metadata = {
  title: 'Contact Our Digital Marketing Studio',
  description: DESCRIPTION,
  alternates: { canonical: '/contact' },
  ...social({ title: pageTitle('Contact Our Digital Marketing Studio'), description: DESCRIPTION, path: '/contact' }),
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
