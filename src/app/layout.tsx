import type { Metadata } from 'next';
import {
  Geist, Geist_Mono, Rubik_Mono_One, Comfortaa, Onest,
} from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const rubikMonoOne = Rubik_Mono_One({
  variable: '--font-hero',
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
});

const comfortaa = Comfortaa({
  variable: '--font-heading',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const onest = Onest({
  variable: '--font-body',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Domovenok',
    template: '%s | Domovenok',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${rubikMonoOne.variable} ${comfortaa.variable} ${onest.variable} antialiased`}>
        <Analytics />
        {/* <SpeedInsights /> */}
        {children}
      </body>
    </html>
  );
}
