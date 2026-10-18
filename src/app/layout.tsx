import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import "./globals.css";

const siteUrl = "https://quarrysoftware.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Quarry Software | Digital Solutions & Engineering",
    template: "%s | Quarry Software",
  },

  description:
    "Quarry Software builds business websites, custom software, AI solutions and automation for modern businesses.",

  applicationName: "Quarry Software",

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Quarry Software",
    url: siteUrl,
    title: "Quarry Software | Digital Solutions & Engineering",
    description:
      "Business websites, custom software, AI solutions and automation built around real business needs.",
    images: [
      {
        url: "/images/quarry/image-01.jpg",
        alt: "Quarry Software digital solutions and engineering",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Quarry Software | Digital Solutions & Engineering",
    description:
      "Business websites, custom software, AI solutions and automation built around real business needs.",
    images: ["/images/quarry/image-01.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-white font-sans text-[#202124] antialiased">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}