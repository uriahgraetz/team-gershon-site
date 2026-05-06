const stats = [
  { num: "10+",  label: "Years of Excellence" },
  { num: "500+", label: "Athletes Trained" },
  { num: "3",    label: "Disciplines" },
  { num: "7",    label: "Days a Week" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[72px]"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 70% at 70% 50%, rgba(200,16,46,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(212,160,23,0.08) 0%, transparent 60%),
            linear-gradient(160deg, #0A0A0A 0%, #180808 50%, #0A0A0A 100%)
          `,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#C8102E 1px, transparent 1px),
            linear-gradient(90deg, #C8102E 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-[5vw] max-w-[1000px] w-full">
        <p className="anim-d1 font-barlow-cond text-[0.9rem] font-semibold tracking-[5px] uppercase text-red mb-6">
          Muay Thai &amp; Boxing — Est. Tel Aviv
        </p>

        <h1
          className="anim-d2 font-bebas leading-[0.88] tracking-[4px] text-cream"
          style={{ fontSize: "clamp(5rem, 14vw, 13rem)" }}
        >
          TEAM
          <br />
          <span className="text-red block">GERSHON</span>
        </h1>

        <p className="anim-d3 text-[1.15rem] font-light text-muted max-w-[520px] mx-auto mt-8 tracking-[0.5px]">
          Where champions are forged. Elite Muay Thai and boxing training for
          all levels — from beginners to competitive fighters.
        </p>

        <div className="anim-d4 flex gap-4 justify-center flex-wrap mt-12">
          <a
            href="#contact"
            className="btn-clip font-barlow-cond text-[1rem] font-bold tracking-[3px] uppercase bg-red text-cream px-10 py-4 no-underline transition-all duration-200 hover:bg-red-dark hover:-translate-y-0.5"
          >
            Start Training
          </a>
          <a
            href="#programs"
            className="btn-clip font-barlow-cond text-[1rem] font-bold tracking-[3px] uppercase bg-transparent text-cream border border-cream/30 px-10 py-4 no-underline transition-all duration-200 hover:border-red hover:text-red"
          >
            View Programs
          </a>
        </div>

        {/* Stats */}
        <div className="anim-d5 flex justify-center gap-16 mt-20 pt-12 border-t border-white/[0.07] flex-wrap">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-bebas text-[3.5rem] text-red leading-none">
                {s.num}
              </div>
              <div className="font-barlow-cond text-[0.8rem] font-semibold tracking-[3px] uppercase text-muted mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="anim-d6 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-barlow-cond text-[0.7rem] tracking-[3px] uppercase text-muted">
          Scroll
        </span>
        <div
          className="w-px h-[50px] animate-scroll-pulse"
          style={{ background: "linear-gradient(to bottom, #C8102E, transparent)" }}
        />
      </div>
    </section>
  );
}
