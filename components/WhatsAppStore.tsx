"use client";

import { useState } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { products, type Product } from "@/data/products";
import type { Dictionary, Locale } from "@/app/[lang]/getDictionary";

const WA_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

type Selection = { color?: string; size?: string };

function buildMessage(product: Product, sel: Selection, lang: Locale): string {
  const name = lang === "he" ? product.nameHe : product.nameEn;
  const parts = [sel.color, sel.size].filter(Boolean) as string[];
  const detail = parts.join(" / ");

  if (lang === "he") {
    const tail = detail ? ` ב${detail}` : "";
    return `היי איתי, ראיתי באתר את ${name}. אני אשמח לקנות אותו${tail}. מתי אפשר לבוא לאסוף מהמכון בירושלים?`;
  }
  const tail = detail ? ` in ${detail}` : "";
  return `Hi Itay, I saw the ${name} on the website. I would like to buy it${tail}. When can I pick it up from the gym in Jerusalem?`;
}

export default function WhatsAppStore({
  dict,
  lang,
}: {
  dict: Dictionary["shop"];
  lang: Locale;
}) {
  const headerRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  const [selections, setSelections] = useState<Record<string, Selection>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  function updateSelection(id: string, patch: Partial<Selection>) {
    setSelections((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
    setErrors((prev) => (prev[id] ? { ...prev, [id]: false } : prev));
  }

  function handleOrder(product: Product) {
    const sel = selections[product.id] ?? {};
    const needsColor = !!(lang === "he" ? product.colorsHe : product.colorsEn)?.length;
    const needsSize = !!product.sizes?.length;
    const missing = (needsColor && !sel.color) || (needsSize && !sel.size);

    if (missing) {
      setErrors((prev) => ({ ...prev, [product.id]: true }));
      return;
    }
    const msg = buildMessage(product, sel, lang);
    const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="shop" className="py-32 px-[5vw] bg-black-deep">
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
        <p className="mt-6 text-[1.05rem] font-light text-muted max-w-[640px] leading-[1.8]">
          {dict.body}
        </p>
      </div>

      <div
        ref={gridRef}
        className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-[1200px] mx-auto"
      >
        {products.map((product) => {
          const name = lang === "he" ? product.nameHe : product.nameEn;
          const colors = lang === "he" ? product.colorsHe : product.colorsEn;
          const sizes = product.sizes;
          const sel = selections[product.id] ?? {};
          const hasError = !!errors[product.id];

          return (
            <article
              key={product.id}
              className="flex flex-col bg-dark2 border border-white/[0.06] rounded-none overflow-hidden transition-all duration-300 hover:border-red/50 hover:-translate-y-1 hover:shadow-[0_0_12px_rgba(200,16,46,0.15)]"
            >
              <div className="relative aspect-square bg-dark3 border-b border-white/[0.05]">
                <Image
                  src={product.image}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-8"
                />
              </div>

              <div className="flex flex-col flex-1 p-6 gap-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-bebas text-[1.7rem] tracking-[1px] text-cream leading-none">
                    {name}
                  </h3>
                  <div className="font-bebas text-[1.6rem] leading-none text-gold whitespace-nowrap">
                    ₪{product.price}
                  </div>
                </div>

                {(colors || sizes) && (
                  <div className="flex flex-col gap-3">
                    {colors && (
                      <select
                        aria-label={dict.ariaPickColor}
                        value={sel.color ?? ""}
                        onChange={(e) => updateSelection(product.id, { color: e.target.value })}
                        className="w-full bg-dark3 border border-white/[0.08] text-cream font-barlow text-[0.95rem] px-3.5 py-3 outline-none cursor-pointer rounded-none transition-colors duration-200 focus:border-red/50"
                      >
                        <option value="">{dict.colorPlaceholder}</option>
                        {colors.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    )}
                    {sizes && (
                      <select
                        aria-label={dict.ariaPickSize}
                        value={sel.size ?? ""}
                        onChange={(e) => updateSelection(product.id, { size: e.target.value })}
                        className="w-full bg-dark3 border border-white/[0.08] text-cream font-barlow text-[0.95rem] px-3.5 py-3 outline-none cursor-pointer rounded-none transition-colors duration-200 focus:border-red/50"
                      >
                        <option value="">{dict.sizePlaceholder}</option>
                        {sizes.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    )}
                    {hasError && (
                      <p
                        role="alert"
                        className="text-[0.8rem] text-red font-barlow text-start"
                      >
                        {dict.errorSelect}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleOrder(product)}
                  className="mt-auto bg-red text-cream font-barlow-cond text-[0.95rem] font-bold tracking-[2px] uppercase px-6 py-3.5 border-none cursor-pointer rounded-none transition-all duration-200 hover:bg-red-dark hover:-translate-y-0.5"
                >
                  {dict.cta}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
