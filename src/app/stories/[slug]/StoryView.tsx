"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import type { Story } from "@/lib/content";
import { whatsappLink } from "@/lib/content";
import { useReducedMotion } from "@/lib/hooks";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import ParallaxImage from "@/components/motion/ParallaxImage";
import Magnetic from "@/components/ui/Magnetic";
import { useCursor } from "@/lib/cursor-context";

export default function StoryView({
  story,
  next,
}: {
  story: Story;
  next: Story;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { setMode, setLabel } = useCursor();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <main className="bg-ink">
      {/* Cover */}
      <div ref={heroRef} className="relative h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0" style={reduced ? undefined : { scale }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={story.cover}
            alt={`${story.couple} — ${story.title}`}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />

        <div className="absolute left-6 top-28 z-10 sm:left-10">
          <Link
            href="/#stories"
            onMouseEnter={() => setMode("hover")}
            onMouseLeave={() => setMode("default")}
            className="group inline-flex items-center gap-2 font-grotesk text-[11px] uppercase tracking-widest2 text-ivory/70 transition hover:text-ivory"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            All stories
          </Link>
        </div>

        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 px-6 pb-16 sm:px-10"
          style={reduced ? undefined : { y }}
        >
          <div className="mx-auto max-w-[1600px]">
            <p className="mb-5 font-grotesk text-[11px] uppercase tracking-widest2 text-champagne">
              {story.index} — {story.eventType} · {story.location} · {story.year}
            </p>
            <h1 className="font-serif text-[16vw] leading-[0.84] tracking-tightest text-ivory sm:text-[12vw] lg:text-[9vw]">
              {story.couple}
            </h1>
            <p className="mt-3 font-cormorant text-2xl italic text-ivory/70 sm:text-3xl">
              {story.title}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Editorial intro */}
      <section className="px-6 py-24 sm:px-10 sm:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[0.4fr_1fr]">
          <Reveal>
            <p className="font-grotesk text-[11px] uppercase tracking-widest2 text-ivory/40">
              The story
            </p>
          </Reveal>
          <h2 className="font-serif text-[6vw] leading-[1.1] tracking-tight text-ivory sm:text-[4vw] lg:text-[2.8vw]">
            <RevealText text={story.intro} />
          </h2>
        </div>
      </section>

      {/* Film */}
      {story.film && (
        <section className="px-6 pb-24 sm:px-10 sm:pb-32">
          <div className="mx-auto max-w-[1600px]">
            <div className="relative aspect-video w-full overflow-hidden bg-charcoal">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${story.film}`}
                title={`${story.couple} wedding film`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p className="mt-4 flex items-center gap-2 font-grotesk text-[11px] uppercase tracking-widest2 text-ivory/40">
              <Play size={13} className="text-champagne" /> The film
            </p>
          </div>
        </section>
      )}

      {/* Gallery — alternating portrait / landscape rhythm */}
      <section className="px-6 pb-24 sm:px-10 sm:pb-32">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 sm:gap-8">
          {story.gallery.map((img, i) => {
            const landscape = img.orientation === "landscape";
            // Pair portraits side-by-side where consecutive; otherwise full rows.
            return (
              <div
                key={i}
                className={
                  landscape
                    ? "w-full"
                    : i % 2 === 1
                    ? "ml-auto w-full sm:w-3/4 lg:w-2/3"
                    : "w-full sm:w-3/4 lg:w-2/3"
                }
              >
                <ParallaxImage
                  src={img.src}
                  alt={img.alt}
                  className={landscape ? "aspect-[16/9]" : "aspect-[4/5]"}
                  sizes="(max-width:768px) 100vw, 70vw"
                  parallax={landscape ? 10 : 14}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ivory/10 px-6 py-20 text-center sm:px-10 sm:py-28">
        <Reveal>
          <p className="font-cormorant text-2xl italic text-ivory/60">
            Dreaming of a day like this?
          </p>
          <div className="mt-6">
            <Magnetic
              href={whatsappLink(`Hi Dream Box! I loved ${story.couple}'s story and would love to talk about ours.`)}
              external
              strength={0.4}
            >
              <span className="inline-flex items-center gap-3 rounded-full bg-champagne px-8 py-4 font-grotesk text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ivory">
                Let&apos;s talk about your day
              </span>
            </Magnetic>
          </div>
        </Reveal>
      </section>

      {/* Next story */}
      <Link
        href={`/stories/${next.slug}`}
        onMouseEnter={() => {
          setLabel("Next story");
          setMode("view");
        }}
        onMouseLeave={() => setMode("default")}
        className="group relative block h-[60vh] overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={next.cover}
          alt={`${next.couple} — ${next.title}`}
          loading="lazy"
          className="photo h-full w-full object-cover transition-transform duration-[1.2s] ease-expo group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/55 transition-colors group-hover:bg-ink/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="mb-4 font-grotesk text-[11px] uppercase tracking-widest2 text-champagne">
            Next story
          </p>
          <span className="font-serif text-[12vw] leading-none text-ivory sm:text-[8vw] lg:text-[6vw]">
            {next.couple}
          </span>
          <span className="mt-5 inline-flex items-center gap-2 font-grotesk text-xs uppercase tracking-[0.2em] text-ivory/80">
            Explore <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </main>
  );
}
