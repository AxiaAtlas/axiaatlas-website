import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Demo',
  description:
    "Book your Axia Atlas demo. Tell us about your business and your goals — we'll audit how you show up beforehand and come to the call with your pain points pinpointed and solutions to propose.",
  alternates: { canonical: '/demo' },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
