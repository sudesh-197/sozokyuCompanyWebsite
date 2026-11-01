import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v, max) => String(v ?? "").trim().slice(0, max);
const esc = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* POST /api/contact
   Sends the enquiry by email through Resend (https://resend.com) when these
   environment variables are set:
     RESEND_API_KEY   – your Resend API key
     CONTACT_TO_EMAIL – inbox that receives enquiries, e.g. hello@sozoq.in
     CONTACT_FROM_EMAIL (optional) – verified sender, default "Sozoq <onboarding@resend.dev>"
   Without them it only logs the enquiry in development and returns an error
   in production, so a lead is never silently lost. */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const service = clean(body.service, 80);
  const message = clean(body.message, 4000);

  if (!name || !EMAIL_RE.test(email) || !service) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!key || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] (not emailed – set RESEND_API_KEY and CONTACT_TO_EMAIL)", { name, email, service, message });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Email is not configured" }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Sozoq <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New enquiry – ${service} – ${name}`,
      html: `<p><b>Name:</b> ${esc(name)}</p><p><b>Email:</b> ${esc(email)}</p><p><b>Service:</b> ${esc(service)}</p><p><b>Project:</b><br>${esc(message).replace(/\n/g, "<br>") || "—"}</p>`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Could not send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
