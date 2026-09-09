import type { Metadata } from 'next';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using JuniorSpark online English classes.',
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />
      
      <main className="max-w-4xl mx-auto w-full px-6 py-20">
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-100">
          <h1 className="text-4xl font-black text-slate-900 mb-10">Terms of Use</h1>
          
          <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h2>
              <p>By accessing or using the Junior Spark website and services, you agree to be bound by these Terms of Use. If you do not agree to all of these terms, do not use our services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
              <p>Junior Spark provides online English language classes for children. We offer both free demo sessions and paid subscription-based courses conducted via third-party video conferencing tools.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Obligations</h2>
              <p>You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to provide accurate, current, and complete information during the registration process.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Payment and Refunds</h2>
              <p><b>Payments:</b> Fees for our courses are as stated on the website. All payments by users shall be made through the payment mechanism put in place by us. 
                Users have been given various options to choose and proceed with the payment for services via payment mechanisms, including but not limited to 
                Net Banking, Credit Card, Debit Card, UPI, and Wallet. However, any particular payment method may be unavailable at any moment.
                The payment gateway mechanisms are governed by the terms and conditions of the third-party providers as listed on the platform, and the 
                user agrees to be bound by those terms. We shall not be liable for any unauthorized use, fraud, payment refunds, lost amount, etc., in the 
                transaction. These Terms shall also govern any free trials provided on the Platform.
              </p>
               <p><b>Refund:</b> We offer a 100% refund, no questions asked. It is highly unlikely (data speaks for us), but if you are unhappy with the progress, you can ask for 100% refund within 7 days of payment.</p>
              <p>Note: Enrollment at a discount of 20% or more is not eligible for return or refund. </p>
              <p>Your payment confirmation constitutes agreement to these terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Intellectual Property</h2>
              <p>The content on the Junior Spark website, including text, graphics, logos, and course materials, is the property of Junior Spark and is protected by copyright and other intellectual property laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
              <p>Junior Spark shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
            </section>

            <section className="pt-10 border-t border-slate-100">
              <p className="text-sm italic">Last updated: March 2026. For any queries, contact us at info@juniorspark.in</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
