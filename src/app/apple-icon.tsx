import { ImageResponse } from 'next/og'

/* Apple touch / app icon — Axia A-mark in Deep Spruce on transparent.
   Generated at build so the set always matches the brand mark. */
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

const MARK =
  `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="290 302 444 420">` +
  `<path d="M495.022 312L495.021 606.028L318.627 711.998L495.022 312Z" fill="#354940"/>` +
  `<path d="M528.466 312L528.467 606.028L704.861 711.998L528.466 312Z" fill="#354940"/>` +
  `</svg>`

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={120} height={120} src={`data:image/svg+xml;utf8,${encodeURIComponent(MARK)}`} alt="" />
      </div>
    ),
    { ...size },
  )
}
