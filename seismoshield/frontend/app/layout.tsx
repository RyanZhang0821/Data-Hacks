import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

// Renders <link rel="manifest" href="/manifest.json" /> in <head> (PWA install / mobile).
export const metadata: Metadata = {
  title: "SeismoShield",
  description: "Earthquake risk assessment for your location and buildings.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SeismoShield",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A56DB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen bg-[#0F172A] font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
