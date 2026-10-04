"use client";

import { useState } from "react";

type Faq = { readonly q: string; readonly a: readonly string[] };

const stroke = {
  stroke: "#A2A8A9",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// One item open at a time, first open by default, 400ms height animation (Elementor nested accordion).
export default function FaqAccordion({ items }: { items: readonly Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="w-full rounded-2xl border border-line-soft p-3 md:px-4 md:py-5 lg:px-8 lg:py-10">
      <div className="flex flex-col gap-8">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                id={`faq-title-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-[10px] border-b border-seaglass p-[10px] text-left text-[#1f2124]"
              >
                <span className="text-fluid-body block pl-5 leading-[1.3] font-normal -indent-5">
                  {i + 1}. {item.q}
                </span>
                <svg
                  width="24"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="shrink-0"
                >
                  {isOpen ? (
                    <path d="M5 12H19" {...stroke} />
                  ) : (
                    <path d="M12 5V19M5 12H19" {...stroke} />
                  )}
                </svg>
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-title-${i}`}
                className={`grid transition-[grid-template-rows] duration-[400ms] ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="text-fluid-small px-7 pt-3 font-light md:px-8 lg:px-9">
                    {item.a.map((para, k) => (
                      <p key={k} className={k > 0 ? "mt-[1.6em]" : ""}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
