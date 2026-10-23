"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Elegant intro sequence: a dark curtain with the studio name and a counting
 * progress figure, then a clip wipe reveals the page. Shows once per session.
 * A visible Skip control and reduced-motion both collapse it instantly.
 */
export default function Loader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && sessionStorage.getItem("db-intro")) {
      setDone(true);
      return;
    }
    if (reduced) {
      finish();
      return;
    }
    let n = 0;
    const id = setInterval(() => {
      // ease toward 100 so the count decelerates
      n = Math.min(100, n + Math.max(1, Math.round((100 - n) / 9)));
      setCount(n);
      if (n >= 100) {
        clearInterval(id);
        setTimeout(finish, 420);
      }
    }, 55);
    // lock scroll while intro is up
    document.documentElement.style.overflow = "hidden";
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const finish = () => {
    sessionStorage.setItem("db-intro", "1");
    document.documentElement.style.overflow = "";
    setDone(true);
  };

  if (!mounted || done) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink"
        exit={{
          clipPath: "inset(0 0 100% 0)",
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="font-grotesk text-[11px] uppercase tracking-widest2 text-champagne">
            Dream Box
          </p>
          <p className="mt-4 font-serif text-4xl italic text-ivory sm:text-6xl">
            Love, in every frame.
          </p>
        </motion.div>

        <div className="absolute bottom-8 left-0 right-0 flex items-end justify-between px-6 sm:px-10">
          <span className="font-grotesk text-[11px] uppercase tracking-widest2 text-white/40">
            Photography &amp; Films
          </span>
          <span className="font-serif text-6xl leading-none text-ivory sm:text-8xl">
            {count}
          </span>
        </div>

        <button
          onClick={finish}
          className="absolute right-6 top-6 font-grotesk text-[11px] uppercase tracking-widest2 text-white/50 transition hover:text-ivory sm:right-10 sm:top-10"
        >
          Skip
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
