import { supabase } from '@/lib/supabase/client'

// The blog reads from the platform's blog_posts table and NOTHING else. There
// is deliberately no static fallback array here, unlike /case-studies: an
// article that is not in the database must not appear on the site, and an
// article that IS in the database must not be shadowed by a hardcoded copy.
// If this page renders empty, the correct conclusion is that no row satisfies
// the published filter below, not that the content is missing from the repo.
//
// Columns come from supabase/migrations/001_website_tables.sql:
//   id, title, slug, excerpt, content, category, author, published,
//   published_at, created_at
// Note published defaults to FALSE, so a row is only ever public once it has
// been explicitly flipped.
export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  category: string | null
  author: string | null
  published: boolean
  published_at: string | null
  created_at: string
}

// published_at is the backdated editorial date and is what the site sorts and
// displays by; created_at is only the row's insert time. Coalesce so a
// published row with a null date still sorts sensibly instead of vanishing.
export function postDate(p: Pick<BlogPost, 'published_at' | 'created_at'>): string {
  return p.published_at || p.created_at
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

// Roughly how long the article takes to read, from the body itself. Only shown
// when there is a body to measure.
export function readingTime(content: string | null): number | null {
  if (!content) return null
  const words = content.trim().split(/\s+/).filter(Boolean).length
  if (!words) return null
  return Math.max(1, Math.round(words / 225))
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
    if (error) return []
    return (data as BlogPost[]) || []
  } catch {
    return []
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()
    if (error) return null
    return (data as BlogPost) || null
  } catch {
    return null
  }
}
