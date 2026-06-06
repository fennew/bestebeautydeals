import { Suspense } from "react";
import { ResultatenClient } from "./ResultatenClient";

export const metadata = {
  title: "Jouw foundation-deals",
};

export default function ResultatenPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12">Deals laden…</div>}>
      <ResultatenClient />
    </Suspense>
  );
}
