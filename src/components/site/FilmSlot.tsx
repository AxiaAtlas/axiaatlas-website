'use client'
/* A named place for a film (lib/films.ts). With no film yet it draws its
   children, the product's mock interaction. With a film it plays it muted and
   inline while on screen, paused off it, and shows the poster under reduced
   motion. data-film-slot carries the slot's name so it can be found. */
import { useEffect, useRef, type ReactNode } from 'react'
import { FILMS, type Film, type FilmId } from '@/lib/films'

export default function FilmSlot({ id, children }: { id: FilmId; children: ReactNode }) {
  const film: Film = FILMS[id]
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.removeAttribute('autoplay'); v.pause(); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause() }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  if (!film.src) return <div className="film" data-film-slot={id}>{children}</div>
  return (
    <div className="film" data-film-slot={id}>
      <div className="film-video-box">
        <video ref={video} className="film-video" muted loop playsInline preload="none" poster={film.poster ?? undefined} aria-label={film.label}>
          {film.src.webm && <source src={film.src.webm} type="video/webm" />}
          <source src={film.src.mp4} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
