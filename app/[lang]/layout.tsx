import type { Metadata } from "next";
import {
  Bebas_Neue,
  Barlow_Condensed,
  Barlow,
  Heebo,
} from "next/font/google";
import "../globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

// Weight inventory was audited against actual class usage: no Barlow
// Condensed font-light (300) anywhere, and no Barlow font-medium (500).
// Each weight = a separate WOFF2 file, so trimming saves bytes for free.
const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700", "900"],
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
});

const barlow = Barlow({
  weight: ["300", "400"],
  variable: "--font-barlow-sans",
  subsets: ["latin"],
});

// Hebrew display + body + chrome — one family covers all three roles.
// 900 mimics Bebas's impact at the display tier; 700 covers font-bold and
// font-semibold chrome; 500 covers font-medium; 400 is body default.
// font-light (300) requests fall back to 400 — acceptable trade-off.
const heebo = Heebo({
  weight: ["400", "500", "700", "900"],
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
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

  // All four font variables are applied to <html> on every render. Which
  // physical font fills each Tailwind token is decided in globals.css
  // based on `html[lang]` — see the :root / html[lang="he"] / [lang="en"]
  // blocks there. Elements with an explicit `lang="en"` (e.g. the brand
  // wordmark inside the RTL Navbar) keep their Latin typography via the
  // [lang="en"] re-anchor.
  return (
    <html
      lang={lang}
      dir={dir}
      className={`${bebasNeue.variable} ${barlowCondensed.variable} ${barlow.variable} ${heebo.variable} overflow-x-hidden`}
    >
      <body className="bg-black-deep text-cream font-barlow font-normal leading-relaxed overflow-x-hidden max-w-[100vw]">
        {children}
      </body>
    </html>
  );
}
