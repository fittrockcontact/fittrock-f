import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/firebase/auth-context";
import FirebaseAnalyticsTracker from "@/components/storefront/FirebaseAnalyticsTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fittrock.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fittrock Ergonomics | Premium Height Adjustable Standing Desks & Chairs",
    template: "%s | Fittrock Ergonomics",
  },
  description: "Upgrade your posture with dual-motor height adjustable electric standing desks, lumbar mesh chairs, and heavy duty monitor arms engineered in Pune, India.",
  keywords: [
    "standing desk india",
    "dual motor electric standing desk",
    "height adjustable desk",
    "ergonomic desk pune",
    "motorized table",
    "fittrock ergonomics",
    "sit stand desk",
    "lumbar ergonomic chair",
  ],
  authors: [{ name: "Fittrock Ergonomics", url: siteUrl }],
  creator: "FITTROCK ERGONOMICS LLP",
  publisher: "FITTROCK ERGONOMICS LLP",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Fittrock Ergonomics",
    title: "Fittrock Ergonomics | Premium Height Adjustable Standing Desks & Chairs",
    description: "Upgrade your posture with dual-motor height adjustable electric standing desks, lumbar mesh chairs, and heavy duty monitor arms engineered in Pune, India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fittrock Ergonomics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fittrock Ergonomics | Premium Height Adjustable Standing Desks & Chairs",
    description: "Dual-motor height adjustable standing desks & ergonomic seating engineered in Pune, India.",
    images: ["/og-image.png"],
    creator: "@fittrockindia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png" },
      { url: "/logo.ico", sizes: "any" },
    ],
    shortcut: "/logo.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <AuthProvider>
          <FirebaseAnalyticsTracker />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

