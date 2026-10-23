"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion, useFinePointer } from "@/lib/hooks";

/**
 * Scroll-reveal image with a soft clip wipe and (desktop-only) inner parallax.
 *
 * Parallax runs only on fine-pointer devices — on touch it's a plain reveal,
 * which removes dozens of simultaneous scroll springs that caused jank. The
 * reveal is IntersectionObserver-driven with a safety timeout so an image can
 * never get stuck hidden. Images carry the `.photo` B&W-to-color grade.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "100vw",
  parallax = 10,
  rounded = false,
  bw = true,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  parallax?: number;
  rounded?: boolean;
  bw?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const [shown, setShown] = useState(false);
  const doParallax = fine && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${parallax}%`, `${parallax}%`]
  );

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
    );
    io.observe(el);
    const t = setTimeout(() => setShown(true), 1400);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-charcoal ${
        rounded ? "rounded-sm" : ""
      } ${className}`}
    >
      <motion.div
        className="absolute -top-[12%] left-0 h-[124%] w-full"
        style={doParallax ? { y, willChange: "transform" } : undefined}
        initial={false}
        animate={{
          clipPath: shown || reduced ? "inset(0% 0 0 0)" : "inset(16% 0 0 0)",
          opacity: shown || reduced ? 1 : 0.4,
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          sizes={sizes}
          className={`h-full w-full object-cover ${bw ? "photo" : ""}`}
        />
      </motion.div>
    </div>
  );
}
