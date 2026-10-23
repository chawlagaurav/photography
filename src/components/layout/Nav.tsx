"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, studio, whatsappLink } from "@/lib/content";
import Magnetic from "@/components/ui/Magnetic";
import { useCursor } from "@/lib/cursor-context";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setMode } = useCursor();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${
          scrolled && !open ? "bg-ink/90" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10">
          <Link
            href="/"
            onMouseEnter={() => setMode("hover")}
            onMouseLeave={() => setMode("default")}
            className="group leading-none"
          >
            <span className="block font-serif text-xl tracking-tight text-ivory sm:text-2xl">
              Dream Box
            </span>
            <span className="block font-grotesk text-[9px] uppercase tracking-widest2 text-champagne">
              Photography &amp; Films
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={() => setMode("hover")}
                onMouseLeave={() => setMode("default")}
                className="group relative font-grotesk text-xs uppercase tracking-[0.2em] text-ivory/80 transition hover:text-ivory"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-champagne transition-all duration-500 ease-expo group-hover:w-full" />
              </Link>
            ))}
            <Magnetic href={whatsappLink("Hi Dream Box, I'd love to talk about my day.")} external>
              <span className="rounded-full border border-ivory/25 px-5 py-2 font-grotesk text-[11px] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-ivory hover:text-ink">
                Enquire
              </span>
            </Magnetic>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="relative z-[85] flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-px w-7 bg-ivory"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-7 bg-ivory"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-px w-7 bg-ivory"
            />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[82] flex flex-col justify-between bg-charcoal px-6 pb-10 pt-28 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-5xl text-ivory"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="font-grotesk text-xs uppercase tracking-[0.2em] text-ivory/60">
              <a href={`tel:+91${studio.phonePrimary}`} className="block py-1">
                +91 {studio.phonePrimary}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1 text-champagne"
              >
                WhatsApp us →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
