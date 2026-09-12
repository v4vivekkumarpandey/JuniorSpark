import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with JuniorSpark. We\'re happy to answer your questions about our online Spoken English classes for kids.',
  alternates: { canonical: 'https://www.juniorspark.in/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
