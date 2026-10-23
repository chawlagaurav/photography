"use client";

import type { CursorMode } from "./cursor-context";

/**
 * Tiny pub/sub store for the custom cursor. Components call setMode/setLabel
 * on hover; the Cursor subscribes once. This avoids per-frame React re-renders
 * (the previous RAF-polling approach re-rendered the whole tree every frame
 * and was a major source of jank).
 */
type Listener = (mode: CursorMode, label: string) => void;

let mode: CursorMode = "default";
let label = "";
const listeners = new Set<Listener>();

const emit = () => listeners.forEach((l) => l(mode, label));

export const cursorStore = {
  setMode(m: CursorMode) {
    if (m !== mode) {
      mode = m;
      emit();
    }
  },
  setLabel(l: string) {
    if (l !== label) {
      label = l;
      emit();
    }
  },
  subscribe(fn: Listener) {
    listeners.add(fn);
    fn(mode, label);
    return () => listeners.delete(fn);
  },
};
