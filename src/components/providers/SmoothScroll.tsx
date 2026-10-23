"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { CursorContext } from "@/lib/cursor-context";
import { cursorStore } from "@/lib/cursor-store";
import { useReducedMotion, useFinePointer } from "@/lib/hooks";

/**
 * Wraps the app in Lenis smooth scrolling (fine-pointer desktops only;
 * touch devices keep fast native scrolling, reduced-motion disables it) and
 * provides the cursor context. Cursor updates flow through a pub/sub store
 * so hover changes never re-render the page tree.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  useEffect(() => {
    // Native scroll on touch / reduced-motion — smoother and accessible.
    if (reduced || !fine) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.(
        'a[href^="/#"], a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.split("#")[1];
      const el = id && document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -40 });
        history.replaceState(null, "", `#${id}`);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduced, fine]);

  return (
    <CursorContext.Provider
      value={{ setMode: cursorStore.setMode, setLabel: cursorStore.setLabel }}
    >
      {children}
    </CursorContext.Provider>
  );
}
