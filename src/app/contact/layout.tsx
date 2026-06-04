import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Book a free audit',
  description:
    "Book a free 30-minute audit with Axia Atlas. We review what you have, find the gaps, and tell you exactly what we'd do — and what it would cost.",
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
