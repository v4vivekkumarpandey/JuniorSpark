import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Free Demo Class | JuniorSpark',
  description: 'Book a free 30-minute demo English class for your child. Small batches, expert teachers, live online sessions for kids aged 4–15.',
  alternates: { canonical: 'https://www.juniorspark.in/demo' },
  robots: { index: false, follow: true },
};

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
