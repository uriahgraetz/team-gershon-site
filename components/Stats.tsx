"use client";

import { useReveal } from "@/hooks/useReveal";

const stats = [
  { num: "10+",  label: "Years of Excellence" },
  { num: "500+", label: "Athletes Trained" },
  { num: "3",    label: "Disciplines" },
  { num: "7",    label: "Days a Week" },
];

export default function Stats() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="py-16 md:py-20 px-[5vw] bg-black-deep border-y border-white/[0.06]">
      <div
        ref={ref}
        className="reveal max-w-[1200px] mx-auto flex flex-wrap justify-center gap-x-12 gap-y-8 md:gap-x-20"
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-bebas text-[3rem] md:text-[3.5rem] text-red leading-none">
              {s.num}
            </div>
            <div className="font-barlow-cond text-[0.8rem] font-semibold tracking-[3px] uppercase text-muted mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
