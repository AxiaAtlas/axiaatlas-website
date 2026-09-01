import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Arrow } from '@/components/icons'
import { getPosts, postDate, formatDate } from '@/lib/blog'
import { pageTitle, social } from '@/lib/seo'

// The articles teased below come from the same hourly-revalidated source as
// /blog, so a newly published post surfaces here without a deploy. The teasers
// are links out to /blog/<slug>; the articles themselves are never served from
// an /about path.
export const revalidate = 3600

const DESCRIPTION =
  'Axia Atlas is a digital marketing studio built on one idea: to be found is to be seen. We help brands, local businesses, and founders show up where their buyers are looking.'

export const metadata: Metadata = {
  title: 'About Our Search and Social Marketing Studio',
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  ...social({ title: pageTitle('About Our Search and Social Marketing Studio'), description: DESCRIPTION, path: '/about' }),
}

export default async function AboutPage() {
  // Three most recent articles, teased here purely as navigation. If the query
  // comes back empty the section is dropped rather than rendered hollow.
  const latest = (await getPosts()).slice(0, 3)

  return (
    <div className="page">
      <div className="about-hero">
        <div className="about-hero-text">
          <div className="section-eyebrow">About</div>
          <h1 className="section-headline">About the Search and Social Marketing Studio We Built</h1>
        </div>
      </div>

      <div className="about-section">
        <div className="about-inner">
          <h2 className="about-headline">Why we exist</h2>
          <div className="about-body">
            <p>Axia Atlas was founded after watching too many good businesses get mediocre results from agencies that were busy, not effective. The reason was rarely effort — it was the model. Most agencies bill for hours and deliverables, so that&apos;s what they optimize for.</p>
            <p>The usual relationship goes like this: you pay a retainer, you get a content calendar, you get a monthly report full of charts. Plenty of activity. No promise that any of it brings you a single new customer. Six months later you have a library of posts and not much else.</p>
            <p>That works for the agency. It doesn&apos;t work for you.</p>
            <p>We do it differently. Every engagement starts with strategy. We only recommend channels we believe will pay off, and every month we ask one question: is this making the business easier to find and quicker to choose than it was last month?</p>
            <p>We take on fewer clients than most agencies — on purpose — so we can go deep instead of wide.</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-inner about-seen">
          <h2 className="about-headline">&quot;To be found is to be seen.&quot;</h2>
          <div className="about-body">
            <p>That&apos;s the idea behind everything we build. When your business shows up where buyers are already looking — in search, in answer engines, in your local market, in the feeds people scroll — you don&apos;t have to convince anyone you exist. You just have to be the obvious choice.</p>
            <p>Visibility like that isn&apos;t flashy and it isn&apos;t instant. But once it&apos;s built, it&apos;s yours — and it keeps working.</p>
          </div>
          <div className="beliefs-grid">
            {[
              { n: '01', title: 'Results over activity', desc: 'We measure success in customers, rankings, and reputation — not posts published or hours billed.' },
              { n: '02', title: 'Strategy before spend', desc: "We don't start until we understand your business, your buyers, and where the real opportunity is." },
              { n: '03', title: 'Plain talk, always', desc: "No jargon, no smoke. You'll always know what we're doing, why, and whether it's working." },
            ].map((b) => (
              <div key={b.n} className="belief-card spotlight">
                <div className="belief-num">{b.n}</div>
                <h3 className="belief-title">{b.title}</h3>
                <p className="belief-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {latest.length ? (
        <div className="about-section">
          <div className="about-insights-inner">
            <h2 className="about-headline">What we&apos;re writing about</h2>
            <p className="about-insights-sub">
              We publish what we learn — how buyers actually search, how answer engines pick
              who to cite, and what moves local visibility. Same thinking we bring to the work.
            </p>
            <div className="blog-grid">
              {latest.map((p) => (
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
            <div className="about-insights-all">
              <Link href="/blog" className="btn-outline">
                All insights <Arrow className="arr" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div className="about-section">
        <div className="about-inner">
          <h2 className="about-headline">How working with us feels</h2>
          <div className="about-body">
            <p>Every engagement starts with an audit. We map where you show up today, where you don&apos;t, and the fastest wins available — then build a clear 90-day plan around them.</p>
            <p>Then we get to work. No 30-day onboarding, no committee approvals. Real output lands in week one.</p>
            <p>We operate as an extension of your team, not a faceless vendor. You get direct access to the people doing the work, monthly strategy calls, a live dashboard, and reporting written in language you can actually read.</p>
            <p>Whether you&apos;re a growing brand, a local business, or the founder who is the brand — the goal is the same: make you impossible to miss.</p>
          </div>
          <div style={{ marginTop: 36 }}>
            <Link href="/demo" className="btn-primary">Work With Us <Arrow className="arr" /></Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
