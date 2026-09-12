import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking Confirmed — Free Demo Class',
  description: 'Your free demo class has been booked successfully. Check your WhatsApp for the class link.',
  alternates: { canonical: 'https://www.juniorspark.in/thank-you' },
  robots: { index: false, follow: false },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
