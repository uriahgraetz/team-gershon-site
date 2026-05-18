"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

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
      className="h-screen min-h-[640px] flex flex-col relative overflow-hidden pt-[72px]"
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

      {/* Content stack — logo at top, brand pinned tight to logo, CTAs pushed to bottom */}
      <div className="relative z-10 flex-1 flex flex-col items-center text-center px-[5vw] max-w-[1200px] w-full mx-auto pb-16 md:pb-24 min-h-0">
        {/* === LOGO — height-first, scales up on desktop === */}
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
          className="relative mx-auto shrink min-h-0 h-[min(58vh,540px)] md:h-[min(78vh,820px)] lg:h-[min(80vh,1000px)]"
          style={{
            perspective: 1000,
            aspectRatio: "1131 / 1600",
          }}
        >
          {/* Static red halo — sized to the outermost wrapper so it scales with the logo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(200,16,46,0.45) 0%, rgba(139,0,0,0.22) 35%, transparent 70%)",
              transform: "scale(1.4)",
              filter: "blur(32px)",
            }}
          />

          {/* Floating wrapper — fills outermost, gentle infinite Y bob */}
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -5, 0, 4, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 6, ease: "easeInOut", repeat: Infinity }
            }
            className="relative w-full h-full"
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
              {/* Pulsing red backglow */}
              <div className="relative w-full h-full animate-logo-glow">
                <Image
                  src="/images/team-gershon-logo.png"
                  alt="Team Gershon — Muay Thai &amp; Boxing"
                  fill
                  priority
                  sizes="(max-width: 768px) 70vw, (max-width: 1024px) 50vw, 720px"
                  className="object-contain select-none pointer-events-none"
                  draggable={false}
                />

                {/* Metallic sheen — masked to the logo's alpha */}
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

        {/* Statement line — pinned tight to the bottom of the logo */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.85, ease: "easeOut" }}
          className="font-bebas font-black text-cream uppercase tracking-widest leading-none shrink-0 mt-4 sm:mt-5 md:mt-6 lg:mt-8"
          style={{ fontSize: "clamp(1.5rem, 5vw, 4rem)" }}
        >
          <span className="whitespace-nowrap">Muay Thai</span>
          <span className="text-red mx-2 sm:mx-3 md:mx-5" aria-hidden="true">·</span>
          <span className="whitespace-nowrap">Boxing</span>
          <span className="text-red mx-2 sm:mx-3 md:mx-5" aria-hidden="true">·</span>
          <span className="whitespace-nowrap">Jerusalem</span>
        </motion.h1>

        {/* Flex spacer — pushes CTAs toward the bottom while keeping brand tight to logo */}
        <div className="flex-1 min-h-[16px]" />

        {/* CTAs — pinned near the bottom of the viewport */}
        <div className="anim-d4 flex gap-4 justify-center flex-wrap shrink-0">
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
      </div>

      {/* Scroll indicator — desktop only (hidden on mobile per spec) */}
      <div className="hidden md:flex anim-d6 absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10">
        <span className="font-barlow-cond text-[0.7rem] tracking-[3px] uppercase text-muted">
          Scroll
        </span>
        <div
          className="w-px h-[40px] md:h-[50px] animate-scroll-pulse"
          style={{ background: "linear-gradient(to bottom, #C8102E, transparent)" }}
        />
      </div>
    </section>
  );
}
