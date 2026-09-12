'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format, addDays } from 'date-fns';
import {
  School,
  Star,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  Users,
  Video,
  ShieldCheck,
  Award,
  Lock,
  ChevronDown,
} from 'lucide-react';

/* ─────────────── Types ─────────────── */
type FormData = {
  ageGroup: string;
  whatsapp: string;
  whatsappConsent: boolean;
  date: string;
  time: string;
  parentName: string;
  childName: string;
  email: string;
};

/* ─────────────── Constants ─────────────── */
const AGE_GROUPS = [
  { id: 'kg-3',  label: 'Class KG to 3rd' },
  { id: '4-6',   label: 'Class 4th to 6th' },
  { id: '7-9',   label: 'Class 7th to 9th' },
  { id: '10-12', label: 'Class 10th to 12th' },
];

const TIME_SLOTS = ['04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'];

const STEPS = ['Select Class', 'Get Trial Link', 'Pick Slot', 'Your Details'];

const LEFT_BULLETS = [
  { icon: <Video size={16} />,       text: 'Live Classes (max 6 kids)' },
  { icon: <Users size={16} />,       text: 'Expert certified teachers' },
  { icon: <ShieldCheck size={16} />, text: 'Personalised feedback every session' },
  { icon: <Award size={16} />,       text: 'Certificate of completion' },
];

const TESTIMONIALS = [
  {
    name: 'Vandana Sharma',
    location: 'Indore, MP',
    text: "My daughter won her school's debate competition after just 3 months!",
    img: 'https://picsum.photos/seed/parent1/100/100',
  },
  {
    name: 'Ajay Deshmukh',
    location: 'Nagpur',
    text: 'Small batches mean Aarav gets real speaking time every class.',
    img: 'https://picsum.photos/seed/parent2/100/100',
  },
];


/* ─────────────── Analytics ─────────────── */
type TrackParams = Record<string, string | number | boolean>;

function track(fbEvent: string, gaEvent: string, params: TrackParams = {}) {
  if (typeof window === 'undefined') return;
  const w = window as Window & {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  };
  w.fbq?.('track', fbEvent, params);
  w.gtag?.('event', gaEvent, params);
}

/* ─────────────── Page ─────────────── */
export default function DemoForm() {
  const router = useRouter();
  const [step, setStep]               = React.useState(0);
  const [direction, setDirection]     = React.useState(1);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  const [fieldErrors, setFieldErrors] = React.useState<Partial<Record<keyof FormData, string>>>({});

  const availableDates = React.useMemo(() => {
    const dates: Date[] = [];
    let d = addDays(new Date(), 1);
    while (dates.length < 6) {
      if (d.getDay() !== 0) dates.push(new Date(d));
      d = addDays(d, 1);
    }
    return dates;
  }, []);

  const [form, setForm] = React.useState<FormData>({
    ageGroup: '',
    whatsapp: '',
    whatsappConsent: true,
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    time: '05:00 PM',
    parentName: '',
    childName: '',
    email: '',
  });

  const set = (key: keyof FormData, value: string, autoNext = false) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setFieldErrors(prev => ({ ...prev, [key]: '' }));
    if (autoNext) {
      // Step 0 → 1: class selected
      track('InitiateCheckout', 'demo_step_1_class_selected', {
        class_group: value,
        step: 1,
      });
      setTimeout(() => { setDirection(1); setStep(s => s + 1); }, 300);
    }
  };

  const toggleConsent = () =>
    setForm(prev => ({ ...prev, whatsappConsent: !prev.whatsappConsent }));

  const validate = (s = step) => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (s === 0 && !form.ageGroup) e.ageGroup = 'Please select a class';
    if (s === 1 && !/^\+?\d{7,15}$/.test(form.whatsapp.replace(/[\s\-().]/g, '')))
      e.whatsapp = 'Enter a valid WhatsApp number with country code (e.g. +1 234 567 8901)';
    if (s === 2) {
      if (!form.date) e.date = 'Please select a date';
      if (!form.time) e.time = 'Please select a time';
    }
    if (s === 3) {
      if (form.parentName.trim().length < 2) e.parentName = 'Required';
      if (form.childName.trim().length < 2)  e.childName  = 'Required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = 'Enter a valid email';
    }
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const advance = () => {
    if (!validate()) return;
    // Step 1 → 2: phone number captured
    if (step === 1) {
      track('Lead', 'demo_step_2_phone_captured', { step: 2 });
    }
    // Step 2 → 3: slot selected
    if (step === 2) {
      track('AddToCart', 'demo_step_3_slot_selected', {
        step: 3,
        selected_date: form.date,
        selected_time: form.time,
      });
    }
    setDirection(1);
    setStep(s => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep(s => s - 1);
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const res  = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');
      // Final conversion event
      track('CompleteRegistration', 'demo_booking_complete', {
        step: 4,
        class_group: form.ageGroup,
        currency: 'INR',
        value: 0,
      });
      const params = new URLSearchParams({
        name: form.childName || '',
        parent: form.parentName || '',
        date: form.date || '',
        time: form.time || '',
        age: form.ageGroup || '',
      });
      router.push(`/thank-you?${params.toString()}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  const progressPct = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">

      {/* ══════════════════════════════════════════
          LEFT PANEL — desktop only
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[42%] lg:min-h-screen relative bg-gradient-to-br from-[#1a5fba] via-primary to-[#1e40af] flex-col overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full px-10 py-8">
          <Link href="/" className="flex items-center gap-2.5 mb-10 group w-fit">
            <div className="size-9 bg-white/20 rounded-lg flex items-center justify-center text-white border border-white/30 group-hover:bg-white/30 transition-colors">
              <School size={20} />
            </div>
            <span className="text-white font-extrabold text-lg tracking-tight">Junior Spark</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold uppercase tracking-wider mb-5 shadow-lg">
            🎁 100% Free Demo Class
          </span>

          <h1 className="text-white text-3xl xl:text-4xl font-black leading-tight mb-3">
            Build Confidence<br />Through{' '}
            <span className="text-secondary">Spoken English</span>
          </h1>
          <p className="text-white/75 text-sm font-medium mb-8 leading-relaxed max-w-xs">
            Live interactive classes for kids aged 5–15, designed for children in India's growing cities.
          </p>

          <ul className="flex flex-col gap-3 mb-8">
            {LEFT_BULLETS.map((b, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="size-7 rounded-full bg-white/15 flex items-center justify-center text-white shrink-0">
                  {b.icon}
                </div>
                <span className="text-white/90 text-sm font-medium">{b.text}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6 mb-8">
            {[['4,000+', 'Happy Parents'], ['100+', 'Cities'], ['1:4', 'Batch Ratio']].map(([val, lbl], i, arr) => (
              <React.Fragment key={lbl}>
                <div>
                  <p className="text-white text-2xl font-black">{val}</p>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">{lbl}</p>
                </div>
                {i < arr.length - 1 && <div className="w-px h-10 bg-white/20" />}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-8">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-secondary fill-current" />)}
            </div>
            <span className="text-white text-sm font-semibold">4.9/5</span>
            <span className="text-white/60 text-xs">(2,800+ reviews)</span>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, j) => <Star key={j} size={11} className="text-secondary fill-current" />)}
                </div>
                <p className="text-white/85 text-xs italic mb-3">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-full bg-white/20 relative overflow-hidden shrink-0">
                    <Image src={t.img} alt={t.name} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">{t.name}</p>
                    <p className="text-white/50 text-[10px] uppercase tracking-wider">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT PANEL — Form
      ══════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">

        {/* ── Mobile top bar ── */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white sticky top-0 z-30">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <School size={17} />
            </div>
            <span className="text-slate-900 font-extrabold text-base tracking-tight">Junior Spark</span>
          </Link>
          <span className="text-[11px] font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
            🎁 Free Demo
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100 shrink-0">
          <div
            className="h-full bg-primary transition-[width] duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Step counter — mobile */}
        <div className="lg:hidden flex items-center justify-between px-4 pt-3 pb-1">
          <p className="text-xs text-slate-500 font-medium">
            Step <span className="font-bold text-slate-800">{step + 1}</span> of {STEPS.length}
          </p>
          <p className="text-xs font-bold text-primary">{Math.round(progressPct)}% done</p>
        </div>

        {/* Form scroll area */}
        <div className="flex-1 flex flex-col items-center px-4 md:px-10 py-5 md:py-12 lg:py-14 overflow-y-auto">
          <div className="w-full max-w-xl">

            {/* Logo + headline (steps 0 & 1, desktop only — mobile uses top bar) */}
            {(step === 0 || step === 1) && (
              <div className="hidden lg:block text-center mb-8">
                <Link href="/" className="inline-flex items-center gap-2 mb-5 group">
                  <div className="size-9 bg-primary rounded-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <School size={20} />
                  </div>
                  <span className="text-slate-900 font-extrabold text-lg tracking-tight">Junior Spark</span>
                </Link>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug">
                  Build Your Child's{' '}
                  <span className="text-primary">English Communication Skills</span>
                </h2>
              </div>
            )}

            {/* Mobile headline (steps 0 & 1) */}
            {(step === 0 || step === 1) && (
              <div className="lg:hidden text-center mb-5">
                <h2 className="text-xl font-black text-slate-900 leading-snug">
                  Build Your Child's{' '}
                  <span className="text-primary">English Skills</span>
                </h2>
              </div>
            )}

            {/* Step card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div
                key={step}
                className="p-5 md:p-8 animate-[fadeSlide_0.2s_ease-out]"
              >

                  {/* ── Step 0: Class ── */}
                  {step === 0 && (
                    <>
                      <h3 className="text-base md:text-xl font-black text-slate-900 text-center mb-5">
                        Please Select Your Child's Class
                      </h3>
                      <div className="flex flex-col gap-3">
                        {AGE_GROUPS.map((ag) => (
                          <button
                            key={ag.id}
                            onClick={() => set('ageGroup', ag.id, true)}
                            className={`w-full py-4 px-5 rounded-xl text-center font-semibold text-base transition-all active:scale-[.98] ${
                              form.ageGroup === ag.id
                                ? 'bg-primary text-white shadow-md shadow-primary/30'
                                : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                            }`}
                          >
                            {ag.label}
                          </button>
                        ))}
                      </div>
                      {fieldErrors.ageGroup && (
                        <p className="text-red-500 text-sm mt-3 text-center">{fieldErrors.ageGroup}</p>
                      )}
                    </>
                  )}

                  {/* ── Step 1: Phone ── */}
                  {step === 1 && (
                    <>
                      <h3 className="text-base md:text-xl font-black text-slate-900 text-center mb-5">
                        Get your Free trial link 🎁
                      </h3>

                      <div className="flex gap-2 mb-3">
                        <input
                          value={form.whatsapp}
                          onChange={e => set('whatsapp', e.target.value)}
                          placeholder="+91 98765 43210 or +1 234 567 8901"
                          type="tel"
                          autoFocus
                          className={`flex-1 px-4 py-4 rounded-xl border-2 outline-none focus:border-primary transition-colors text-base ${
                            fieldErrors.whatsapp ? 'border-red-400 bg-red-50' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {fieldErrors.whatsapp && (
                        <p className="text-red-500 text-xs mb-3">{fieldErrors.whatsapp}</p>
                      )}

                      <label className="flex items-center gap-2 mb-5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={form.whatsappConsent}
                          onChange={toggleConsent}
                          className="w-4 h-4 accent-primary rounded shrink-0"
                        />
                        <span className="text-sm text-slate-600">Get class link &amp; updates on WhatsApp</span>
                      </label>

                      <button
                        onClick={advance}
                        className="w-full py-4 rounded-xl bg-secondary text-slate-900 font-black text-lg shadow-md hover:brightness-95 active:scale-[.98] transition-all"
                      >
                        Book a FREE Class
                      </button>

                      <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-4">
                        <ShieldCheck size={13} /> We respect your privacy. No spam.
                      </p>
                      <button
                        onClick={goBack}
                        className="flex items-center justify-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors font-medium mt-3 w-full"
                      >
                        <ChevronLeft size={15} /> Go back
                      </button>
                    </>
                  )}

                  {/* ── Step 2: Slot ── */}
                  {step === 2 && (
                    <>
                      <h3 className="text-base md:text-xl font-black text-slate-900 text-center mb-5">
                        Pick Your Free Demo Slot
                      </h3>

                      <div className="mb-5">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Date</p>
                        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                          {availableDates.map((date, i) => {
                            const val      = format(date, 'yyyy-MM-dd');
                            const selected = form.date === val;
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => set('date', val)}
                                className={`flex flex-col items-center min-w-[60px] py-3 px-1 rounded-xl shrink-0 transition-all active:scale-95 ${
                                  selected
                                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                <span className={`text-[10px] font-bold uppercase ${selected ? 'opacity-80' : 'text-slate-400'}`}>
                                  {i === 0 ? 'Tmrw' : format(date, 'EEE')}
                                </span>
                                <span className="text-xl font-black leading-snug">{format(date, 'd')}</span>
                                <span className={`text-[10px] ${selected ? 'opacity-70' : 'text-slate-400'}`}>
                                  {format(date, 'MMM')}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        {fieldErrors.date && <p className="text-red-500 text-xs mt-2">{fieldErrors.date}</p>}
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                          Time <span className="font-normal normal-case">(IST)</span>
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {TIME_SLOTS.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => set('time', t)}
                              className={`py-3.5 rounded-xl text-sm font-bold border-2 transition-all active:scale-95 ${
                                form.time === t
                                  ? 'bg-primary/10 border-primary text-primary'
                                  : 'border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                        {fieldErrors.time && <p className="text-red-500 text-xs mt-2">{fieldErrors.time}</p>}
                      </div>
                    </>
                  )}

                  {/* ── Step 3: Details ── */}
                  {step === 3 && (
                    <>
                      <h3 className="text-base md:text-xl font-black text-slate-900 text-center mb-5">
                        Enter Your Details to Book the Demo
                      </h3>

                      <div className="flex flex-col gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                            Parent's Name
                          </label>
                          <input
                            value={form.parentName}
                            onChange={e => set('parentName', e.target.value)}
                            placeholder="Your full name"
                            autoComplete="name"
                            className={`w-full px-4 py-4 rounded-xl border-2 outline-none focus:border-primary transition-colors text-base ${
                              fieldErrors.parentName ? 'border-red-400 bg-red-50' : 'border-slate-200'
                            }`}
                          />
                          {fieldErrors.parentName && (
                            <p className="text-red-500 text-xs mt-1">{fieldErrors.parentName}</p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                            Child's Name
                          </label>
                          <input
                            value={form.childName}
                            onChange={e => set('childName', e.target.value)}
                            placeholder="Child's first name"
                            className={`w-full px-4 py-4 rounded-xl border-2 outline-none focus:border-primary transition-colors text-base ${
                              fieldErrors.childName ? 'border-red-400 bg-red-50' : 'border-slate-200'
                            }`}
                          />
                          {fieldErrors.childName && (
                            <p className="text-red-500 text-xs mt-1">{fieldErrors.childName}</p>
                          )}
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                            Email Address
                          </label>
                          <input
                            value={form.email}
                            onChange={e => set('email', e.target.value)}
                            placeholder="name@example.com"
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            className={`w-full px-4 py-4 rounded-xl border-2 outline-none focus:border-primary transition-colors text-base ${
                              fieldErrors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'
                            }`}
                          />
                          {fieldErrors.email && (
                            <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                          )}
                        </div>
                      </div>

                      {submitError && (
                        <div className="mt-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                          {submitError}
                        </div>
                      )}
                    </>
                  )}

              </div>

              {/* CTA + Back (hidden on step 1 — it has inline CTA) */}
              {step !== 1 && (
                <div className="px-5 md:px-8 pb-5 md:pb-6 flex flex-col gap-3 border-t border-slate-100 pt-4">
                  {step < STEPS.length - 1 ? (
                    <button
                      onClick={advance}
                      className="w-full py-4 bg-secondary text-slate-900 font-black text-base rounded-xl shadow-md hover:brightness-95 active:scale-[.98] transition-all flex items-center justify-center gap-2"
                    >
                      Continue <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      disabled={isSubmitting}
                      className="w-full py-4 bg-secondary text-slate-900 font-black text-base rounded-xl shadow-md hover:brightness-95 active:scale-[.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block size-5 border-2 border-slate-900/20 border-t-slate-900 rounded-full animate-spin" />
                          Booking your class…
                        </>
                      ) : (
                        <>Book FREE Demo Class <ArrowRight size={18} /></>
                      )}
                    </button>
                  )}
                  {step > 0 && (
                    <button
                      onClick={goBack}
                      className="flex items-center justify-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors font-medium py-1"
                    >
                      <ChevronLeft size={15} /> Go back
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Privacy note */}
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-4 text-center">
              <Lock size={11} className="shrink-0" />
              We respect your privacy. No spam, ever.{' '}
              <Link href="/terms" className="underline hover:text-slate-600 transition-colors">T&amp;C</Link> apply.
            </p>

            {/* Trust signals — mobile only, below form */}
            <div className="lg:hidden mt-6 flex flex-col gap-3">

              {/* Stats strip */}
              <div className="grid grid-cols-3 gap-2">
                {[['4,000+', 'Parents'], ['100+', 'Cities'], ['1:4', 'Batch']].map(([val, lbl]) => (
                  <div key={lbl} className="text-center py-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-base font-black text-primary">{val}</p>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide mt-0.5">{lbl}</p>
                  </div>
                ))}
              </div>

              {/* What's included */}
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">What's included</p>
                <ul className="space-y-2.5">
                  {[
                    '30-min live interactive class',
                    'Expert certified teacher',
                    'Small batch — max 5 kids',
                    'Personalised feedback',
                    'No credit card required',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 size={15} className="text-green-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonials */}
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, j) => <Star key={j} size={12} className="text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-slate-600 text-sm italic mb-3">"{t.text}"</p>
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-full bg-slate-200 relative overflow-hidden ring-1 ring-slate-100 shrink-0">
                      <Image src={t.img} alt={t.name} fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{t.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
