import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Blush vergelijken — binnenkort" };

export default function BlushPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold">
        Blush-vergelijking komt eraan
      </h1>
      <p className="mt-4 text-lg text-muted">
        We werken aan de beste blush-deals. Bekijk ondertussen onze
        foundation-vergelijking.
      </p>
      <Link
        href="/foundation"
        className="mt-8 inline-block rounded-xl bg-coral px-7 py-4 text-lg font-semibold text-white transition-colors hover:bg-coral-dark"
      >
        Naar foundations
      </Link>
    </div>
  );
}
