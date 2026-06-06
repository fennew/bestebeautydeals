import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bestebeautydeals.nl"),
  title: {
    default: "Beste Beauty Deals — Vergelijk en vind jouw perfecte beautyproduct",
    template: "%s | Beste Beauty Deals",
  },
  description:
    "Vergelijk de beste foundations, mascara's en meer op prijs, kwaliteit en reviews. Vind altijd de deal die bij jouw huid past.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
