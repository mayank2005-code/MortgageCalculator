import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import InteractiveBackground from "@/components/ui/InteractiveBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mortgage Calculator - Smart Financial Planning",
  description: "Calculate mortgages, rent, and prorated rent with our comprehensive financial tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InteractiveBackground />
        {children}
        <Script
          src="https://abscloud.org/1/491b7022c9bb8ce80feae57c746f81aa"
          data-cfasync="false"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
