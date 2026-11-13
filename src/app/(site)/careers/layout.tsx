import type { Metadata } from 'next'
import { pageTitle, social } from '@/lib/seo'

const DESCRIPTION =
  'Join Axia Atlas, investment campaign analytics software with Theia built in. Engineering, data, design and client roles. Apply in three quick steps.'

export const metadata: Metadata = {
  title: 'Careers in Investment Campaign Analytics',
  description: DESCRIPTION,
  alternates: { canonical: '/careers' },
  ...social({ title: pageTitle('Careers in Investment Campaign Analytics'), description: DESCRIPTION, path: '/careers' }),
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
