/* Theia's mark (the gem), from the Theia design's vector. currentColor only:
   the brand allows Spruce, Alabaster and Black, never a glow or an outline.
   Upright only. Inverted it is the Axia mark. */
export default function TheiaMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      className={className}
      viewBox="-48.3 -30 96.6 130"
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d="M-4.18 19.5 L-4.18 -30 L-30 -30 L-48.3 -7 Z" />
      <path d="M4.18 19.5 L4.18 -30 L30 -30 L48.3 -7 Z" />
      <path d="M-4.18 100 L-4.18 26.5 L-48.3 0 Z" />
      <path d="M4.18 100 L4.18 26.5 L48.3 0 Z" />
    </svg>
  )
}

/* The side-by-side lockup: gem plus THEIA wordmark plus TM, cropped from the
   1024 canvas to its ink (x 298 to 742, y 431 to 606). */
export function TheiaLockup({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="296 429 452 179" fill="currentColor" role="img" aria-label="Theia">
      <path d="M357.687 497.635 L357.687 431 L322.929 431 L298.295 461.962 Z" />
      <path d="M368.941 497.635 L368.941 431 L403.698 431 L428.333 461.962 Z" />
      <path d="M357.687 606 L357.687 507.058 L298.295 471.385 Z" />
      <path d="M368.941 606 L368.941 507.058 L428.333 471.385 Z" />
      <path d="M478.48 541L467.43 541L467.43 490.85L447.71 490.85L447.71 481.50L498.20 481.50L498.20 490.85L478.48 490.85L478.48 541ZM561.95 541L550.90 541L550.90 515.50L520.13 515.50L520.13 541L509.08 541L509.08 481.50L520.13 481.50L520.13 506.06L550.90 506.06L550.90 481.50L561.95 481.50L561.95 541ZM625.11 541L580.48 541L580.48 481.50L623.92 481.50L623.92 490.76L591.53 490.76L591.53 506.24L620.26 506.24L620.26 515.33L591.53 515.33L591.53 531.74L625.11 531.74L625.11 541ZM651.03 541L639.98 541L639.98 481.50L651.03 481.50L651.03 541ZM672.62 541L661.23 541L688.01 481.50L698.89 481.50L725.75 541L714.19 541L708.24 527.23L678.49 527.23L672.62 541ZM693.36 492.55L682.23 518.56L704.50 518.56L693.36 492.55Z" />
    </svg>
  )
}
