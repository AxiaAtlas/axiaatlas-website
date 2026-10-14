'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/* ============================================================================
   POINT AND PROMPT: the site's half of the portal's "Select" mode.

   The portal (app.axiaatlas.com, Services > Website > Site project) shows this
   site in a frame. With Select on, clicking an element here tells the portal
   which SECTION it is in, and the portal drafts a Claude Code prompt about it.

   A section is any element carrying data-aa-section="<id>". The id is all this
   file sends: which file a section lives in is read from the code by the
   platform's `npm run site:map`, never from the page. So a new band needs one
   attribute, and the map run after it.

   FOR A VISITOR THIS DOES NOTHING. Outside a frame it returns before adding a
   single listener. Inside one it answers only a parent whose origin is the
   portal, and only that window. What it sends is what the page already shows:
   a path, a section id, and the clicked element's own text.

   WHILE SELECT IS ON, A CLICK DOES NOT CLICK. It is caught on the window in
   the capture phase, before React or a link sees it, so choosing the "Book a
   Demo" button does not open /demo. With Select off the frame is the ordinary
   site and can be browsed to the page wanted.
   ============================================================================ */

const PORTAL = 'https://app.axiaatlas.com'
/** The portal, or the portal running on the operator's own machine. */
const isPortal = (origin: string) => origin === PORTAL || /^http:\/\/localhost(:\d+)?$/.test(origin)

const MARK = 'data-aa-section'
/** What a click means when it lands on a span or an icon inside one of these. */
const ELEMENT = 'a,button,h1,h2,h3,h4,h5,h6,p,li,dt,dd,label,summary,blockquote,figcaption,td,th,input,textarea,select,img'
const TEXT_LIMIT = 400

const squeeze = (s: string | null | undefined) => String(s || '').replace(/\s+/g, ' ').trim()

function describe(target: Element) {
  const el = target.closest(ELEMENT) || target
  const section = el.closest(`[${MARK}]`)
  const outer: string[] = []
  for (let up = section?.parentElement?.closest(`[${MARK}]`); up; up = up.parentElement?.closest(`[${MARK}]`)) {
    outer.unshift(up.getAttribute(MARK) || '')
  }
  const own = el instanceof HTMLImageElement
    ? el.alt
    : el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
      ? el.placeholder || el.getAttribute('aria-label') || el.name
      : (el as HTMLElement).innerText || el.textContent
  const text = squeeze(own)
  const link = el.closest('a')
  return {
    el,
    section,
    payload: {
      path: window.location.pathname,
      sectionId: section?.getAttribute(MARK) || null,
      outer: outer.filter(Boolean),
      tag: el.tagName.toLowerCase(),
      text: text.slice(0, TEXT_LIMIT),
      truncated: text.length > TEXT_LIMIT,
      href: link?.getAttribute('href') || null,
      heading: squeeze(section?.querySelector('h1,h2,h3,h4,h5,h6')?.textContent).slice(0, 200) || null,
    },
  }
}

/** The two outlines: the section, labelled with its id, and the element inside it. */
function makeOverlay() {
  // One ink for both: it holds on the near-black, spruce and bone grounds.
  // The element is what is being picked, so it is the heavier of the two.
  const box = (style: string) => {
    const d = document.createElement('div')
    d.setAttribute('aria-hidden', 'true')
    d.style.cssText = `position:fixed;z-index:2147483646;pointer-events:none;display:none;box-sizing:border-box;border-radius:2px;${style}`
    return d
  }
  const section = box('border:1px solid #6A8C7D;')
  const element = box('border:2px solid #6A8C7D;background:rgba(106,140,125,0.22);')
  const label = document.createElement('div')
  label.style.cssText = 'position:absolute;left:-1px;top:-1px;transform:translateY(-100%);background:#6A8C7D;color:#0B0F0E;font:600 11px/1.6 ui-monospace,Menlo,monospace;padding:0 6px;white-space:nowrap;'
  section.appendChild(label)
  document.body.append(section, element)
  const place = (d: HTMLDivElement, el: Element | null) => {
    if (!el) { d.style.display = 'none'; return }
    const r = el.getBoundingClientRect()
    d.style.display = 'block'
    d.style.left = `${r.left}px`
    d.style.top = `${r.top}px`
    d.style.width = `${r.width}px`
    d.style.height = `${r.height}px`
  }
  return {
    show(sectionEl: Element | null, el: Element | null) {
      place(section, sectionEl)
      place(element, el && el !== sectionEl ? el : null)
      label.textContent = sectionEl?.getAttribute(MARK) || ''
      // A band at the very top has no room above it for the label.
      label.style.transform = sectionEl && sectionEl.getBoundingClientRect().top < 20 ? 'none' : 'translateY(-100%)'
    },
    remove() { section.remove(); element.remove() },
  }
}

export default function SelectBridge() {
  const pathname = usePathname()
  const portal = useRef<string | null>(null)

  const announce = () => {
    if (!portal.current) return
    const sections = Array.from(document.querySelectorAll(`[${MARK}]`), (n) => n.getAttribute(MARK))
    window.parent.postMessage({ type: 'aa:ready', path: window.location.pathname, sections }, portal.current)
  }

  useEffect(() => {
    if (window.parent === window) return

    let selecting = false
    let overlay: ReturnType<typeof makeOverlay> | null = null
    // Where the pointer is, not what it was last over, redrawn every frame
    // while Select is on: a page that scrolls, or a band that is still easing
    // into place, puts a different box under a still pointer with no event.
    let pointer: { x: number; y: number } | null = null
    let frame = 0

    const redraw = () => {
      if (!overlay || !pointer) return
      const under = document.elementFromPoint(pointer.x, pointer.y)
      if (!under) { overlay.show(null, null); return }
      const d = describe(under)
      overlay.show(d.section, d.el)
    }
    const tick = () => { redraw(); frame = requestAnimationFrame(tick) }
    const onMove = (e: MouseEvent) => { pointer = { x: e.clientX, y: e.clientY } }
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element) || !portal.current) return
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      pointer = { x: e.clientX, y: e.clientY }
      window.parent.postMessage({ type: 'aa:selected', ...describe(e.target).payload }, portal.current)
    }
    const setSelecting = (on: boolean) => {
      if (on === selecting) return
      selecting = on
      if (on) {
        overlay = makeOverlay()
        document.documentElement.style.cursor = 'crosshair'
        window.addEventListener('mousemove', onMove, true)
        window.addEventListener('click', onClick, true)
        frame = requestAnimationFrame(tick)
      } else {
        overlay?.remove()
        overlay = null
        pointer = null
        document.documentElement.style.cursor = ''
        window.removeEventListener('mousemove', onMove, true)
        window.removeEventListener('click', onClick, true)
        cancelAnimationFrame(frame)
      }
    }

    const onMessage = (e: MessageEvent) => {
      if (e.source !== window.parent || !isPortal(e.origin)) return
      const type = e.data?.type
      if (type === 'aa:hello') { portal.current = e.origin; announce() }
      if (type === 'aa:select') { portal.current = e.origin; setSelecting(e.data.on === true) }
    }
    window.addEventListener('message', onMessage)

    // Say so first where the browser names the parent, in case its hello came
    // before this mounted. The portal also says hello on every frame load.
    const parentOrigin = window.location.ancestorOrigins?.[0]
      ?? (() => { try { return new URL(document.referrer).origin } catch { return '' } })()
    if (isPortal(parentOrigin)) { portal.current = parentOrigin; announce() }

    return () => {
      window.removeEventListener('message', onMessage)
      setSelecting(false)
    }
    // Mounted once in the root layout; the path is reported by the effect below.
  }, [])

  // A page change inside the frame is not a frame load, so the portal is told.
  useEffect(() => { announce() }, [pathname])

  return null
}
