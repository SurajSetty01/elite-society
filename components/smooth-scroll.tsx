"use client";

import { useEffect } from "react";

import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
      autoRaf: true,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
