"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/content";
import { useReducedMotion } from "@/lib/hooks";
import { useCursor } from "@/lib/cursor-context";

/**
 * Section 07 — Testimonials presented as personal letters. One large excerpt
 * at a time, with prev/next and auto-advance. Quotes are verbatim from the
 * client site.
 */
export default function Testimonials() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  const { setMode } = useCursor();
  const t = testimonials[i];

  const go = (dir: number) =>
    setI((p) => (p + dir + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-ivory px-6 py-28 text-ink sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1600px]">
        <p className="mb-16 font-grotesk text-[11px] uppercase tracking-widest2 text-ink/40">
          (07) — In their words
        </p>

        <div className="relative min-h-[46vh]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={reduced ? undefined : { opacity: 0, y: 30 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="mb-8 block font-serif text-6xl leading-none text-champagne">
                &ldquo;
              </span>
              <p className="max-w-5xl font-serif text-[7vw] leading-[1.05] tracking-tight sm:text-[5vw] lg:text-[3.6vw]">
                {t.quote}
              </p>
              <footer className="mt-10 font-grotesk text-xs uppercase tracking-widest2 text-ink/60">
                — {t.name}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-ink/15 pt-6">
          <div className="flex gap-4">
            {["Prev", "Next"].map((label, idx) => (
              <button
                key={label}
                onClick={() => go(idx === 0 ? -1 : 1)}
                onMouseEnter={() => setMode("hover")}
                onMouseLeave={() => setMode("default")}
                className="font-grotesk text-xs uppercase tracking-[0.2em] text-ink/60 transition hover:text-coral"
              >
                {label}
              </button>
            ))}
          </div>
          <span className="font-grotesk text-xs tracking-widest2 text-ink/40">
            {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
