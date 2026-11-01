"use client";

import { useState } from "react";

const EMPTY = { name: "", email: "", service: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email.";
  if (!v.service) e.service = "Please select a service.";
  return e;
}

/* turns the form values into a readable WhatsApp message */
function buildWhatsappMessage({ name, email, service, message }) {
  const lines = [
    `Hi SOZOQ, 
    I'm ${name.trim()} and I'm interested in ${service}.`,
  ];
  if (message.trim()) {
    lines.push(`About my project: ${message.trim()}`);
  }
  lines.push(
    `You can reach me at ${email.trim()}. Looking forward to hearing from you!`,
  );
  return lines.join("\n\n");
}

/* underlined field; the label doubles as the placeholder (so the name field can
   read "Your Name" on desktop and "First name" on mobile, as in the designs) */
function Field({ id, label, labelMobile, value, error, children }) {
  return (
    <div
      className={`ct-field${value ? " has-value" : ""}${error ? " has-error" : ""}`}
    >
      {children}
      <label className="ct-field__label" htmlFor={id}>
        <span className={labelMobile ? "ct-only-desktop" : undefined}>
          {label}
        </span>
        {labelMobile ? (
          <span className="ct-only-mobile">{labelMobile}</span>
        ) : null}
      </label>
      {error ? (
        <p className="ct-field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ContactForm({
  services,
  thanks,
  thanksButton,
  thanksImage,
  whatsappUrl,
}) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [waNotice, setWaNotice] = useState("");

  const set = (key) => (ev) => {
    const value = ev.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (waNotice) setWaNotice("");
  };

  async function onSubmit(ev) {
    ev.preventDefault();
    if (status === "sending") return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function sendViaWhatsapp() {
    const found = validate(values); // name, valid email, service are required
    setErrors(found);

    if (Object.keys(found).length) {
      const empty =
        !values.name.trim() && !values.email.trim() && !values.service;
      setWaNotice(
        empty
          ? "Please enter your details in the form to send via WhatsApp."
          : "Please fill in the highlighted details to send via WhatsApp.",
      );
      return;
    }

    setWaNotice("");
    const url = `${whatsappUrl}?text=${encodeURIComponent(buildWhatsappMessage(values))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setWaNotice("");
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="ct-form ct-form--done" role="status">
        <div className="ct-done">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="ct-done__img"
            src={thanksImage}
            alt=""
            width={282}
            height={188}
          />
          <p className="ct-done__text">{thanks}</p>
        </div>
        <div className="ct-form__actions">
          <button type="button" className="ct-btn ct-btn--dark" onClick={reset}>
            {thanksButton}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="ct-form" onSubmit={onSubmit} noValidate>
      <div className="ct-form__fields">
        <Field
          id="ct-name"
          label="Your Name"
          labelMobile="First name"
          value={values.name}
          error={errors.name}
        >
          <input
            id="ct-name"
            className="ct-field__control"
            type="text"
            name="name"
            autoComplete="given-name"
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "ct-name-error" : undefined}
          />
        </Field>

        <Field
          id="ct-email"
          label="Email ID"
          value={values.email}
          error={errors.email}
        >
          <input
            id="ct-email"
            className="ct-field__control"
            type="email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "ct-email-error" : undefined}
          />
        </Field>

        <Field
          id="ct-service"
          label="Select a service"
          value={values.service}
          error={errors.service}
        >
          <select
            id="ct-service"
            className="ct-field__control ct-field__control--select"
            name="service"
            value={values.service}
            onChange={set("service")}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "ct-service-error" : undefined}
          >
            <option value="" />
            {services.map((s) => (
              <option value={s} key={s}>
                {s}
              </option>
            ))}
          </select>
          <svg
            className="ct-field__chevron"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m4 6 4 4 4-4"
              stroke="#7b7b7b"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Field>

        <Field
          id="ct-message"
          label="Tell us more about your project"
          value={values.message}
        >
          <textarea
            id="ct-message"
            className="ct-field__control ct-field__control--area"
            name="message"
            rows={1}
            value={values.message}
            onChange={set("message")}
          />
        </Field>
      </div>

      {waNotice ? (
        <p className="ct-form__error" role="alert">
          {waNotice}
        </p>
      ) : null}

      {status === "error" ? (
        <p className="ct-form__error" role="alert">
          Something went wrong. Please try again, or message us on WhatsApp.
        </p>
      ) : null}

      <div className="ct-form__actions">
        <button
          type="button"
          className="ct-btn ct-btn--light"
          onClick={sendViaWhatsapp}
        >
          Send via Whatsapp
        </button>
        <button
          type="submit"
          className="ct-btn ct-btn--dark"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Submit"}
        </button>
      </div>
    </form>
  );
}
