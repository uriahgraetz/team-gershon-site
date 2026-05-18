"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

// Discriminated union — future image entries drop in alongside video entries with no card-level changes.
type GalleryItem =
  | {
      kind: "video";
      id: string;
      youtubeId: string;
      title: string;
      kicker?: string;
      featured?: boolean;
    }
  | {
      kind: "image";
      id: string;
      src: string;
      alt: string;
      title: string;
      kicker?: string;
      featured?: boolean;
    };

const items: GalleryItem[] = [
  {
    kind: "video",
    id: "highlight",
    youtubeId: "yOzl-CpTYBU",
    title: "Itay Gershon Highlight",
    kicker: "Featured Footage",
    featured: true,
  },
  {
    kind: "video",
    id: "vs-zhaoyang",
    youtubeId: "qMCBhxnjTms",
    title: "vs. Zhaoyang Li",
    kicker: "Professional Bout",
  },
  {
    kind: "video",
    id: "vs-trevor",
    youtubeId: "Pz9SHwx7qUM",
    title: "vs. Trevor Ragin",
    kicker: "Professional Bout",
  },
];

function youtubeThumb(youtubeId: string) {
  // maxresdefault has the best resolution; if a given video doesn't have HD,
  // we fall back to hqdefault (guaranteed for every YouTube video) via onError.
  return `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
}

function youtubeEmbed(youtubeId: string) {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
}

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-cream ${className}`} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`stroke-current ${className}`}
      strokeWidth={2.5}
      strokeLinecap="round"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 6 L18 18 M18 6 L6 18" />
    </svg>
  );
}

export default function Gallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  const close = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeId, close]);

  const active = activeId ? items.find((i) => i.id === activeId) ?? null : null;

  return (
    <section id="gallery" className="py-32 px-[5vw] bg-black-deep">
      <div ref={headerRef} className="reveal max-w-[1200px] mx-auto mb-16">
        <p className="font-barlow-cond text-[0.8rem] font-semibold tracking-[5px] uppercase text-red mb-4">
          Fight Footage
        </p>
        <div
          className="w-[60px] h-[3px] mb-8"
          style={{ background: "linear-gradient(90deg, #C8102E, #D4A017)" }}
        />
        <h2
          className="font-bebas leading-[0.9] tracking-[2px] text-cream mb-6"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          IN THE
          <br />
          <span className="text-red">RING</span>
        </h2>
        <p className="text-[1.05rem] font-light text-muted leading-[1.8] max-w-[640px]">
          Itay Gershon in professional competition. Every round, every strike — the
          same standard we train at Team Gershon.
        </p>
      </div>

      <div
        ref={gridRef}
        className="reveal max-w-[1200px] mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2"
      >
        {items.map((item) => (
          <MediaCard key={item.id} item={item} onOpen={() => setActiveId(item.id)} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <Modal item={active} onClose={close} reduced={!!prefersReducedMotion} />
        )}
      </AnimatePresence>
    </section>
  );
}

function MediaCard({
  item,
  onOpen,
}: {
  item: GalleryItem;
  onOpen: () => void;
}) {
  const isFeatured = !!item.featured;
  const initialThumb = item.kind === "video" ? youtubeThumb(item.youtubeId) : item.src;
  const [thumbSrc, setThumbSrc] = useState(initialThumb);

  const handleThumbError = useCallback(() => {
    if (item.kind === "video" && thumbSrc.includes("maxresdefault")) {
      setThumbSrc(`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`);
    }
  }, [item, thumbSrc]);

  const alt =
    item.kind === "video" ? `${item.title} — video thumbnail` : item.alt;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Play: ${item.title}`}
      className={`group relative overflow-hidden bg-dark2 border border-white/[0.06] text-left transition-all duration-300 hover:border-red/60 focus-visible:border-red focus-visible:outline-none ${
        isFeatured
          ? "aspect-video md:aspect-auto md:col-span-2 md:row-span-2"
          : "aspect-video"
      }`}
    >
      <Image
        src={thumbSrc}
        alt={alt}
        fill
        sizes={
          isFeatured
            ? "(max-width: 768px) 90vw, 800px"
            : "(max-width: 768px) 90vw, 400px"
        }
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        onError={handleThumbError}
      />

      {/* Bottom-up dark gradient — keeps the title legible over any thumbnail */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black-deep via-black-deep/35 to-transparent"
      />

      {/* Centered play button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`relative flex items-center justify-center rounded-full bg-red transition-all duration-300 group-hover:bg-red-dark group-hover:scale-110 ${
            isFeatured ? "w-20 h-20 md:w-24 md:h-24" : "w-14 h-14"
          }`}
          style={{ boxShadow: "0 0 32px rgba(200,16,46,0.45)" }}
        >
          <PlayIcon className={isFeatured ? "w-7 md:w-9 ml-1" : "w-5 ml-0.5"} />
        </div>
      </div>

      {/* Title block — bottom-left */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 pointer-events-none">
        {item.kicker && (
          <p className="font-barlow-cond text-[0.7rem] font-semibold tracking-[3px] uppercase text-red mb-1">
            {item.kicker}
          </p>
        )}
        <h3
          className={`font-bebas text-cream tracking-[1px] leading-none ${
            isFeatured
              ? "text-[2rem] md:text-[2.75rem]"
              : "text-[1.5rem] md:text-[1.75rem]"
          }`}
        >
          {item.title}
        </h3>
      </div>
    </button>
  );
}

function Modal({
  item,
  onClose,
  reduced,
}: {
  item: GalleryItem;
  onClose: () => void;
  reduced: boolean;
}) {
  if (item.kind !== "video") return null;

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.25, ease: "easeOut" }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black-deep/95 backdrop-blur-sm px-4 py-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Now playing: ${item.title}`}
    >
      <motion.div
        initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: reduced ? 0 : 0.3, ease: "easeOut" }}
        className="relative w-full max-w-[1100px] aspect-video bg-dark border border-white/[0.08]"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={youtubeEmbed(item.youtubeId)}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 md:-top-3 md:-right-3 w-10 h-10 rounded-full bg-red text-cream flex items-center justify-center transition-colors duration-200 hover:bg-red-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}
