import Script from 'next/script'

/* Platform on-site behavior tracker (page views, scroll depth, returning vs new,
   forms, chat lifecycle). Renders nothing unless NEXT_PUBLIC_AA_SITE_KEY is set,
   so local/dev and preview builds stay clean. */
export default function SiteBehavior() {
  const site = process.env.NEXT_PUBLIC_AA_SITE_KEY
  if (!site) return null

  return (
    <Script
      src="https://app.axiaatlas.com/api/sa/script"
      data-site={site}
      strategy="afterInteractive"
    />
  )
}
