"use client";

import { useReveal } from "@/hooks/useReveal";

type Program = {
  icon: string;
  freq: string;
  title: string;
  desc: string;
  details: string[];
  popular?: boolean;
};

const programs: Program[] = [
  {
    icon: "⏱️",
    freq: "1 session / week",
    title: "ESSENTIAL",
    desc: "The perfect entry point for those looking to start their journey and learn the basics.",
    details: ["Core mechanics focus", "Flexible schedule"],
  },
  {
    icon: "🥊",
    freq: "2 sessions / week",
    title: "FOUNDATIONS",
    desc: "Build a rock-solid base with consistent training and fundamental technique drills.",
    details: ["Skill development", "Guided progression"],
  },
  {
    icon: "⚡",
    freq: "3 sessions / week",
    title: "PERFORMANCE",
    desc: "Take your training to the next level with increased intensity and tactical workshops.",
    details: ["Advanced combinations", "Sparring eligibility"],
    popular: true,
  },
  {
    icon: "💪",
    freq: "4 sessions / week",
    title: "PRO-ATHLETE",
    desc: "Designed for dedicated practitioners aiming for elite physical and technical conditioning.",
    details: ["High-intensity drills", "Athlete mindset coaching"],
  },
  {
    icon: "🔥",
    freq: "5 sessions / week",
    title: "FIGHT CAMP",
    desc: "The ultimate immersion. Full competition preparation and peak performance training.",
    details: ["Full access to all classes", "Professional fight prep"],
  },
  {
    icon: "🦁",
    freq: "Ages 6–13",
    title: "YOUNG LIONS",
    desc: "Safe and professional classes focusing on discipline, confidence, and martial arts basics.",
    details: ["Confidence & Discipline", "Strength & Fitness"],
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
        className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-[1200px]"
      >
        {programs.map((p) => (
          <div
            key={p.title}
            className={`relative flex flex-col bg-dark2 border p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group ${
              p.popular
                ? "border-red/50 shadow-[0_0_20px_rgba(200,16,46,0.12)]"
                : "border-white/[0.06] hover:border-red/40"
            }`}
          >
            {/* Bottom accent bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
              style={{ background: "linear-gradient(90deg, #C8102E, transparent)" }}
            />

            {/* Most Popular badge */}
            {p.popular && (
              <div className="absolute top-0 right-0 font-barlow-cond text-[0.65rem] font-bold tracking-[2px] uppercase bg-red text-cream px-3 py-1.5">
                Most Popular
              </div>
            )}

            <div className="font-bebas text-[2.2rem] leading-none mb-1">{p.icon}</div>

            <div className="font-barlow-cond text-[0.72rem] font-semibold tracking-[3px] uppercase text-gold mb-3 mt-2">
              {p.freq}
            </div>

            <div className="font-bebas text-[2rem] tracking-[1px] text-cream mb-4">{p.title}</div>

            <p className="text-[0.9rem] text-muted leading-[1.7] mb-6">{p.desc}</p>

            <ul className="list-none mt-auto">
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
