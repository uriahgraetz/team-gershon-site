"use client";

import { Fragment } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { Dictionary } from "@/app/[lang]/getDictionary";

export default function Hero({ dict }: { dict: Dictionary["hero"] }) {
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
      className="relative w-full h-screen overflow-hidden bg-black-deep"
    >
      {/* Ambient red/gold radial bloom + diagonal black gradient */}
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

      {/* Faint red grid overlay */}
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

      {/* === LAYER 1: Massive centered logo (z-0) — can bleed vertically, clipped by overflow-hidden === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Positioning wrapper — Tailwind transforms live here (not on the motion.div) so they don't fight framer-motion's animated transform. */}
        <div
          className="absolute left-1/2 top-[35%] w-[115vw] -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:w-[75vw] lg:w-[80vw]"
          style={{
            perspective: 1000,
            aspectRatio: "1131 / 1600",
          }}
        >
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
            className="relative w-full h-full pointer-events-none md:pointer-events-auto"
          >
          {/* Static red halo — anchored to the outermost wrapper so it scales with the logo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(200,16,46,0.42) 0%, rgba(139,0,0,0.20) 35%, transparent 70%)",
              transform: "scale(1.25)",
              filter: "blur(40px)",
            }}
          />

          {/* Floating wrapper — infinite Y bob */}
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -5, 0, 4, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 6, ease: "easeInOut", repeat: Infinity }
            }
            className="relative w-full h-full"
          >
            {/* 3D tilt layer */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
              className="relative w-full h-full"
            >
              {/* Pulsing red drop-shadow glow */}
              <div className="relative w-full h-full animate-logo-glow">
                <Image
                  src="/images/team-gershon-logo-highres.png"
                  alt={dict.logoAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 115vw, (max-width: 1024px) 75vw, 80vw"
                  className="object-contain select-none pointer-events-none logo-crisp"
                  draggable={false}
                />

                {/* Metallic sheen — masked to the logo's alpha */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{
                    WebkitMaskImage: "url(/images/team-gershon-logo-highres.png)",
                    maskImage: "url(/images/team-gershon-logo-highres.png)",
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
        </div>
      </div>

      {/* === LAYER 2: Bottom content tray (z-10) — readability gradient + brand + CTAs === */}
      <div className="absolute bottom-0 inset-x-0 z-10 h-[40vh] flex flex-col items-center justify-end px-[5vw] pb-12 md:pb-16">
        {/* Readability gradient — covers bottom 40% of viewport so text stays legible over the logo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black-deep via-black-deep/60 to-transparent"
        />

        {/* Statement line — pillars from dict, middots interleaved */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.85, ease: "easeOut" }}
          className="font-bebas font-black text-cream uppercase tracking-widest leading-none text-center"
          style={{ fontSize: "clamp(1.5rem, 5vw, 4rem)" }}
        >
          {dict.pillars.map((pillar, i) => (
            <Fragment key={pillar}>
              <span className="whitespace-nowrap">{pillar}</span>
              {i < dict.pillars.length - 1 && (
                <span className="text-red mx-2 sm:mx-3 md:mx-5" aria-hidden="true">·</span>
              )}
            </Fragment>
          ))}
        </motion.h1>

        {/* CTAs */}
        <div className="anim-d4 flex gap-4 justify-center flex-wrap mt-6 md:mt-8">
          <a
            href="#contact"
            className="btn-clip font-barlow-cond text-[1rem] font-bold tracking-[3px] uppercase bg-red text-cream px-10 py-4 no-underline transition-all duration-200 hover:bg-red-dark hover:-translate-y-0.5"
          >
            {dict.ctaPrimary}
          </a>
          <a
            href="#programs"
            className="btn-clip font-barlow-cond text-[1rem] font-bold tracking-[3px] uppercase bg-transparent text-cream border border-cream/30 px-10 py-4 no-underline transition-all duration-200 hover:border-red hover:text-red"
          >
            {dict.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Scroll indicator — desktop only, bottom-end corner (right in LTR, left in RTL) so it doesn't compete with the centered CTAs */}
      <div className="hidden md:flex anim-d6 absolute bottom-6 end-6 lg:end-10 flex-col items-center gap-2 z-10 pointer-events-none">
        <span className="font-barlow-cond text-[0.7rem] tracking-[3px] uppercase text-muted">
          {dict.scrollHint}
        </span>
        <div
          className="w-px h-[40px] md:h-[50px] animate-scroll-pulse"
          style={{ background: "linear-gradient(to bottom, #C8102E, transparent)" }}
        />
      </div>
    </section>
  );
}
