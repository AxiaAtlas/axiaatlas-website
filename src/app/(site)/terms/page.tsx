import type { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms and conditions that govern your use of the Axia Atlas website and the services we provide.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
}

const UPDATED = 'June 4, 2026'

export default function TermsPage() {
  return (
    <div className="page">
      <article className="legal-page">
        <div className="section-eyebrow">Legal</div>
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-updated">Last updated {UPDATED}</p>

        <div className="legal-body">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website at{' '}
            <strong>axiaatlas.com</strong> (the &ldquo;Site&rdquo;) operated by <strong>Axia Atlas</strong>
            (&ldquo;Axia Atlas,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or
            using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.
          </p>

          <h2>1. Who we are</h2>
          <p>
            Axia Atlas is a digital marketing studio offering services including search engine optimization,
            answer-engine optimization, social media, local presence, founder branding, website design, campaigns,
            and lead generation. Information on the Site is provided for general informational purposes.
          </p>

          <h2>2. Use of the Site</h2>
          <p>You agree to use the Site only for lawful purposes. You agree not to:</p>
          <ul>
            <li>Use the Site in any way that violates applicable laws or regulations;</li>
            <li>Attempt to gain unauthorized access to the Site, its servers, or related systems;</li>
            <li>Interfere with or disrupt the operation, security, or integrity of the Site; or</li>
            <li>Submit false, misleading, or fraudulent information through our forms.</li>
          </ul>

          <h2>3. Forms, inquiries, and demos</h2>
          <p>
            Submitting a contact form, demo request, or other inquiry does not create a contract or
            engagement between you and Axia Atlas. Any demo, audit, proposal, or recommendation we provide is
            offered without obligation, and a formal client relationship begins only when both parties sign a
            separate written agreement. Information you submit is handled in accordance with our{' '}
            <a href="/privacy">Privacy Policy</a>.
          </p>

          <h2>4. Intellectual property</h2>
          <p>
            The Site and its content — including text, graphics, logos, the Axia Atlas name and marks, and design —
            are owned by or licensed to Axia Atlas and are protected by intellectual property laws. You may not
            copy, reproduce, distribute, or create derivative works from any part of the Site without our prior
            written permission, except as permitted for normal personal or business viewing.
          </p>

          <h2>5. Third-party links and services</h2>
          <p>
            The Site may contain links to third-party websites or services that we do not control. We are not
            responsible for the content, policies, or practices of any third party, and your use of those services
            is at your own risk.
          </p>

          <h2>6. Disclaimers</h2>
          <p>
            The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
            warranties of any kind, whether express or implied. While we strive for accuracy, we do not warrant
            that the Site will be uninterrupted, error-free, or free of harmful components, or that any marketing
            outcome described on the Site is guaranteed for your business. Results from marketing services vary
            and depend on many factors outside our control.
          </p>

          <h2>7. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Axia Atlas and its team will not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising
            out of your use of — or inability to use — the Site.
          </p>

          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Axia Atlas from any claims, damages, liabilities, and expenses
            arising out of your misuse of the Site or violation of these Terms.
          </p>

          <h2>9. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. When we do, we will revise the &ldquo;Last updated&rdquo;
            date above. Your continued use of the Site after changes take effect constitutes acceptance of the
            revised Terms.
          </p>

          <h2>10. Governing law</h2>
          <p>
            These Terms are governed by the laws applicable to Axia Atlas&apos;s place of business, without regard
            to conflict-of-law principles. Any disputes will be subject to the exclusive jurisdiction of the courts
            located there.
          </p>

          <h2>11. Contact us</h2>
          <p>
            Questions about these Terms? Email us at{' '}
            <a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a>.
          </p>
        </div>
      </article>

      <Footer />
    </div>
  )
}
