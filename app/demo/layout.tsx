import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Free Demo Class',
  description: 'Book your FREE Spoken English demo class for your child in 4 simple steps. Live classes, small batches, expert teachers. Join 4,000+ happy parents.',
  alternates: { canonical: '/demo' },
  openGraph: {
    title: 'Book a Free Demo Class — JuniorSpark',
    description: 'Book your FREE Spoken English demo class for your child in 4 simple steps. Live classes, small batches, expert teachers.',
    url: 'https://www.juniorspark.in/demo',
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
