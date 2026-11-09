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

// A read failure and an empty table are the SAME rendered page — the "Nothing
// published yet" empty state — and that cost the blog several weeks of being
// silently dark. Migration 086 in the platform repo swept anon's grant off every
// public table whose name was not on its read allowlist; blog_posts was not on
// it, so every one of these queries came back 42501 while the site cheerfully
// reported that there was nothing to show.
//
// So the error is LOGGED before it is absorbed. These run in server components,
// so the message lands in the build/function output where it can be found. The
// empty return stays: a public marketing page should degrade to an empty
// section rather than 500, and the caller already renders that state well. What
// is no longer acceptable is the failure leaving no trace at all.
function logReadFailure(op: string, error: unknown): void {
  const e = error as { message?: string; code?: string } | null
  console.error(
    `blog: ${op} failed${e?.code ? ` (${e.code})` : ''}: ${e?.message || String(error)}`,
  )
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
    if (error) {
      logReadFailure('getPosts', error)
      return []
    }
    return (data as BlogPost[]) || []
  } catch (e) {
    logReadFailure('getPosts', e)
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
    if (error) {
      logReadFailure(`getPost(${slug})`, error)
      return null
    }
    return (data as BlogPost) || null
  } catch (e) {
    logReadFailure(`getPost(${slug})`, e)
    return null
  }
}

export type FaqPair = { q: string; a: string }

/** Markdown inline syntax off, so an answer reads as the page renders it. */
function plain(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__|\*|_|`)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * The questions and answers of an article's "Frequently Asked Questions"
 * section: each H3 under that H2 is a question, the text beneath it (up to the
 * next heading) its answer. Read from the same markdown the page renders, so
 * the FAQPage JSON-LD matches the visible questions word for word.
 */
export function faqFromMarkdown(content: string | null): FaqPair[] {
  if (!content) return []
  const lines = content.split('\n')
  const start = lines.findIndex((l) => /^##\s+(frequently asked questions|faqs?)\s*$/i.test(l.trim()))
  if (start < 0) return []
  const out: FaqPair[] = []
  let q: string | null = null
  let body: string[] = []
  const flush = () => {
    const a = plain(body.join(' '))
    if (q && a) out.push({ q: plain(q), a })
  }
  for (const line of lines.slice(start + 1)) {
    const t = line.trim()
    if (/^##\s/.test(t)) break
    if (/^###\s/.test(t)) { flush(); q = t.replace(/^###\s+/, ''); body = []; continue }
    if (q) body.push(t)
  }
  flush()
  return out
}
