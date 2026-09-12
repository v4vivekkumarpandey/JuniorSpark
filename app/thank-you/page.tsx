'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { format, parseISO } from 'date-fns';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

import {
  CheckCircle2,
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  MessageCircle,
  Sparkles,
  User,
} from 'lucide-react';
import { motion } from 'motion/react';

function ThankYouContent() {
  const searchParams = useSearchParams();

  const childName = searchParams.get('name') || '';
  const parentName = searchParams.get('parent') || '';
  const dateParam = searchParams.get('date') || '';
  const time = searchParams.get('time') || '';
  const age = searchParams.get('age') || '';

  const formattedDate = dateParam
    ? format(parseISO(dateParam), 'EEEE, d MMMM yyyy')
    : '';

  // Lead event — fires once on mount after booking is confirmed
  React.useEffect(() => {
    window.fbq?.('track', 'Lead');
    window.gtag?.('event', 'generate_lead', { currency: 'INR', value: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-background-light">
      <main className="max-w-4xl mx-auto w-full px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden"
        >
          {/* Header */}
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

            <h1 className="text-4xl font-black mb-3">Booking Confirmed!</h1>
            {childName ? (
              <p className="text-xl font-medium text-white/90">
                {parentName ? `Dear ${parentName}, ` : ''}We&apos;re excited to meet <span className="font-black">{childName}</span> in the demo class!
              </p>
            ) : (
              <p className="text-xl font-medium text-white/90">We&apos;re excited to meet your child in the demo class.</p>
            )}
          </div>

          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              {/* Next Steps */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <Sparkles className="text-primary" /> Next Steps
                </h3>

                <div className="space-y-6">
                  {[
                    { icon: <MessageCircle className="text-green-500" />, title: 'Check WhatsApp', desc: 'We have sent the confirmation and class link to your WhatsApp number.' },
                    { icon: <Calendar className="text-primary" />, title: 'Save the Date', desc: 'Add this session to your calendar so you don\'t miss it.' },
                    { icon: <Video className="text-blue-500" />, title: 'Join the Link', desc: 'Join the Google Meet link 5 minutes before the scheduled time.' },
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

              {/* Class Details — personalized */}
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h4 className="text-lg font-bold mb-6">Class Details</h4>
                <div className="space-y-1">
                  {childName && (
                    <div className="flex items-center justify-between py-3 border-b border-slate-200">
                      <span className="text-slate-500 font-medium flex items-center gap-2"><User size={15} /> Child</span>
                      <span className="font-bold text-slate-900">{childName}</span>
                    </div>
                  )}
                  {formattedDate && (
                    <div className="flex items-center justify-between py-3 border-b border-slate-200">
                      <span className="text-slate-500 font-medium flex items-center gap-2"><Calendar size={15} /> Date</span>
                      <span className="font-bold text-slate-900 text-right text-sm">{formattedDate}</span>
                    </div>
                  )}
                  {time && (
                    <div className="flex items-center justify-between py-3 border-b border-slate-200">
                      <span className="text-slate-500 font-medium flex items-center gap-2"><Clock size={15} /> Time</span>
                      <span className="font-bold text-slate-900">{time} IST</span>
                    </div>
                  )}
                  {age && (
                    <div className="flex items-center justify-between py-3 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">Age Group</span>
                      <span className="font-bold text-slate-900">{age} years</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-3 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Class Type</span>
                    <span className="font-bold text-slate-900">Free Demo Session</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Duration</span>
                    <span className="font-bold text-slate-900">45 Minutes</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-500 font-medium">Platform</span>
                    <span className="font-bold text-slate-900">Google Meet</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded-xl text-primary text-sm font-bold text-center">
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
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1495466888888244&ev=Lead&noscript=1"
        />
      </noscript>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background-light" />}>
      <ThankYouContent />
    </React.Suspense>
  );
}
