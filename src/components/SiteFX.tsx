'use client'
import { useEffect } from 'react'

/* Progressive-enhancement layer — no effect if JS is off:
   1. Scroll-reveal: adds `.reveal` to a curated selector set, then `.in` on enter.
   2. Nav: adds `.scrolled` once the page leaves the top.
   3. Scroll-idle flag: `.is-scrolling` on <body> while a scroll is in flight.
   4. Spotlight: tracks the pointer over cards to drive the radial highlight.
   5. Marquee gating: pauses the infinite loops while they are off screen. */
const REVEAL_SELECTORS = [
  '.hero-eyebrow', '.hero-headline', '.hero-sub', '.hero-actions', '.hero-trust',
  '.hero-artifact',
  '.section-eyebrow', '.section-headline', '.section-sub',
  '.service-card', '.bento-card', '.results-slider', '.problem-card',
  '.process-step', '.belief-card', '.cs-card', '.pricing-card',
  '.service-detail-inner', '.about-body', '.contact-form', '.contact-info-item',
  '.faq-item', '.demo-card', '.pricing-note',
  '.cta-band-beacon', '.cta-band-btn', '.cta-band-note',
].join(',')

const SPOTLIGHT_SELECTORS = '.bento-card, .service-card, .spotlight'

// The three loops that otherwise animate for as long as the tab is open.
const MARQUEE_SELECTORS = '.marquee-track, .bm-track'

// Matches the .reveal transition in globals.css, with headroom for the stagger.
const REVEAL_MS = 1000

export default function SiteFX() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── 1. Scroll reveal ────────────────────────────────────────────────────
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

      // will-change is granted per element at the moment it is about to fade,
      // not up front in the stylesheet. `.reveal` lands on ~40 elements as soon
      // as this effect runs, so a will-change in the base rule promoted all of
      // them at load — including everything still far below the fold — which is
      // the exact case where will-change stops helping and just costs memory
      // and layerization time. Granted here, held for one 0.7s fade, handed
      // back on transitionend.
      const release = (el: HTMLElement) => {
        let done = false
        const off = () => {
          if (done) return
          done = true
          el.style.willChange = 'auto'
          el.removeEventListener('transitionend', off)
        }
        el.addEventListener('transitionend', off)
        window.setTimeout(off, REVEAL_MS)
      }
      const show = (el: HTMLElement) => {
        el.style.willChange = 'opacity, transform'
        el.classList.add('in')
        release(el)
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              show(e.target as HTMLElement)
              io.unobserve(e.target)
            }
          })
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      )
      els.forEach((el) => io.observe(el))

      // Safety net for anything already in view on load. Every measurement is
      // taken before any class is added: interleaving them made each
      // getBoundingClientRect flush the style and layout invalidated by the
      // previous element's class change, a forced synchronous layout per item.
      requestAnimationFrame(() => {
        const limit = window.innerHeight * 0.92
        const visible = els.filter((el) => el.getBoundingClientRect().top < limit)
        visible.forEach(show)
      })
    }

    // ── 2 & 3. Nav state and the scroll-idle flag ───────────────────────────
    const nav = document.querySelector('.nav')
    const body = document.body
    let scrollRaf = 0
    let idleTimer = 0
    // Last value written to the DOM, so a scroll that does not cross the
    // threshold touches nothing at all.
    let isScrolled: boolean | null = null

    const applyNav = () => {
      scrollRaf = 0
      // Read at the top of the frame, while layout is still clean from the
      // last paint, and write in the same tick — never read in the listener.
      const next = window.scrollY > 12
      if (next === isScrolled) return
      isScrolled = next
      nav?.classList.toggle('scrolled', next)
    }

    // Read by onMove below. The class on <body> is kept for anything that wants
    // to key off it, but nothing styles on it any more: `pointer-events` is an
    // inherited property, so the rule that used to live in globals.css
    // recalculated the computed style of the entire document at the start of
    // every scroll gesture and again when it ended.
    let scrolling = false

    const clearIdle = () => {
      idleTimer = 0
      scrolling = false
      body.classList.remove('is-scrolling')
    }

    const onScroll = () => {
      // Coalesce every scroll event in a frame into one DOM write.
      if (!scrollRaf) scrollRaf = requestAnimationFrame(applyNav)
      if (reduce) return
      if (idleTimer) clearTimeout(idleTimer)
      else {
        scrolling = true
        body.classList.add('is-scrolling')
      }
      idleTimer = window.setTimeout(clearIdle, 120)
    }

    applyNav()
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── 4. Spotlight pointer tracking ───────────────────────────────────────
    let moveRaf = 0
    const onMove = (e: PointerEvent) => {
      // Skip spotlight work mid-gesture. This is what the old
      // `body.is-scrolling { pointer-events: none }` rule was buying, at the
      // price of a full-document style recalculation twice per scroll.
      if (scrolling) return
      const card = (e.target as HTMLElement)?.closest<HTMLElement>(SPOTLIGHT_SELECTORS)
      if (!card) return
      if (moveRaf) return
      moveRaf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
        moveRaf = 0
      })
    }
    if (!reduce) window.addEventListener('pointermove', onMove, { passive: true })

    // ── 5. Marquee gating ───────────────────────────────────────────────────
    // These loops run at 60fps forever, and two of the three sit inside a card
    // most visitors never scroll to. While one is running it is a promoted
    // layer in motion underneath a fixed nav that carries a backdrop-filter, so
    // it re-invalidates that blur on every frame whether or not the page is
    // scrolling. Paused off screen, the compositor gets its headroom back for
    // the scroll itself. The observer has no rootMargin slack on purpose: a row
    // that is not on screen has nothing to show for the frames it costs.
    const tracks = Array.from(document.querySelectorAll<HTMLElement>(MARQUEE_SELECTORS))
    let marqueeIo: IntersectionObserver | null = null
    if (reduce) {
      tracks.forEach((t) => t.classList.add('paused'))
    } else if (tracks.length) {
      marqueeIo = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          const t = e.target as HTMLElement
          t.classList.toggle('running', e.isIntersecting)
          t.classList.toggle('paused', !e.isIntersecting)
        })
      })
      // Start paused, so nothing animates before the observer's first callback
      // tells us it is actually visible.
      tracks.forEach((t) => {
        t.classList.add('paused')
        marqueeIo!.observe(t)
      })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
      if (scrollRaf) cancelAnimationFrame(scrollRaf)
      if (moveRaf) cancelAnimationFrame(moveRaf)
      if (idleTimer) clearTimeout(idleTimer)
      marqueeIo?.disconnect()
      body.classList.remove('is-scrolling')
    }
  }, [])

  return null
}
