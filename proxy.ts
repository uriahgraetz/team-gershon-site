import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["he", "en"] as const;
type Locale = (typeof LOCALES)[number];

const DEFAULT_LOCALE: Locale = "he";

function detectLocale(request: NextRequest): Locale {
  const accept = request.headers.get("accept-language") ?? "";
  // Take the highest-weighted tag (the first entry is the user's primary
  // preference per RFC 7231). English -> /en. Anything else (Hebrew,
  // Arabic, Russian, missing header, etc.) -> /he, since the local
  // audience is the core market.
  const primary =
    accept.split(",")[0]?.split(";")[0]?.trim().toLowerCase() ?? "";
  if (primary.startsWith("en")) return "en";
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already prefixed with a known locale — pass through untouched.
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // No locale prefix → detect and redirect.
  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

// Skip the proxy entirely for:
//   - _next/*       Next.js internals (chunks, /_next/image, etc.)
//   - api/*         API routes (e.g. /api/send for the Resend lead form)
//   - any path whose last segment contains a `.` — catches every static
//     asset under /public (.ico, .png, .webp, .avif, .svg, .woff2, …).
// The negative lookahead is intentionally broad so we never accidentally
// redirect a static asset URL.
export const config = {
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
