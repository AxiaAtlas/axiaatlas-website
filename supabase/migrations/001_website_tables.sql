-- Case Studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  industry text,
  company_type text,
  challenge text,
  approach text,
  result_headline text,
  result_detail text,
  service_used text,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE case_studies DISABLE ROW LEVEL SECURITY;
GRANT ALL ON case_studies TO anon, authenticated;

-- Blog Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  category text,
  author text DEFAULT 'Axia Atlas',
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
GRANT ALL ON blog_posts TO anon, authenticated;

-- Contact Submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  service text,
  message text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
GRANT ALL ON contact_submissions TO anon, authenticated;

-- Seed case studies
INSERT INTO case_studies (industry, company_type, challenge, approach, result_headline, result_detail, service_used) VALUES
('Professional Services', 'B2B Consulting Firm',
 'Zero organic traffic, no social presence, relied entirely on referrals',
 'Built brand architecture, launched LinkedIn strategy with founder-voice content, published 8 SEO articles targeting buyer keywords',
 '340% organic growth in 90 days',
 'From 0 to 4,200 monthly organic sessions. LinkedIn followers grew from 300 to 2,100. 3 inbound leads in month 3.',
 'Social Media + SEO'),
('E-commerce', 'DTC Consumer Brand',
 'High ad spend, no brand differentiation, social media was generic and inconsistent',
 'Repositioned brand voice, built content pillar framework, launched Instagram + TikTok with carousel-first strategy',
 '2.4× ROAS improvement in 60 days',
 'Organic reach increased 180%. Email list grew 40% from content CTAs. Ad creative informed by organic performance data.',
 'Social Media + Brand Architecture'),
('Technology', 'SaaS Startup',
 'Invisible to AI search engines, no thought leadership, founder had 200 LinkedIn followers',
 'AEO audit identified 12 citation gaps. Published 6 structured articles targeting AI-indexed queries. Built founder LinkedIn presence.',
 'Cited by ChatGPT and Perplexity within 45 days',
 'Founder LinkedIn grew from 200 to 2,800 followers in 4 months. 2 enterprise deals attributed to thought leadership content.',
 'GEO/AEO + Executive Brand')
ON CONFLICT DO NOTHING;
