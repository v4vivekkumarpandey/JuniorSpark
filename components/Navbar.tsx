'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How it works', href: '/#how-it-works' },
    { name: 'Curriculum', href: '/#curriculum' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="whitespace-nowrap border-b border-solid border-slate-200 px-6 md:px-12 lg:px-20 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1024px] mx-auto flex items-center justify-between w-full">
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo.jpeg"
            alt="JuniorSpark Logo"
            width={180}
            height={90}
            className="h-20 w-auto object-contain mix-blend-multiply -my-3"
            priority
          />
        </Link>

        <div className="hidden md:flex flex-1 justify-end gap-10 items-center">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-600 text-sm font-semibold hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <Link
            href="/book-demo"
            className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-11 px-5 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            Book Demo
          </Link>
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 md:hidden shadow-xl"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-600 text-lg font-semibold hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/book-demo"
                onClick={() => setIsOpen(false)}
                className="w-full bg-primary text-white text-center py-4 rounded-xl font-bold"
              >
                Book Free Demo
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
