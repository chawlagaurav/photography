"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { heroImages, studio } from "@/lib/content";
import { useReducedMotion, useFinePointer } from "@/lib/hooks";

/**
 * Section 01 — editorial + cinematic hero.
 *
 * A graded cool-blue full-bleed image sits under a Swiss hairline grid.
 * The headline is split across lines in oversized condensed type, mixing
 * filled and outlined words. Micro-labels, slash dividers, a photographer
 * avatar chip and a pill CTA give it the designed, magazine-grade feel of
 * the references. Motion is transform-only and parallax is desktop-only.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const doParallax = fine && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const ease = [0.16, 1, 0.3, 1] as const;
  const rise = (delay: number) => ({
    initial: reduced ? false : { y: "110%" },
    animate: { y: "0%" },
    transition: { delay, duration: 1.1, ease },
  });

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[660px] w-full overflow-hidden bg-ink"
    >
      {/* Full-bleed graded image */}
      <motion.div
        className="absolute inset-0"
        style={doParallax ? { y: yImg, scale: scaleImg } : undefined}
        initial={reduced ? false : { scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImages.main}
          alt="Dream Box — a wedding moment captured in cinematic light"
          className="cine-grade h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
      <div className="cine-wash absolute inset-0" />

      {/* Hairline grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 mx-auto max-w-[1600px]">
        <div className="relative mx-6 h-full sm:mx-10">
          {/* vertical rules */}
          {[0, 25, 50, 75, 100].map((p) => (
            <span
              key={p}
              className="hair absolute top-0 h-full w-px"
              style={{ left: `${p}%` }}
            />
          ))}
          {/* top + bottom horizontal rules */}
          <span className="hair absolute left-0 top-24 h-px w-full" />
          <span className="hair absolute bottom-24 left-0 h-px w-full" />
        </div>
      </div>

      {/* Content grid */}
      <div className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col px-6 sm:px-10">
        {/* Top meta row */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease }}
          className="flex items-center justify-between py-7 font-grotesk text-[10px] uppercase tracking-widest2 text-ivory/70"
        >
          <span className="flex items-center gap-2">
            Dream Box <span className="text-champagne">×</span> Films
          </span>
          <span className="hidden items-center gap-2 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coral" />
            Booking {new Date().getFullYear()}–{new Date().getFullYear() + 1}
          </span>
        </motion.div>

        {/* Middle: micro-label column + split headline */}
        <div className="flex flex-1 items-center">
          <div className="grid w-full grid-cols-12 items-center gap-6">
            {/* Micro-labels (left) */}
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.9, ease }}
              className="col-span-12 hidden flex-col gap-5 lg:col-span-3 lg:flex"
            >
              <Micro n="(01)" t="Candid wedding photography" />
              <Micro n="(02)" t="Cinematic wedding films" />
              <Micro n="(03)" t="Based in Bandra, Mumbai" />
              <p className="mt-2 max-w-[16rem] font-sans text-[12px] leading-relaxed text-ivory/55">
                We photograph the moments between the moments — honest, filmic,
                and made to last a lifetime.
              </p>
            </motion.div>

            {/* Headline (right) */}
            <div className="col-span-12 lg:col-span-9">
              <h1 className="font-anton uppercase leading-[0.82] tracking-[-0.01em]">
                <span className="block overflow-hidden">
                  <motion.span className="block text-[17vw] text-ivory sm:text-[14vw] lg:text-[11.5vw]" {...rise(0.5)}>
                    Love, in
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-[17vw] text-outline sm:text-[14vw] lg:text-[11.5vw]"
                    {...rise(0.62)}
                  >
                    every
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span className="block text-[17vw] text-champagne sm:text-[14vw] lg:text-[11.5vw]" {...rise(0.74)}>
                    frame.
                  </motion.span>
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Bottom row: avatar + slash + CTA */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease }}
          className="flex items-center justify-between py-7"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-ivory/25">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImages.avatar}
                alt={studio.owner}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="font-grotesk text-[10px] uppercase tracking-widest2 text-ivory/70">
              <span className="block text-ivory">{studio.owner}</span>
              <span className="text-ivory/50">Founder · Lead Photographer</span>
            </div>
          </div>

          <a
            href="#stories"
            className="group inline-flex items-center gap-3 rounded-full border border-ivory/30 bg-ivory/5 py-3 pl-6 pr-3 font-grotesk text-[11px] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-ivory hover:text-ink"
          >
            Explore stories
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ivory text-ink transition-colors group-hover:bg-ink group-hover:text-ivory">
              <ArrowRight size={14} />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Corner plus marks */}
      {[
        "left-10 top-24",
        "right-10 top-24",
        "left-10 bottom-24",
        "right-10 bottom-24",
      ].map((pos) => (
        <Plus
          key={pos}
          size={14}
          className={`pointer-events-none absolute z-20 hidden text-ivory/40 lg:block ${pos}`}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      ))}
    </section>
  );
}

function Micro({ n, t }: { n: string; t: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="font-grotesk text-[10px] tracking-widest2 text-champagne">
        {n}
      </span>
      <span className="font-grotesk text-[10px] uppercase tracking-widest2 text-ivory/70">
        {t}
      </span>
    </div>
  );
}
