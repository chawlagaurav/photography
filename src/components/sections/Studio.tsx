"use client";

import { studio } from "@/lib/content";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import ParallaxImage from "@/components/motion/ParallaxImage";
import Magnetic from "@/components/ui/Magnetic";
import { ArrowUpRight } from "lucide-react";

const portrait =
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1200&q=80";

/** Section 06 — The Human Side: Charlston & the Dream Box team. */
export default function Studio() {
  return (
    <section id="studio" className="relative bg-ink px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <ParallaxImage
            src={portrait}
            alt="Charlston Dsouza, lead photographer at Dream Box"
            className="aspect-[4/5] w-full"
            sizes="(max-width:1024px) 100vw, 45vw"
            parallax={14}
          />
          <Reveal delay={0.2}>
            <p className="mt-4 font-grotesk text-[10px] uppercase tracking-widest2 text-ivory/40">
              Charlston Dsouza — Founder &amp; Lead · with Ashwin &amp; Nidhi
            </p>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-8 font-grotesk text-[11px] uppercase tracking-widest2 text-champagne">
            (06) — The human side
          </p>
          <h2 className="font-serif text-[11vw] leading-[0.9] tracking-tightest text-ivory sm:text-[8vw] lg:text-[5vw]">
            <RevealText text="Behind every frame," className="block" />
            <RevealText text="there's a feeling." className="block italic text-champagne" delay={0.06} />
          </h2>

          <Reveal delay={0.15}>
            <div className="mt-10 max-w-xl space-y-5 font-sans text-[15px] leading-relaxed text-ivory/70">
              <p>
                Dream Box began with Charlston Dsouza and a simple conviction —
                that a photograph should feel like the moment, not just look
                like it. Years and hundreds of weddings later, that hasn&apos;t
                changed.
              </p>
              <p>
                Working alongside Ashwin and Nidhi, the studio moves quietly
                through your day — never staging the magic, only catching it.
                The result is honest, cinematic, and unmistakably yours.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10">
              <Magnetic href="/about">
                <span className="group flex items-center gap-3 border-b border-ivory/30 pb-2 font-grotesk text-xs uppercase tracking-[0.2em] text-ivory">
                  More about the studio
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
