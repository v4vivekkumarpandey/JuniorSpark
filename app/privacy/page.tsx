import type { Metadata } from 'next';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read how JuniorSpark collects, uses, and protects your personal information.',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />
      
      <main className="max-w-4xl mx-auto w-full px-6 py-20">
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-100">
          <h1 className="text-4xl font-black text-slate-900 mb-10">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p>Welcome to JuniorSpark. We value your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights. This policy applies to all users of juniorspark.in and juniorsparkweb.vercel.app.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. The Data We Collect</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes email address and telephone numbers (WhatsApp).</li>
                <li><strong>Child Data:</strong> includes child&apos;s name and age group for class placement.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, pages visited, time spent on pages, and device information — collected automatically via third-party analytics tools described below.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Data</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To register you as a new customer and book demo classes.</li>
                <li>To manage our relationship with you (e.g., sending class links and confirmations via WhatsApp and email).</li>
                <li>To improve our website, products/services, marketing, and customer relationships.</li>
                <li>To measure the effectiveness of our advertising campaigns.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Third-Party Analytics &amp; Tracking Tools</h2>
              <p>We use the following third-party tools on our website to understand how visitors interact with our site and to measure advertising performance. These tools may collect your IP address, browser information, and browsing behaviour on our site.</p>

              <div className="space-y-4 mt-4">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-1">Meta Pixel (Facebook Pixel)</h3>
                  <p className="text-sm">Operated by Meta Platforms, Inc. We use Meta Pixel to measure the effectiveness of our Facebook and Instagram advertisements and to show relevant ads to people who have visited our site. Data collected may include page views, button clicks, and form submissions. You can opt out of Meta&apos;s data use via <a href="https://www.facebook.com/settings?tab=ads" className="text-primary underline" target="_blank" rel="noopener noreferrer">Facebook Ad Settings</a>.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-1">Google Analytics 4 (GA4)</h3>
                  <p className="text-sm">Operated by Google LLC. We use Google Analytics to understand how users find and use our website. It collects anonymised data including pages visited, session duration, device type, and geographic location. You can opt out using the <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-1">Microsoft Clarity</h3>
                  <p className="text-sm">Operated by Microsoft Corporation. We use Clarity to record anonymised session replays and heatmaps to understand how users interact with our pages. Clarity does not collect personally identifiable information. You can learn more at <a href="https://privacy.microsoft.com/en-us/privacystatement" className="text-primary underline" target="_blank" rel="noopener noreferrer">Microsoft&apos;s Privacy Statement</a>.</p>
                </div>
              </div>

              <p className="mt-4 text-sm">By continuing to use our website, you consent to the use of these tools. If you wish to opt out, please use the links above or adjust your browser&apos;s cookie settings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
              <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. We limit access to your personal data to those who have a genuine business need to access it.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Legal Rights</h2>
              <p>Under India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act) and applicable data protection laws, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate or incomplete data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Withdraw consent for data processing at any time.</li>
                <li>Nominate another individual to exercise your rights on your behalf.</li>
              </ul>
              <p className="mt-4">To exercise any of these rights, please contact our Grievance Officer at <a href="mailto:info@juniorspark.in" className="text-primary underline">info@juniorspark.in</a>. We will respond within 30 days of receiving your request.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Grievance Officer</h2>
              <p>In accordance with the Information Technology Act, 2000 and the DPDP Act, 2023, the name and contact details of the Grievance Officer are provided below:</p>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mt-3">
                <p><strong>JuniorSpark — Grievance Officer</strong></p>
                <p>Email: <a href="mailto:info@juniorspark.in" className="text-primary underline">info@juniorspark.in</a></p>
                <p>Address: New Delhi, Delhi, India</p>
              </div>
            </section>

            <section className="pt-10 border-t border-slate-100">
              <p className="text-sm italic">Last updated: September 2026. For any queries, contact us at info@juniorspark.in</p>
            </section>
          </div>
        </div>
      </main>
      {/* Footer end */}
      <Footer />
    </div>
  );
}
