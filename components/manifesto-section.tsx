"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

import { brandSerif } from "@/app/fonts";

const manifestoWords = [
  "Invitation",
  "is",
  "considered,",
  "never",
  "chased.",
] as const;

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useEffectEvent(() => {
    const node = sectionRef.current;

    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const distance = viewportHeight + rect.height;
    const rawProgress = (viewportHeight - rect.top) / distance;
    const nextProgress = Math.max(0, Math.min(1, rawProgress));

    setProgress((currentProgress) =>
      Math.abs(currentProgress - nextProgress) < 0.01
        ? currentProgress
        : nextProgress,
    );
  });

  useEffect(() => {
    let frameId = 0;

    const requestUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        updateProgress();
        frameId = 0;
      });
    };

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const textOpacity = 0.32 + progress * 0.56;
  const textTranslate = 14 - progress * 14;

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative flex min-h-[44svh] items-center justify-center px-6 py-14 text-center sm:min-h-[48svh] sm:px-10 sm:py-16 lg:min-h-[52svh]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,240,0.04),transparent_54%)]" />

      <div className="relative mx-auto max-w-4xl">
        <div className="inline-flex rounded-full border border-[#fffff0]/10 bg-[#fffff0]/[0.02] px-4 py-2 text-[0.54rem] uppercase tracking-[0.34em] text-[#fffff0]/38 sm:text-[0.6rem]">
          Membership note
        </div>

        <h2
          className={`${brandSerif.className} mx-auto mt-5 max-w-4xl text-[2.4rem] leading-[1.02] sm:text-5xl lg:text-[4.25rem]`}
        >
          {manifestoWords.map((word, index) => {
            const wordProgress = Math.max(
              0,
              Math.min(1, progress * 1.65 - index * 0.13),
            );

            return (
              <span
                key={word}
                className="inline-block pr-[0.28em] text-[#fffff0]"
                style={{
                  opacity: 0.12 + wordProgress * 0.88,
                  transform: `translate3d(0, ${(1 - wordProgress) * 18}px, 0)`,
                }}
              >
                {word}
              </span>
            );
          })}
        </h2>

        <p
          className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#fffff0]/56 sm:text-[0.98rem] sm:leading-8"
          style={{
            opacity: textOpacity,
            transform: `translate3d(0, ${textTranslate}px, 0)`,
          }}
        >
          Access is curated with restraint. Presence matters. Relevance matters.
          The room is built slowly on purpose.
        </p>
      </div>
    </section>
  );
}
