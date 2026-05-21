"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import type { Dictionary } from "@/app/[lang]/getDictionary";

type MethodKind = "location" | "phone" | "email" | "hours";

type ContactMethodConfig = {
  kind: MethodKind;
  icon: string;
  href?: string;
  copyable?: boolean;
};

const MAPS_QUERY = encodeURIComponent("רחוב רבי צדוק 12 ירושלים");

// Phone is assembled from parts at render time so the literal number
// never appears as a single string in the source code (basic anti-scrape).
function getPhoneNumber(): string {
  return ["054", "814", "1138"].join("-");
}

const CONTACT_METHODS: readonly ContactMethodConfig[] = [
  { kind: "location", icon: "📍", href: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}` },
  { kind: "phone",    icon: "📞", copyable: true },
  { kind: "email",    icon: "📧", copyable: true },
  { kind: "hours",    icon: "⏰" },
];

function InstagramIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-7 h-7 fill-white flex-shrink-0" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  message: string;
  website: string; // honeypot — must remain empty
};

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  experience: "",
  message: "",
  website: "",
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

const EXPERIENCE_OPTION_KEYS = [
  "beginner",
  "some",
  "intermediate",
  "advanced",
] as const;

export default function Contact({
  dict,
}: {
  dict: Dictionary["contact"];
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [copiedKind, setCopiedKind] = useState<MethodKind | null>(null);
  const infoRef = useReveal<HTMLDivElement>();
  const formRef = useReveal<HTMLDivElement>();

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCopy(kind: MethodKind, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKind(kind);
      setTimeout(() => setCopiedKind((curr) => (curr === kind ? null : curr)), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      alert(`${dict.methods.copyFailAlert}\n\n${value}`);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    const name = `${form.firstName} ${form.lastName}`.trim();
    const payload = {
      name,
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      experience: form.experience || undefined,
      website: form.website, // honeypot
    };

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setForm(EMPTY_FORM);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
    }
  }

  function handleWhatsAppClick() {
    const phone = ["972", "54", "81", "41", "138"].join("");
    const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(dict.whatsapp.prefilledMessage);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleFacebookClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const httpsUrl = "https://www.facebook.com/TeamGershonOfficial";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) return; // desktop: let the default <a target="_blank"> behavior run

    e.preventDefault();
    const deepLink = "fb://facewebmodal/f?href=" + encodeURIComponent(httpsUrl);

    // If the FB app isn't installed, the deep link won't navigate — fall back to web.
    const fallback = window.setTimeout(() => {
      window.location.href = httpsUrl;
    }, 1500);

    // If the app opens, the page becomes hidden — cancel the fallback.
    const onVisibilityChange = () => {
      if (document.hidden) window.clearTimeout(fallback);
    };
    document.addEventListener("visibilitychange", onVisibilityChange, { once: true });

    window.location.href = deepLink;
  }

  function getMethodLabel(kind: MethodKind): string {
    switch (kind) {
      case "location": return dict.methods.locationLabel;
      case "phone":    return dict.methods.phoneLabel;
      case "email":    return dict.methods.emailLabel;
      case "hours":    return dict.methods.hoursLabel;
    }
  }

  function getMethodValue(kind: MethodKind): string {
    switch (kind) {
      case "location": return dict.methods.addressValue;
      case "phone":    return getPhoneNumber();
      case "email":    return dict.methods.emailValue;
      case "hours":    return dict.methods.hoursValue;
    }
  }

  return (
    <section id="contact" className="py-32 px-[5vw] bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-[1200px] mx-auto items-start">

        {/* Left: info */}
        <div ref={infoRef} className="reveal pt-4">
          <p className="font-barlow-cond text-[0.8rem] font-semibold tracking-[5px] uppercase text-red mb-4">
            {dict.kicker}
          </p>
          <div className="w-[60px] h-[3px] mb-8" style={{ background: "linear-gradient(90deg, #C8102E, #D4A017)" }} />
          <h2
            className="font-bebas leading-[0.9] tracking-[2px] text-cream mb-6"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            {dict.headingTop}
            <br />
            <span className="text-red">{dict.headingEmphasis}</span>
          </h2>
          <p className="text-[1.05rem] font-light text-muted max-w-[540px] leading-[1.8]">
            {dict.body}
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {CONTACT_METHODS.map((m) => {
              const label = getMethodLabel(m.kind);
              const value = getMethodValue(m.kind);
              const baseClass =
                "flex gap-5 items-center bg-dark2 border border-white/[0.06] px-6 py-5 transition-all duration-300";

              // The address value is Hebrew text in both locales — wrap in
              // <span lang="he" dir="rtl"> so it renders RTL with Heebo
              // (via the [lang="he"] re-anchor in globals.css) even on /en.
              const renderedValue = m.kind === "location" ? (
                <span lang="he" dir="rtl">{value}</span>
              ) : (
                value
              );

              if (m.href) {
                return (
                  <a
                    key={m.kind}
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label}: ${dict.aria.directionsLabel}`}
                    className={`${baseClass} no-underline text-inherit cursor-pointer hover:border-red/60 hover:bg-dark3 hover:shadow-[0_0_12px_rgba(200,16,46,0.15)]`}
                  >
                    <div className="text-[1.5rem] flex-shrink-0">{m.icon}</div>
                    <div>
                      <div className="font-barlow-cond text-[0.75rem] font-semibold tracking-[3px] uppercase text-muted">
                        {label}
                      </div>
                      <div className="text-[1rem] text-cream mt-0.5">{renderedValue}</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(m.href, "_blank", "noopener,noreferrer");
                        }}
                        className="mt-3 font-barlow-cond text-[0.7rem] font-semibold tracking-[2px] uppercase text-white bg-transparent border border-red/60 px-3 py-1.5 cursor-pointer transition-colors duration-200 hover:border-red hover:bg-red/10"
                      >
                        {dict.methods.getDirections}
                      </button>
                    </div>
                  </a>
                );
              }
              if (m.copyable) {
                const isCopied = copiedKind === m.kind;
                const tooltipText = m.kind === "phone"
                  ? dict.methods.copyNumberTooltip
                  : dict.methods.copyTooltip;
                return (
                  <button
                    key={m.kind}
                    type="button"
                    onClick={() => handleCopy(m.kind, value)}
                    aria-label={`${dict.aria.copyToClipboard}: ${label}`}
                    className={`${baseClass} group relative w-full text-start cursor-pointer hover:border-red/60 hover:bg-dark3`}
                  >
                    <div className="text-[1.5rem] flex-shrink-0">{m.icon}</div>
                    <div>
                      <div className="font-barlow-cond text-[0.75rem] font-semibold tracking-[3px] uppercase text-muted">
                        {label}
                      </div>
                      <div className="text-[1rem] text-cream mt-0.5 break-all">{value}</div>
                    </div>
                    <span
                      role="status"
                      aria-live="polite"
                      className={`pointer-events-none absolute top-2 end-3 font-barlow-cond text-[0.65rem] font-bold tracking-[1.5px] uppercase px-2 py-1 transition-all duration-200 ${
                        isCopied
                          ? "opacity-100 bg-red text-cream border border-red"
                          : "opacity-0 group-hover:opacity-100 bg-dark3 text-cream border border-white/20"
                      }`}
                    >
                      {isCopied ? dict.methods.copyConfirm : tooltipText}
                    </span>
                  </button>
                );
              }
              return (
                <div key={m.kind} className={`${baseClass} hover:border-red/30`}>
                  <div className="text-[1.5rem] flex-shrink-0">{m.icon}</div>
                  <div>
                    <div className="font-barlow-cond text-[0.75rem] font-semibold tracking-[3px] uppercase text-muted">
                      {label}
                    </div>
                    <div className="text-[1rem] text-cream mt-0.5">{value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* WhatsApp CTA — button label stays English on both locales,
              wrapped in lang="en" so Bebas/Barlow renders on /he too. */}
          <button
            type="button"
            id="whatsapp-cta"
            onClick={handleWhatsAppClick}
            aria-label={dict.whatsapp.ariaLabel}
            className="btn-clip flex items-center gap-4 mt-8 px-8 py-5 border-none cursor-pointer font-barlow-cond text-[1.1rem] font-bold tracking-[2px] uppercase text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "#128C7E" }}
          >
            <WhatsAppIcon />
            <span lang="en">{dict.whatsapp.buttonLabel}</span>
          </button>

          {/* Social media buttons — labels stay English in both locales via
              lang="en" on each label span; aria-labels are translated. */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            <a
              href="https://www.instagram.com/teamgershon_official/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.social.instagramAria}
              className="btn-clip flex items-center gap-3 flex-1 justify-center px-6 py-4 no-underline font-barlow-cond text-[0.95rem] font-bold tracking-[2px] uppercase text-white border border-white/20 transition-all duration-200 hover:border-[#E1306C] hover:bg-[#E1306C]/10 hover:-translate-y-0.5"
            >
              <InstagramIcon />
              <span lang="en">{dict.social.instagram}</span>
            </a>
            <a
              href="https://www.youtube.com/@ItayGershonOfficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.social.youtubeAria}
              className="btn-clip flex items-center gap-3 flex-1 justify-center px-6 py-4 no-underline font-barlow-cond text-[0.95rem] font-bold tracking-[2px] uppercase text-white border border-white/20 transition-all duration-200 hover:border-[#FF0000] hover:bg-[#FF0000]/10 hover:-translate-y-0.5"
            >
              <YouTubeIcon />
              <span lang="en">{dict.social.youtube}</span>
            </a>
            <a
              href="https://www.facebook.com/TeamGershonOfficial"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleFacebookClick}
              aria-label={dict.social.facebookAria}
              className="btn-clip flex items-center gap-3 flex-1 justify-center px-6 py-4 no-underline font-barlow-cond text-[0.95rem] font-bold tracking-[2px] uppercase text-white border border-white/20 transition-all duration-200 hover:border-[#1877F2] hover:bg-[#1877F2]/10 hover:-translate-y-0.5"
            >
              <FacebookIcon />
              <span lang="en">{dict.social.facebook}</span>
            </a>
          </div>
        </div>

        {/* Right: form */}
        <div ref={formRef} className="reveal bg-dark2 border border-red/20 p-10">
          <div className="font-bebas text-[2rem] tracking-[1px] text-cream mb-6">
            {dict.form.title}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label={dict.form.firstNameLabel}
                type="text"
                placeholder={dict.form.firstNamePlaceholder}
                value={form.firstName}
                onChange={(v) => updateField("firstName", v)}
                required
                minLength={1}
                maxLength={40}
              />
              <FormField
                label={dict.form.lastNameLabel}
                type="text"
                placeholder={dict.form.lastNamePlaceholder}
                value={form.lastName}
                onChange={(v) => updateField("lastName", v)}
                required
                minLength={1}
                maxLength={40}
              />
            </div>
            <FormField
              label={dict.form.emailLabel}
              type="email"
              placeholder={dict.form.emailPlaceholder}
              value={form.email}
              onChange={(v) => updateField("email", v)}
              required
              maxLength={120}
            />
            <FormField
              label={dict.form.phoneLabel}
              type="tel"
              placeholder={dict.form.phonePlaceholder}
              value={form.phone}
              onChange={(v) => updateField("phone", v)}
              required
              maxLength={20}
            />
            <div>
              <label className="font-barlow-cond text-[0.8rem] font-semibold tracking-[3px] uppercase text-muted block mb-2">
                {dict.form.experienceLabel}
              </label>
              <select
                value={form.experience}
                onChange={(e) => updateField("experience", e.target.value)}
                className="w-full bg-dark3 border border-white/[0.08] text-cream font-barlow text-[0.95rem] px-3.5 py-3 outline-none cursor-pointer transition-colors duration-200 focus:border-red/50"
              >
                <option value="">{dict.form.experiencePlaceholder}</option>
                {EXPERIENCE_OPTION_KEYS.map((key) => (
                  <option key={key} value={dict.form.experienceOptions[key]}>
                    {dict.form.experienceOptions[key]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-barlow-cond text-[0.8rem] font-semibold tracking-[3px] uppercase text-muted block mb-2">
                {dict.form.messageLabel}
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder={dict.form.messagePlaceholder}
                required
                maxLength={1000}
                className="w-full bg-dark3 border border-white/[0.08] text-cream font-barlow text-[0.95rem] px-3.5 py-3 outline-none resize-none transition-colors duration-200 focus:border-red/50 placeholder:text-muted/50"
              />
            </div>

            {/* Honeypot — visually hidden, real users won't fill it; bots usually will */}
            <div aria-hidden="true" className="sr-only">
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => updateField("website", e.target.value)}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full mt-2 font-barlow-cond text-[1rem] font-bold tracking-[3px] uppercase text-white py-4 border-none cursor-pointer transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-80 ${
                status === "success" ? "bg-[#1a7a1a]" : "bg-red"
              }`}
            >
              {status === "loading"
                ? dict.form.submitting
                : status === "success"
                ? dict.form.submitted
                : dict.form.submit}
            </button>

            {status === "success" && (
              <div
                role="status"
                aria-live="polite"
                lang="he"
                dir="rtl"
                className="bg-red/10 border border-red/40 text-cream px-4 py-3 font-barlow text-[0.95rem] text-center"
              >
                {dict.form.successBanner}
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                aria-live="assertive"
                className="bg-red/10 border border-red/40 text-cream px-4 py-3 font-barlow text-[0.9rem] text-center"
              >
                {dict.form.errorBefore}{" "}
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="underline text-red hover:text-red-dark font-semibold"
                >
                  {dict.form.errorLink}
                </button>{" "}
                {dict.form.errorAfter}
              </div>
            )}
          </form>
          <p className="text-[0.8rem] text-muted text-center mt-4">
            {dict.form.responseNote}
          </p>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  minLength,
  maxLength,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="font-barlow-cond text-[0.8rem] font-semibold tracking-[3px] uppercase text-muted block mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className="w-full bg-dark3 border border-white/[0.08] text-cream font-barlow text-[0.95rem] px-3.5 py-3 outline-none transition-colors duration-200 focus:border-red/50 placeholder:text-muted/50"
      />
    </div>
  );
}
