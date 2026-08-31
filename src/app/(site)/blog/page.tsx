import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { Arrow } from '@/components/icons'
import { getPosts, postDate, formatDate, readingTime } from '@/lib/blog'
import { pageTitle, social } from '@/lib/seo'

// The articles live in the database, so the index is regenerated hourly rather
// than frozen at build time. Publishing a post in the platform puts it on the
// site within the hour with no deploy.
export const revalidate = 3600

const DESCRIPTION =
  'Practical writing on search, answer engines, local presence, and social from the Axia Atlas team. How buyers actually find businesses now, and what to do about it.'

// The hand-written openGraph block this replaces had no `images`, and Next
// replaces openGraph rather than merging it — so /blog was the one page on the
// site that shared with no link-preview card at all. social() always returns a
// complete block.
export const metadata: Metadata = {
  title: 'Search, AEO and Social Marketing Insights',
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  ...social({ title: pageTitle('Search, AEO and Social Marketing Insights'), description: DESCRIPTION, path: '/blog' }),
}

export default async function BlogIndexPage() {
  const posts = await getPosts()

  // The newest article leads the page; the rest fill the grid beneath it.
  const [lead, ...rest] = posts

  return (
    <div className="page blog-page">
      <div className="blog-hero">
        <div className="section-eyebrow">Insights</div>
        <h1 className="section-headline">
          Marketing Insights on Search,
          <br />
          Answer Engines and Social
        </h1>
        <p className="section-sub">
          Field notes on search, answer engines, local presence, and social. Written by the
          people doing the work, not a content farm.
        </p>
      </div>

      {posts.length === 0 ? (
        // No static fallback on purpose. If this shows, the table returned no
        // row with published = true.
        <div className="blog-empty">
          <h2 className="blog-empty-title">Nothing published yet.</h2>
          <p className="blog-empty-sub">
            New articles land here as they go live. In the meantime, the case studies show
            the work itself.
          </p>
          <Link href="/case-studies" className="btn-primary">
            See case studies <Arrow className="arr" />
          </Link>
        </div>
      ) : (
        <div className="blog-list">
          <Link href={`/blog/${lead.slug}`} className="blog-lead">
            <div className="blog-lead-body">
              <div className="blog-meta">
                {lead.category ? <span className="blog-cat">{lead.category}</span> : null}
                <time dateTime={postDate(lead)}>{formatDate(postDate(lead))}</time>
                {readingTime(lead.content) ? (
                  <span>{readingTime(lead.content)} min read</span>
                ) : null}
              </div>
              <h2 className="blog-lead-title">{lead.title}</h2>
              {lead.excerpt ? <p className="blog-lead-excerpt">{lead.excerpt}</p> : null}
              <span className="blog-more">
                Read the article <Arrow className="arr" />
              </span>
            </div>
          </Link>

          {rest.length ? (
            <div className="blog-grid">
              {rest.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="blog-card">
                  <div className="blog-meta">
                    {p.category ? <span className="blog-cat">{p.category}</span> : null}
                    <time dateTime={postDate(p)}>{formatDate(postDate(p))}</time>
                  </div>
                  <h2 className="blog-card-title">{p.title}</h2>
                  {p.excerpt ? <p className="blog-card-excerpt">{p.excerpt}</p> : null}
                  <span className="blog-more">
                    Read <Arrow className="arr" />
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      )}

      <CtaBand
        eyebrow="Book a Demo"
        headline="Want this working for your business?"
        sub="Book a demo. We audit how you show up across search, answer engines, and social beforehand, so we can show you exactly where buyers are missing you."
      />

      <Footer />
    </div>
  )
}
