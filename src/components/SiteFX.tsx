'use client'
import { useEffect } from 'react'

/* Progressive-enhancement layer — no effect if JS is off:
   1. Scroll-reveal: adds `.reveal` to a curated selector set, then `.in` on enter.
   2. Nav: adds `.scrolled` once the page leaves the top.
   3. Spotlight: tracks the pointer over cards to drive the radial highlight. */
const REVEAL_SELECTORS = [
  '.hero-eyebrow', '.hero-headline', '.hero-sub', '.hero-actions', '.hero-trust',
  '.section-eyebrow', '.section-headline', '.section-sub',
  '.service-card', '.bento-card', '.case-card', '.problem-card',
  '.process-step', '.belief-card', '.cs-card', '.pricing-card',
  '.service-detail-inner', '.stat-item', '.about-body', '.contact-form', '.contact-info-item',
].join(',')

const SPOTLIGHT_SELECTORS = '.bento-card, .service-card, .spotlight'

export default function SiteFX() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 1. Scroll reveal
    const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS))
    if (reduce) {
      els.forEach((el) => el.classList.add('reveal', 'in'))
    } else {
      els.forEach((el, i) => {
        el.classList.add('reveal')
        // light stagger for siblings in the same row/grid
        const within = i % 4
        el.style.transitionDelay = `${within * 70}ms`
      })
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      )
      els.forEach((el) => io.observe(el))
      // safety: anything already in view on load
      requestAnimationFrame(() => {
        els.forEach((el) => {
          const r = el.getBoundingClientRect()
          if (r.top < window.innerHeight * 0.92) el.classList.add('in')
        })
      })
    }

    // 2. Nav scrolled state
    const nav = document.querySelector('.nav')
    const onScroll = () => {
      if (!nav) return
      nav.classList.toggle('scrolled', window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // 3. Spotlight pointer tracking
    let raf = 0
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement)?.closest<HTMLElement>(SPOTLIGHT_SELECTORS)
      if (!card) return
      if (raf) return
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
        raf = 0
      })
    }
    if (!reduce) window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
