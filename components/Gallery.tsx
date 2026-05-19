"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

type VideoItem = {
  kind: "video";
  id: string;
  youtubeId: string;
  title: string;
  kicker?: string;
  featured?: boolean;
};

type ImageItem = {
  kind: "image";
  id: string;
  src: string;
  alt: string;
  title?: string;
};

type GalleryItem = VideoItem | ImageItem;

const videoItems: VideoItem[] = [
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

const trainingPhotos: ImageItem[] = Array.from({ length: 9 }, (_, i) => {
  const n = i + 1;
  return {
    kind: "image",
    id: `training-${n}`,
    src: `/images/training-${n}.webp`,
    alt: `Training at Team Gershon — moment ${n} of 9`,
  };
});

function youtubeThumb(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
}

function youtubeEmbedModal(youtubeId: string) {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
}

// Inline mobile player — adds playsinline so iOS doesn't auto-fullscreen,
// and mute=0 explicitly per spec (sound on; mobile may still gate autoplay).
function youtubeEmbedInline(youtubeId: string) {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1`;
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

function ChevronIcon({
  dir,
  className = "",
}: {
  dir: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`stroke-current ${className}`}
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      aria-hidden="true"
    >
      {dir === "left" ? (
        <path d="M15 6 L9 12 L15 18" />
      ) : (
        <path d="M9 6 L15 12 L9 18" />
      )}
    </svg>
  );
}

export default function Gallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [inlinePlayingId, setInlinePlayingId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const carouselRef = useReveal<HTMLDivElement>();

  const close = useCallback(() => setActiveId(null), []);

  // Hybrid playback router — desktop opens the modal, mobile mounts the
  // iframe inline inside the tapped card. Viewport is read at click time
  // (not during render) so SSR and first client render stay identical.
  const handleVideoClick = useCallback((id: string) => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop) {
      setInlinePlayingId(null);
      setActiveId(id);
    } else {
      setActiveId(null);
      setInlinePlayingId(id);
    }
  }, []);

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

  const active: GalleryItem | null = activeId
    ? videoItems.find((i) => i.id === activeId) ??
      trainingPhotos.find((i) => i.id === activeId) ??
      null
    : null;

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
        {videoItems.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            isInlinePlaying={inlinePlayingId === item.id}
            onOpen={() => handleVideoClick(item.id)}
          />
        ))}
      </div>

      {/* ===== Training carousel ===== */}
      <div ref={carouselRef} className="reveal max-w-[1400px] mx-auto mt-24 md:mt-32">
        <div className="px-0 md:px-0 max-w-[1200px] mx-auto mb-10">
          <p className="font-barlow-cond text-[0.8rem] font-semibold tracking-[5px] uppercase text-red mb-3">
            Inside the Gym
          </p>
          <h3
            className="font-bebas leading-[0.9] tracking-[2px] text-cream"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Training <span className="text-red">Moments</span>
          </h3>
        </div>

        <TrainingCarousel
          photos={trainingPhotos}
          onOpen={(id) => setActiveId(id)}
        />
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
  isInlinePlaying,
  onOpen,
}: {
  item: VideoItem;
  isInlinePlaying: boolean;
  onOpen: () => void;
}) {
  const isFeatured = !!item.featured;
  const [thumbSrc, setThumbSrc] = useState(youtubeThumb(item.youtubeId));

  const handleThumbError = useCallback(() => {
    if (thumbSrc.includes("maxresdefault")) {
      setThumbSrc(`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`);
    }
  }, [item.youtubeId, thumbSrc]);

  const aspectClasses = isFeatured
    ? "aspect-video md:aspect-auto md:col-span-2 md:row-span-2"
    : "aspect-video";

  // Mobile-only inline playback: thumbnail/overlay are unmounted and the
  // YouTube iframe takes over the same grid cell. Single-instance invariant
  // is guaranteed by the parent's `inlinePlayingId` state — switching to
  // another video unmounts this iframe, which destroys the YT player.
  if (isInlinePlaying) {
    return (
      <div
        className={`relative overflow-hidden bg-dark2 border border-red/60 ${aspectClasses}`}
      >
        <iframe
          src={youtubeEmbedInline(item.youtubeId)}
          title={item.title}
          allow="autoplay; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Play: ${item.title}`}
      className={`group relative overflow-hidden bg-dark2 border border-white/[0.06] text-left transition-all duration-300 hover:border-red/60 focus-visible:border-red focus-visible:outline-none ${aspectClasses}`}
    >
      <Image
        src={thumbSrc}
        alt={`${item.title} — video thumbnail`}
        fill
        sizes={
          isFeatured
            ? "(max-width: 768px) 90vw, 800px"
            : "(max-width: 768px) 90vw, 400px"
        }
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        onError={handleThumbError}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black-deep via-black-deep/35 to-transparent"
      />

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

function TrainingCarousel({
  photos,
  onOpen,
}: {
  photos: ImageItem[];
  onOpen: (id: string) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanLeft(el.scrollLeft > 4);
      setCanRight(el.scrollLeft < max - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByPage = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="group relative">
      <div
        ref={scrollerRef}
        className="scrollbar-hide edge-fade-x overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth"
      >
        <ul className="flex gap-4 md:gap-5 px-[5vw] md:px-12 py-2">
          {photos.map((photo, index) => (
            <li
              key={photo.id}
              className="snap-start shrink-0 basis-[82%] sm:basis-[55%] md:basis-1/3 lg:basis-1/4"
            >
              <button
                type="button"
                onClick={() => onOpen(photo.id)}
                aria-label={`Open photo ${index + 1} of ${photos.length}`}
                className="relative block w-full aspect-[4/5] overflow-hidden bg-dark2 border border-white/[0.06] transition-colors duration-300 hover:border-red/60 focus-visible:border-red focus-visible:outline-none"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 82vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out hover:scale-[1.05]"
                />
                {/* Subtle bottom shade so future captions stay legible */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black-deep/55 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Arrows — desktop only, hover-revealed */}
      <button
        type="button"
        onClick={() => scrollByPage(-1)}
        disabled={!canLeft}
        aria-label="Previous photos"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-black-deep/70 backdrop-blur-sm border border-white/[0.08] text-cream opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red hover:border-red disabled:opacity-0 disabled:pointer-events-none focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
      >
        <ChevronIcon dir="left" className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollByPage(1)}
        disabled={!canRight}
        aria-label="Next photos"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-black-deep/70 backdrop-blur-sm border border-white/[0.08] text-cream opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red hover:border-red disabled:opacity-0 disabled:pointer-events-none focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
      >
        <ChevronIcon dir="right" className="w-5 h-5" />
      </button>
    </div>
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
      aria-label={
        item.kind === "video"
          ? `Now playing: ${item.title}`
          : item.alt
      }
    >
      <motion.div
        initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: reduced ? 0 : 0.3, ease: "easeOut" }}
        className={`relative ${
          item.kind === "video"
            ? "w-full max-w-[1100px] aspect-video bg-dark border border-white/[0.08]"
            : "w-full max-w-[1200px] max-h-[85vh] flex items-center justify-center"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {item.kind === "video" ? (
          <iframe
            src={youtubeEmbedModal(item.youtubeId)}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <div className="relative w-full h-full" style={{ minHeight: "min(85vh, 720px)" }}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 1200px) 90vw, 1200px"
              className="object-contain"
              priority
            />
          </div>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={item.kind === "video" ? "Close video" : "Close image"}
          className="absolute -top-12 right-0 md:-top-3 md:-right-3 w-10 h-10 rounded-full bg-red text-cream flex items-center justify-center transition-colors duration-200 hover:bg-red-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}
