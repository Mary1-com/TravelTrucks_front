import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header/Header";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://travel-trucks-front-roan.vercel.app",
  ),

  title: {
    default: "TravelTrucks",
    template: "%s | TravelTrucks",
  },

  description:
    "Explore, compare, and book campers for your next unforgettable journey.",

  applicationName: "TravelTrucks",

  keywords: [
    "camper rental",
    "campervan",
    "motorhome",
    "travel",
    "TravelTrucks",
  ],

  authors: [
    {
      name: "Maryna Vinnikova",
    },
  ],

  creator: "Maryna Vinnikova",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "TravelTrucks",
    title: "TravelTrucks — Camper Rental",
    description:
      "Explore, compare, and book campers for your next unforgettable journey.",
    images: [
      {
        url: "/images/hero.webp",
        alt: "TravelTrucks camper rental",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TravelTrucks — Camper Rental",
    description:
      "Explore, compare, and book campers for your next unforgettable journey.",
    images: ["/images/hero.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={inter.variable}
      data-scroll-behavior="smooth"
    >
      <body>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}