import type { Metadata } from 'next'
import { pageTitle, social } from '@/lib/seo'

const DESCRIPTION =
  'Join Axia Atlas. We help businesses become impossible to miss across search, answer engines, local, and social. Apply in three quick steps and attach your resume.'

export const metadata: Metadata = {
  title: 'Careers and Open Roles in Digital Marketing',
  description: DESCRIPTION,
  alternates: { canonical: '/careers' },
  ...social({ title: pageTitle('Careers and Open Roles in Digital Marketing'), description: DESCRIPTION, path: '/careers' }),
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
