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
              <p>Welcome to Junior Spark. We value your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. The Data We Collect</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes email address and telephone numbers (WhatsApp).</li>
                <li><strong>Child Data:</strong> includes child&apos;s name and age group for class placement.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Data</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To register you as a new customer and book demo classes.</li>
                <li>To manage our relationship with you (e.g., sending class links via WhatsApp).</li>
                <li>To improve our website, products/services, marketing, and customer relationships.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
              <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Legal Rights</h2>
              <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing.</p>
            </section>

            <section className="pt-10 border-t border-slate-100">
              <p className="text-sm italic">Last updated: March 2026. For any queries, contact us at info@juniorspark.in</p>
            </section>
          </div>
        </div>
      </main>
      {/* Footer end */}
      <Footer />
    </div>
  );
}
