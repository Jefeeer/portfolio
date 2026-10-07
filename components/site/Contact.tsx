"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { site } from "@/lib/site";
import FadeIn from "../FadeIn";
import SectionHeader from "./SectionHeader";

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "w-full border-b border-line bg-transparent py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-ink";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 pb-24 lg:scroll-mt-10">
      <SectionHeader num="05" title="Contact" />

      <div className="lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
        <FadeIn y={16}>
          <h2 className="text-[clamp(2.2rem,5.5vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
            Have something in mind?
            <br />
            <span className="text-ink-3">Let&apos;s build it.</span>
          </h2>
          <p className="mt-5 max-w-[480px] text-[15px] leading-relaxed text-ink-2">
            For freelance work, collaborations, or just to say hi — the inbox is
            open and I usually reply within a day.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-ink px-4 py-2 text-[14px] text-canvas transition-opacity hover:opacity-85"
            >
              {site.email}
            </a>
            <button
              onClick={copy}
              aria-label="Copy email address"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[13px] text-ink-2 transition-colors hover:border-ink/25 hover:text-ink"
            >
              {copied ? <Check size={13} /> : <Copy size={13} strokeWidth={1.75} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </FadeIn>

        <FadeIn y={16} delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="mt-14 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:mt-0"
          >
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-3">
              Or leave a message
            </p>
            <div className="mt-4 grid gap-x-6 sm:grid-cols-2">
              <input
                required
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Name"
                aria-label="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
              />
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                aria-label="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={field}
              />
            </div>
            <textarea
              required
              name="message"
              rows={4}
              placeholder="Tell me about the project…"
              aria-label="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${field} mt-2 resize-none`}
            />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[13px]" aria-live="polite">
                {status === "error" && <span className="text-red-500">{error}</span>}
                {status === "success" && (
                  <span className="text-ink-2">Thanks — I&apos;ll get back to you soon.</span>
                )}
              </p>
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] text-canvas transition-opacity hover:opacity-85 disabled:opacity-50"
              >
                {status === "success" ? (
                  <>
                    <Check size={15} /> Sent
                  </>
                ) : status === "submitting" ? (
                  "Sending…"
                ) : (
                  <>
                    Send message
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
