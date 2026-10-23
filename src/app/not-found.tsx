import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-ink px-6 text-center">
      <p className="font-grotesk text-[11px] uppercase tracking-widest2 text-champagne">
        404
      </p>
      <h1 className="mt-6 font-serif text-[18vw] leading-none text-ivory sm:text-[10vw]">
        Lost the frame.
      </h1>
      <p className="mt-6 max-w-md font-cormorant text-2xl italic text-ivory/60">
        This page drifted out of focus. Let&apos;s get you back to the story.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-full border border-ivory/25 px-7 py-4 font-grotesk text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-ivory hover:text-ink"
      >
        Back home
      </Link>
    </main>
  );
}
