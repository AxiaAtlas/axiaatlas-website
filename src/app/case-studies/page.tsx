import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import Footer from '@/components/Footer'

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

const PLACEHOLDERS = [
  {
    id: '1',
    industry: 'Professional Services',
    company_type: 'B2B Consulting Firm',
    challenge: 'Zero organic traffic, no social presence, relied entirely on referrals',
    approach: 'Built brand architecture, launched LinkedIn strategy with founder-voice content, published 8 SEO articles targeting buyer keywords',
    result_headline: '340% organic growth in 90 days',
    result_detail: 'From 0 to 4,200 monthly organic sessions. LinkedIn followers grew from 300 to 2,100. 3 inbound leads in month 3.',
    service_used: 'Social Media + SEO',
  },
  {
    id: '2',
    industry: 'E-commerce',
    company_type: 'DTC Consumer Brand',
    challenge: 'High ad spend, no brand differentiation, social media was generic and inconsistent',
    approach: 'Repositioned brand voice, built content pillar framework, launched Instagram + TikTok with carousel-first strategy',
    result_headline: '2.4× ROAS improvement in 60 days',
    result_detail: 'Organic reach increased 180%. Email list grew 40% from content CTAs. Ad creative informed by organic performance data.',
    service_used: 'Social Media + Brand Architecture',
  },
  {
    id: '3',
    industry: 'Technology',
    company_type: 'SaaS Startup',
    challenge: 'Invisible to AI search engines, no thought leadership, founder had 200 LinkedIn followers',
    approach: 'AEO audit identified 12 citation gaps. Published 6 structured articles targeting AI-indexed queries. Built founder LinkedIn presence.',
    result_headline: 'Cited by ChatGPT in 45 days',
    result_detail: 'Founder LinkedIn grew from 200 to 2,800 followers in 4 months. 2 enterprise deals attributed to thought leadership content.',
    service_used: 'GEO/AEO + Executive Brand',
  },
]

export default async function CaseStudiesPage() {
  const data = await getCaseStudies()
  const cases = data.length > 0 ? data : PLACEHOLDERS

  return (
    <div className="page">
      <div className="cs-hero">
        <div className="section-eyebrow">Case Studies</div>
        <h1 className="section-headline">Real growth.<br />Real results.</h1>
        <p className="section-sub">We keep client names confidential. Results speak for themselves.</p>
      </div>

      <div className="cs-grid">
        {cases.map((c: any) => (
          <div key={c.id} className="cs-card">
            <div className="cs-card-header">
              <div className="cs-industry">{c.industry} · {c.company_type}</div>
              <div className="cs-result-headline">{c.result_headline}</div>
            </div>
            <div className="cs-card-body">
              <div className="cs-label">The Challenge</div>
              <p className="cs-text">{c.challenge}</p>
              <div className="cs-label">Our Approach</div>
              <p className="cs-text">{c.approach}</p>
              <div className="cs-label">The Result</div>
              <p className="cs-text">{c.result_detail}</p>
              <span className="cs-service-badge">{c.service_used}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="cta-section">
        <div className="section-eyebrow">Your business could be next</div>
        <h2 className="section-headline">Ready to engineer your growth?</h2>
        <p className="section-sub">Book a free audit call. We&apos;ll show you exactly where your growth is leaking and what we&apos;d do about it.</p>
        <Link href="/contact" className="btn-primary" style={{ background: 'var(--bone)', color: 'var(--midnight)' }}>Book a Free Audit →</Link>
      </section>

      <Footer />
    </div>
  )
}
