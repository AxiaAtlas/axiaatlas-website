/** @type {import('next').NextConfig} */

// ============================================================================
// CANONICAL HOST AND RETIRED URLS
//
// ONE HOST IS CANONICAL: https://axiaatlas.com. No www, no trailing slash, no
// *.vercel.app. Every other host either 301s here or is told not to index.
//
// 301 AND NOT `permanent: true`. Next's `permanent` flag emits 308. Google
// treats 308 exactly as it treats 301, but the rest of the toolchain does not:
// several crawlers, link checkers and analytics pipelines still only special-
// case 301, and Search Console's own report reads "Page with redirect" either
// way. `statusCode: 301` says the plain thing, so that is what these use.
// ============================================================================

const APEX = 'https://axiaatlas.com'
const PORTAL = 'https://app.axiaatlas.com'

const nextConfig = {
  async redirects() {
    return [
      // ── /login lives on the portal ───────────────────────────────────────
      // There is no sign-in on this site; the client portal owns it. People
      // still type axiaatlas.com/login, so it goes straight there instead of
      // 404ing. It sits ABOVE the www rule and has no host condition, so on
      // either host it is one hop to the portal, not www -> apex -> portal.
      // (While the platform-level www redirect exists it answers first, so
      // www/login is two hops anyway; this keeps it one if that goes away.)
      { source: '/login', destination: `${PORTAL}/login`, statusCode: 301 },

      // ── www -> apex ──────────────────────────────────────────────────────
      // This is ALSO configured at the platform level: www.axiaatlas.com is
      // attached to this project as a redirect to the apex, which is where the
      // hop actually happens — at Vercel's edge, before a function is invoked.
      // That setting was 307 (temporary), which tells Google the www URL may
      // yet come back and keeps it in the index as its own address; it is 301
      // now.
      //
      // THE RULE BELOW IS NOT REDUNDANT WITH IT. The domain setting lives in a
      // dashboard and is invisible from the repo, so it can be changed or lost
      // with nothing here to notice. This rule is the version under review. It
      // does not double-hop: the edge redirect answers first and this one never
      // runs while it exists, and if it stops existing this one answers in the
      // same single hop.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.axiaatlas.com' }],
        destination: `${APEX}/:path*`,
        statusCode: 301,
      },

      // ── /case-studies is gone ────────────────────────────────────────────
      // The five results it carried now ARE the home Results section — same
      // slider, same wording — so there is no longer a page for this URL to
      // describe, only a section.
      { source: '/case-studies', destination: '/#results', statusCode: 301 },
      { source: '/case-studies/:path*', destination: '/#results', statusCode: 301 },

      // ── retired per-service pages ────────────────────────────────────────
      // The nine services have never had pages of their own on this site; they
      // are rows on /services, addressed by fragment (/services#geo). Anything
      // under /services/ is therefore an address that either never existed or
      // no longer does, and in both cases /services is the nearest live
      // equivalent — so the whole shape is covered by one rule rather than by
      // nine hand-typed ids that would then have to be kept in step with
      // lib/services.
      //
      // Carrying the slug into the fragment is what makes one rule enough: for
      // the nine real ids the visitor lands on their own row, and for anything
      // else an unknown fragment is simply ignored by the browser and they
      // land at the top of the page. No 404 either way.
      { source: '/services/:slug', destination: '/services#:slug', statusCode: 301 },
      { source: '/services/:slug/:rest*', destination: '/services#:slug', statusCode: 301 },
    ]
  },

  async headers() {
    return [
      // ── *.vercel.app is not a second site ────────────────────────────────
      // axiaatlas-website.vercel.app serves this whole site at 200. Its pages
      // do carry a canonical pointing at the apex, which is what has kept it
      // out of trouble so far, but a canonical is a hint and a crawlable host
      // is a fact. Preview deployments answer on this suffix too, so this is a
      // noindex rather than a redirect: redirecting would send every preview
      // to production and make previews untestable.
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(.*)\\.vercel\\.app' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
}

export default nextConfig
