import {
  Geist, Geist_Mono, Rubik_Mono_One, Comfortaa, Onest,
} from 'next/font/google';

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

/** Class names that expose all site fonts as CSS variables (shared by every root layout and the 404 page). */
export const fontVariableClasses = `${geistSans.variable} ${geistMono.variable} ${rubikMonoOne.variable} ${comfortaa.variable} ${onest.variable} antialiased`;
