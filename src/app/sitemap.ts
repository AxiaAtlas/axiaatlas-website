import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase/client'

const SITE_URL = 'https://axiaatlas.com'

const STATIC_ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, freq: 'weekly' },
  { path: '/services', priority: 0.9, freq: 'monthly' },
  { path: '/pricing', priority: 0.9, freq: 'monthly' },
  { path: '/case-studies', priority: 0.8, freq: 'monthly' },
  { path: '/about', priority: 0.6, freq: 'monthly' },
  { path: '/blog', priority: 0.7, freq: 'weekly' },
  { path: '/demo', priority: 0.9, freq: 'monthly' },
  { path: '/contact', priority: 0.6, freq: 'monthly' },
]

async function getPostSlugs(): Promise<{ slug: string; updated?: string }[]> {
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('slug,published_at')
      .eq('published', true)
    return (data || []).map((p: any) => ({ slug: p.slug, updated: p.published_at }))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }))

  const posts = await getPostSlugs()
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updated ? new Date(p.updated) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticEntries, ...postEntries]
}
