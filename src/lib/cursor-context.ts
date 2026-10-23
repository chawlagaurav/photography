"use client";

import { createContext, useContext } from "react";

/** Shared cursor state so components can request a cursor "mode" on hover. */
type CursorMode = "default" | "view" | "hover";
type CursorCtx = {
  setMode: (m: CursorMode) => void;
  setLabel: (l: string) => void;
};

export const CursorContext = createContext<CursorCtx>({
  setMode: () => {},
  setLabel: () => {},
});

export const useCursor = () => useContext(CursorContext);
export type { CursorMode };
