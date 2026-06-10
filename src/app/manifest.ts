import type { MetadataRoute } from 'next'

/* Web app manifest — completes the PNG icon set for Android / PWA installs.
   Deep Spruce theme, Bone mark. Tabs and Google search results use favicon.ico. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Axia Atlas',
    short_name: 'Axia Atlas',
    description: 'Marketing that makes you impossible to miss.',
    start_url: '/',
    display: 'standalone',
    background_color: '#354940',
    theme_color: '#354940',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
