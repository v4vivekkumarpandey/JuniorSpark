'use client';

import React from 'react';
import Link from 'next/link';
import Script from 'next/script'

import { 
  CheckCircle2, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Video,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />
      {/* Meta Pixel - Thank you */}
      <Script id="fb-pixel-lead" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1495466888888244');
          fbq('track', 'Lead');
        `}
      </Script>
      <main className="max-w-4xl mx-auto w-full px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden"
        >
          <div className="bg-primary p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 blur-2xl"></div>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, delay: 0.2 }}
              className="size-24 bg-white rounded-full flex items-center justify-center text-primary mx-auto mb-8 shadow-xl"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            
            <h1 className="text-4xl font-black mb-4">Booking Confirmed!</h1>
            <p className="text-xl font-medium text-white/90">We&apos;re excited to meet your child in the demo class.</p>
          </div>

          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <Sparkles className="text-primary" /> Next Steps
                </h3>
                
                <div className="space-y-6">
                  {[
                    { icon: <MessageCircle className="text-green-500" />, title: 'Check WhatsApp', desc: 'We have sent the confirmation and class link to your WhatsApp number.' },
                    { icon: <Calendar className="text-primary" />, title: 'Save the Date', desc: 'Add this session to your calendar so you don&apos;t miss it.' },
                    { icon: <Video className="text-secondary-600" />, title: 'Join the Link', desc: 'Join the Zoom/Meet link 5 minutes before the scheduled time.' },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="size-12 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center">
                        {step.icon}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{step.title}</p>
                        <p className="text-slate-500 text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h4 className="text-lg font-bold mb-6">Class Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Class Type</span>
                    <span className="font-bold text-slate-900">Free Demo Session</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Duration</span>
                    <span className="font-bold text-slate-900">30 Minutes</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Platform</span>
                    <span className="font-bold text-slate-900">Live Video Call</span>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-primary/10 rounded-xl text-primary text-sm font-bold text-center">
                  Our counsellor will call you shortly
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100">
              <Link
                href="/"
                className="flex-1 h-14 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
              >
                <ArrowLeft size={20} /> Back to Homepage
              </Link>
              <a
                href="https://wa.me/917011254904"
                className="flex-1 h-14 rounded-2xl bg-primary text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all"
              >
                <MessageCircle size={20} /> Chat with Support
              </a>
            </div>
          </div>
        </motion.div>
      </main>
      {/* noscript for tracking users with JS disabled */}
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1495466888888244&ev=Lead&noscript=1"
        />
      </noscript>
      <Footer />
    </div>
  );
}
