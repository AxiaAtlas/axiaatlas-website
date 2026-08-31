import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'
import { Arrow } from '@/components/icons'
import { getPost, getPosts, postDate, formatDate, readingTime } from '@/lib/blog'
import { pageTitle, social } from '@/lib/seo'

export const revalidate = 3600
// A post published after the last build must still resolve, so unknown slugs
// are rendered on demand rather than 404'd by the static param list.
export const dynamicParams = true

const SITE_URL = 'https://axiaatlas.com'
const ORG_ID = `${SITE_URL}/#organization`

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) {
    return { title: 'Article not found', robots: { index: false, follow: true } }
  }

  const url = `${SITE_URL}/blog/${post.slug}`
  const description = post.excerpt || undefined
  const published = postDate(post)

  // `title` goes through the root template; og:title and twitter:title do not,
  // so they are built here. The article keeps its publishedTime/author/section.
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    ...social({
      title: pageTitle(post.title),
      description,
      path: `/blog/${post.slug}`,
      type: 'article',
      og: {
        url,
        publishedTime: published,
        authors: [post.author || 'Axia Atlas'],
        section: post.category || undefined,
      },
    }),
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const published = postDate(post)
  const mins = readingTime(post.content)
  const url = `${SITE_URL}/blog/${post.slug}`

  // Every other published article, newest first, for the "keep reading" rail.
  const others = (await getPosts()).filter((p) => p.slug !== post.slug).slice(0, 3)

  // Article node, tied to the same Organization @id the root layout declares so
  // the post is attributed to the entity rather than to a loose publisher name.
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: published,
    dateModified: published,
    ...(post.category ? { articleSection: post.category } : {}),
    inLanguage: 'en-US',
    author: { '@type': 'Organization', '@id': ORG_ID, name: post.author || 'Axia Atlas' },
    publisher: { '@id': ORG_ID },
    image: `${SITE_URL}/og-card.png`,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return (
    <div className="page blog-post-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="blog-post-hero">
        <div className="blog-post-hero-inner">
          <Link href="/blog" className="blog-back">
            Insights
          </Link>
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            {post.category ? <span className="blog-cat">{post.category}</span> : null}
            <span>{post.author || 'Axia Atlas'}</span>
            <time dateTime={published}>{formatDate(published)}</time>
            {mins ? <span>{mins} min read</span> : null}
          </div>
        </div>
      </div>

      <article className="blog-body">
        {post.content ? (
          <ReactMarkdown
            components={{
              // The page's own h1 is the title, so article headings start at h2
              // and step down from there. Keeps one h1 per document.
              h1: ({ children }) => <h2>{children}</h2>,
              h2: ({ children }) => <h2>{children}</h2>,
              h3: ({ children }) => <h3>{children}</h3>,
              a: ({ href, children }) => {
                const to = href || ''
                return to.startsWith('/') ? (
                  <Link href={to}>{children}</Link>
                ) : (
                  <a href={to} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                )
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        ) : (
          <p>{post.excerpt}</p>
        )}
      </article>

      {others.length ? (
        <div className="blog-more-wrap">
          <div className="blog-more-inner">
            <h2 className="blog-more-title">Keep reading</h2>
            <div className="blog-grid">
              {others.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="blog-card">
                  <div className="blog-meta">
                    {p.category ? <span className="blog-cat">{p.category}</span> : null}
                    <time dateTime={postDate(p)}>{formatDate(postDate(p))}</time>
                  </div>
                  <h3 className="blog-card-title">{p.title}</h3>
                  {p.excerpt ? <p className="blog-card-excerpt">{p.excerpt}</p> : null}
                  <span className="blog-more">
                    Read <Arrow className="arr" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <CtaBand
        eyebrow="Book a Demo"
        headline="Ready to get found?"
        sub="Book a demo. We audit how you show up beforehand, so we can show you exactly where buyers are missing you and what we would do about it."
      />

      <Footer />
    </div>
  )
}
