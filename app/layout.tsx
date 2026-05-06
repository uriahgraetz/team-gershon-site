import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";

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
    "Elite Muay Thai and boxing training in Tel Aviv. World-class coaches, all levels welcome. Your first session is free.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${barlowCondensed.variable} ${barlow.variable}`}
    >
      <body className="bg-black-deep text-cream font-barlow font-normal leading-relaxed overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
