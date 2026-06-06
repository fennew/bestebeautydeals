import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Beste Beauty Deals helpt je onafhankelijk de beste beautyproducten te vergelijken op prijs, kwaliteit en reviews.",
};

export default function OverOnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold">Over Beste Beauty Deals</h1>
      <div className="mt-6 space-y-5 text-lg text-muted">
        <p>
          Beste Beauty Deals is opgericht met één doel: vrouwen helpen om zonder
          gedoe het beautyproduct te vinden dat écht bij hun huid past — voor de
          beste prijs.
        </p>
        <p>
          We vergelijken foundations (en binnenkort mascara en blush) op de
          dingen die er toe doen: dekking, finish, huidvriendelijkheid en
          reviews van echte gebruikers. Zo hoef je niet eindeloos te zoeken.
        </p>
        <p>
          Onze redactie beoordeelt producten onafhankelijk. Wanneer we een
          product extra aanraden, lichten we dat duidelijk toe met een badge,
          zodat je altijd weet waar je aan toe bent.
        </p>
      </div>
      <Link
        href="/foundation/zoeken"
        className="mt-8 inline-block rounded-xl bg-coral px-7 py-4 text-lg font-semibold text-white transition-colors hover:bg-coral-dark"
      >
        Vind jouw perfecte foundation
      </Link>
    </div>
  );
}
