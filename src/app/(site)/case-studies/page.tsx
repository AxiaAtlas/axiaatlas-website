import type { Metadata } from 'next'
import { getCaseStudies } from '@/lib/case-studies'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Real outcomes from Axia Atlas — local businesses, consumer brands, and founders made impossible to miss in search, answer engines, and social.',
  alternates: { canonical: '/case-studies' },
}

/* Read at render rather than baked at build: the library is whatever
   case_studies publishes, so the page has to be allowed to re-render. */
export const revalidate = 3600

export default async function CaseStudiesPage() {
  /* The whole published set, in sort_order. The PLACEHOLDERS array that used
     to stand in for it is in the table now (migration 004), word for word, and
     the `>= 5` gate went with it: a threshold only exists to choose between
     two sources. See lib/case-studies.ts. */
  const cases = await getCaseStudies()

  return (
    <div className="page cs-page">
      <div className="cs-hero">
        <div className="section-eyebrow">Case Studies</div>
        <h1 className="section-headline">Real businesses.<br />Real results.</h1>
        <p className="section-sub">We keep client names confidential. The numbers speak for themselves.</p>
      </div>

      <div className="cs-grid">
        {cases.map((c) => (
          <div key={c.id} className="cs-card">
            <div className="cs-card-header">
              <h2 className="cs-industry">{c.industry} · {c.company_type}</h2>
              {c.stat ? (
                <div className="cs-stat">
                  <div className="cs-stat-value">{c.stat.value}</div>
                  <div className="cs-stat-label">{c.stat.label}</div>
                </div>
              ) : (
                <div className="cs-result-headline">{c.result_headline}</div>
              )}
            </div>
            {c.callouts?.length ? (
              <div className="cs-callouts">
                {c.callouts.map((co: string, i: number) => (
                  <span key={i} className="cs-callout">{co}</span>
                ))}
              </div>
            ) : null}
            <div className="cs-route">
              <div className="cs-step">
                <h3 className="cs-label">The Challenge</h3>
                <p className="cs-text">{c.challenge}</p>
              </div>
              <div className="cs-step">
                <h3 className="cs-label">What We Did</h3>
                <p className="cs-text">{c.approach}</p>
              </div>
              <div className="cs-step result">
                <h3 className="cs-label">The Result</h3>
                <p className="cs-text">{c.result_detail}</p>
              </div>
            </div>
            <div className="cs-card-foot">
              <span className="cs-service-badge">{c.service_used}</span>
            </div>
          </div>
        ))}
      </div>

      <CtaBand
        eyebrow="You could be next"
        headline="Ready to get found?"
        sub="Book a demo. We audit how you show up beforehand, so we can show you exactly where buyers are missing you — and what we'd do about it."
      />

      <Footer />
    </div>
  )
}
