"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const stats = [
  { num: "10+",  label: "Years of Excellence" },
  { num: "500+", label: "Athletes Trained" },
  { num: "3",    label: "Disciplines" },
  { num: "7",    label: "Days a Week" },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Mouse-tracked tilt — motion values avoid re-renders on every mousemove.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px);
    mouseY.set(py);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[72px]"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
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
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#C8102E 1px, transparent 1px),
            linear-gradient(90deg, #C8102E 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content — sits above background; navbar (z-50) still wins over this z-10 */}
      <div className="relative z-10 text-center px-[5vw] max-w-[1000px] w-full">
        {/* === LOGO — dominant centerpiece === */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 14,
            mass: 0.9,
            delay: 0.25,
          }}
          style={{ perspective: 1000 }}
          className="mx-auto"
        >
          {/* Floating wrapper — gentle infinite Y bob */}
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -5, 0, 4, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 6, ease: "easeInOut", repeat: Infinity }
            }
            className="relative mx-auto"
            style={{
              width: "clamp(320px, 68vw, 880px)",
              aspectRatio: "1131 / 1600",
            }}
          >
            {/* Tilt layer — responds to mouse via motion values */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
              className="relative w-full h-full"
            >
              {/* Pulsing red backglow — applied via CSS keyframe to a wrapper
                  so the drop-shadow filter targets the logo's alpha mask. */}
              <div className="relative w-full h-full animate-logo-glow">
                <Image
                  src="/images/team-gershon-logo.png"
                  alt="Team Gershon — Muay Thai &amp; Boxing"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 880px"
                  className="object-contain select-none pointer-events-none"
                  draggable={false}
                />

                {/* Metallic sheen — a diagonal white gradient strip that
                    sweeps across the logo. clip-path uses the image as a mask
                    via overflow + mix-blend so it only shows on the artwork. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{
                    WebkitMaskImage: "url(/images/team-gershon-logo.png)",
                    maskImage: "url(/images/team-gershon-logo.png)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 h-full w-1/3 animate-logo-sheen"
                    style={{
                      background:
                        "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.0) 30%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.0) 70%, transparent 100%)",
                      mixBlendMode: "screen",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Single industrial statement line — three pillars, equal weight */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.85, ease: "easeOut" }}
          className="font-bebas font-black text-cream uppercase tracking-widest leading-none mt-16 md:mt-24 lg:mt-28"
          style={{ fontSize: "clamp(2rem, 5.4vw, 4rem)" }}
        >
          Muay Thai
          <span className="text-red mx-3 md:mx-5" aria-hidden="true">·</span>
          Boxing
          <span className="text-red mx-3 md:mx-5" aria-hidden="true">·</span>
          Jerusalem
        </motion.h1>

        <div className="anim-d4 flex gap-4 justify-center flex-wrap mt-14 md:mt-20">
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
      <div className="anim-d6 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
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
