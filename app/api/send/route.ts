import { Resend } from "resend";
import { z } from "zod";

const DEFAULT_FROM_EMAIL = "Team Gershon <office@teamgershon.co.il>";
const SUBJECT = "ליד חם הגיע בוא נרתום אותו לעסק";

const FormSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().regex(/^[+\d][\d\s()+-]{6,19}$/, "Invalid phone"),
  message: z.string().trim().min(1).max(1000),
  experience: z.string().trim().max(60).optional(),
  // Honeypot field — bots fill every input. We accept it as a normal string
  // (no max(0)) so a bot that fills it still parses successfully; then we
  // silently return 200 below without sending the email. Returning 400 here
  // would teach bots to retry without the field.
  website: z.string().max(200).optional(),
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

// Same-origin gate — modern browsers send `Origin` on every POST. A request
// from another site (CSRF) will have a different Origin host than the Host
// header on this request. If Origin is missing entirely we fall back to
// Referer; if both are missing in production we reject.
function isSameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  if (!host) return false;
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const source = origin ?? referer;
  if (!source) return process.env.NODE_ENV !== "production";
  try {
    return new URL(source).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    // Content-Type guard — blocks the simplest CSRF shape (HTML form POST,
    // which would arrive as application/x-www-form-urlencoded).
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return Response.json({ ok: false }, { status: 415 });
    }

    if (!isSameOrigin(req)) {
      return Response.json({ ok: false }, { status: 403 });
    }

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

    // Honeypot — return 200 silently without sending. Bots see a success
    // and move on; legitimate users never fill the hidden field.
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
    const toEmail = process.env.CONTACT_FORM_RECEIVER;
    if (!toEmail) {
      console.error("/api/send: CONTACT_FORM_RECEIVER is not set");
      return Response.json({ ok: false }, { status: 500 });
    }
    const fromEmail = process.env.CONTACT_FORM_SENDER ?? DEFAULT_FROM_EMAIL;
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
      from: fromEmail,
      to: toEmail,
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
