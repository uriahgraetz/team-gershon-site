import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Content-Security-Policy — allowlists every external origin this site actually
// reaches. Tightening rules:
// - `script-src 'unsafe-inline'` is required because Next.js injects inline
//   hydration scripts without a nonce in this app. Removing it requires
//   wiring nonces through middleware — out of scope here.
// - `style-src 'unsafe-inline'` is required by framer-motion (writes inline
//   style="transform:..." on animated nodes) and by our own style={{...}}
//   usage for the brand gradient strips.
// - In dev we also allow `'unsafe-eval'` so HMR / source maps work.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://i.ytimg.com",
  "connect-src 'self'",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Vercel already injects HSTS; keeping it explicit makes the policy
  // portable and documents the intent.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
