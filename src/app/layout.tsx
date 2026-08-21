import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Tanjey | Task Timers & Asana Management',
  description: 'Tanjey seamlessly integrates with Asana to provide task countdown timers, custom ticket IDs, and workflow automation.',
  openGraph: {
    title: 'Tanjey | Task Timers & Asana Management',
    description: 'Track time and manage tasks seamlessly with Tanjey for Asana.',
    url: 'https://www.tanjey.com',
    siteName: 'Tanjey',
    type: 'website',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
    shortcut: 'icon.svg',
    
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
