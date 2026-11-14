import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/icons'
import { getPosts, postDate, formatDate, readingTime } from '@/lib/blog'
import { SITE_URL, pageTitle, social } from '@/lib/seo'
import { Cta, JsonLd } from '@/components/site/Blocks'

// The articles live in the database, so the index is regenerated hourly rather
// than frozen at build time. Publishing a post in the platform puts it on the
// site within the hour with no deploy.
export const revalidate = 3600

const DESCRIPTION =
  'Practical writing for companies raising capital and the agencies behind them: cost per investor, reading a campaign while it runs, and reporting to the board.'

// The hand-written openGraph block this replaces had no `images`, and Next
// replaces openGraph rather than merging it — so /blog was the one page on the
// site that shared with no link-preview card at all. social() always returns a
// complete block.
export const metadata: Metadata = {
  title: 'Insights on Raising Capital and Analytics',
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  ...social({ title: pageTitle('Insights on Raising Capital and Analytics'), description: DESCRIPTION, path: '/blog' }),
}

export default async function BlogIndexPage() {
  const posts = await getPosts()

  // The newest article leads the page; the rest fill the grid beneath it.
  const [lead, ...rest] = posts

  // The index as a collection, with every listed article as its own
  // BlogPosting node, attributed to the site-wide Organization.
  const ORG_ID = `${SITE_URL}/#organization`
  const listLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CollectionPage', '@id': `${SITE_URL}/blog#page`, url: `${SITE_URL}/blog`, name: 'Axia Atlas Insights', publisher: { '@id': ORG_ID } },
      ...posts.map((p) => ({
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}/blog/${p.slug}#article`,
        headline: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: postDate(p),
        ...(p.excerpt ? { description: p.excerpt } : {}),
        author: { '@type': 'Organization', '@id': ORG_ID, name: p.author || 'Axia Atlas' },
        publisher: { '@id': ORG_ID },
        isPartOf: { '@id': `${SITE_URL}/blog#page` },
      })),
    ],
  }

  return (
    <div className="page blog-page">
      {posts.length > 0 && <JsonLd data={listLd} />}
      <div data-aa-section="blog.hero" className="blog-hero">
        <div className="section-eyebrow">Insights</div>
        <h1 className="section-headline">Insights on raising capital and campaign analytics</h1>
        <p className="section-sub">
          Axia Atlas publishes short, practical articles for companies raising capital and the agencies behind them: what a channel really costs per investor, how to read a campaign while it runs, and what to put in front of the board. Each article answers one question we hear on demos.
        </p>
      </div>

      {posts.length === 0 ? (
        // No static fallback on purpose. If this shows, the table returned no
        // row with published = true.
        <div data-aa-section="blog.empty" className="blog-empty">
          <h2 className="blog-empty-title">Nothing published yet.</h2>
          <p className="blog-empty-sub">
            New articles land here as they go live. In the meantime, the case studies show
            the work itself.
          </p>
          <Link href="/platform" className="btn-primary">
            See the platform <Arrow className="arr" />
          </Link>
        </div>
      ) : (
        <div data-aa-section="blog.list" className="blog-list">
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

      <Cta data-aa-section="blog.cta" title="See every dollar behind your raise." lede="Book a demo of Axia Atlas. We walk you through Live Campaigns, Raise Ledger and Theia on a demo raise." />

    </div>
  )
}
