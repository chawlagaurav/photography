"use client";

import { useReducedMotion } from "@/lib/hooks";

/** Infinite editorial marquee used as a section divider. */
export default function Marquee({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  const reduced = useReducedMotion();
  const row = [...items, ...items];
  return (
    <div
      className={`relative overflow-hidden border-y py-6 ${
        dark
          ? "border-ivory/10 bg-ink"
          : "border-ink/10 bg-ivory text-ink"
      }`}
    >
      <div
        className={`flex w-max gap-10 whitespace-nowrap ${
          reduced ? "" : "animate-marquee"
        }`}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-serif text-3xl italic sm:text-5xl">{item}</span>
            <span className="text-champagne">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
