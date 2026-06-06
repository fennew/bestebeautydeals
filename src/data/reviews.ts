import type { Review } from "./types";

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Marjan de Vries",
    location: "Utrecht",
    rating: 5,
    title: "Eindelijk de juiste foundation",
    date: "2 dagen geleden",
    verified: true,
    quote:
      "Eindelijk een foundation die niet in mijn rimpeltjes gaat zitten. De MAY Radiance dekt mooi en voelt de hele dag comfortabel.",
    productName: "MAY Radiance Foundation",
  },
  {
    id: "r2",
    name: "Annemiek B.",
    location: "Eindhoven",
    rating: 5,
    title: "Top advies én bespaard",
    date: "5 dagen geleden",
    verified: true,
    quote:
      "Door de vergelijking koos ik bewust voor MAY. Top advies, en ik bespaarde ook nog op de prijs. Echt een aanrader.",
  },
  {
    id: "r3",
    name: "Carla Jansen",
    location: "Groningen",
    rating: 5,
    title: "Perfect voor mijn 50+ huid",
    date: "1 week geleden",
    verified: true,
    quote:
      "Heel fijn dat je hier op huidtype kunt zoeken. Voor mijn droge 50+ huid kwam er meteen een passende deal uit.",
    productName: "MAY Radiance Foundation",
  },
  {
    id: "r4",
    name: "Petra Hoekstra",
    location: "Zwolle",
    rating: 5,
    title: "Bespaarde tientallen euro's",
    date: "1 week geleden",
    verified: true,
    quote:
      "Ik betaalde altijd te veel voor mijn foundation. Via bestebeautydeals vond ik snel een betere én voordeligere optie.",
  },
  {
    id: "r5",
    name: "Sandra K.",
    location: "Breda",
    rating: 5,
    title: "Zo overzichtelijk",
    date: "2 weken geleden",
    verified: true,
    quote:
      "Geen eindeloos zoeken meer. In een paar klikken zag ik welke foundation het beste bij mij past. Heerlijk overzichtelijk.",
  },
  {
    id: "r6",
    name: "Ingrid M.",
    location: "Den Haag",
    rating: 4,
    title: "Fijne vergelijking",
    date: "3 weken geleden",
    verified: true,
    quote:
      "Prettige site die echt rekening houdt met je huid. De aanbevolen foundation beviel me erg goed.",
  },
];

export const trustStats = [
  { value: "200.000+", label: "vrouwen vergeleken hun foundation" },
  { value: "9,3", label: "gemiddelde beoordeling van onze bezoekers" },
  { value: "€10", label: "gemiddeld goedkoper via onze vergelijking" },
];
