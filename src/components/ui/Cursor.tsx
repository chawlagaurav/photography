"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";
import { cursorStore } from "@/lib/cursor-store";
import type { CursorMode } from "@/lib/cursor-context";

/**
 * Desktop-only magnetic cursor. Subscribes to the cursor store for mode/label
 * (no per-frame polling). Position follows the pointer via a spring. Inert on
 * touch / reduced motion.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.5 });

  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }
    document.body.classList.add("has-custom-cursor");

    const unsub = cursorStore.subscribe((m, l) => {
      setMode(m);
      setLabel(l);
    });

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      unsub();
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const isView = mode === "view";
  const isHover = mode === "hover";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full bg-ivory mix-blend-difference"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        willChange: "transform",
      }}
      animate={{
        width: isView ? 104 : isHover ? 56 : 14,
        height: isView ? 104 : isHover ? 56 : 14,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
    >
      <AnimatePresence>
        {isView && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="font-grotesk text-[9px] font-semibold uppercase tracking-widest2 text-ink"
          >
            {label || "View"}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
