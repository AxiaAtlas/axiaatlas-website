import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import Reveal from '@/components/site/Reveal'

/* Chrome for the marketing site. Pages outside this route group (/links, the
   404, /go) render bare: no nav, footer or chat. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <ChatWidget />
      <Reveal />
    </>
  )
}
