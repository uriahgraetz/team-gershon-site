import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed, Barlow } from "next/font/google";
import "../globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
});

const barlow = Barlow({
  weight: ["300", "400", "500"],
  variable: "--font-barlow-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Gershon | Muay Thai & Boxing",
  description:
    "Elite Muay Thai and boxing training in Jerusalem. World-class coaches, all levels welcome. Your first session is free.",
};

const LOCALES = ["he", "en"] as const;

// Pre-render both locales at build time.
export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Reject any locale not in LOCALES with a 404 instead of dynamic-rendering it.
// The proxy already normalizes inbound paths, but this is a second line of defense.
export const dynamicParams = false;

// Use the auto-generated `LayoutProps` helper so the layout's `params` type
// matches what Next.js's typegen expects for this route. `lang` arrives as
// `string` — we narrow at use, the LOCALES list + dynamicParams=false
// guarantees only "he" | "en" actually reach this layout.
export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  // Next.js 16: params is a Promise — must be awaited.
  const { lang } = await params;
  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${bebasNeue.variable} ${barlowCondensed.variable} ${barlow.variable}`}
    >
      <body className="bg-black-deep text-cream font-barlow font-normal leading-relaxed overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
