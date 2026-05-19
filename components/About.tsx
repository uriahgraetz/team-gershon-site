"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const COACH_BODY =
  "With years of experience competing at the highest levels of professional kickboxing, Itay Gershon brings world-class expertise to every training session. His journey from the ring to coaching is built on a foundation of relentless discipline, technical precision, and a deep passion for martial arts. Itay’s mission is to pass on the knowledge forged in combat, helping athletes of all levels unlock their true potential.";

const GYM_BODY =
  "Located in Jerusalem, Team Gershon is a premier Muay Thai and Boxing academy dedicated to building physical strength, character, and community. We offer a supportive yet highly focused environment where members can push their limits safely and effectively. Whether you are stepping onto the mats for the first time to get in shape or preparing for competition, Team Gershon is your home for striking excellence.";

export default function About() {
  const reduce = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };

  return (
    <section
      id="about"
      className="relative isolate w-full min-h-screen overflow-hidden bg-black-deep"
    >
      {/* Background — mobile */}
      <Image
        src="/images/itay-victory-bg-mobile.avif"
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="object-cover object-[50%_30%] md:hidden -z-20"
      />
      {/* Background — desktop */}
      <Image
        src="/images/itay-victory-bg-desktop.avif"
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="hidden md:block object-cover object-[70%_30%] -z-20"
      />

      {/* Overlay — mobile: top→bottom darken so text panel stays legible */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 35%, rgba(10,10,10,0.92) 100%)",
        }}
      />
      {/* Overlay — desktop: heavy on the left where the text lives, fading right */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.78) 35%, rgba(10,10,10,0.35) 70%, rgba(10,10,10,0.1) 100%)",
        }}
      />
      {/* Vignette + red ambient bloom — desktop only, behind the panel side */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden md:block opacity-60"
        style={{
          background:
            "radial-gradient(60% 80% at 85% 50%, rgba(200,16,46,0.18) 0%, rgba(200,16,46,0) 60%)",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative max-w-[1300px] mx-auto px-[5vw] py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center min-h-screen"
      >
        {/* ===== Column 1 — Heritage / Heading ===== */}
        <motion.div variants={fadeUp} className="md:pr-4">
          <p className="font-barlow-cond text-[0.8rem] font-semibold tracking-[5px] uppercase text-red mb-4">
            Jerusalem
          </p>
          <div
            className="w-[60px] h-[3px] mb-8"
            style={{ background: "linear-gradient(90deg, #C8102E, #D4A017)" }}
          />
          <h2
            className="font-bebas leading-[0.88] tracking-[2px] text-cream"
            style={{ fontSize: "clamp(3rem, 7.2vw, 6.25rem)" }}
          >
            BUILT ON
            <br />
            <span className="text-red">FIRE</span>
            <br />
            &amp; DISCIPLINE
          </h2>

          {/* Mobile-only profile sits between heading and panel */}
          <motion.div variants={fadeUp} className="md:hidden mt-10">
            <div className="relative w-[78%] max-w-[360px] aspect-[4/5] mx-auto border border-white/[0.08] shadow-[0_0_24px_rgba(200,16,46,0.18)]">
              <Image
                src="/images/itay-profile-mobile.avif"
                alt="Itay Gershon — head coach"
                fill
                sizes="(max-width: 768px) 78vw, 360px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.55) 100%)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ===== Column 2 — Personal Touch panel ===== */}
        <motion.div variants={fadeUp} className="w-full">
          <div className="relative border border-white/[0.08] bg-black-deep/55 backdrop-blur-md p-6 sm:p-8 md:p-10">
            {/* Accent strip */}
            <div
              className="absolute top-0 left-0 w-full h-[3px]"
              style={{ background: "linear-gradient(90deg, #C8102E, #D4A017)" }}
            />

            {/* Desktop-only profile inside the panel */}
            <motion.div variants={fadeUp} className="hidden md:block mb-8">
              <div className="relative w-full aspect-[16/10] border border-white/[0.08]">
                <Image
                  src="/images/itay-profile-desktop.avif"
                  alt="Itay Gershon — head coach"
                  fill
                  sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(10,10,10,0.65) 100%)",
                  }}
                />
              </div>
            </motion.div>

            {/* Coach block */}
            <motion.div variants={fadeUp}>
              <p className="font-barlow-cond text-[0.75rem] font-semibold tracking-[4px] uppercase text-red mb-3">
                The Coach
              </p>
              <h3 className="font-bebas text-cream text-[1.75rem] sm:text-[2rem] leading-none tracking-[1.5px] mb-4">
                Itay Gershon
              </h3>
              <p className="font-barlow font-light text-muted text-[1rem] sm:text-[1.05rem] leading-[1.75]">
                {COACH_BODY}
              </p>
            </motion.div>

            {/* Divider */}
            <div className="my-8 h-px w-full bg-white/[0.07]" />

            {/* Gym block */}
            <motion.div variants={fadeUp}>
              <p className="font-barlow-cond text-[0.75rem] font-semibold tracking-[4px] uppercase text-red mb-3">
                The Gym
              </p>
              <h3 className="font-bebas text-cream text-[1.75rem] sm:text-[2rem] leading-none tracking-[1.5px] mb-4">
                Team Gershon
              </h3>
              <p className="font-barlow font-light text-muted text-[1rem] sm:text-[1.05rem] leading-[1.75]">
                {GYM_BODY}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
