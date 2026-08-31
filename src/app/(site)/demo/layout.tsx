import type { Metadata } from 'next'
import { pageTitle, social } from '@/lib/seo'

const DESCRIPTION =
  "Book your Axia Atlas demo. Tell us about your business and your goals — we'll audit how you show up beforehand and come to the call with your pain points pinpointed and solutions to propose."

export const metadata: Metadata = {
  title: 'Book a Demo and Free Visibility Audit',
  description: DESCRIPTION,
  alternates: { canonical: '/demo' },
  ...social({ title: pageTitle('Book a Demo and Free Visibility Audit'), description: DESCRIPTION, path: '/demo' }),
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
