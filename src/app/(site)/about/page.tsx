import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/icons'
import LedgerMock from '@/components/mocks/LedgerMock'
import { Cta, Head } from '@/components/site/Blocks'
import { pageTitle, social } from '@/lib/seo'
import { PATHS, TAGLINE } from '@/lib/site'

const NAME = 'About Axia Atlas, Investment Campaign Analytics'
const DESCRIPTION =
  'Axia Atlas builds investment campaign analytics software for companies raising capital and the agencies behind them, with Theia built in. Everything in sight.'

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
  alternates: { canonical: PATHS.about },
  ...social({ title: pageTitle(NAME), description: DESCRIPTION, path: PATHS.about }),
}

const BELIEFS = [
  { n: '01', title: 'Present, analyze, recommend', desc: 'We show what happened, explain why, and say what we recommend. We never buy media or run your ads, and the decision is always yours.' },
  { n: '02', title: 'Every dollar counts', desc: 'A raise is paid for by every channel, including the ones no platform reports. If it was spent on the raise, it belongs in the ledger.' },
  { n: '03', title: 'Private by default', desc: 'Names and figures are masked before any analysis, and our analysis provider does not train its models on your data.' },
]

export default function AboutPage() {
  return (
    <>
      <section data-aa-section="about.hero" className="page-hero">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <div className="kicker">About</div>
          <h1 className="h1">About Axia Atlas, the company behind the platform and Theia</h1>
          <p className="lede">Axia Atlas is a software company. We build investment campaign analytics for companies raising capital and the marketing agencies that support them, with Theia, our proprietary AI-powered analysis assistant, built in. We also design websites as one-off projects. Headquartered in Miami, working with clients across the US.</p>
        </div>
      </section>

      <section data-aa-section="about.why" className="sec-tight">
        <div className="wrap split">
          <div className="split-copy rv">
            <div className="kicker">Why we built it</div>
            <h2 className="h2">Nothing showed the spend and the investments together.</h2>
            <div className="body prose">
              <p>Companies raising capital spend heavily on campaigns: ads on every platform, affiliate partners, newspaper placements, press. Their raise platform shows the investments coming in. Nothing showed the two together.</p>
              <p>So most issuers learned what worked only after the budget was gone, and agencies rebuilt the same spreadsheet every week to answer one question: what did each channel actually return?</p>
              <p>Axia Atlas answers it while the raise is still running.</p>
            </div>
          </div>
          <div className="rv"><LedgerMock /></div>
        </div>
      </section>

      <section data-aa-section="about.taglines" className="sec">
        <div className="wrap statement rv">
          <div className="kicker">What we promise</div>
          <h2 className="display">{TAGLINE}.</h2>
          <p className="lede">That is the promise: every platform, every channel and every investment in one view, with nothing left in an invoice or a spreadsheet, measured, explained and recommended, never guessed.</p>
        </div>
      </section>

      <section data-aa-section="about.beliefs" className="sec">
        <div className="wrap">
          <Head kicker="What we hold to" title="Three things we will not trade." />
          <div className="trio">
            {BELIEFS.map((b, i) => (
              <div key={b.n} className="rv" style={{ ['--d' as string]: `${i * 90}ms` }}>
                <div className="label">{b.n}</div>
                <h3 className="h3">{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-aa-section="about.working" className="sec">
        <div className="wrap statement rv">
          <div className="kicker">People, not only software</div>
          <h2 className="h2">Fast answers from Theia. A person whenever you want one.</h2>
          <p className="lede">Our analysts are there for the questions that deserve a second pair of eyes. Every plan starts with a demo on a demo raise, then setup of your own channels.</p>
          <div className="actions">
            <Link href={PATHS.demo} className="btn btn-ink">Book a demo <Arrow className="arr" /></Link>
            <Link href="/blog" className="btn btn-quiet">Insights</Link>
            <Link href="/careers" className="btn btn-quiet">Careers</Link>
          </div>
        </div>
      </section>

      <Cta data-aa-section="about.cta" />
    </>
  )
}
