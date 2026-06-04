import type { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Axia Atlas collects, uses, and protects the personal information you share through our website, contact and audit forms, and analytics.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

const UPDATED = 'June 4, 2026'

export default function PrivacyPage() {
  return (
    <div className="page">
      <article className="legal-page">
        <div className="section-eyebrow">Legal</div>
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated {UPDATED}</p>

        <div className="legal-body">
          <p>
            This Privacy Policy explains how <strong>Axia Atlas</strong> (&ldquo;Axia Atlas,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
            collects, uses, and protects information when you visit <strong>axiaatlas.com</strong> (the &ldquo;Site&rdquo;),
            contact us, or request a free audit. We are a digital marketing studio, and we take the privacy of
            prospective and existing clients seriously. By using the Site or submitting information through it,
            you agree to the practices described below.
          </p>

          <h2>1. Information we collect</h2>
          <h3>Information you provide</h3>
          <p>When you complete a contact form, request a free audit, subscribe to our newsletter, or otherwise reach out, we may collect:</p>
          <ul>
            <li>Your name, email address, and phone number;</li>
            <li>Your company name, website, role/position, and social media profiles;</li>
            <li>Details about your goals, growth areas, budget, and preferred call times; and</li>
            <li>Any other information you choose to include in a message to us.</li>
          </ul>

          <h3>Information collected automatically</h3>
          <p>
            Like most websites, we automatically collect limited technical information through cookies and analytics
            tools, including your IP address, browser type, device information, referring pages, and how you interact
            with the Site. We use <strong>Google Analytics</strong> for this purpose. These tools may set cookies or
            similar identifiers in your browser.
          </p>

          <h2>2. How we use your information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and prepare and deliver the free audit you request;</li>
            <li>Provide, operate, and improve our services and the Site;</li>
            <li>Send you relevant updates, proposals, or marketing communications you have asked for;</li>
            <li>Understand how the Site is used and measure the performance of our content; and</li>
            <li>Comply with our legal obligations and protect against fraud or misuse.</li>
          </ul>

          <h2>3. How we share information</h2>
          <p>
            We do <strong>not</strong> sell your personal information. We may share information with trusted
            third-party service providers who help us operate our business — for example, our hosting provider
            (Vercel), our database and form-processing provider (Supabase), email tools, and analytics providers
            (Google Analytics). These providers process information only on our behalf and under appropriate
            confidentiality obligations. We may also disclose information where required by law or to protect our
            legal rights.
          </p>

          <h2>4. Cookies and analytics</h2>
          <p>
            Cookies are small files stored on your device. We use them to keep the Site working correctly and to
            understand aggregate usage. You can control or disable cookies through your browser settings; doing so
            may affect some Site functionality. To opt out of Google Analytics specifically, you can install the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
          </p>

          <h2>5. Data retention</h2>
          <p>
            We keep personal information for as long as needed to fulfil the purposes described in this policy —
            for example, to maintain our relationship with you as a prospect or client — and as required to comply
            with our legal obligations. When information is no longer needed, we delete or anonymize it.
          </p>

          <h2>6. Your rights</h2>
          <p>
            Depending on where you live, you may have the right to access, correct, delete, or restrict the use of
            your personal information, to object to certain processing, or to withdraw consent. To exercise any of
            these rights, email us at <a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a> and we will
            respond within a reasonable timeframe.
          </p>

          <h2>7. Data security</h2>
          <p>
            We use reasonable technical and organizational measures to protect your information. No method of
            transmission or storage is completely secure, however, and we cannot guarantee absolute security.
          </p>

          <h2>8. Third-party links</h2>
          <p>
            The Site may link to third-party websites or services we do not control. This policy does not apply to
            those sites, and we encourage you to review their privacy practices.
          </p>

          <h2>9. Children&apos;s privacy</h2>
          <p>
            The Site is intended for businesses and is not directed to children under 16. We do not knowingly
            collect personal information from children.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last
            updated&rdquo; date above. Material changes will be reflected on this page.
          </p>

          <h2>11. Contact us</h2>
          <p>
            Questions about this policy or your information? Email us at{' '}
            <a href="mailto:partner@axiaatlas.com">partner@axiaatlas.com</a>.
          </p>
        </div>
      </article>

      <Footer />
    </div>
  )
}
