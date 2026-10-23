/**
 * Central content & asset registry for Dream Box Photography & Films.
 *
 * Business details below are taken from the live client site
 * (dreamboxphotography.in) and are authentic. Imagery uses high-quality
 * curated placeholders — swap the `src` values here (and nowhere else)
 * to drop in real Dream Box photographs. Every image is referenced through
 * this file so the whole site re-skins from one place.
 */

export const studio = {
  name: "Dream Box",
  fullName: "Dream Box Photography & Films",
  tagline: "Forever Artistic!",
  owner: "Charlston Dsouza",
  team: ["Charlston Dsouza", "Ashwin", "Nidhi"],
  city: "Mumbai",
  address:
    "Ivorick, St. Cyril Road, Bandra West, Mumbai — 400050, Maharashtra, India",
  email: "info@dreamboxphotography.in",
  phonePrimary: "9930535212",
  phoneSecondary: "7506319011",
  // E.164 for wa.me — Indian numbers prefixed with country code 91.
  whatsapp: "919930535212",
  socials: {
    instagram: "https://www.instagram.com/dreamboxphotography.in/",
    facebook: "https://www.facebook.com/profile.php?id=100010239938040",
    youtube: "https://www.youtube.com/@charlstondsouza2097",
    pinterest: "https://www.pinterest.com/dsouzacharlston",
  },
  url: "https://www.dreamboxphotography.in",
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${studio.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const telLink = `tel:+91${studio.phonePrimary}`;

/* ------------------------------------------------------------------ */
/*  Imagery                                                            */
/* ------------------------------------------------------------------ */

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroImages = {
  // Primary cinematic hero still — large graded full-bleed image.
  main: U("photo-1511285560929-80b456fea0bc", 2400),
  // Centre portrait for the reference-style composition.
  portrait: U("photo-1529626455594-4ff0802cfb7e", 1400),
  // Small photographer avatar chip.
  avatar: U("photo-1554048612-b6a482bc67e5", 200),
  // Two small overlapping framed stills with labels.
  frames: [
    { src: U("photo-1583939003579-730e3918a45a", 700), label: "Candid" },
    { src: U("photo-1519225421980-715cb0215aed", 700), label: "Wedding Films" },
  ],
  // Rotating film-strip stills (kept for reference elsewhere).
  strip: [
    U("photo-1583939003579-730e3918a45a", 800),
    U("photo-1606216794074-735e91aa2c92", 900),
    U("photo-1537633552985-df8429e8048b", 800),
    U("photo-1511285560929-80b456fea0bc", 900),
  ],
};

export type Story = {
  slug: string;
  index: string;
  couple: string;
  title: string;
  location: string;
  eventType: string;
  year: string;
  excerpt: string;
  intro: string;
  cover: string;
  // 'wide' | 'portrait' are layout hints for the home showcase rhythm.
  coverLayout: "wide" | "portrait" | "split";
  accent?: boolean;
  gallery: { src: string; orientation: "portrait" | "landscape"; alt: string }[];
  film?: string; // optional YouTube embed id
};

export const stories: Story[] = [
  {
    slug: "ayra-and-ryan",
    index: "01",
    couple: "Ayra & Ryan",
    title: "An Afternoon Made of Gold",
    location: "Alibaug, Maharashtra",
    eventType: "Wedding",
    year: "2024",
    excerpt:
      "A seaside vow renewed under a sky that refused to stop glowing.",
    intro:
      "Some days arrive already knowing they will be remembered. Ayra and Ryan married where the Arabian Sea meets the sand, and the light did the rest — folding gold over every glance, every held breath, every quiet promise.",
    cover: U("photo-1519741497674-611481863552", 2000),
    coverLayout: "wide",
    accent: true,
    film: "ScMzIvxBSi4",
    gallery: [
      { src: U("photo-1606216794074-735e91aa2c92"), orientation: "landscape", alt: "The couple walking along the shoreline at golden hour" },
      { src: U("photo-1583939003579-730e3918a45a"), orientation: "portrait", alt: "Bride portrait in warm afternoon light" },
      { src: U("photo-1511285560929-80b456fea0bc"), orientation: "landscape", alt: "Guests celebrating at the reception" },
      { src: U("photo-1537633552985-df8429e8048b"), orientation: "portrait", alt: "Candid moment between the couple" },
      { src: U("photo-1595407753234-0882f1e77954"), orientation: "landscape", alt: "The ceremony setup against the sea" },
    ],
  },
  {
    slug: "candida-and-neil",
    index: "02",
    couple: "Candida & Neil",
    title: "Keen Eye, Quiet Heart",
    location: "Bandra, Mumbai",
    eventType: "Wedding",
    year: "2024",
    excerpt:
      "A city wedding where every small detail was a love letter.",
    intro:
      "In the lanes of Bandra, where the old church bells still keep time, Candida and Neil built a day out of details — the lace, the laughter, the long table where two families became one.",
    cover: U("photo-1529636798458-92182e662485", 1400),
    coverLayout: "portrait",
    gallery: [
      { src: U("photo-1522673607200-164d1b6ce486"), orientation: "landscape", alt: "The wedding ceremony in a historic church" },
      { src: U("photo-1519225421980-715cb0215aed"), orientation: "portrait", alt: "Bride getting ready" },
      { src: U("photo-1583939411023-14783179e581"), orientation: "landscape", alt: "First dance under warm lights" },
      { src: U("photo-1511739001486-6bfe10ce785f"), orientation: "portrait", alt: "Detail of the bridal bouquet" },
    ],
  },
  {
    slug: "sue-ann-and-marc",
    index: "03",
    couple: "Sue Ann & Marc",
    title: "Creativity, Innovation, Us",
    location: "Lonavala Hills",
    eventType: "Pre-Wedding",
    year: "2023",
    excerpt: "A pre-wedding story told in mist, monsoon and movement.",
    intro:
      "High in the Lonavala hills, the monsoon wrote its own script. Sue Ann and Marc chased the fog, and we chased them — a pre-wedding film built from motion, mist and the gentlest kind of chaos.",
    cover: U("photo-1600298881974-6be191ceeda1", 2000),
    coverLayout: "split",
    gallery: [
      { src: U("photo-1465495976277-4387d4b0b4c6"), orientation: "landscape", alt: "Couple embracing in misty hills" },
      { src: U("photo-1518621736915-f3b1c41bfd00"), orientation: "portrait", alt: "Walking through the fog" },
      { src: U("photo-1469371670807-013ccf25f16a"), orientation: "landscape", alt: "Monsoon landscape at dusk" },
      { src: U("photo-1507504031003-b417219a0fde"), orientation: "portrait", alt: "Quiet portrait in the rain" },
    ],
  },
  {
    slug: "sherwin-and-rhea",
    index: "04",
    couple: "Sherwin & Rhea",
    title: "The Best Effort, Always",
    location: "Goa",
    eventType: "Celebration",
    year: "2023",
    excerpt: "A sun-drunk Goan celebration that ran until the stars came out.",
    intro:
      "Goa doesn't do things quietly. Sherwin and Rhea's celebration spilled from beach to garden to dancefloor, and we kept the camera running until the last sparkler burned out.",
    cover: U("photo-1464366400600-7168b8af9bc3", 2000),
    coverLayout: "wide",
    gallery: [
      { src: U("photo-1470104240373-bc1812eccd6e"), orientation: "landscape", alt: "Beachside celebration at sunset" },
      { src: U("photo-1519671482749-fd09be7ccebf"), orientation: "portrait", alt: "Couple dancing under string lights" },
      { src: U("photo-1533090161767-e6ffed986c88"), orientation: "landscape", alt: "Guests toasting the couple" },
      { src: U("photo-1545232979-8bf68ee9b1af"), orientation: "portrait", alt: "Night portrait with sparklers" },
    ],
  },
  {
    slug: "shalo-and-aaron",
    index: "05",
    couple: "Shalo & Aaron",
    title: "Every Small Detail",
    location: "Pune",
    eventType: "Wedding",
    year: "2022",
    excerpt: "An intimate wedding where emotion lived in the little things.",
    intro:
      "Shalo and Aaron asked us to capture the small things — the trembling hands, the whispered vows, the tear a father tried to hide. So we did. All of it.",
    cover: U("photo-1583939411023-14783179e581", 1400),
    coverLayout: "portrait",
    gallery: [
      { src: U("photo-1460978812857-470ed1c77af0"), orientation: "landscape", alt: "Emotional moment during the ceremony" },
      { src: U("photo-1591604466107-ec97de577aff"), orientation: "portrait", alt: "Close detail of wedding rings" },
      { src: U("photo-1522413452208-996ff3f3e740"), orientation: "landscape", alt: "Family gathered together" },
      { src: U("photo-1550005809-91ad75fb315f"), orientation: "portrait", alt: "Quiet bridal portrait" },
    ],
  },
];

export const getStory = (slug: string) =>
  stories.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */

export type Service = {
  n: string;
  name: string;
  blurb: string;
  image: string;
};

export const services: Service[] = [
  {
    n: "01",
    name: "Weddings",
    blurb:
      "The whole day, start to last dance — documented like the cinematic event it is.",
    image: U("photo-1519741497674-611481863552", 1400),
  },
  {
    n: "02",
    name: "Pre-Wedding",
    blurb:
      "Stories told before the vows — in landscapes, cities and moods that are entirely yours.",
    image: U("photo-1465495976277-4387d4b0b4c6", 1400),
  },
  {
    n: "03",
    name: "Engagements",
    blurb:
      "The in-between chapter. The yes that starts everything, framed with intention.",
    image: U("photo-1529636798458-92182e662485", 1400),
  },
  {
    n: "04",
    name: "Wedding Films",
    blurb:
      "Cinematic films that let you hear the day again — the vows, the music, the laughter.",
    image: U("photo-1600298881974-6be191ceeda1", 1400),
  },
  {
    n: "05",
    name: "Celebrations & Events",
    blurb:
      "Receptions, anniversaries, corporate evenings — energy captured as it happens.",
    image: U("photo-1464366400600-7168b8af9bc3", 1400),
  },
  {
    n: "06",
    name: "Portraits",
    blurb:
      "Newborns, families, individuals — honest portraiture with an editorial eye.",
    image: U("photo-1507003211169-0a1dd7228f2d", 1400),
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials — verbatim from the client site                       */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    name: "Ayra Rodrigues",
    quote:
      "These guys do their job so effortlessly. Moments worth for a lifetime.",
  },
  {
    name: "Candida Barrie",
    quote:
      "Charlston clearly has a keen eye for his craft and captured our special moments.",
  },
  {
    name: "Sue Ann",
    quote:
      "Charlston is a gifted photographer with a great blend of creativity and innovation.",
  },
  {
    name: "Sherwin Vaz",
    quote: "Charlston always puts his best effort to deliver quality results.",
  },
  {
    name: "Shalo Aranha",
    quote:
      "A big thank you for capturing every small detail and emotions.",
  },
];

/* ------------------------------------------------------------------ */
/*  Emotional collage — curated wall of frames                         */
/* ------------------------------------------------------------------ */

export const collage = [
  U("photo-1511285560929-80b456fea0bc", 900),
  U("photo-1537633552985-df8429e8048b", 700),
  U("photo-1583939003579-730e3918a45a", 800),
  U("photo-1522673607200-164d1b6ce486", 900),
  U("photo-1519225421980-715cb0215aed", 700),
  U("photo-1606216794074-735e91aa2c92", 900),
  U("photo-1519671482749-fd09be7ccebf", 700),
  U("photo-1470104240373-bc1812eccd6e", 900),
];

export const navLinks = [
  { label: "Stories", href: "/#stories" },
  { label: "Services", href: "/#services" },
  { label: "Studio", href: "/#studio" },
  { label: "Contact", href: "/#contact" },
];

/* ------------------------------------------------------------------ */
/*  Filmstrip carousel slides — "The archive" section                  */
/* ------------------------------------------------------------------ */

export type CarouselSlide = {
  id: string;
  title: string; // newline splits into reveal lines
  image: string;
  credit: string;
  meta: string[];
  accent: string; // hue the backdrop grades to
};

export const carouselSlides: CarouselSlide[] = [
  {
    id: "ayra",
    title: "Ayra &\nRyan",
    image: U("photo-1519741497674-611481863552", 1200),
    credit: "BY DREAM BOX.",
    meta: ["WEDDING", "2024", "ALIBAUG"],
    accent: "#C9B79C",
  },
  {
    id: "candida",
    title: "Candida\n& Neil",
    image: U("photo-1529636798458-92182e662485", 1200),
    credit: "BY DREAM BOX.",
    meta: ["WEDDING", "2024", "BANDRA"],
    accent: "#8fa0bd",
  },
  {
    id: "sueann",
    title: "Sue Ann\n& Marc",
    image: U("photo-1465495976277-4387d4b0b4c6", 1200),
    credit: "BY DREAM BOX.",
    meta: ["PRE-WEDDING", "2023", "LONAVALA"],
    accent: "#9bb0a6",
  },
  {
    id: "sherwin",
    title: "Sherwin\n& Rhea",
    image: U("photo-1464366400600-7168b8af9bc3", 1200),
    credit: "BY DREAM BOX.",
    meta: ["CELEBRATION", "2023", "GOA"],
    accent: "#d8a07a",
  },
  {
    id: "shalo",
    title: "Shalo\n& Aaron",
    image: U("photo-1583939411023-14783179e581", 1200),
    credit: "BY DREAM BOX.",
    meta: ["WEDDING", "2022", "PUNE"],
    accent: "#C9B79C",
  },
  {
    id: "golden",
    title: "Golden\nHour",
    image: U("photo-1606216794074-735e91aa2c92", 1200),
    credit: "BY DREAM BOX.",
    meta: ["CANDID", "SERIES", "MUMBAI"],
    accent: "#e0b36a",
  },
  {
    id: "mist",
    title: "In the\nMist",
    image: U("photo-1518621736915-f3b1c41bfd00", 1200),
    credit: "BY DREAM BOX.",
    meta: ["PRE-WEDDING", "MONSOON", "HILLS"],
    accent: "#8aa0b8",
  },
  {
    id: "firstdance",
    title: "First\nDance",
    image: U("photo-1583939411023-14783179e581", 1200),
    credit: "BY DREAM BOX.",
    meta: ["FILM", "STILL", "RECEPTION"],
    accent: "#b89a9a",
  },
  {
    id: "sparklers",
    title: "After\nDark",
    image: U("photo-1545232979-8bf68ee9b1af", 1200),
    credit: "BY DREAM BOX.",
    meta: ["CELEBRATION", "NIGHT", "GOA"],
    accent: "#7f88b5",
  },
];
