import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Lippen vergelijken — binnenkort" };

export default function LippenPage() {
  return <ComingSoon category="Lippen" />;
}
