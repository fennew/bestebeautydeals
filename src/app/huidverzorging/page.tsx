import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Huidverzorging vergelijken — binnenkort" };

export default function HuidverzorgingPage() {
  return <ComingSoon category="Huidverzorging" />;
}
