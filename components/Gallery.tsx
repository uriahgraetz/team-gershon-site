"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const videos = [
  {
    id: "vid1",
    src: "https://www.youtube.com/embed/aHn4CGhVoK0?autoplay=1&mute=1",
    title: "Muay Thai — The Art of Eight Limbs",
    featured: true,
  },
  {
    id: "vid2",
    src: "https://www.youtube.com/embed/9EFZ8rDvEiA?autoplay=1&mute=1",
    title: "Boxing Combinations",
    featured: false,
  },
  {
    id: "vid3",
    src: "https://www.youtube.com/embed/6UF53UCasEQ?autoplay=1&mute=1",
    title: "Fighter Conditioning",
    featured: false,
  },
  {
    id: "vid4",
    src: "https://www.youtube.com/embed/2kLCz9Wj_rg?autoplay=1&mute=1",
    title: "Pad Work Masterclass",
    featured: false,
  },
  {
    id: "vid5",
    src: "https://www.youtube.com/embed/Q0PqJpXyZLs?autoplay=1&mute=1",
    title: "Live Sparring Session",
    featured: false,
  },
];

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] fill-white ml-[3px]">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function Gallery() {
  const [active, setActive] = useState<Record<string, boolean>>({});
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef   = useReveal<HTMLDivElement>();

  return (
    <section id="gallery" className="py-32 px-[5vw] bg-black-deep">
      <div ref={headerRef} className="reveal max-w-[600px] mb-12">
        <p className="font-barlow-cond text-[0.8rem] font-semibold tracking-[5px] uppercase text-red mb-4">
          Media Gallery
        </p>
        <div className="w-[60px] h-[3px] mb-8" style={{ background: "linear-gradient(90deg, #C8102E, #D4A017)" }} />
        <h2
          className="font-bebas leading-[0.9] tracking-[2px] text-cream mb-6"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          TRAINING
          <br />
          <span className="text-red">VIDEOS</span>
        </h2>
        <p className="text-[1.05rem] font-light text-muted leading-[1.8]">
          Watch our athletes and coaches in action. See the intensity, technique,
          and culture of Team Gershon.
        </p>
      </div>

      <div
        ref={gridRef}
        className="reveal grid gap-4 max-w-[1200px]"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "auto auto",
        }}
      >
        {videos.map((v) => (
          <div
            key={v.id}
            className={`relative overflow-hidden bg-dark2 border border-white/[0.05] aspect-video cursor-pointer transition-colors duration-300 hover:border-red/50 ${v.featured ? "col-span-2" : ""}`}
            onClick={() => setActive((a) => ({ ...a, [v.id]: true }))}
          >
            {active[v.id] ? (
              <iframe
                src={v.src}
                title={v.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full border-none"
              />
            ) : (
              <div className="absolute inset-0 bg-dark2/90 flex flex-col items-center justify-center">
                <div className="w-14 h-14 bg-red rounded-full flex items-center justify-center mb-3 transition-transform duration-200 hover:scale-110">
                  <PlayIcon />
                </div>
                <div className="font-barlow-cond text-[0.9rem] font-semibold tracking-[1px] text-cream text-center px-4">
                  {v.title}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
