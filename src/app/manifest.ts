import type { MetadataRoute } from 'next'
import { APP_ICONS } from '@/lib/brand/app-icons'

/* Web app manifest. Icons are the same opaque squares linked from
   app/layout.tsx: the accent-color brand file in public/brand/, resized whole
   by scripts/gen-icons.mjs at versioned URLs (src/lib/brand/app-icons.ts), so
   an installed device cannot keep a cached old mark.

   They are full-bleed with no rounding and no alpha. 192 and 512 are purpose
   `any`, plus a separate 512 `maskable`: Android crops a maskable icon to a
   circle of radius 0.40 of the side, the mark reaches 0.270 from centre
   (asserted at generation), and the ground runs edge to edge. 512 is here for
   the PWA install prompt only; the icons Google reads are /favicon.ico and the
   PNGs declared in app/layout.tsx.

   There is deliberately no SVG entry HERE. The site does ship an adaptive
   src/app/icon.svg for the browser tab, but a PWA icon is composited against
   backgrounds the manifest does not control, so this list stays opaque. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Axia Atlas',
    short_name: 'Axia Atlas',
    description: 'Marketing that makes you impossible to miss.',
    start_url: '/',
    display: 'standalone',
    // The site's ground, not the brand green: these paint the PWA splash and
    // the Android browser chrome, and a spruce bar above a #070C09 page reads
    // as a rendering bug rather than as branding.
    background_color: '#070C09',
    theme_color: '#070C09',
    icons: [
      { src: APP_ICONS.icon48, sizes: '48x48', type: 'image/png', purpose: 'any' },
      { src: APP_ICONS.icon96, sizes: '96x96', type: 'image/png', purpose: 'any' },
      { src: APP_ICONS.icon192, sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: APP_ICONS.icon512, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: APP_ICONS.icon512Maskable, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
