import type { MetadataRoute } from 'next'
import { getPosts, postDate } from '@/lib/blog'

const SITE_URL = 'https://axiaatlas.com'

// Regenerated on the same cadence as the blog itself, so a newly published
// article is in the sitemap within the hour instead of waiting for a deploy.
export const revalidate = 3600

const STATIC_ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, freq: 'weekly' },
  { path: '/services', priority: 0.9, freq: 'monthly' },
  { path: '/pricing', priority: 0.9, freq: 'monthly' },
  { path: '/case-studies', priority: 0.8, freq: 'monthly' },
  { path: '/blog', priority: 0.8, freq: 'weekly' },
  { path: '/about', priority: 0.6, freq: 'monthly' },
  { path: '/demo', priority: 0.9, freq: 'monthly' },
  { path: '/contact', priority: 0.6, freq: 'monthly' },
  { path: '/careers', priority: 0.5, freq: 'monthly' },
  { path: '/links', priority: 0.5, freq: 'monthly' },
  { path: '/privacy', priority: 0.3, freq: 'yearly' },
  { path: '/terms', priority: 0.3, freq: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }))

  // Each published article gets its own entry, dated by its editorial date so
  // the backdated posts present a truthful history rather than all claiming
  // today. If the query returns nothing, the sitemap simply carries the static
  // routes instead of failing the build.
  const postEntries: MetadataRoute.Sitemap = (await getPosts()).map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(postDate(p)),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...postEntries]
}
