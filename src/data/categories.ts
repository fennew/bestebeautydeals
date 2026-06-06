export interface Category {
  name: string;
  slug: string;
  /** Korte omschrijving onder de titel. */
  tagline: string;
  /** Link naar de vergelijk-/zoekflow van deze categorie. */
  compareHref: string;
  /** Link naar de collectie-/dealpagina. */
  dealsHref: string;
  /** Of de categorie al volledig live is. */
  available: boolean;
}

export const categories: Category[] = [
  {
    name: "Foundation",
    slug: "foundation",
    tagline: "Vind jouw perfecte tint en finish",
    compareHref: "/foundation/zoeken",
    dealsHref: "/foundation",
    available: true,
  },
  {
    name: "Mascara",
    slug: "mascara",
    tagline: "Vollere wimpers, beste prijs",
    compareHref: "/mascara",
    dealsHref: "/mascara",
    available: false,
  },
  {
    name: "Blush",
    slug: "blush",
    tagline: "De mooiste, natuurlijke blos",
    compareHref: "/blush",
    dealsHref: "/blush",
    available: false,
  },
  {
    name: "Concealer",
    slug: "concealer",
    tagline: "Dek onzuiverheden moeiteloos",
    compareHref: "/concealer",
    dealsHref: "/concealer",
    available: false,
  },
  {
    name: "Lippen",
    slug: "lippen",
    tagline: "Van nude tot statement",
    compareHref: "/lippen",
    dealsHref: "/lippen",
    available: false,
  },
  {
    name: "Huidverzorging",
    slug: "huidverzorging",
    tagline: "Verzorg en bescherm je huid",
    compareHref: "/huidverzorging",
    dealsHref: "/huidverzorging",
    available: false,
  },
];
