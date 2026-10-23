"use client";

import { HeroCarousel } from "@/components/ui/hero-carousel";
import { carouselSlides } from "@/lib/content";
import { RevealText } from "@/components/motion/Reveal";

/**
 * Section 04 — "The archive" as a cinematic filmstrip. The focused card
 * unfurls to full height while its neighbours stay cropped, and the whole
 * backdrop re-grades to each image's accent hue on change. Replaces the
 * static photo-wall collage.
 */
export default function ArchiveCarousel() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-[1600px] px-6 pt-24 sm:px-10 sm:pt-36">
        <p className="mb-6 font-grotesk text-[11px] uppercase tracking-widest2 text-champagne">
          (04) — The archive
        </p>
        <h2 className="max-w-5xl font-serif text-[12vw] leading-[0.9] tracking-tightest text-ivory sm:text-[9vw] lg:text-[6.5vw]">
          <RevealText text="A wall of" className="block" />
          <span className="block">
            <RevealText text="moments" className="inline italic text-champagne" delay={0.05} />
            <RevealText text=" we refused to forget." className="inline" delay={0.1} />
          </span>
        </h2>
      </div>

      {/* Full-bleed filmstrip stage */}
      <div className="mt-12 h-[82vh] min-h-[560px] w-full sm:mt-16">
        <HeroCarousel
          items={carouselSlides}
          defaultIndex={Math.floor(carouselSlides.length / 2)}
          brand="DREAM BOX"
          wheelNav={false}
          className="bg-ink"
        />
      </div>
    </section>
  );
}
