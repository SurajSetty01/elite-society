"use client";

import { useState } from "react";

type FaqItem = {
  answer: string;
  question: string;
};

type FaqAccordionProps = {
  items: readonly FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-2.5 lg:mx-0 lg:max-w-[41rem]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article
            key={item.question}
            className={`overflow-hidden rounded-[1.3rem] border border-[#fffff0]/90 px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.12)] transition-all duration-300 sm:px-5 sm:py-4.5 ${
              isOpen
                ? "bg-[#fffff0]/94 text-[#0c090a]"
                : "bg-[#fffff0]/92 text-[#0c090a] hover:bg-[#fffff0]"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() =>
                setOpenIndex((currentIndex) =>
                  currentIndex === index ? null : index,
                )
              }
            >
              <h3 className="max-w-xl text-[0.88rem] leading-6 text-[#0c090a] sm:text-[0.94rem] lg:text-[0.98rem]">
                {item.question}
              </h3>

              <span
                aria-hidden="true"
                className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.92rem] transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 border-[#0c090a] bg-[#0c090a] text-[#fffff0]"
                    : "border-[#0c090a]/18 bg-[#fffff0]/42 text-[#0c090a]"
                }`}
              >
                +
              </span>
            </button>

            <div
              className="grid overflow-hidden transition-[grid-template-rows,opacity,margin-top] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                marginTop: isOpen ? "0.75rem" : "0rem",
                opacity: isOpen ? 1 : 0.18,
              }}
            >
              <div className="overflow-hidden">
                <div className="rounded-[1rem] border border-[#0c090a]/8 bg-[#0c090a] px-4 py-4 sm:px-5">
                  <p className="max-w-2xl text-[0.83rem] leading-6 text-[#fffff0]/68 sm:text-[0.9rem]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
