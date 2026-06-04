import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { supabase } from '@/lib/supabase/client'
import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'

async function getPost(slug: string) {
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    return data
  } catch {
    return null
  }
}

async function getRelated(category: string, excludeSlug: string) {
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('id,title,slug,excerpt,category,published_at')
      .eq('published', true)
      .eq('category', category)
      .neq('slug', excludeSlug)
      .limit(3)
    return data || []
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Article not found' }
  return {
    title: post.title,
    description: post.excerpt || 'Practical thinking on getting found from Axia Atlas.',
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: { title: post.title, description: post.excerpt || undefined, type: 'article' },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const related = await getRelated(post.category, params.slug)

  return (
    <div className="page blog-page">
      <div className="post-page">
        <div className="post-header">
          <div className="post-category">{post.category || 'Growth Strategy'}</div>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            {post.author && <span>{post.author} · </span>}
            {post.published_at && new Date(post.published_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div className="post-body">
          <ReactMarkdown>{post.content || ''}</ReactMarkdown>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
            <div className="deliverables-title" style={{ marginBottom: 24 }}>Related Articles</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {related.map((r: any) => (
                <Link key={r.id} href={`/blog/${r.slug}`}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: 20 }}>
                    <div className="blog-category">{r.category}</div>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4 }}>{r.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="newsletter-section">
        <div className="newsletter-inner">
          <div className="newsletter-title">Get the field notes</div>
          <p className="newsletter-sub">Practical tactics on getting found — search, answer engines, local, and social. No fluff.</p>
          <NewsletterForm />
        </div>
      </div>

      <Footer />
    </div>
  )
}
