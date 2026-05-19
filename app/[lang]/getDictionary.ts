import "server-only";
import { cache } from "react";

// English is the canonical shape. he.json must structurally match this type
// (enforced via the `satisfies` clause on the dictionaries map below).
import type enDict from "./dictionaries/en.json";

export type Dictionary = typeof enDict;

const LOCALES = ["en", "he"] as const;
export type Locale = (typeof LOCALES)[number];

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  he: () => import("./dictionaries/he.json").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export const hasLocale = (locale: string): locale is Locale =>
  (LOCALES as readonly string[]).includes(locale);

// React `cache` dedupes calls within a single request. Combined with the
// dynamic import above, only the active locale's JSON is bundled at build,
// and the parsed dictionary is reused across every Server Component on the
// page that calls getDictionary().
export const getDictionary = cache(
  async (locale: Locale): Promise<Dictionary> => dictionaries[locale]()
);
