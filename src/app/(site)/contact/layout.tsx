import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Questions about Axia Atlas? Send us a message and read answers to the most common questions on services, process, pricing, and getting started. We reply within 24 hours.',
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
