"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";
import { useCursor } from "@/lib/cursor-context";

/**
 * Magnetic button/link — the element eases toward the pointer within its
 * bounds. Disabled on touch and under reduced motion. Renders as an <a>,
 * next <Link>, or <button> depending on props.
 */
export default function Magnetic({
  children,
  href,
  onClick,
  className = "",
  strength = 0.35,
  external = false,
  cursorHover = true,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  external?: boolean;
  cursorHover?: boolean;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const active = fine && !reduced;
  const { setMode } = useCursor();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 300, damping: 20 });
  const y = useSpring(my, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
    if (cursorHover) setMode("default");
  };
  const enter = () => cursorHover && active && setMode("hover");

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={enter}
      onMouseLeave={reset}
      style={active ? { x, y } : undefined}
      className={`inline-flex items-center justify-center ${className}`}
    >
      {children}
    </motion.span>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className="inline-flex"
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className="inline-flex">
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className="inline-flex">
      {inner}
    </button>
  );
}
