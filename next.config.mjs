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

      // ── a doubled address: /https:/axiaatlas.com/<page> ──────────────────
      // Somewhere a link was written as a relative path holding a full URL, so
      // the browser resolved it against this site and asked for
      // axiaatlas.com/https:/axiaatlas.com/<page> (the two slashes after the
      // scheme collapse to one on the way in). Those visits 404ed. The page
      // they meant is the tail of the path, so they go there in one hop. The
      // colon is escaped because an unescaped one starts a parameter name, and
      // the bare host has its own rule because an empty :path* writes an empty
      // Location header.
      { source: '/https\\:/axiaatlas.com', destination: '/', statusCode: 301 },
      { source: '/https\\:/axiaatlas.com/:path+', destination: '/:path+', statusCode: 301 },
      { source: '/https\\:/www.axiaatlas.com', destination: '/', statusCode: 301 },
      { source: '/https\\:/www.axiaatlas.com/:path+', destination: '/:path+', statusCode: 301 },
      { source: '/http\\:/axiaatlas.com', destination: '/', statusCode: 301 },
      { source: '/http\\:/axiaatlas.com/:path+', destination: '/:path+', statusCode: 301 },
      { source: '/http\\:/www.axiaatlas.com', destination: '/', statusCode: 301 },
      { source: '/http\\:/www.axiaatlas.com/:path+', destination: '/:path+', statusCode: 301 },

      // ── /case-studies is gone ────────────────────────────────────────────
      // The five results it carried now ARE the home Results section — same
      // slider, same wording — so there is no longer a page for this URL to
      // describe, only a section.
      { source: '/case-studies', destination: '/#results', statusCode: 301 },
      { source: '/case-studies/:path*', destination: '/#results', statusCode: 301 },

      // ── services under /services/<slug> (2026-11) ──────────────────────────
      // Two headline services have pages of their own and every other service
      // is an add-on, anchored on /services/add-ons. Each old address, and the
      // short forms people guess, 301s to its new home in one hop. Fragments
      // on /services itself (/services#geo) never reach the server; the hub
      // page forwards those in the browser.
      ...[
        ['/services/website', '/services/website-design'],
        ['/services/social', '/services/social-media-management'],
        ['/services/geo', '/services/add-ons#seo-aeo'],
        ['/services/seo', '/services/add-ons#seo-aeo'],
        ['/services/aeo', '/services/add-ons#seo-aeo'],
        ['/services/local', '/services/add-ons#local'],
        ['/services/leadgen', '/services/add-ons#lead-generation'],
        ['/services/executive', '/services/add-ons#executive-brand'],
        ['/services/intel', '/services/add-ons#competitive-intelligence'],
        ['/services/strategy', '/services/add-ons#strategic-advisory'],
        ['/services/dashboards', '/services/add-ons#custom-dashboards'],
        ['/website', '/services/website-design'],
        ['/web-design', '/services/website-design'],
        ['/website-design', '/services/website-design'],
        ['/social', '/services/social-media-management'],
        ['/social-media', '/services/social-media-management'],
        ['/social-media-management', '/services/social-media-management'],
        ['/add-ons', '/services/add-ons'],
        ['/addons', '/services/add-ons'],
        ['/services/addons', '/services/add-ons'],
      ].map(([source, destination]) => ({ source, destination, statusCode: 301 })),

      // Anything else under /services/ never existed: the hub is the nearest
      // live page. The live slugs are excluded, or this rule would answer
      // before the page does (redirects run ahead of the filesystem). `portal`
      // is excluded too: before the Theia launch it 404s rather than
      // redirecting, because a browser caches a 301 and would keep sending
      // people away after launch.
      {
        source: '/services/:slug((?!website-design$|social-media-management$|add-ons$|portal$).*)',
        destination: '/services',
        statusCode: 301,
      },
      { source: '/services/:slug/:rest+', destination: '/services', statusCode: 301 },
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
