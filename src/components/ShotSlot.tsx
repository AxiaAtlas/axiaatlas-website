import Image from 'next/image'
import { SHOTS, type ShotId } from '@/lib/shots'
import TheiaMark from './TheiaMark'

/* A 16:9 product frame. With a screenshot it shows the image; without one it
   shows a clean empty frame that names what goes there, so the page reads as
   finished layout and nobody mistakes it for a broken image. See lib/shots. */
export default function ShotSlot({
  id,
  caption = true,
  priority = false,
  className = '',
}: {
  id: ShotId
  /** false hides the caption under the frame (the frame still names itself). */
  caption?: boolean
  priority?: boolean
  className?: string
}) {
  const s = SHOTS[id]
  return (
    <figure className={`shot ${className}`}>
      <div className="shot-frame">
        {s.src ? (
          <Image src={s.src} alt={s.alt} fill sizes="(max-width: 900px) 100vw, 1180px" priority={priority} className="shot-img" />
        ) : (
          <div className="shot-empty" role="img" aria-label={`Screenshot coming soon: ${s.alt}`}>
            <TheiaMark className="shot-empty-mark" />
            <span className="shot-empty-label">Screenshot coming soon</span>
            <span className="shot-empty-what">{s.alt}</span>
          </div>
        )}
      </div>
      {caption && <figcaption className="shot-cap">{s.caption}</figcaption>}
    </figure>
  )
}
