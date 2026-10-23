"use client";

import { useState } from "react";
import { MessageCircle, Phone, Instagram, Send } from "lucide-react";
import { studio, whatsappLink, telLink } from "@/lib/content";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { useCursor } from "@/lib/cursor-context";

/** Section 08 — the closing conversion moment. */
export default function Contact() {
  const { setMode } = useCursor();
  const [form, setForm] = useState({ name: "", date: "", message: "" });

  // Compose a prefilled WhatsApp message from the form — no backend needed,
  // the enquiry lands straight in the studio's inbox.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Dream Box! I'm ${form.name || "—"}.${
      form.date ? ` Our date: ${form.date}.` : ""
    }${form.message ? ` ${form.message}` : ""}`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
  };

  const channels = [
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      sub: "Fastest reply",
      href: whatsappLink("Hi Dream Box, I'd love to talk about my day."),
      external: true,
    },
    { Icon: Phone, label: "Call us", sub: `+91 ${studio.phonePrimary}`, href: telLink, external: false },
    { Icon: Instagram, label: "Instagram", sub: "See the latest", href: studio.socials.instagram, external: true },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-ink px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="font-serif text-[14vw] leading-[0.85] tracking-tightest text-ivory sm:text-[11vw] lg:text-[8.5vw]">
          <RevealText text="Your story" className="block" />
          <RevealText text="deserves" className="block" delay={0.05} />
          <RevealText text="to be remembered." className="block italic text-champagne" delay={0.1} />
        </h2>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-xl font-cormorant text-2xl italic leading-relaxed text-ivory/70 sm:text-3xl">
            Let&apos;s create something you&apos;ll return to for the rest of
            your life.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          {/* Channels */}
          <div>
            <div className="mb-8">
              <Magnetic
                href={whatsappLink("Hi Dream Box, I'd love to talk about my day.")}
                external
                strength={0.4}
              >
                <span className="inline-flex items-center gap-3 rounded-full bg-champagne px-8 py-4 font-grotesk text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ivory">
                  <MessageCircle size={16} />
                  Let&apos;s talk about your day
                </span>
              </Magnetic>
            </div>

            <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
              {channels.map(({ Icon, label, sub, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    onMouseEnter={() => setMode("hover")}
                    onMouseLeave={() => setMode("default")}
                    className="group flex items-center justify-between py-5"
                  >
                    <span className="flex items-center gap-4">
                      <Icon size={18} className="text-champagne" strokeWidth={1.5} />
                      <span className="font-serif text-2xl text-ivory transition-colors group-hover:text-champagne sm:text-3xl">
                        {label}
                      </span>
                    </span>
                    <span className="font-grotesk text-[11px] uppercase tracking-widest2 text-ivory/45">
                      {sub}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-sans text-sm leading-relaxed text-ivory/50">
              {studio.address}
              <br />
              <a href={`mailto:${studio.email}`} className="text-champagne hover:underline">
                {studio.email}
              </a>
            </p>
          </div>

          {/* Enquiry form */}
          <form onSubmit={submit} className="flex flex-col gap-6">
            <Field
              label="Your name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Ayra & Ryan"
              required
            />
            <Field
              label="Wedding / event date"
              value={form.date}
              onChange={(v) => setForm({ ...form, date: v })}
              placeholder="December 2026"
            />
            <div>
              <label className="mb-2 block font-grotesk text-[10px] uppercase tracking-widest2 text-ivory/40">
                Tell us about your day
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                placeholder="Where, when, and what you're dreaming of…"
                className="w-full resize-none border-b border-ivory/20 bg-transparent py-3 font-sans text-lg text-ivory outline-none transition-colors placeholder:text-ivory/25 focus:border-champagne"
              />
            </div>
            <button
              type="submit"
              onMouseEnter={() => setMode("hover")}
              onMouseLeave={() => setMode("default")}
              className="group mt-2 inline-flex w-fit items-center gap-3 border border-ivory/25 px-7 py-4 font-grotesk text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-ivory hover:text-ink"
            >
              Send via WhatsApp
              <Send size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="font-sans text-xs text-ivory/35">
              Submitting opens WhatsApp with your details prefilled — no account
              needed.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-grotesk text-[10px] uppercase tracking-widest2 text-ivory/40">
        {label}
      </label>
      <input
        type="text"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-ivory/20 bg-transparent py-3 font-sans text-lg text-ivory outline-none transition-colors placeholder:text-ivory/25 focus:border-champagne"
      />
    </div>
  );
}
