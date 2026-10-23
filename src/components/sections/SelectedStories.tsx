"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { stories, type Story } from "@/lib/content";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { useCursor } from "@/lib/cursor-context";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Section 03 — Selected Stories as a cinematic editorial grid.
 *
 * Every cover is rendered immediately (plain <img>, object-cover) so the
 * section is never blank. Titles are overlaid on the image with a legibility
 * gradient; hover zooms the image and lifts the "Explore story" affordance.
 * Tiles span the grid asymmetrically for an editorial rhythm.
 */

// Grid spans per story index — asymmetric but balanced on a 6-col grid.
const SPAN = [
  "lg:col-span-4 aspect-[16/11]", // 01 wide hero
  "lg:col-span-2 aspect-[3/4]", // 02 tall
  "lg:col-span-3 aspect-[4/3]", // 03
  "lg:col-span-3 aspect-[4/3]", // 04
  "lg:col-span-6 aspect-[16/7]", // 05 full-width finale
];

export default function SelectedStories() {
  return (
    <section id="stories" className="bg-ink px-6 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-serif text-[14vw] leading-[0.84] tracking-tightest text-ivory sm:text-[11vw] lg:text-[8vw]">
            <RevealText text="The stories" className="block" />
            <RevealText
              text="we keep."
              className="block italic text-champagne"
              delay={0.08}
            />
          </h2>
          <Reveal className="max-w-xs" delay={0.2}>
            <p className="font-grotesk text-[11px] uppercase tracking-widest2 text-ivory/40">
              (03) — Selected work
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-ivory/60">
              A handful of the weddings and films we&apos;ve had the privilege to
              live inside. Every one, a world of its own.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6">
          {stories.map((story, i) => (
            <StoryTile
              key={story.slug}
              story={story}
              className={SPAN[i] ?? "lg:col-span-3 aspect-[4/3]"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryTile({
  story,
  className,
}: {
  story: Story;
  className: string;
}) {
  const { setMode, setLabel } = useCursor();
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative ${className}`}
    >
      <Link
        href={`/stories/${story.slug}`}
        onMouseEnter={() => {
          setLabel("View story");
          setMode("view");
        }}
        onMouseLeave={() => setMode("default")}
        className="block h-full w-full overflow-hidden bg-charcoal"
      >
        {/* Always-visible cover */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={story.cover}
          alt={`${story.couple} — ${story.title}`}
          className="h-full w-full object-cover photo brightness-[1.02] transition-transform duration-[1.3s] ease-expo group-hover:scale-[1.06]"
        />

        {/* Legibility gradient — kept light so the photograph stays the hero */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent transition-opacity duration-500 group-hover:from-ink/55" />

        {/* Index badge */}
        <span className="absolute right-4 top-4 font-serif text-3xl text-ivory/70 sm:text-5xl">
          {story.index}
        </span>

        {/* Overlaid meta */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="mb-2 font-grotesk text-[9px] uppercase tracking-widest2 text-champagne sm:text-[10px]">
            {story.eventType} · {story.location} · {story.year}
          </p>
          <h3 className="font-serif text-3xl leading-[0.95] text-ivory sm:text-4xl lg:text-5xl">
            {story.couple}
          </h3>
          <p className="mt-1 font-cormorant text-lg italic text-ivory/70">
            {story.title}
          </p>

          <span className="mt-4 flex items-center gap-2 overflow-hidden font-grotesk text-[10px] uppercase tracking-[0.2em] text-ivory/80">
            <span className="relative block overflow-hidden">
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                Explore story
              </span>
              <span className="absolute left-0 top-full inline-block text-champagne transition-transform duration-500 group-hover:-translate-y-full">
                Explore story
              </span>
            </span>
            <ArrowUpRight
              size={14}
              className="text-champagne transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
