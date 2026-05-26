"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const currentLang = segments[0] === "he" ? "he" : "en";
  const targetLang = currentLang === "he" ? "en" : "he";
  const newPath = "/" + [targetLang, ...segments.slice(1)].join("/");

  // Show the OTHER language as the call-to-action label
  const label = currentLang === "he" ? "EN" : "עב";
  const ariaLabel = currentLang === "he" ? "Switch to English" : "עבור לעברית";

  return (
    <Link
      href={newPath}
      aria-label={ariaLabel}
      className="flex items-center gap-1.5 font-barlow-cond text-[0.85rem] font-semibold tracking-[2px] uppercase text-muted hover:text-red transition-colors duration-200 no-underline"
    >
      <Globe className="w-[14px] h-[14px] flex-shrink-0" strokeWidth={2} />
      {currentLang === "en" ? (
        <span lang="he" className="tracking-normal normal-case">{label}</span>
      ) : (
        <span>{label}</span>
      )}
    </Link>
  );
}
