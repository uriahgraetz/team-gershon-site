"use client";

import { useReveal } from "@/hooks/useReveal";

const disciplines = [
  { icon: "🥊", name: "Boxing",       desc: "Footwork, combinations & ring intelligence" },
  { icon: "🦵", name: "Muay Thai",    desc: "The art of 8 limbs — full striking system" },
  { icon: "💪", name: "Conditioning", desc: "Fighter fitness for every body type" },
  { icon: "🏆", name: "Competition",  desc: "Full fight camp preparation & strategy" },
];

export default function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-32 px-[5vw] bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-[1200px] mx-auto">
        {/* Text column */}
        <div ref={ref} className="reveal">
          <p className="font-barlow-cond text-[0.8rem] font-semibold tracking-[5px] uppercase text-red mb-4">
            Who We Are
          </p>
          <div className="w-[60px] h-[3px] mb-8" style={{ background: "linear-gradient(90deg, #C8102E, #D4A017)" }} />
          <h2
            className="font-bebas leading-[0.9] tracking-[2px] text-cream mb-6"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            BUILT ON
            <br />
            <span className="text-red">FIRE &amp;</span>
            <br />
            DISCIPLINE
          </h2>
          <p className="text-[1.05rem] font-light text-muted max-w-[540px] leading-[1.8]">
            Team Gershon is more than a gym — it&apos;s a family of fighters and fitness
            enthusiasts united by a passion for the sweet science. Our world-class
            coaches guide you from your first session to the competitive stage.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-10 sm:grid-cols-1 md:grid-cols-2">
            {disciplines.map((d) => (
              <div
                key={d.name}
                className="relative bg-dark2 border border-red/20 p-6 overflow-hidden transition-all duration-300 hover:border-red hover:-translate-y-1 group"
              >
                <div className="absolute top-0 left-0 w-[3px] h-full" style={{ background: "linear-gradient(to bottom, #C8102E, #D4A017)" }} />
                <div className="text-[2rem] mb-3">{d.icon}</div>
                <div className="font-barlow-cond text-[1.1rem] font-bold tracking-[1px] text-cream mb-1">
                  {d.name}
                </div>
                <div className="text-[0.85rem] text-muted">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated ring visual */}
        <div className="flex items-center justify-center">
          <div
            className="w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full border-2 border-red/30 flex items-center justify-center relative animate-slow-spin"
          >
            {/* Inner rings via pseudo-like divs */}
            <div className="absolute rounded-full border border-gold/15" style={{ width: "85%", height: "85%" }} />
            <div className="absolute rounded-full border border-red/10" style={{ width: "70%", height: "70%" }} />
            <div className="animate-slow-spin-rev text-center">
              <span className="font-bebas text-[5rem] text-red leading-none block">TG</span>
              <p className="font-barlow-cond text-[0.85rem] font-semibold tracking-[4px] uppercase text-muted mt-2">
                Train Hard. Fight Smart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
