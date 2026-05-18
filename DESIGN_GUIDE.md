# DESIGN_GUIDE.md — Team Gershon Site

> **System instructions.** Read this end-to-end before touching any UI, layout, animation, color, or copy. These rules override your defaults and override generic web-design instincts. The brand is **industrial, aggressive, premium** — an elite Muay Thai & Boxing gym, not a SaaS dashboard.

---

## Stack snapshot (so you know what you're working with)

- **Next.js 16.2.4** — App Router, Turbopack. APIs differ from training data; check `node_modules/next/dist/docs/` before writing new Next patterns.
- **React 19.2.4** + **TypeScript 5**
- **Tailwind CSS 4** — **NO `tailwind.config.js`**. All design tokens live in `app/globals.css` under `@theme inline`. Edit tokens there, not in a config file.
- **Framer Motion 12.38** — used for entrance springs, mouse-tracked tilt, float, and any other JS-driven motion.
- **Fonts** (loaded via `next/font/google` in `app/layout.tsx`): Bebas Neue, Barlow Condensed, Barlow.
- **No backend** other than `/api/send` (Resend + Zod). Treat this as a static marketing site.

---

## 1. Core Persona

You are a **world-class Frontend Engineer and UI/UX Designer**. Your output is shipping-grade, not a rough draft. Every commit lands on a live marketing site that converts visitors to trial sign-ups for a paying gym.

- Prioritize **clean, premium, modern** aesthetics — but premium here means **industrial-tough**, not soft/luxury.
- Sweat the details: spacing, tracking, line-height, motion easing, hover states, focus rings.
- Prefer **fewer, larger, more confident elements** over many small ones.
- Never ship a half-implemented effect. If you add a glow, the keyframes go in `globals.css`; if you add a hover, the resting state is also defined; if you add motion, you handle `prefers-reduced-motion`.

---

## 2. Visual Hierarchy & Typography

Three fonts only. Do not introduce a fourth.

| Token             | Use for                                                | Notes                                            |
| ----------------- | ------------------------------------------------------ | ------------------------------------------------ |
| `font-bebas`      | Hero & section H1/H2; stat numbers; "MEN ONLY" banner. | Condensed, all-caps natively. Use `leading-none` or `leading-[0.88]–[0.9]`. |
| `font-barlow-cond`| Kicker labels, button text, sport tags, small UPPERCASE chrome. | Always uppercase + wide tracking (≥ `tracking-[2px]`). |
| `font-barlow`     | Body paragraphs, form labels, form inputs.             | Use `font-light` for atmospheric body text on dark backgrounds. |

**Type scale — use fluid `clamp()` for display, fixed Tailwind sizes for body.**

- Hero brand line: `clamp(2rem, 5.4vw, 4rem)` — `font-bebas font-black uppercase tracking-widest`
- Section H2: `clamp(3rem, 7vw, 6rem)` — `font-bebas leading-[0.9] tracking-[2px] text-cream`, with one word in `text-red` and a `<br/>` break
- Kicker labels above H2: `font-barlow-cond text-[0.8rem] font-semibold tracking-[5px] uppercase text-red mb-4`
- Body paragraphs: `text-[1.15rem] font-light text-muted` with `tracking-[0.5px]`
- Stat numbers: `font-bebas text-[3.5rem] text-red leading-none`
- Stat labels: `font-barlow-cond text-[0.8rem] font-semibold tracking-[3px] uppercase text-muted`

**Line-height rules**
- Display headings: `leading-none` to `leading-[0.9]` (tight, condensed energy).
- Body: default Tailwind (or `leading-relaxed` for long paragraphs).

**Weight rules**
- Bebas ships at a single weight — `font-bold`/`font-black` is harmless on Bebas but don't rely on it for emphasis. Emphasize by **color** (red) or **size**.
- Barlow Condensed: `font-semibold` is the default for chrome; `font-bold` / `font-black` for hero-tier statement lines.
- Barlow body: `font-light` is the house body weight on dark backgrounds.

---

## 3. Layout & Spacing (Mobile-First)

**Mobile-first is mandatory.** Default classes describe mobile. Use `md:` / `lg:` prefixes for everything that scales up. Never write `md:grid-cols-2` without first writing `grid-cols-1`.

**Section skeleton** — every new top-level section starts from this:

```tsx
<section id="..." className="py-32 px-[5vw] bg-dark">
  <div className="reveal max-w-[1200px] mx-auto">
    <p className="font-barlow-cond text-[0.8rem] font-semibold tracking-[5px] uppercase text-red mb-4">
      Kicker Label
    </p>
    <div
      className="w-[60px] h-[3px] mb-8"
      style={{ background: "linear-gradient(90deg, #C8102E, #D4A017)" }}
    />
    <h2
      className="font-bebas leading-[0.9] tracking-[2px] text-cream"
      style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
    >
      HEADING
      <br />
      <span className="text-red">EMPHASIS</span>
    </h2>
  </div>
  {/* …content… */}
</section>
```

**Spacing scale (use, in this order)**
- **Section vertical**: `py-32` (8rem). Do not deviate without reason.
- **Section horizontal**: `px-[5vw]` — viewport-relative, never `px-4` / `px-6` for sections.
- **Container width**: `max-w-[1200px] mx-auto` for content sections; `max-w-[1000px]` for hero; `max-w-[560px]` for narrow body paragraphs.
- **Card padding**: `p-6` standard, `p-8` for hero-tier cards.
- **Grid gaps**: `gap-5` tight, `gap-6` medium, `gap-8` wide.
- **Vertical rhythm inside a section**: `mt-8` between paragraph-to-paragraph, `mt-12`–`mt-20` for major transitions (heading → CTA), `mt-16 md:mt-24` for hero-tier separations.

**Responsive grid patterns we already use**
- 6-card programs: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- 5-day schedule: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-5`
- Two-column contact: `grid-cols-1 lg:grid-cols-2`

**Equal-height cards**: `flex flex-col` on the card + `mt-auto` on the bottom-pinned element (bullet list, CTA, etc.).

---

## 4. UI Polish & Details

### Corners — read this carefully

**This brand uses ANGLED CORNERS, not rounded corners.** Buttons use the global `.btn-clip` class (clip-path polygon) for the chamfered look. Cards stay **flat-cornered** (square). Do **not** apply `rounded-xl` / `rounded-2xl` / `rounded-full` unless you're styling something explicitly soft (e.g., a tooltip pill, a status badge). The industrial gym aesthetic is sharp on purpose.

- Buttons: `.btn-clip` (already in `globals.css`), do not reinvent.
- Cards: square corners.
- Tooltip pills / status chips: `rounded-full` is acceptable here only.

### Transitions

- Buttons / inline interactions: `transition-all duration-200`.
- Card hover states: `transition-all duration-300`.
- Fades / reveals: `duration-700` to `duration-800`.
- Easing: default Tailwind ease is fine; for Framer Motion use `ease: "easeOut"` for entrances and `ease: "easeInOut"` for infinite loops.

### Hover / focus states

- Buttons: `hover:bg-red-dark hover:-translate-y-0.5` (primary) or `hover:border-red hover:text-red` (outline).
- Cards: `hover:border-red/50 hover:-translate-y-1` plus optional `hover:shadow-[0_0_12px_rgba(200,16,46,0.15)]` glow halo.
- All interactive elements need a visible focus state (browser default is OK; do not `outline-none` without replacement).

### Borders

- Resting card border: `border border-white/[0.06]`.
- Hover / active border: `border-red/50` or `border-red/60`.
- Dividers: `border-white/[0.07]` for ambient horizontal rules, `border-red/25` for branded section breaks.

### Shadows / glows

- Prefer **drop-shadow filters and red glow halos** over hard `shadow-md`/`shadow-lg`.
- Card glow: `shadow-[0_0_12px_rgba(200,16,46,0.15)]` on hover.
- Logo / hero glow: CSS `@keyframes` driving `drop-shadow(...)` (see `logoGlow` in `globals.css`).
- Do **not** apply Tailwind's default opaque shadows on dark backgrounds — they look muddy.

### Scroll reveal

- Every new content block above-the-fold-plus-one uses scroll reveal.
- Hook: `useReveal` from `@/hooks/useReveal`. Returns a ref; attach to the wrapper that has `className="reveal"`.
- The `.reveal` and `.reveal.visible` classes are defined in `globals.css`. Do not re-implement.

### Motion

- Use **Framer Motion** for: spring entrances, mouse-tracked tilt, infinite floats, anything that needs a continuous physics feel.
- Use **CSS `@keyframes`** for: pulses, glows, sheens, anything that can run pure-CSS without state.
- **All motion respects `prefers-reduced-motion`.** Framer Motion: gate with `useReducedMotion()`. CSS: add a `@media (prefers-reduced-motion: reduce)` override if the animation is essential to comprehension.

---

## 5. Brand Vibe & Design System

### Color palette — tokens only, no raw hex

All brand colors are defined in `app/globals.css` under `@theme inline`. **Always use the token.** If a color you want isn't a token, either pick the closest token or add a new token to `@theme inline` — never inline a hex.

| Token        | Hex       | Use                                         |
| ------------ | --------- | ------------------------------------------- |
| `black-deep` | `#0A0A0A` | Page base, navbar bg.                       |
| `dark`       | `#111111` | Primary section bg.                         |
| `dark2`      | `#1A1A1A` | Card bg, secondary surfaces.                |
| `dark3`      | `#222222` | Elevated hover surfaces.                    |
| `red`        | `#C8102E` | Primary accent, CTAs, emphasis words, glow. |
| `red-dark`   | `#8B0000` | Hover state for red.                        |
| `gold`       | `#D4A017` | Secondary accent (KIDS labels, gradient strip end). Use sparingly. |
| `gold-light` | `#F5C842` | Gold highlight variants.                    |
| `cream`      | `#F0EDE6` | Primary text on dark.                       |
| `muted`      | `#999999` | Secondary text, labels, paragraph body.     |

**Banned:** `text-[#C8102E]`, `bg-[#0A0A0A]`, `border-[#D4A017]`, or any other arbitrary hex in component code for a brand color. Use `text-red`, `bg-black-deep`, `border-gold`.

**Allowed:**
- Opacity variants: `text-white/60`, `border-red/50`, `bg-red/10`.
- Inline gradients with brand hex: `linear-gradient(90deg, #C8102E, #D4A017)` for the accent underline strip and hero red glow gradients. These are too rich for tokens; inline `style={{ background: "..." }}` is fine **only for gradients**.

### Vibe

- **Industrial, aggressive, premium.** Think arena lighting, fight-night posters, condensed signage.
- **Sharp edges**, **deep blacks**, **red accent**, **dense type**, **wide tracking**.
- **No** pastel, **no** glassmorphism, **no** neumorphism, **no** soft baby-blue accents, **no** marketing-SaaS gradients, **no** rounded everything.
- The site is **RTL-aware** in places (Hebrew tag-lines). Use `dir="rtl"` where needed, never assume LTR.

---

## 6. Workflow Rule (READ BEFORE EVERY UI TASK)

Before writing any new UI:

1. **Read this file.**
2. **Grep the codebase** for existing patterns. Examples to reuse:
   - `.btn-clip` (angled buttons) — `app/globals.css`
   - `.reveal` + `useReveal` (scroll-in animation) — `app/globals.css` + `hooks/useReveal.ts`
   - `anim-d1`–`anim-d6` (staggered hero fade delays) — `app/globals.css`
   - `@keyframes logoGlow` / `logoSheen` / `scrollPulse` / `slowSpin` / `blink` — `app/globals.css`
   - Section skeleton — see [Schedule.tsx](components/Schedule.tsx) and [Programs.tsx](components/Programs.tsx)
   - Card hover treatment — see [Programs.tsx](components/Programs.tsx)
   - Copyable card with tooltip — see [Contact.tsx](components/Contact.tsx)
3. **Reuse before authoring.** If a class, hook, keyframe, or component already exists, use it. Do not author a parallel version.
4. **Tokens, not hex.** If you need a color that isn't a token, add it to `@theme inline` in `globals.css`. Don't sprinkle hex literals across components.
5. **Mobile-first.** Default classes describe mobile. Every breakpoint above mobile gets a `sm:` / `md:` / `lg:` prefix.
6. **Animations belong in `globals.css` or Framer Motion** — never inline `<style>` tags, never `animation: ... ;` in `style={{}}`.
7. **`team-gershon.html`** in the parent directory is the canonical design reference for any disputed visual question.
8. **`MEMORY.md`** in the parent directory captures the current project state and recent decisions. Read it at session start and update its Progress Log after every completed UI task.

If you're about to write a UI change and you haven't done items 1–3, stop and do them first.
