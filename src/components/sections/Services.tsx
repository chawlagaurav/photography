"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/content";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { useCursor } from "@/lib/cursor-context";
import { useFinePointer } from "@/lib/hooks";

/**
 * Section 05 — What We Capture. A typographic index of services; hovering a
 * row reveals its photograph in a floating pane (desktop). On touch, each row
 * expands to show its image + description inline.
 */
export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const fine = useFinePointer();
  const { setMode } = useCursor();

  return (
    <section id="services" className="relative bg-ivory px-6 py-28 text-ink sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 max-w-4xl">
          <p className="mb-6 font-grotesk text-[11px] uppercase tracking-widest2 text-ink/40">
            (05) — What we capture
          </p>
          <h2 className="font-serif text-[13vw] leading-[0.88] tracking-tightest sm:text-[10vw] lg:text-[7vw]">
            <RevealText text="Every chapter" className="block" />
            <RevealText text="has a story." className="block italic text-coral" delay={0.06} />
          </h2>
        </div>

        <div
          className="relative"
          onMouseLeave={() => {
            setActive(null);
            setMode("default");
          }}
        >
          {/* Floating image preview (desktop) */}
          {fine && (
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none absolute right-0 top-1/2 z-20 hidden h-[52vh] w-[34vw] max-w-xl -translate-y-1/2 overflow-hidden lg:block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={services[active].image}
                    alt={services[active].name}
                    className="photo h-full w-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}

          <ul className="relative z-10">
            {services.map((s, i) => (
              <li key={s.name} className="border-t border-ink/15 last:border-b">
                <button
                  onMouseEnter={() => {
                    if (fine) {
                      setActive(i);
                      setMode("hover");
                    }
                  }}
                  onClick={() =>
                    !fine && setExpanded((e) => (e === i ? null : i))
                  }
                  className="group flex w-full items-center justify-between gap-4 py-6 text-left transition-colors sm:py-8"
                >
                  <span className="flex items-baseline gap-5 sm:gap-10">
                    <span className="font-grotesk text-xs text-ink/40">{s.n}</span>
                    <span
                      className={`font-serif text-4xl leading-none transition-all duration-500 sm:text-6xl lg:text-7xl ${
                        active === i ? "translate-x-3 text-coral" : "text-ink"
                      }`}
                    >
                      {s.name}
                    </span>
                  </span>
                  <span className="hidden max-w-xs text-right font-sans text-sm leading-relaxed text-ink/55 md:block lg:max-w-sm">
                    {s.blurb}
                  </span>
                </button>

                {/* Mobile expand */}
                <AnimatePresence>
                  {!fine && expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8">
                        <div className="mb-4 aspect-[16/10] w-full overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.image}
                            alt={s.name}
                            loading="lazy"
                            className="photo h-full w-full object-cover"
                          />
                        </div>
                        <p className="font-sans text-sm leading-relaxed text-ink/70">
                          {s.blurb}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="mt-10" delay={0.1}>
          <p className="font-cormorant text-xl italic text-ink/50">
            Every package is shaped around your day — tell us about it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
