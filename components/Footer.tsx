import type { Dictionary } from "@/app/[lang]/getDictionary";

const SECTION_IDS = ["home", "programs", "gallery", "contact"] as const;

export default function Footer({
  dict,
}: {
  dict: Dictionary["footer"];
}) {
  return (
    <footer className="bg-black-deep border-t border-red/20 px-[5vw] py-12 flex flex-wrap justify-between items-center gap-4">
      {/* Brand wordmark — kept in Bebas+Barlow on both locales via lang="en"
          re-anchor, matching the Navbar pattern. */}
      <div
        lang="en"
        className="font-bebas text-[1.5rem] tracking-[2px] text-cream"
      >
        {dict.brand.team} <span className="text-red">{dict.brand.gershon}</span>
      </div>
      <div className="text-[0.85rem] text-muted">
        {dict.copyright}
        <span aria-hidden="true" className="mx-2">•</span>
        <span lang="en">Designed by GRAETZDESIGN</span>
      </div>
      <div className="flex gap-6">
        {SECTION_IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="font-barlow-cond text-[0.8rem] font-semibold tracking-[2px] uppercase text-muted no-underline transition-colors duration-200 hover:text-red"
          >
            {dict.links[id]}
          </a>
        ))}
      </div>
    </footer>
  );
}
