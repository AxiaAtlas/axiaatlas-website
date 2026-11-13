import type { Metadata } from 'next'
import { pageTitle, social } from '@/lib/seo'

const DESCRIPTION =
  'Book a demo of Axia Atlas investment campaign analytics. See Live Campaigns, Raise Ledger and Theia on a demo raise, then talk through your own channels.'

export const metadata: Metadata = {
  title: 'Book a Demo of Investment Campaign Analytics',
  description: DESCRIPTION,
  alternates: { canonical: '/demo' },
  ...social({ title: pageTitle('Book a Demo of Investment Campaign Analytics'), description: DESCRIPTION, path: '/demo' }),
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
