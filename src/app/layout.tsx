import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { MetaPixel } from "@/components/MetaPixel";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.bestebeautydeals.nl";
const SITE_TITLE =
  "Beste Beauty Deals — Vergelijk en vind jouw perfecte beautyproduct";
const SITE_DESCRIPTION =
  "Vergelijk de beste foundations, mascara's en meer op prijs, kwaliteit en reviews. Vind altijd de deal die bij jouw huid past.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Beste Beauty Deals",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Beste Beauty Deals",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: "Beste Beauty Deals",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-charcoal">
        <MetaPixel />
        <PageViewTracker />
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
