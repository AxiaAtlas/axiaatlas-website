import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Axia Atlas. We help businesses become impossible to miss across search, answer engines, local, and social. Apply in three quick steps and attach your resume.',
  alternates: { canonical: '/careers' },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
