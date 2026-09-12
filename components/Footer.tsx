import Link from 'next/link';
import Image from 'next/image';
import { Mail, Youtube, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white px-6 md:px-12 lg:px-20 pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-[1024px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="flex flex-col gap-6">
          <div>
            <Image
              src="/logo.png"
              alt="JuniorSpark Logo"
              width={80}
              height={80}
              className="h-20 w-auto object-contain"
            />
          </div>
          <p className="text-slate-500 font-medium text-sm leading-relaxed">
            Making quality English education accessible and affordable for every child in India.
          </p>
        </div>

        <div>
          <h4 className="text-slate-900 font-black mb-6 uppercase tracking-wider text-xs">Platform</h4>
          <ul className="space-y-4">
            <li><Link href="/#how-it-works" className="text-slate-500 hover:text-primary transition-colors text-sm font-semibold">How it Works</Link></li>
            <li><Link href="/#curriculum" className="text-slate-500 hover:text-primary transition-colors text-sm font-semibold">Curriculum</Link></li>
            <li><Link href="/#pricing" className="text-slate-500 hover:text-primary transition-colors text-sm font-semibold">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-black mb-6 uppercase tracking-wider text-xs">Support</h4>
          <ul className="space-y-4">
            <li><Link href="/#faqs" className="text-slate-500 hover:text-primary transition-colors text-sm font-semibold">FAQs</Link></li>
            <li><Link href="/contact" className="text-slate-500 hover:text-primary transition-colors text-sm font-semibold">Contact Us</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-slate-900 font-black mb-1 uppercase tracking-wider text-xs">Reach out</h4>
          <div className="flex flex-col gap-4">

            <div className="flex items-center gap-3 text-slate-500 text-sm font-semibold">
              <Mail size={18} className="text-primary" />
              info@juniorspark.in
            </div>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61586400512936"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full flex items-center justify-center bg-[#1877F2] text-white hover:opacity-90 hover:scale-105 transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.youtube.com/@JuniorSparkLive/"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full flex items-center justify-center bg-[#FF0000] text-white hover:opacity-90 hover:scale-105 transition-all shadow-sm"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://www.instagram.com/juniorspark.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white hover:opacity-90 hover:scale-105 transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1024px] mx-auto pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} JuniorSpark. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
