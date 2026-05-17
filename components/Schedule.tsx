"use client";

import { useReveal } from "@/hooks/useReveal";

type Sport = "Muay Thai" | "Boxing";
type Session = { time: string; label: string; kids?: boolean };
type DaySchedule = {
  day: string;
  dayHe: string;
  sport: Sport;
  sessions: Session[];
};

const scheduleData: DaySchedule[] = [
  {
    day: "Sunday",
    dayHe: "ראשון",
    sport: "Muay Thai",
    sessions: [
      { time: "17:00–18:00", label: "Kids 8–12", kids: true },
      { time: "18:00–19:00", label: "Basic" },
      { time: "19:00–20:10", label: "Advanced" },
      { time: "21:10",       label: "Sparring" },
    ],
  },
  {
    day: "Monday",
    dayHe: "שני",
    sport: "Boxing",
    sessions: [
      { time: "18:00–19:00", label: "Basic" },
      { time: "19:00–20:00", label: "Advanced" },
    ],
  },
  {
    day: "Tuesday",
    dayHe: "שלישי",
    sport: "Muay Thai",
    sessions: [
      { time: "18:00–19:00", label: "Basic" },
      { time: "19:00–20:15", label: "Advanced" },
    ],
  },
  {
    day: "Wednesday",
    dayHe: "רביעי",
    sport: "Boxing",
    sessions: [
      { time: "18:00–19:00", label: "Basic" },
      { time: "19:00–20:00", label: "Advanced" },
    ],
  },
  {
    day: "Thursday",
    dayHe: "חמישי",
    sport: "Muay Thai",
    sessions: [
      { time: "18:00–19:00", label: "Basic" },
      { time: "19:00–20:15", label: "Advanced" },
    ],
  },
];

function SportTag({ sport }: { sport: Sport }) {
  const isMuayThai = sport === "Muay Thai";
  const cls = isMuayThai
    ? "bg-red text-cream border border-red"
    : "bg-white/10 text-cream border border-white/30";
  return (
    <span
      className={`inline-block font-barlow-cond text-[0.65rem] font-bold tracking-[2px] uppercase px-2 py-1 ${cls}`}
    >
      {sport}
    </span>
  );
}

export default function Schedule() {
  const headerRef = useReveal<HTMLDivElement>();
  const bannerRef = useReveal<HTMLDivElement>();
  const gridRef   = useReveal<HTMLDivElement>();
  const ctaRef    = useReveal<HTMLDivElement>();

  return (
    <section id="schedule" className="py-32 px-[5vw] bg-dark">
      <div ref={headerRef} className="reveal max-w-[1200px] mx-auto">
        <p className="font-barlow-cond text-[0.8rem] font-semibold tracking-[5px] uppercase text-red mb-4">
          Weekly Sessions
        </p>
        <div
          className="w-[60px] h-[3px] mb-8"
          style={{ background: "linear-gradient(90deg, #C8102E, #D4A017)" }}
        />
        <h2
          className="font-bebas leading-[0.9] tracking-[2px] text-cream"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          TRAINING
          <br />
          <span className="text-red">SCHEDULE</span>
        </h2>
      </div>

      {/* Men Only banner */}
      <div
        ref={bannerRef}
        className="reveal max-w-[1200px] mx-auto mt-10 flex items-center justify-center gap-4 bg-red/10 border-y-2 border-red px-6 py-4"
      >
        <span className="font-bebas text-[1.5rem] tracking-[3px] text-red">
          MEN ONLY
        </span>
        <span className="w-px h-6 bg-red/50" />
        <span className="font-barlow-cond text-[1.1rem] font-semibold tracking-[2px] text-cream" dir="rtl">
          גברים בלבד
        </span>
      </div>

      {/* Schedule grid */}
      <div
        ref={gridRef}
        className="reveal max-w-[1200px] mx-auto mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
      >
        {scheduleData.map((d) => (
          <div
            key={d.day}
            className="relative flex flex-col bg-dark2 border border-white/[0.06] p-6 transition-all duration-300 hover:border-red/50 hover:-translate-y-1 group"
          >
            <div
              className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
              style={{ background: "linear-gradient(90deg, #C8102E, transparent)" }}
            />

            <div className="flex items-start justify-between mb-1">
              <div className="font-bebas text-[1.8rem] tracking-[1px] text-cream leading-none">
                {d.day}
              </div>
            </div>
            <div className="font-barlow-cond text-[0.75rem] tracking-[2px] uppercase text-muted mb-4" dir="rtl">
              {d.dayHe}
            </div>

            <div className="mb-5">
              <SportTag sport={d.sport} />
            </div>

            <ul className="list-none space-y-2 mt-auto">
              {d.sessions.map((s) => {
                const base =
                  "flex items-baseline justify-between gap-2 py-2 border-b border-white/[0.05] last:border-0";
                if (s.kids) {
                  return (
                    <li
                      key={`${s.time}-${s.label}`}
                      className={`${base} relative pl-3 -ml-3 border-l-2 border-gold bg-gold/[0.06]`}
                    >
                      <div className="flex flex-col">
                        <span className="font-barlow-cond text-[0.65rem] font-bold tracking-[2px] uppercase text-gold">
                          Kids
                        </span>
                        <span className="text-[0.9rem] text-cream font-semibold">
                          {s.label}
                        </span>
                      </div>
                      <span className="font-barlow text-[0.85rem] text-cream tabular-nums whitespace-nowrap">
                        {s.time}
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={`${s.time}-${s.label}`} className={base}>
                    <span className="text-[0.9rem] text-cream">{s.label}</span>
                    <span className="font-barlow text-[0.85rem] text-muted tabular-nums whitespace-nowrap">
                      {s.time}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="reveal max-w-[1200px] mx-auto mt-14 flex justify-center">
        <a
          href="#contact"
          className="btn-clip inline-flex items-center gap-3 bg-red px-10 py-5 no-underline font-barlow-cond text-[1.1rem] font-bold tracking-[3px] uppercase text-cream transition-all duration-200 hover:bg-red-dark hover:-translate-y-0.5"
        >
          Start Training
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
