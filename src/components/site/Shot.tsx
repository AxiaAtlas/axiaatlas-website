/* A real Theia screen from the design pack, as AVIF and WebP at the widths
   scripts/build-media.mjs wrote, with a PNG fallback. width and height are the
   source's, so the box is reserved before a byte arrives: no layout shift.
   Below the fold it loads lazily; pass priority for the one above it. */
import { SHOTS, type ShotId } from '@/lib/media.generated'

export default function Shot({ id, sizes = '(max-width: 960px) 100vw, 1240px', priority = false, className = '', alt }: {
  id: ShotId
  sizes?: string
  priority?: boolean
  className?: string
  /** Overrides the pack alt text (from build-media.mjs) when the context says more. */
  alt?: string
}) {
  const s = SHOTS[id]
  const set = (ext: string) => s.widths.map((w) => `/media/shots/${id}-${w}.${ext} ${w}w`).join(', ')
  return (
    <picture className={`shot ${className}`}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/media/shots/${id}.png`}
        alt={alt ?? s.alt}
        width={s.w}
        height={s.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
}
