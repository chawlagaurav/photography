"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { studio, whatsappLink, navLinks } from "@/lib/content";
import { useCursor } from "@/lib/cursor-context";

export default function Footer() {
  const { setMode } = useCursor();
  const hover = {
    onMouseEnter: () => setMode("hover"),
    onMouseLeave: () => setMode("default"),
  };

  return (
    <footer className="relative border-t border-ivory/10 bg-ink px-6 pb-10 pt-20 sm:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-4xl leading-none text-ivory sm:text-5xl">
              Dream Box
            </p>
            <p className="mt-2 font-grotesk text-[10px] uppercase tracking-widest2 text-champagne">
              Photography &amp; Films — {studio.tagline}
            </p>
            <p className="mt-8 max-w-sm font-sans text-sm leading-relaxed text-ivory/55">
              Cinematic wedding photography &amp; films based in Bandra, Mumbai.
              Documenting love stories across India since the first frame.
            </p>
          </div>

          <div>
            <p className="mb-5 font-grotesk text-[10px] uppercase tracking-widest2 text-ivory/40">
              Explore
            </p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    {...hover}
                    href={l.href}
                    className="font-sans text-sm text-ivory/80 transition hover:text-champagne"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 font-grotesk text-[10px] uppercase tracking-widest2 text-ivory/40">
              Reach us
            </p>
            <ul className="space-y-3 font-sans text-sm text-ivory/80">
              <li>
                <a {...hover} href={`tel:+91${studio.phonePrimary}`} className="transition hover:text-champagne">
                  +91 {studio.phonePrimary}
                </a>
              </li>
              <li>
                <a {...hover} href={`mailto:${studio.email}`} className="transition hover:text-champagne">
                  {studio.email}
                </a>
              </li>
              <li>
                <a
                  {...hover}
                  href={whatsappLink("Hi Dream Box, I'd love to talk about my day.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-champagne transition hover:text-ivory"
                >
                  WhatsApp enquiry →
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, href: studio.socials.instagram, label: "Instagram" },
                { Icon: Youtube, href: studio.socials.youtube, label: "YouTube" },
                { Icon: Facebook, href: studio.socials.facebook, label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <a
                  {...hover}
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition hover:border-champagne hover:text-champagne"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-ivory/10 pt-6 font-grotesk text-[10px] uppercase tracking-[0.2em] text-ivory/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Dream Box Photography &amp; Films</span>
          <span>{studio.address}</span>
        </div>
      </div>
    </footer>
  );
}
