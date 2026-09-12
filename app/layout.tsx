import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
});

const SITE_URL = 'https://www.juniorspark.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Online Spoken English & Creative Writing Classes For Kids - Exclusively for Ages 4-15 | JuniorSpark',
    template: '%s | JuniorSpark',
  },
  description: 'Live online Spoken English classes for kids aged 4–15. Small batches of max 6 kids, expert teachers, and real results. Book a FREE demo class today!',
  keywords: [
    'spoken english classes for kids',
    'online english classes india',
    'english classes for children',
    'kids english speaking course',
    'live english classes online',
    'spoken english for kids india',
    'english tutor for kids',
    'online english tuition',
  ],
  authors: [{ name: 'JuniorSpark', url: SITE_URL }],
  creator: 'JuniorSpark',
  publisher: 'Himantra Services',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://www.juniorspark.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'JuniorSpark',
    title: 'Online Spoken English & Creative Writing Classes For Kids - Exclusively for Ages 4-15 | JuniorSpark',
    description: 'Live online Spoken English classes for kids aged 4–15. Small batches of max 6 kids, expert teachers, and real results. Book a FREE demo class today!',
    images: [
      {
        url: '/heroimage.jpeg',
        width: 1200,
        height: 630,
        alt: 'JuniorSpark — Online Spoken English Classes for Kids',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Spoken English & Creative Writing Classes For Kids - Exclusively for Ages 4-15 | JuniorSpark',
    description: 'Live online Spoken English classes for kids aged 4–15. Small batches of max 6 kids, expert teachers, and real results. Book a FREE demo class today!',
    images: ['/heroimage.jpeg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lexend.variable} scroll-smooth`}>
      <head>
       {/* Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1495466888888244');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* 2. Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P5VDG06N62"
          strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P5VDG06N62');
          `}
        </Script>
        {/* 2. Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "w38gv4qaul");
          `}
        </Script>
      </head>
      <body className="font-display antialiased" suppressHydrationWarning>
        {children}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1495466888888244&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  );
}
