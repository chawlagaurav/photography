import Hero from "@/components/sections/Hero";
import EditorialStatement from "@/components/sections/EditorialStatement";
import SelectedStories from "@/components/sections/SelectedStories";
import ArchiveCarousel from "@/components/sections/ArchiveCarousel";
import Services from "@/components/sections/Services";
import Studio from "@/components/sections/Studio";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Marquee from "@/components/ui/Marquee";

export default function Home() {
  return (
    <main>
      <Hero />
      <EditorialStatement />
      <SelectedStories />
      <Marquee
        dark
        items={["Weddings", "Films", "Pre-Wedding", "Candid", "Mumbai", "Forever Artistic"]}
      />
      <ArchiveCarousel />
      <Services />
      <Studio />
      <Testimonials />
      <Contact />
    </main>
  );
}
