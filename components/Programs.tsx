"use client";

import { useReveal } from "@/hooks/useReveal";

const programs = [
  {
    level: "🥊 Beginner",
    title: "FOUNDATIONS",
    desc: "No experience needed. Learn the fundamentals of stance, movement, and basic strikes in a supportive environment.",
    details: ["3 sessions per week", "Small class sizes (max 12)", "Equipment provided", "All ages welcome"],
  },
  {
    level: "⚡ Intermediate",
    title: "LEVEL UP",
    desc: "Build on your base with advanced combinations, clinch work, and sparring sessions under expert supervision.",
    details: ["4–5 sessions per week", "Padwork & sparring", "Muay Thai & boxing tracks", "Strength & conditioning"],
  },
  {
    level: "🏆 Advanced",
    title: "FIGHT CAMP",
    desc: "Full competition preparation. Strategy, game-planning, and the mental conditioning to perform when it counts.",
    details: ["Daily training + recovery", "One-on-one coaching", "Fight strategy sessions", "Nutrition guidance"],
  },
  {
    level: "👨‍👩‍👧 Family",
    title: "KIDS & TEENS",
    desc: "Safe, fun, and structured martial arts classes that build confidence, discipline, and fitness in young athletes.",
    details: ["Ages 6–17", "Focus & discipline", "Anti-bullying principles", "Regular gradings"],
  },
];

export default function Programs() {
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef   = useReveal<HTMLDivElement>();

  return (
    <section id="programs" className="py-32 px-[5vw] bg-black-deep">
      <div ref={headerRef} className="reveal">
        <p className="font-barlow-cond text-[0.8rem] font-semibold tracking-[5px] uppercase text-red mb-4">
          What We Offer
        </p>
        <div className="w-[60px] h-[3px] mb-8" style={{ background: "linear-gradient(90deg, #C8102E, #D4A017)" }} />
        <h2
          className="font-bebas leading-[0.9] tracking-[2px] text-cream"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          TRAINING
          <br />
          <span className="text-red">PROGRAMS</span>
        </h2>
      </div>

      <div
        ref={gridRef}
        className="reveal grid gap-6 mt-12 max-w-[1200px]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {programs.map((p) => (
          <div
            key={p.title}
            className="relative bg-dark2 border border-white/[0.06] p-10 overflow-hidden transition-all duration-300 hover:border-red/40 hover:-translate-y-1.5 group"
          >
            {/* Bottom accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
              style={{ background: "linear-gradient(90deg, #C8102E, transparent)" }}
            />
            <div className="font-barlow-cond text-[0.75rem] font-semibold tracking-[4px] uppercase text-gold mb-4">
              {p.level}
            </div>
            <div className="font-bebas text-[2rem] tracking-[1px] text-cream mb-4">{p.title}</div>
            <p className="text-[0.9rem] text-muted leading-[1.7] mb-6">{p.desc}</p>
            <ul className="list-none space-y-0">
              {p.details.map((d) => (
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
        ))}
      </div>
    </section>
  );
}
