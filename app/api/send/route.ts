import { Resend } from "resend";
import { z } from "zod";

const TO_EMAIL = "Gershonteam@gmail.com";
// Resend requires a verified sender domain. Until a custom domain is verified
// in the Resend dashboard, the onboarding sandbox sender is used.
const FROM_EMAIL = process.env.RESEND_FROM ?? "Team Gershon <onboarding@resend.dev>";
const SUBJECT = "ליד חם הגיע בוא נרתום אותו לעסק";

const FormSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().regex(/^[+\d][\d\s()+-]{6,19}$/, "Invalid phone"),
  message: z.string().trim().min(1).max(1000),
  experience: z.string().trim().max(60).optional(),
  // Honeypot field — bots tend to fill every input. Must be empty.
  website: z.string().max(0).optional(),
});

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    ipHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, "");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return Response.json({ ok: false }, { status: 400 });
    }

    const parsed = FormSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ ok: false }, { status: 400 });
    }
    const data = parsed.data;

    // Honeypot — silently succeed without sending
    if (data.website && data.website.length > 0) {
      return Response.json({ ok: true });
    }

    if (isRateLimited(clientIp(req))) {
      return Response.json({ ok: false }, { status: 429 });
    }

    const name = stripHtml(data.name);
    const email = stripHtml(data.email);
    const phone = stripHtml(data.phone);
    const message = stripHtml(data.message);
    const experience = data.experience ? stripHtml(data.experience) : "";

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("/api/send: RESEND_API_KEY is not set");
      return Response.json({ ok: false }, { status: 500 });
    }
    const resend = new Resend(apiKey);

    const html = `
<div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #111; max-width: 600px;">
  <h2 style="color: #C8102E; margin: 0 0 12px;">New Lead — Team Gershon</h2>
  <p style="margin: 0 0 20px; color: #666; font-size: 14px;">A new contact form submission from the website.</p>
  <table style="border-collapse: collapse; width: 100%;">
    <tr><td style="padding: 6px 14px 6px 0; color: #666; font-weight: bold; vertical-align: top;">Name</td><td style="padding: 6px 0;">${escapeHtml(name)}</td></tr>
    <tr><td style="padding: 6px 14px 6px 0; color: #666; font-weight: bold; vertical-align: top;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #C8102E;">${escapeHtml(email)}</a></td></tr>
    <tr><td style="padding: 6px 14px 6px 0; color: #666; font-weight: bold; vertical-align: top;">Phone</td><td style="padding: 6px 0;">${escapeHtml(phone)}</td></tr>
    ${experience ? `<tr><td style="padding: 6px 14px 6px 0; color: #666; font-weight: bold; vertical-align: top;">Experience</td><td style="padding: 6px 0;">${escapeHtml(experience)}</td></tr>` : ""}
  </table>
  <h3 style="color: #111; margin: 24px 0 8px; font-size: 16px;">Message</h3>
  <div style="white-space: pre-wrap; background: #f7f7f7; padding: 14px; border-left: 3px solid #C8102E; font-size: 14px;">${escapeHtml(message)}</div>
</div>
    `.trim();

    const text =
      `New Lead — Team Gershon\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      (experience ? `Experience: ${experience}\n` : "") +
      `\nMessage:\n${message}\n`;

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: SUBJECT,
      html,
      text,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return Response.json({ ok: false }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("/api/send unexpected error:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
