'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, addDays, isSameDay } from 'date-fns';
import {
  ChevronRight,
  Calendar as CalendarIcon,
  Verified,
  Gamepad2,
  User,
  Users,
  Smile,
  CheckCircle2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const bookingSchema = z.object({
  ageGroup: z.string().min(1, "Please select an age group"),
  date: z.string().min(1, "Please pick a date"),
  time: z.string().min(1, "Please pick a time"),
  parentName: z.string().min(2, "Parent's name is required"),
  email: z.string().email("Invalid email address"),
  childName: z.string().min(2, "Child's name is required"),
  whatsapp: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit WhatsApp number"),
});

type BookingForm = z.infer<typeof bookingSchema>;

export default function BookDemoPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = React.useState<Date>(addDays(new Date(), 1));
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string>('');
  const [dateError, setDateError] = React.useState<string>('');

  const tomorrow = addDays(new Date(), 1);
  const nextAvailableDates = React.useMemo(() => {
    const dates: Date[] = [];
    let currentDate = new Date(tomorrow);

    while (dates.length < 6) {
      if (currentDate.getDay() !== 0) {
        dates.push(new Date(currentDate));
      }
      currentDate = addDays(currentDate, 1);
    }

    return dates;
  }, [tomorrow]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: format(tomorrow, 'yyyy-MM-dd'),
      time: '05:00 PM',
    }
  });

  const selectedAge = watch('ageGroup');
  const selectedTime = watch('time');
  const formDate = watch('date');

  const onSubmit = async (data: BookingForm) => {
    try {
      setSubmitError('');

      // Send booking data to API route
      const response = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send booking confirmation');
      }

      // Success - redirect to thank you page
      router.push('/thank-you');

    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again or contact support.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full px-6 md:px-20 py-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8 text-slate-500 text-sm font-medium">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900">Book Demo</span>
        </div>

        {/* Page Title 1 */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Book Demo Class</h1>
          <p className="text-lg text-slate-600 max-w-2xl">Start your child&apos;s journey to fluent English today. Join thousands of kids from across India in our fun, interactive live classes.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Form Section */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

              {/* Error Alert */}
              {submitError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-red-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-red-800">Booking Failed</p>
                      <p className="text-sm text-red-700">{submitError}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 1. Age Group Selection */}
              <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">1</span>
                  <h2 className="text-2xl font-bold">Select your child&apos;s age group</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: '5-7', label: 'Ages 5-7', sub: 'Beginner', emoji: '🎒' },
                    { id: '8-11', label: 'Ages 8-11', sub: 'Intermediate', emoji: '📚' },
                    { id: '12-15', label: 'Ages 12-15', sub: 'Advanced', emoji: '🎓' },
                  ].map((age) => (
                    <label key={age.id} className="relative cursor-pointer">
                      <input
                        type="radio"
                        value={age.id}
                        {...register('ageGroup')}
                        className="peer sr-only"
                      />
                      <div className={`p-6 border-2 rounded-xl transition-all text-center hover:bg-slate-50 ${selectedAge === age.id ? 'border-primary bg-primary/5' : 'border-slate-100'}`}>
                        <span className="text-3xl mb-2 block">{age.emoji}</span>
                        <p className="font-bold text-lg">{age.label}</p>
                        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">{age.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.ageGroup && <p className="text-red-500 text-sm mt-2">{errors.ageGroup.message}</p>}
              </section>

              {/* 2. Schedule Selection */}
              <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">2</span>
                  <h2 className="text-2xl font-bold">Pick a convenient time</h2>
                </div>

                {/* Mini Calendar Slider */}
                <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
                  {nextAvailableDates.map((date, i) => {
                    const isSelected = isSameDay(new Date(formDate), date);
                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => {
                          setSelectedDate(date);
                          setValue('date', format(date, 'yyyy-MM-dd'));
                          setShowCalendar(false);
                        }}
                        className={`flex flex-col items-center min-w-[80px] p-3 rounded-xl transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-slate-100 hover:bg-slate-200'}`}
                      >
                        <span className={`text-xs font-medium uppercase ${isSelected ? 'opacity-80' : 'text-slate-500'}`}>
                          {i === 0 ? 'Tomorrow' : format(date, 'EEE')}
                        </span>
                        <span className="text-xl font-bold">{format(date, 'd')}</span>
                      </button>
                    );
                  })}

                  {/* Custom Calendar Option */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCalendar(!showCalendar)}
                      className={`flex flex-col items-center justify-center min-w-[80px] h-full p-3 rounded-xl border-2 border-dashed transition-colors ${showCalendar ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 text-slate-400 hover:border-primary hover:text-primary'}`}
                    >
                      <CalendarIcon size={24} />
                      <span className="text-[10px] font-bold uppercase mt-1">Other</span>
                    </button>
                    {showCalendar && (
                      <div className="absolute top-full right-0 mt-2 z-10 bg-white p-4 shadow-2xl rounded-xl border border-slate-200 w-64">
                        <label className="text-sm font-semibold text-slate-700 block mb-2">Pick a weekday</label>
                        <input
                          type="date"
                          min={format(tomorrow, 'yyyy-MM-dd')}
                          className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                          onChange={(e) => {
                            const [year, month, day] = e.target.value.split('-').map(Number);
                            const chosenDate = new Date(year, month - 1, day);

                            if (chosenDate.getDay() === 0) {
                              setDateError('Sundays are unavailable. Please choose another day.');
                              return;
                            }

                            setDateError('');
                            setSelectedDate(chosenDate);
                            setValue('date', e.target.value);
                            setShowCalendar(false);
                          }}
                        />
                        {dateError ? (
                          <p className="text-xs text-red-500 mt-2">{dateError}</p>
                        ) : (
                          <p className="text-xs text-slate-500 mt-2">Weekdays only</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setValue('time', t)}
                      className={`py-3 px-4 border rounded-lg text-sm font-bold transition-all ${selectedTime === t ? 'bg-primary/10 border-primary text-primary' : 'border-slate-200 hover:border-primary hover:text-primary'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-4 italic">* All times are in IST (Indian Standard Time)</p>
              </section>

              {/* 3. Contact Details */}
              <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">3</span>
                  <h2 className="text-2xl font-bold">Contact Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Parent&apos;s Name</label>
                    <input
                      {...register('parentName')}
                      className={`w-full px-4 py-3 rounded-xl border bg-transparent focus:ring-2 focus:ring-primary outline-none ${errors.parentName ? 'border-red-500' : 'border-slate-200'}`}
                      placeholder="Enter your name"
                      type="text"
                    />
                    {errors.parentName && <p className="text-red-500 text-xs">{errors.parentName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input
                      {...register('email')}
                      className={`w-full px-4 py-3 rounded-xl border bg-transparent focus:ring-2 focus:ring-primary outline-none ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                      placeholder="name@example.com"
                      type="email"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Child&apos;s Name</label>
                    <input
                      {...register('childName')}
                      className={`w-full px-4 py-3 rounded-xl border bg-transparent focus:ring-2 focus:ring-primary outline-none ${errors.childName ? 'border-red-500' : 'border-slate-200'}`}
                      placeholder="Enter child's name"
                      type="text"
                    />
                    {errors.childName && <p className="text-red-500 text-xs">{errors.childName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">WhatsApp Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">+91</span>
                      <input
                        {...register('whatsapp')}
                        className={`w-full pl-14 pr-4 py-3 rounded-xl border bg-transparent focus:ring-2 focus:ring-primary outline-none ${errors.whatsapp ? 'border-red-500' : 'border-slate-200'}`}
                        placeholder="10-digit mobile number"
                        type="tel"
                      />
                    </div>
                    {errors.whatsapp && <p className="text-red-500 text-xs">{errors.whatsapp.message}</p>}
                    <p className="text-[10px] text-primary flex items-center gap-1 mt-1 font-medium uppercase">
                      <Verified size={14} /> We&apos;ll send the class link on WhatsApp
                    </p>
                  </div>
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full mt-10 bg-primary text-white text-lg font-extrabold py-5 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking & Get Link'}
                </button>
                <p className="text-center text-sm text-slate-500 mt-4">No credit card required. Cancel anytime.</p>
              </section>
            </form>
          </div>

          {/* Sidebar Section */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
              <div className="h-32 bg-primary flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full -translate-x-10 -translate-y-10"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
                </div>
                <h3 className="text-white text-2xl font-bold relative z-10">What to Expect</h3>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-slate-600 text-sm leading-relaxed">Our demo classes are designed to be fun and stress-free for kids. It&apos;s the perfect way to see how we teach.</p>
                <ul className="space-y-4">
                  {[
                    { icon: <Gamepad2 size={20} />, title: 'Interactive Games', desc: 'Learning through play and vocabulary puzzles.' },
                    { icon: <User size={20} />, title: 'Live Expert Teacher', desc: 'Certified teachers who love working with kids.' },
                    { icon: <Users size={20} />, title: 'Small Groups', desc: 'Maximum of 4-5 kids for personal attention.' },
                    { icon: <Smile size={20} />, title: 'Low Pressure', desc: 'Focus on building confidence, not correcting errors.' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-slate-100">
                  <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white relative overflow-hidden">
                          <Image src={`https://picsum.photos/seed/kid${i}/100/100`} alt="Happy kid" fill className="object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold border-2 border-white">5k+</div>
                    </div>
                    <p className="text-xs font-medium">5,000+ kids have already joined!</p>
                  </div>
                </div>
              </div>
            </div>


          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
