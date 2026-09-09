import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Free Demo Class',
  description: 'Book your FREE 30-minute Spoken English demo class for your child. Choose a date, time, and get instant WhatsApp confirmation. No credit card required.',
  alternates: { canonical: '/book-demo' },
  openGraph: {
    title: 'Book a Free Demo Class — JuniorSpark',
    description: 'Book your FREE 30-minute Spoken English demo class for your child. No credit card required.',
    url: 'https://www.juniorspark.in/book-demo',
  },
};

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
