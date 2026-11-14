'use client'
/* Adds .in to every .rv block as it arrives (Theia's rise, once). The class
   that hides them before that only applies under html.js, which the root
   layout sets before paint, so without JavaScript nothing is ever hidden. */
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Reveal() {
  const path = usePathname()
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv:not(.in)'))
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [path])
  return null
}
