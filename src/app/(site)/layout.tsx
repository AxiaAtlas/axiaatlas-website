import Nav from '@/components/Nav'
import ChatWidget from '@/components/ChatWidget'
import SiteFX from '@/components/SiteFX'

/* Chrome for the main marketing site. Pages outside this route group
   (e.g. /links, the 404) render bare — no nav, footer, or chat. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <ChatWidget />
      <SiteFX />
    </>
  )
}
