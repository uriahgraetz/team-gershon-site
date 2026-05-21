"use client";

import { useReveal } from "@/hooks/useReveal";
import type { Dictionary } from "@/app/[lang]/getDictionary";

type ProgramCard = {
  key: keyof Dictionary["programs"]["cards"];
  icon: string;
  popular?: boolean;
};

const PROGRAM_CARDS: readonly ProgramCard[] = [
  { key: "essential",   icon: "⏱️" },
  { key: "foundations", icon: "🥊" },
  { key: "performance", icon: "⚡", popular: true },
  { key: "proAthlete",  icon: "💪" },
  { key: "fightCamp",   icon: "🔥" },
  { key: "youngLions",  icon: "🦁" },
];

export default function Programs({
  dict,
}: {
  dict: Dictionary["programs"];
}) {
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section id="programs" className="py-32 px-[5vw] bg-black-deep">
      <div ref={headerRef} className="reveal">
        <p className="font-barlow-cond text-[0.8rem] font-semibold tracking-[5px] uppercase text-red mb-4">
          {dict.kicker}
        </p>
        <div
          className="w-[60px] h-[3px] mb-8"
          style={{ background: "linear-gradient(90deg, #C8102E, #D4A017)" }}
        />
        <h2
          className="font-bebas leading-[0.9] tracking-[2px] text-cream"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          {dict.headingTop}
          <br />
          <span className="text-red">{dict.headingEmphasis}</span>
        </h2>
      </div>

      <div
        ref={gridRef}
        className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-[1200px] mx-auto"
      >
        {PROGRAM_CARDS.map((card) => {
          const c = dict.cards[card.key];
          return (
            <div
              key={card.key}
              className={`relative flex flex-col bg-dark2 border p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group ${
                card.popular
                  ? "border-red/50 shadow-[0_0_20px_rgba(200,16,46,0.12)]"
                  : "border-white/[0.06] hover:border-red/40"
              }`}
            >
              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 inset-x-0 h-[3px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                style={{ background: "linear-gradient(90deg, #C8102E, transparent)" }}
              />

              {/* Most Popular badge — pinned to the inline-end corner so it
                  lands top-LEFT on /he (RTL) and top-RIGHT on /en (LTR) */}
              {card.popular && (
                <div className="absolute top-0 end-0 font-barlow-cond text-[0.65rem] font-bold tracking-[2px] uppercase bg-red text-cream px-3 py-1.5">
                  {dict.popularBadge}
                </div>
              )}

              <div className="font-bebas text-[2.2rem] leading-none mb-1">
                {card.icon}
              </div>

              <div className="font-barlow-cond text-[0.72rem] font-semibold tracking-[3px] uppercase text-gold mb-3 mt-2">
                {c.freq}
              </div>

              <div className="font-bebas text-[2rem] tracking-[1px] text-cream mb-4">
                {c.title}
              </div>

              <p className="text-[0.9rem] text-muted leading-[1.7] mb-6">
                {c.desc}
              </p>

              <ul className="list-none mt-auto">
                {c.details.map((d) => (
                  <li
                    key={d}
                    className="text-[0.85rem] text-[#888] py-1.5 border-b border-white/[0.05] flex items-center gap-2 last:border-0"
                  >
                    <span className="text-red text-[0.7rem]">▸</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
