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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const related = await getRelated(post.category, params.slug)

  return (
    <div className="page" style={{ background: 'var(--alabaster)' }}>
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
          <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(var(--spruce-rgb),0.1)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(var(--spruce-darker-rgb),0.4)', marginBottom: 24 }}>Related Articles</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {related.map((r: any) => (
                <Link key={r.id} href={`/blog/${r.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', border: '1px solid rgba(var(--spruce-rgb),0.1)', borderRadius: 10, padding: 20 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warn)', marginBottom: 8 }}>{r.category}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--spruce-darker)', lineHeight: 1.4 }}>{r.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="newsletter-section">
        <div className="newsletter-title">Get weekly growth intelligence</div>
        <p className="newsletter-sub">Strategy, signals, and the tactics that compound. No fluff.</p>
        <NewsletterForm />
      </div>

      <Footer />
    </div>
  )
}
