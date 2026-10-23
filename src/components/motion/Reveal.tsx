"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { Children, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  RevealText — splits a string into lines/words that rise into view   */
/* ------------------------------------------------------------------ */

export function RevealText({
  text,
  as: Tag = "span",
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.06,
  once = true,
}: {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    const T = Tag as any;
    return <T className={className}>{text}</T>;
  }

  const MotionTag = motion[Tag as keyof typeof motion] as any;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top"
          style={{ clipPath: "inset(-20% -5% -20% -5%)" }}
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: "110%" },
              show: {
                y: 0,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal — fade/slide a block in on scroll                           */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stagger — reveal children in sequence                              */
/* ------------------------------------------------------------------ */

export function Stagger({
  children,
  className = "",
  stagger = 0.1,
  y = 50,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: stagger }}
    >
      {Children.map(children, (child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
