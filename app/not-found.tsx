import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-lg">
          {/* Big 404 */}
          <div className="relative mb-8">
            <p className="text-[160px] font-black text-primary/10 leading-none select-none">404</p>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl">🎒</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed">
            Looks like this page took a wrong turn. Let&apos;s get your child back on the path to confident English!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-14 px-8 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              Go to Homepage
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center h-14 px-8 bg-slate-100 border-2 border-slate-200 text-slate-800 font-bold rounded-xl hover:bg-slate-200 transition-all"
            >
              Book Free Demo
            </Link>
          </div>

          <p className="mt-10 text-sm text-slate-400">
            Need help?{' '}
            <a href="https://wa.me/917011254904" className="text-primary font-semibold hover:underline">
              Chat on WhatsApp
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
