import type { MetadataRoute } from 'next'
import { getPosts, postDate } from '@/lib/blog'

const SITE_URL = 'https://axiaatlas.com'

// Regenerated on the same cadence as the blog itself, so a newly published
// article is in the sitemap within the hour instead of waiting for a deploy.
export const revalidate = 3600

// ============================================================================
// EVERY URL HERE MUST BE THE CANONICAL ONE AND MUST ANSWER 200.
//
// That is not a style rule, it is the contract a sitemap makes: a submitted URL
// is a claim that this is an address worth indexing. A redirected, retired or
// 404 entry in this file spends crawl budget contradicting the redirect it just
// followed, and Search Console reports it back as "Page with redirect" or "Not
// found (404)" against a URL WE nominated.
//
// So, concretely, what may not appear below:
//   • /case-studies — retired, 301s to /#results (see next.config.mjs)
//   • anything under /services/ — the nine services are fragments on /services
//     (/services#geo), not pages, and /services/<anything> 301s to the page
//   • a trailing-slash form of any path — /blog/ 308s to /blog
//   • the www or *.vercel.app host — one canonical host, and it is the apex
//   • /go/* — those are redirects, noindex, and disallowed in robots.txt
// ============================================================================
const STATIC_ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, freq: 'weekly' },
  { path: '/services', priority: 0.9, freq: 'monthly' },
  { path: '/pricing', priority: 0.9, freq: 'monthly' },
  { path: '/blog', priority: 0.8, freq: 'weekly' },
  { path: '/about', priority: 0.6, freq: 'monthly' },
  { path: '/demo', priority: 0.9, freq: 'monthly' },
  { path: '/contact', priority: 0.6, freq: 'monthly' },
  { path: '/careers', priority: 0.5, freq: 'monthly' },
  { path: '/links', priority: 0.5, freq: 'monthly' },
  { path: '/privacy', priority: 0.3, freq: 'yearly' },
  { path: '/terms', priority: 0.3, freq: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // NO lastModified ON THE STATIC ROUTES, AND THAT IS THE FIX RATHER THAN THE
  // OMISSION IT LOOKS LIKE. This file revalidates hourly, and these entries
  // carried `lastModified: new Date()` — so every hour the sitemap told Google
  // that all eleven static pages had just changed, when nothing had changed
  // since the last deploy. Google's guidance is explicit that it discounts a
  // lastmod it finds unreliable, and a site whose every page claims to have
  // changed an hour ago is exactly that. Once the value is discounted it is
  // discounted for the entries where it was TRUE as well — the articles below,
  // whose dates are real.
  //
  // lastmod is optional per the sitemap protocol. Omitting it where we have
  // nothing honest to say keeps it credible where we do.
  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.freq,
    priority: r.priority,
  }))

  // Each published article gets its own entry, dated by its editorial date so
  // the backdated posts present a truthful history rather than all claiming
  // today. If the query returns nothing, the sitemap simply carries the static
  // routes instead of failing the build.
  //
  // `published = true` is also what makes these safe to list: getPosts filters
  // on it and /blog/[slug] filters on it, so a URL is in this sitemap only while
  // the page behind it answers 200. Unpublish an article and it leaves both
  // within the hour rather than becoming a 404 we nominated.
  const postEntries: MetadataRoute.Sitemap = (await getPosts()).map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(postDate(p)),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...postEntries]
}
