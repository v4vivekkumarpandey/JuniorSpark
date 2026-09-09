'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'motion/react';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    console.log('Contact Form Data:', data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full px-6 md:px-20 py-20">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Have questions about our classes or pricing? We&apos;re here to help you and your child.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Contact Information</h2>
              <div className="space-y-6">
                {[
                  { icon: <Mail className="text-primary" />, title: 'Email Us', value: 'info@juniorspark.in', desc: 'We usually respond within 24 hours.' },
                  { icon: <MapPin className="text-accent" />, title: 'Our Office', value: 'New Delhi, Delhi', desc: 'India\'s Favorite e-learning Platform.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="size-14 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{item.title}</p>
                      <p className="text-lg font-bold text-slate-900">{item.value}</p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-primary text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">Quick Support</h3>
              <p className="text-white/80 mb-8 relative z-10">Need an immediate answer? Chat with our support team on WhatsApp.</p>
              <a
                href="https://wa.me/917011254904"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-slate-50 transition-colors relative z-10"
              >
                <MessageSquare size={20} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Your Name</label>
                        <input
                          {...register('name')}
                          className={`w-full px-6 py-4 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all ${errors.name ? 'border-red-500' : 'border-slate-100'}`}
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                        <input
                          {...register('email')}
                          className={`w-full px-6 py-4 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all ${errors.email ? 'border-red-500' : 'border-slate-100'}`}
                          placeholder="name@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Subject</label>
                      <input
                        {...register('subject')}
                        className={`w-full px-6 py-4 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all ${errors.subject ? 'border-red-500' : 'border-slate-100'}`}
                        placeholder="How can we help you?"
                      />
                      {errors.subject && <p className="text-red-500 text-xs">{errors.subject.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Message</label>
                      <textarea
                        {...register('message')}
                        rows={5}
                        className={`w-full px-6 py-4 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all resize-none ${errors.message ? 'border-red-500' : 'border-slate-100'}`}
                        placeholder="Tell us more about your query..."
                      />
                      {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                    </div>

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-primary text-white text-lg font-extrabold py-5 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-primary/20 disabled:opacity-70 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? 'Sending...' : <><Send size={20} /> Send Message</>}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">Message Sent!</h3>
                    <p className="text-slate-600 text-lg mb-10">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-8 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
