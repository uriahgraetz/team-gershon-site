"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import type { Dictionary, Locale } from "@/app/[lang]/getDictionary";

const STARS = [0, 1, 2, 3, 4] as const;

export default function Testimonials({
  dict,
  lang,
}: {
  dict: Dictionary["testimonials"];
  lang: Locale;
}) {
  const headerRef = useReveal<HTMLDivElement>();
  const trackRef = useReveal<HTMLDivElement>();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: lang === "he" ? "rtl" : "ltr",
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-32 px-[5vw] bg-dark">
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

      <div
        ref={trackRef}
        className="reveal relative max-w-[1200px] mx-auto mt-14"
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ms-5">
            {dict.items.map((t) => (
              <div
                key={t.id}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 ps-5"
              >
                <article className="h-full flex flex-col bg-dark2 border border-white/[0.06] p-8 transition-all duration-300 hover:border-red/40 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(200,16,46,0.15)]">
                  <Quote
                    aria-hidden="true"
                    size={40}
                    strokeWidth={2}
                    className="text-red/35 mb-6 rtl:-scale-x-100"
                  />

                  <div
                    className="flex items-center gap-1 mb-6"
                    aria-label="5 out of 5 stars"
                    role="img"
                  >
                    {STARS.map((i) => (
                      <Star
                        key={i}
                        aria-hidden="true"
                        size={16}
                        strokeWidth={0}
                        className="text-red fill-red"
                      />
                    ))}
                  </div>

                  <p className="text-[0.95rem] font-light text-muted leading-[1.75] tracking-[0.3px] mb-8 min-h-[13rem]">
                    {t.text}
                  </p>

                  <div className="mt-auto flex items-center gap-4 pt-5 border-t border-white/[0.07]">
                    <div
                      aria-hidden="true"
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-red text-cream font-bebas text-[1.4rem] tracking-[1px] leading-none shrink-0"
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="font-bebas text-[1.4rem] tracking-[1px] text-cream leading-none mb-1 truncate">
                        {t.name}
                      </div>
                      <div className="font-barlow-cond text-[0.7rem] font-semibold tracking-[2px] uppercase text-gold">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label={dict.prevLabel}
          className="hidden md:inline-flex absolute top-1/2 -translate-y-1/2 start-0 lg:-start-4 z-10 w-12 h-12 rounded-full bg-black-deep/70 border border-white/[0.08] text-cream backdrop-blur-sm items-center justify-center transition-all duration-200 hover:border-red/60 hover:text-red focus-visible:border-red focus-visible:text-red"
        >
          <ChevronLeft size={22} className="rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label={dict.nextLabel}
          className="hidden md:inline-flex absolute top-1/2 -translate-y-1/2 end-0 lg:-end-4 z-10 w-12 h-12 rounded-full bg-black-deep/70 border border-white/[0.08] text-cream backdrop-blur-sm items-center justify-center transition-all duration-200 hover:border-red/60 hover:text-red focus-visible:border-red focus-visible:text-red"
        >
          <ChevronRight size={22} className="rtl:rotate-180" />
        </button>

        <div className="mt-10 flex justify-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`${dict.goToLabel} ${i + 1}`}
              aria-current={selectedIndex === i ? "true" : undefined}
              className={`h-[3px] transition-all duration-300 ${
                selectedIndex === i
                  ? "bg-red w-8"
                  : "bg-white/20 hover:bg-white/40 w-4"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
