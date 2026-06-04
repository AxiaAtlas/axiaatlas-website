import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Free Audit',
  description:
    "Request your free Axia Atlas audit. Two quick steps — tell us about your business and your goals, and we'll show you exactly where buyers are missing you and what we'd do about it.",
  alternates: { canonical: '/demo' },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
