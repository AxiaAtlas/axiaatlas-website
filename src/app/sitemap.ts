import type { MetadataRoute } from 'next'

const SITE_URL = 'https://axiaatlas.com'

const STATIC_ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, freq: 'weekly' },
  { path: '/services', priority: 0.9, freq: 'monthly' },
  { path: '/pricing', priority: 0.9, freq: 'monthly' },
  { path: '/case-studies', priority: 0.8, freq: 'monthly' },
  { path: '/about', priority: 0.6, freq: 'monthly' },
  { path: '/demo', priority: 0.9, freq: 'monthly' },
  { path: '/contact', priority: 0.6, freq: 'monthly' },
  { path: '/careers', priority: 0.5, freq: 'monthly' },
  { path: '/links', priority: 0.5, freq: 'monthly' },
  { path: '/privacy', priority: 0.3, freq: 'yearly' },
  { path: '/terms', priority: 0.3, freq: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }))
}
