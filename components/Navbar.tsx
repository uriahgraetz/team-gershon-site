"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/getDictionary";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SECTION_IDS = [
  "home",
  "about",
  "programs",
  "schedule",
  "gallery",
  "contact",
] as const;

export default function Navbar({ dict }: { dict: Dictionary["navbar"] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = SECTION_IDS.map((id) => ({
    href: `#${id}`,
    label: dict.links[id],
  }));

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-[72px] bg-black-deep/92 backdrop-blur-[12px] border-b border-red/25 flex items-center justify-between px-[5vw]">
      {/* Logo — `lang="en"` keeps the wordmark in Bebas+Barlow even on /he
          (re-anchored via the [lang="en"] block in globals.css) and signals
          to Hebrew screen readers to pronounce it as English. */}
      <div
        lang="en"
        className="font-bebas text-[1.8rem] tracking-[2px] text-cream"
      >
        {dict.brand.team} <span className="text-red">{dict.brand.gershon}</span>
      </div>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-barlow-cond text-[0.95rem] font-semibold tracking-[2px] uppercase text-muted hover:text-red transition-colors duration-200 no-underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop: language switcher + CTA */}
      <div className="hidden md:flex items-center gap-5">
        <LanguageSwitcher />
        <a
          href="#contact"
          className="font-barlow-cond text-[0.85rem] font-bold tracking-[2px] uppercase text-cream bg-red px-6 py-[10px] no-underline transition-all duration-200 hover:bg-red-dark hover:-translate-y-px"
        >
          {dict.cta}
        </a>
      </div>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] cursor-pointer p-[6px] bg-transparent border-none"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={dict.toggleMenu}
      >
        <span
          className={`block w-6 h-[2px] bg-cream transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
        />
        <span
          className={`block w-6 h-[2px] bg-cream transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-6 h-[2px] bg-cream transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
        />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-[72px] inset-x-0 bg-dark flex flex-col gap-4 px-[5vw] py-8 z-40">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-barlow-cond text-[1rem] font-semibold tracking-[2px] uppercase text-muted hover:text-red transition-colors no-underline"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center justify-between mt-2">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-block font-barlow-cond text-[0.9rem] font-bold tracking-[2px] uppercase text-cream bg-red px-6 py-3 no-underline text-center"
            >
              {dict.cta}
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
