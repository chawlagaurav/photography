import type { Metadata } from "next";
import Link from "next/link";
import { studio } from "@/lib/content";
import ParallaxImage from "@/components/motion/ParallaxImage";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { whatsappLink } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Studio",
  description: `Meet Charlston Dsouza and the Dream Box team — cinematic wedding photographers & filmmakers based in Bandra, Mumbai.`,
};

const portrait =
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1400&q=80";

export default function AboutPage() {
  return (
    <main className="bg-ink">
      <section className="px-6 pb-20 pt-40 sm:px-10 sm:pt-48">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-8 font-grotesk text-[11px] uppercase tracking-widest2 text-champagne">
            The studio — {studio.tagline}
          </p>
          <h1 className="font-serif text-[13vw] leading-[0.86] tracking-tightest text-ivory sm:text-[9vw] lg:text-[6.5vw]">
            <RevealText text="We make feelings" className="block" />
            <RevealText text="you can hold." className="block italic text-champagne" delay={0.07} />
          </h1>
        </div>
      </section>

      <section className="px-6 pb-28 sm:px-10 sm:pb-40">
        <div className="mx-auto grid max-w-[1600px] items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <ParallaxImage
            src={portrait}
            alt="Charlston Dsouza, founder of Dream Box Photography & Films"
            className="aspect-[4/5] w-full"
            sizes="(max-width:1024px) 100vw, 48vw"
          />
          <Reveal>
            <div className="space-y-6 font-sans text-[15px] leading-relaxed text-ivory/70 lg:pt-10">
              <p>
                Dream Box Photography &amp; Films is the work of{" "}
                <span className="text-ivory">Charlston Dsouza</span>, a Mumbai
                photographer who built the studio around one belief — that the
                best images are the ones you forget are being taken.
              </p>
              <p>
                Alongside Ashwin and Nidhi, the team covers weddings,
                pre-weddings, engagements, films, celebrations and portraits
                across India, working quietly and instinctively so your day
                stays yours.
              </p>
              <p>
                Based in Bandra West, available everywhere. If your story is on
                its way, we&apos;d love to hear it.
              </p>
              <div className="pt-4">
                <Magnetic href={whatsappLink("Hi Dream Box, I'd love to talk about my day.")} external strength={0.4}>
                  <span className="inline-flex items-center gap-3 rounded-full bg-champagne px-8 py-4 font-grotesk text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ivory">
                    Start a conversation
                  </span>
                </Magnetic>
              </div>
              <p className="pt-2">
                <Link href="/#stories" className="font-grotesk text-xs uppercase tracking-[0.2em] text-ivory/60 underline-offset-4 hover:underline">
                  ← See the stories
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
