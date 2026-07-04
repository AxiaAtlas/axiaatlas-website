import type { MetadataRoute } from 'next'

/* Web app manifest — the Deep-Spruce filled PNG icon set (Bone mark) for
   Android / PWA installs. Search engines also read these for the result favicon,
   so they show the brand on its spruce tile. The browser TAB icon is the
   adaptive transparent vector mark (public/icon.svg), declared in app/layout. */
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
