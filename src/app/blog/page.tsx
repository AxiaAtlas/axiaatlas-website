import type { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'
import { Compass, Doc } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Field Notes — How to get found',
  description:
    'Practical, no-fluff thinking on getting found — search, answer engines, local, social, and the marketing that actually moves a business.',
  alternates: { canonical: '/blog' },
}

async function getPosts() {
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('id,title,slug,excerpt,category,published_at,author')
      .eq('published', true)
      .order('published_at', { ascending: false })
    return data || []
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="page blog-page">
      <div className="blog-hero">
        <div className="section-eyebrow">The Field Notes</div>
        <h1 className="section-headline">How to get found.</h1>
        <p className="section-sub">Plain, practical thinking on search, answer engines, local, and social — no fluff.</p>
      </div>

      {posts.length === 0 ? (
        <section>
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent)', marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
              <Compass style={{ width: 40, height: 40 }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Coming soon</h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 36 }}>Our field notes launch soon — practical playbooks on getting found. Get first access when we publish.</p>
            <div className="newsletter-section" style={{ borderRadius: 'var(--r)', padding: '40px 32px', background: 'var(--inverse-bg)' }}>
              <div className="newsletter-inner">
                <div className="newsletter-title" style={{ fontSize: '1.125rem' }}>Get notified when we launch</div>
                <p className="newsletter-sub">No-fluff tactics on search, answer engines, local, and social.</p>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="blog-grid">
          {posts.map((post: any) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="blog-title-link">
              <div className="blog-card">
                <div className="blog-card-img"><Doc /></div>
                <div className="blog-card-body">
                  <div className="blog-category">{post.category || 'Growth Strategy'}</div>
                  <div className="blog-title">{post.title}</div>
                  {post.excerpt && <p className="blog-excerpt">{post.excerpt}</p>}
                  <div className="blog-meta">
                    {post.author && <span>{post.author} · </span>}
                    {post.published_at && new Date(post.published_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Footer />
    </div>
  )
}
