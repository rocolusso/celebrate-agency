import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Домовой - Организация детских праздников в Бельцах",
    template: "%s | Домовой"
  },
  description: "Профессиональные аниматоры для детских праздников в Бельцах. 12 персонажей на выбор. Программа 1-1.5 часа от 2500 лей. Звоните: 079181825, 078684285",
  keywords: ["аниматоры", "детские праздники", "Бельцы", "день рождения", "организация праздников"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Домовой",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
