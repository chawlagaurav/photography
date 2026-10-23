import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Cormorant_Garamond,
  DM_Sans,
  Space_Grotesk,
  Anton,
} from "next/font/google";
import "./globals.css";
import { studio } from "@/lib/content";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Loader from "@/components/ui/Loader";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  style: ["normal", "italic"],
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const description =
  "Dream Box Photography & Films — cinematic wedding photography and films in Mumbai. Candid, editorial storytelling for weddings, pre-weddings, engagements and celebrations.";

export const metadata: Metadata = {
  metadataBase: new URL(studio.url),
  title: {
    default: `${studio.fullName} — Cinematic Wedding Photography in Mumbai`,
    template: `%s · ${studio.name}`,
  },
  description,
  keywords: [
    "wedding photographers in Mumbai",
    "candid wedding photographers",
    "wedding photography and films",
    "pre-wedding photography Mumbai",
    "event photography Mumbai",
    "Bandra wedding photographer",
    "Dream Box Photography",
  ],
  authors: [{ name: studio.owner }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: studio.url,
    title: `${studio.fullName} — Cinematic Wedding Photography`,
    description,
    siteName: studio.fullName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${studio.fullName}`,
    description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: studio.url },
};

export const viewport: Viewport = {
  themeColor: "#171717",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": studio.url,
  name: studio.fullName,
  image: studio.url,
  url: studio.url,
  telephone: `+91${studio.phonePrimary}`,
  email: studio.email,
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ivorick, St. Cyril Road, Bandra West",
    addressLocality: "Mumbai",
    postalCode: "400050",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  areaServed: "Mumbai",
  founder: studio.owner,
  sameAs: Object.values(studio.socials),
  description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${cormorant.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${anton.variable}`}
    >
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Loader />
        <Cursor />
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
