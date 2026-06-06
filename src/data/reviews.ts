import type { Review } from "./types";

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Marjan de Vries",
    location: "Utrecht",
    rating: 5,
    quote:
      "Eindelijk een foundation die niet in mijn rimpeltjes gaat zitten. De MAY Radiance dekt mooi en voelt de hele dag comfortabel.",
    productName: "MAY Radiance Foundation",
  },
  {
    id: "r2",
    name: "Annemiek B.",
    location: "Eindhoven",
    rating: 5,
    quote:
      "Door de vergelijking koos ik bewust voor MAY. Top advies, en ik bespaarde ook nog op de prijs. Echt een aanrader.",
  },
  {
    id: "r3",
    name: "Carla Jansen",
    location: "Groningen",
    rating: 5,
    quote:
      "Heel fijn dat je hier op huidtype kunt zoeken. Voor mijn droge 50+ huid kwam er meteen een passende deal uit.",
    productName: "MAY Radiance Foundation",
  },
];

export const trustStats = [
  { value: "200.000+", label: "vrouwen vergeleken hun foundation" },
  { value: "9,2", label: "gemiddelde klantwaardering" },
  { value: "30 dagen", label: "niet goed, geld terug" },
];
