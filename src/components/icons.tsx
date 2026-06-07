/* Monoline icon set — stroke uses currentColor. Brand-consistent, no emoji. */
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const Arrow = (p: IconProps) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

export const Check = (p: IconProps) => (
  <svg {...base} {...p}><path d="M4 12.5l5 5 11-12" /></svg>
)

export const Plus = (p: IconProps) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
)

export const Sun = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
  </svg>
)

export const Moon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>
)

export const Send = (p: IconProps) => (
  <svg {...base} {...p}><path d="M21 3L10.5 13.5M21 3l-6.5 18-4-8-8-4L21 3z" /></svg>
)

export const Compass = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></svg>
)

/* ── Service icons ──────────────────────────────────────────────────────── */
export const Social = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="6.5" cy="7" r="2.4" /><circle cx="17.5" cy="6" r="2.4" /><circle cx="13" cy="17.5" r="2.4" />
    <path d="M8.6 8.4l5.2 7.3M15.4 7.6l-3 7.6M8.7 6.4l6.6-.2" />
  </svg>
)

export const Answer = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H9l-4 4v-4H6.5" />
    <path d="M8.5 9.5h7M8.5 12.5h4" />
  </svg>
)

export const Search = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l4.5 4.5M8 10.5h5M10.5 8v5" /></svg>
)

export const Pin = (p: IconProps) => (
  <svg {...base} {...p}><path d="M12 21s7-6.3 7-11A7 7 0 0 0 5 10c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.4" /></svg>
)

export const Founder = (p: IconProps) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="3.6" /><path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" /></svg>
)

export const Website = (p: IconProps) => (
  <svg {...base} {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><path d="M3.5 9h17M7 6.7h.01M9.5 6.7h.01" /></svg>
)

export const Lead = (p: IconProps) => (
  <svg {...base} {...p}><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="M4.5 7l7.5 6 7.5-6" /></svg>
)

export const Doc = (p: IconProps) => (
  <svg {...base} {...p}><path d="M6 3.5h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" /><path d="M14 3.5v4h4M8.5 12.5h7M8.5 15.5h7M8.5 9.5h3" /></svg>
)

export const Mail = (p: IconProps) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></svg>
)

export const Home = (p: IconProps) => (
  <svg {...base} {...p}><path d="M4 11.5L12 4l8 7.5" /><path d="M5.5 10.5V20h13v-9.5M9.5 20v-5.5h5V20" /></svg>
)

/* ── Brand / social glyphs — filled, use currentColor ───────────────────── */
const brand = { viewBox: '0 0 24 24', fill: 'currentColor' as const }

export const LinkedIn = (p: IconProps) => (
  <svg {...brand} {...p}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
)

export const Instagram = (p: IconProps) => (
  <svg {...brand} {...p}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)

export const Facebook = (p: IconProps) => (
  <svg {...brand} {...p}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

export const XLogo = (p: IconProps) => (
  <svg {...brand} {...p}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.29 19.5h2.039L6.486 3.24H4.298l13.313 17.413z" />
  </svg>
)

export const YouTube = (p: IconProps) => (
  <svg {...brand} {...p}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

export const ServiceIcons: Record<string, (p: IconProps) => JSX.Element> = {
  social: Social,
  geo: Answer,
  seo: Search,
  local: Pin,
  executive: Founder,
  website: Website,
  leadgen: Lead,
}
