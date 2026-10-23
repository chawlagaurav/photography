"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { collage } from "@/lib/content";
import { useReducedMotion } from "@/lib/hooks";
import { RevealText } from "@/components/motion/Reveal";

/** Section 02 — oversized editorial statement with floating photographs. */
export default function EditorialStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-15%", "25%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ivory px-6 py-28 text-ink sm:px-10 sm:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Floating photographs */}
        <motion.div
          style={reduced ? undefined : { y: y1 }}
          className="pointer-events-none absolute right-[4%] top-[6%] hidden w-40 lg:block xl:w-52"
        >
          <Frame src={collage[0]} alt="Candid wedding detail" rotate={-5} />
        </motion.div>
        <motion.div
          style={reduced ? undefined : { y: y2 }}
          className="pointer-events-none absolute left-[2%] top-[38%] hidden w-32 md:block xl:w-44"
        >
          <Frame src={collage[1]} alt="Bride portrait" rotate={4} />
        </motion.div>
        <motion.div
          style={reduced ? undefined : { y: y3 }}
          className="pointer-events-none absolute bottom-[8%] right-[14%] hidden w-36 lg:block xl:w-48"
        >
          <Frame src={collage[2]} alt="Celebration moment" rotate={6} />
        </motion.div>

        <p className="mb-10 font-grotesk text-[11px] uppercase tracking-widest2 text-ink/40">
          (02) — The philosophy
        </p>

        <h2 className="relative z-10 font-serif text-[13vw] leading-[0.9] tracking-tightest sm:text-[11vw] lg:text-[8.5vw]">
          <RevealText text="Not just" as="span" className="block" />
          <RevealText text="photographs." as="span" className="block" delay={0.05} />
          <span className="block italic text-coral">
            <RevealText text="A thousand" as="span" wordClassName="italic" delay={0.1} />
          </span>
          <RevealText text="feelings." as="span" className="block" delay={0.15} />
        </h2>

        <div className="relative z-10 mt-14 max-w-xl lg:ml-auto">
          <p className="font-cormorant text-2xl leading-relaxed text-ink/80 sm:text-3xl">
            We don&apos;t simply record a day. We hold onto the way the light
            fell, the shake in a voice, the glance no one else caught — and we
            give it back to you, forever.
          </p>
        </div>
      </div>
    </section>
  );
}

function Frame({
  src,
  alt,
  rotate,
}: {
  src: string;
  alt: string;
  rotate: number;
}) {
  return (
    <div
      className="overflow-hidden shadow-2xl shadow-ink/20 ring-1 ring-ink/5 animate-floaty"
      style={{ transform: `rotate(${rotate}deg)`, aspectRatio: "3/4" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="photo h-full w-full object-cover" />
    </div>
  );
}
