"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const contactMethods = [
  { icon: "📍", label: "Location", value: "Tel Aviv, Israel" },
  { icon: "📞", label: "Phone",    value: "+972 50 XXX XXXX" },
  { icon: "📧", label: "Email",    value: "info@teamgershon.com" },
  { icon: "⏰", label: "Hours",    value: "Sun–Thu 6am–10pm · Fri 6am–2pm" },
];

function WhatsAppIcon() {
  return (
    <svg className="w-7 h-7 fill-white flex-shrink-0" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const infoRef = useReveal<HTMLDivElement>();
  const formRef = useReveal<HTMLDivElement>();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <section id="contact" className="py-32 px-[5vw] bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-[1200px] mx-auto items-start">

        {/* Left: info */}
        <div ref={infoRef} className="reveal pt-4">
          <p className="font-barlow-cond text-[0.8rem] font-semibold tracking-[5px] uppercase text-red mb-4">
            Get In Touch
          </p>
          <div className="w-[60px] h-[3px] mb-8" style={{ background: "linear-gradient(90deg, #C8102E, #D4A017)" }} />
          <h2
            className="font-bebas leading-[0.9] tracking-[2px] text-cream mb-6"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            READY TO
            <br />
            <span className="text-red">FIGHT?</span>
          </h2>
          <p className="text-[1.05rem] font-light text-muted max-w-[540px] leading-[1.8]">
            Your first session is free. Come see the gym, meet the team, and find
            out what Team Gershon is all about.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {contactMethods.map((m) => (
              <div
                key={m.label}
                className="flex gap-5 items-center bg-dark2 border border-white/[0.06] px-6 py-5 transition-colors duration-300 hover:border-red/30"
              >
                <div className="text-[1.5rem] flex-shrink-0">{m.icon}</div>
                <div>
                  <div className="font-barlow-cond text-[0.75rem] font-semibold tracking-[3px] uppercase text-muted">
                    {m.label}
                  </div>
                  <div className="text-[1rem] text-cream mt-0.5">{m.value}</div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/97250XXXXXXX?text=Hi%20Team%20Gershon!%20I'm%20interested%20in%20joining%20your%20gym."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-clip flex items-center gap-4 mt-8 px-8 py-5 no-underline font-barlow-cond text-[1.1rem] font-bold tracking-[2px] uppercase text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "#128C7E" }}
          >
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
        </div>

        {/* Right: form */}
        <div ref={formRef} className="reveal bg-dark2 border border-red/20 p-10">
          <div className="font-bebas text-[2rem] tracking-[1px] text-cream mb-6">
            SEND A MESSAGE
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="First Name"   type="text"  placeholder="Your name" />
              <FormField label="Last Name"    type="text"  placeholder="Last name" />
            </div>
            <FormField label="Email Address" type="email" placeholder="you@email.com" />
            <FormField label="Phone (Optional)" type="tel" placeholder="+972 50 XXX XXXX" />
            <div>
              <label className="font-barlow-cond text-[0.8rem] font-semibold tracking-[3px] uppercase text-muted block mb-2">
                Experience Level
              </label>
              <select
                className="w-full bg-dark3 border border-white/[0.08] text-cream font-barlow text-[0.95rem] px-3.5 py-3 outline-none cursor-pointer transition-colors duration-200 focus:border-red/50"
              >
                <option value="">Select your level...</option>
                <option>Complete Beginner</option>
                <option>Some Experience</option>
                <option>Intermediate</option>
                <option>Advanced / Competitive</option>
              </select>
            </div>
            <div>
              <label className="font-barlow-cond text-[0.8rem] font-semibold tracking-[3px] uppercase text-muted block mb-2">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your goals or any questions you have..."
                className="w-full bg-dark3 border border-white/[0.08] text-cream font-barlow text-[0.95rem] px-3.5 py-3 outline-none resize-none transition-colors duration-200 focus:border-red/50 placeholder:text-muted/50"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 font-barlow-cond text-[1rem] font-bold tracking-[3px] uppercase text-white py-4 border-none cursor-pointer transition-colors duration-200"
              style={{ background: sent ? "#1a7a1a" : "#C8102E" }}
            >
              {sent ? "✓ Message Sent!" : "Send Message"}
            </button>
          </form>
          <p className="text-[0.8rem] text-muted text-center mt-4">
            We&apos;ll respond within 24 hours. Or chat with us on WhatsApp for instant replies.
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
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="font-barlow-cond text-[0.8rem] font-semibold tracking-[3px] uppercase text-muted block mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-dark3 border border-white/[0.08] text-cream font-barlow text-[0.95rem] px-3.5 py-3 outline-none transition-colors duration-200 focus:border-red/50 placeholder:text-muted/50"
      />
    </div>
  );
}
