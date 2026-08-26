import type { MetadataRoute } from 'next'

const SITE_URL = 'https://axiaatlas.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /go/* are redirects, not pages. They carry a noindex header too.
        disallow: ['/api/', '/go/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
