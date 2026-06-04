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

export const Campaign = (p: IconProps) => (
  <svg {...base} {...p}><path d="M4 14V9.5l11-5v15l-11-5z" /><path d="M4 14H6.5v4a1.5 1.5 0 0 0 3 0v-3.6M15 8.5a3 3 0 0 1 0 7" /></svg>
)

export const Lead = (p: IconProps) => (
  <svg {...base} {...p}><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="M4.5 7l7.5 6 7.5-6" /></svg>
)

export const Doc = (p: IconProps) => (
  <svg {...base} {...p}><path d="M6 3.5h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" /><path d="M14 3.5v4h4M8.5 12.5h7M8.5 15.5h7M8.5 9.5h3" /></svg>
)

export const ServiceIcons: Record<string, (p: IconProps) => JSX.Element> = {
  social: Social,
  geo: Answer,
  seo: Search,
  local: Pin,
  executive: Founder,
  website: Website,
  campaigns: Campaign,
  leadgen: Lead,
}
