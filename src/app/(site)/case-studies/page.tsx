import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase/client'
import Footer from '@/components/Footer'
import CtaBand from '@/components/CtaBand'

export const metadata: Metadata = {
  title: 'Case Studies — Real businesses, real results',
  description:
    'Real outcomes from Axia Atlas — local businesses, consumer brands, and founders made impossible to miss in search, answer engines, and social.',
  alternates: { canonical: '/case-studies' },
}

async function getCaseStudies() {
  try {
    const { data } = await supabase
      .from('case_studies')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    return data || []
  } catch {
    return []
  }
}

/* Curated library. The Supabase table takes over once it holds a real set
   (≥5 published rows) — the original seed rows predate the brand-copy rules. */
const PLACEHOLDERS = [
  {
    id: '1',
    industry: 'Professional Services',
    company_type: 'B2B Consulting',
    challenge: 'No organic traffic and no social presence — every new client came through referrals, with nothing pulling in buyers on its own.',
    approach: 'Built a sharper brand, grew a founder-voice presence on LinkedIn, and published buyer-keyword SEO articles aimed at the questions prospects actually search.',
    result_headline: '340% organic growth in 90 days',
    result_detail: 'Climbed to roughly 4,200 monthly organic sessions from a near-zero start, with the first inbound leads landing by month three.',
    service_used: 'SEO + Founder Brand',
  },
  {
    id: '2',
    industry: 'E-commerce',
    company_type: 'DTC Brand',
    challenge: 'No organic visibility — invisible for the searches that actually convert, with nothing pulling in buyers on its own.',
    approach: 'Built a keyword and content strategy targeting buyer-intent terms, paired with on-site conversion fixes — no paid media.',
    result_headline: 'First page of Google for buyer-intent terms in under 4 months',
    result_detail: 'Ranked page one for multiple buyer-intent keywords within four months, with organic traffic and conversions climbing month over month — all organic.',
    service_used: 'SEO + Conversion',
  },
  {
    id: '3',
    industry: 'E-commerce',
    company_type: 'DTC Brand',
    challenge: 'High pre-order cart abandonment and a heavy reliance on paid media to recover the sales slipping away.',
    approach: 'Built pre-order abandoned-cart recovery across owned channels — email, SMS, and content — with no paid media in the mix.',
    result_headline: '7 points above the industry benchmark, zero ad spend',
    result_detail: 'Recovered abandoned pre-orders at a rate 7 points above the 20–30% industry standard, entirely through owned channels.',
    service_used: 'Owned Channels + Content',
  },
  {
    id: '4',
    industry: 'Consumer Brand',
    company_type: 'Lifestyle Brand',
    challenge: 'Flat, inconsistent social that left audience growth stalled and the brand easy to scroll past.',
    approach: 'Repositioned the voice, built content pillars, and held a consistent multi-platform posting cadence the audience could rely on.',
    result_headline: 'Audience growth far above the industry average in 60 days',
    result_detail: 'The following grew well beyond the typical rate for the category in two months, with engagement climbing alongside it.',
    service_used: 'Social Media + Brand Voice',
  },
  {
    id: '5',
    industry: 'Food & Hospitality',
    company_type: 'Local Restaurant',
    challenge: 'Invisible in answer-engine and map results while competitors owned every "near me" search nearby.',
    approach: 'Ran an answer-engine optimization audit, added structured content, and tightened reviews and listing presence so the right details were everywhere they needed to be.',
    result_headline: 'The top recommended local result in answer engines',
    result_detail: 'Surfaced first when prospects asked answer engines and maps for the best option nearby — ahead of competitors on reviews, presence, and citations.',
    service_used: 'Answer Engines + Local Presence',
  },
]

export default async function CaseStudiesPage() {
  const data = await getCaseStudies()
  const cases = data.length >= 5 ? data : PLACEHOLDERS

  return (
    <div className="page cs-page">
      <div className="cs-hero">
        <div className="section-eyebrow">Case Studies</div>
        <h1 className="section-headline">Real businesses.<br />Real results.</h1>
        <p className="section-sub">We keep client names confidential. The numbers speak for themselves.</p>
      </div>

      <div className="cs-grid">
        {cases.map((c: any) => (
          <div key={c.id} className="cs-card">
            <div className="cs-card-header">
              <div className="cs-industry">{c.industry} · {c.company_type}</div>
              <div className="cs-result-headline">{c.result_headline}</div>
            </div>
            <div className="cs-route">
              <div className="cs-step">
                <div className="cs-label">The Challenge</div>
                <p className="cs-text">{c.challenge}</p>
              </div>
              <div className="cs-step">
                <div className="cs-label">What We Did</div>
                <p className="cs-text">{c.approach}</p>
              </div>
              <div className="cs-step result">
                <div className="cs-label">The Result</div>
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
