import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Concealer vergelijken — binnenkort" };

export default function ConcealerPage() {
  return <ComingSoon category="Concealer" />;
}
