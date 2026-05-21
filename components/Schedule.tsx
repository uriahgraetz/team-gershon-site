"use client";

import { useReveal } from "@/hooks/useReveal";
import type { Dictionary } from "@/app/[lang]/getDictionary";

type SportKey = keyof Dictionary["schedule"]["sports"];
type SessionKind = keyof Dictionary["schedule"]["sessions"];
type DayKey = keyof Dictionary["schedule"]["days"];

type ScheduleSession = {
  time: string;
  kind: SessionKind;
};

type ScheduleDay = {
  key: DayKey;
  sport: SportKey;
  sessions: readonly ScheduleSession[];
};

const SCHEDULE_DAYS: readonly ScheduleDay[] = [
  {
    key: "sunday",
    sport: "muayThai",
    sessions: [
      { time: "17:00–18:00", kind: "kids" },
      { time: "18:00–19:00", kind: "basic" },
      { time: "19:00–20:10", kind: "advanced" },
      { time: "20:10–21:10", kind: "sparring" },
    ],
  },
  {
    key: "monday",
    sport: "boxing",
    sessions: [
      { time: "18:00–19:00", kind: "basic" },
      { time: "19:00–20:00", kind: "advanced" },
    ],
  },
  {
    key: "tuesday",
    sport: "muayThai",
    sessions: [
      { time: "18:00–19:00", kind: "basic" },
      { time: "19:00–20:15", kind: "advanced" },
    ],
  },
  {
    key: "wednesday",
    sport: "boxing",
    sessions: [
      { time: "18:00–19:00", kind: "basic" },
      { time: "19:00–20:00", kind: "advanced" },
    ],
  },
  {
    key: "thursday",
    sport: "muayThai",
    sessions: [
      { time: "18:00–19:00", kind: "basic" },
      { time: "19:00–20:15", kind: "advanced" },
    ],
  },
];

function SportTag({
  kind,
  children,
}: {
  kind: SportKey;
  children: React.ReactNode;
}) {
  const cls =
    kind === "muayThai"
      ? "bg-red text-cream border border-red"
      : "bg-white/10 text-cream border border-white/30";
  return (
    <span
      className={`inline-block font-barlow-cond text-[0.65rem] font-bold tracking-[2px] uppercase px-2 py-1 ${cls}`}
    >
      {children}
    </span>
  );
}

export default function Schedule({
  dict,
}: {
  dict: Dictionary["schedule"];
}) {
  const headerRef = useReveal<HTMLDivElement>();
  const bannerRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  return (
    <section id="schedule" className="py-32 px-[5vw] bg-dark">
      <div ref={headerRef} className="reveal max-w-[1200px] mx-auto">
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

      {/* Men Only banner — intentionally bilingual on both locales.
          `lang="en"` on the MEN ONLY half re-anchors it to Bebas via the
          [lang="en"] block in globals.css, so the Latin half keeps its
          impact font even on /he. The Hebrew half gets lang="he" as a
          screen-reader hint and to keep the markup symmetric. */}
      <div
        ref={bannerRef}
        className="reveal max-w-[1200px] mx-auto mt-10 flex items-center justify-center gap-4 bg-red/10 border-y-2 border-red px-6 py-4"
      >
        <span
          lang="en"
          className="font-bebas text-[1.5rem] tracking-[3px] text-red"
        >
          {dict.bannerEn}
        </span>
        <span className="w-px h-6 bg-red/50" />
        <span
          lang="he"
          className="font-barlow-cond text-[1.1rem] font-semibold tracking-[2px] text-cream"
        >
          {dict.bannerHe}
        </span>
      </div>

      {/* Schedule grid */}
      <div
        ref={gridRef}
        className="reveal max-w-[1200px] mx-auto mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
      >
        {SCHEDULE_DAYS.map((d) => (
          <div
            key={d.key}
            className="relative flex flex-col bg-dark2 border border-white/[0.06] p-6 transition-all duration-300 hover:border-red/50 hover:-translate-y-1 group"
          >
            <div
              className="absolute top-0 inset-x-0 h-[3px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
              style={{ background: "linear-gradient(90deg, #C8102E, transparent)" }}
            />

            <div className="font-bebas text-[1.8rem] tracking-[1px] text-cream leading-none mb-4">
              {dict.days[d.key]}
            </div>

            <div className="mb-5">
              <SportTag kind={d.sport}>{dict.sports[d.sport]}</SportTag>
            </div>

            <ul className="list-none space-y-2 mt-auto">
              {d.sessions.map((s) => {
                const base =
                  "flex items-baseline justify-between gap-2 py-2 border-b border-white/[0.05] last:border-0";
                if (s.kind === "kids") {
                  return (
                    <li
                      key={`${s.time}-${s.kind}`}
                      className={`${base} relative ps-3 -ms-3 border-s-2 border-gold bg-gold/[0.06]`}
                    >
                      <div className="flex flex-col">
                        <span className="font-barlow-cond text-[0.65rem] font-bold tracking-[2px] uppercase text-gold">
                          {dict.kidsPill}
                        </span>
                        <span className="text-[0.9rem] text-cream font-semibold">
                          {dict.sessions.kids}
                        </span>
                      </div>
                      <span className="font-barlow text-[0.85rem] text-cream tabular-nums whitespace-nowrap">
                        {s.time}
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={`${s.time}-${s.kind}`} className={base}>
                    <span className="flex items-center gap-1.5">
                      <span className="text-[0.9rem] text-cream">
                        {dict.sessions[s.kind]}
                      </span>
                      <span className="font-barlow-cond text-[0.6rem] font-bold tracking-[1px] text-muted border border-white/20 px-1 py-px leading-none">
                        {dict.ageTag}
                      </span>
                    </span>
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

      {/* CTA — arrow flips horizontally on /he via the rtl:rotate-180 variant */}
      <div ref={ctaRef} className="reveal max-w-[1200px] mx-auto mt-14 flex justify-center">
        <a
          href="#contact"
          className="btn-clip inline-flex items-center gap-3 bg-red px-10 py-5 no-underline font-barlow-cond text-[1.1rem] font-bold tracking-[3px] uppercase text-cream transition-all duration-200 hover:bg-red-dark hover:-translate-y-0.5"
        >
          {dict.ctaPrimary}
          <span aria-hidden="true" className="inline-block rtl:rotate-180">→</span>
        </a>
      </div>
    </section>
  );
}
