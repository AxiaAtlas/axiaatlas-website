/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // /case-studies is gone. The five results it carried now ARE the home
      // Results section — same slider, same wording — so there is no longer a
      // page for this URL to describe, only a section. 308 rather than 307
      // because the move is permanent and the URL has been indexed.
      { source: '/case-studies', destination: '/#results', permanent: true },
      { source: '/case-studies/:path*', destination: '/#results', permanent: true },
    ]
  },
}

export default nextConfig
