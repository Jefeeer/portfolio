"use client";

import { FormEvent, useState } from "react";
import { Check, Mail, Send } from "lucide-react";
import FadeIn from "./FadeIn";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-2xl bg-white/5 border border-[#D7E2EA]/20 text-[#D7E2EA] placeholder:text-[#646973] px-5 py-4 outline-none focus:border-[#D7E2EA]/60 transition-colors";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

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
    <section
      id="contact"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32 scroll-mt-10"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
        <FadeIn
          as="h2"
          delay={0}
          y={40}
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Contact
        </FadeIn>

        <FadeIn delay={0.15} y={20} className="w-full">
          <form onSubmit={onSubmit} className="w-full flex flex-col gap-5">
            <input
              required
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClass} resize-none`}
            />

            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="inline-flex items-center justify-center gap-2 rounded-full text-white font-medium uppercase tracking-widest px-10 py-4 text-sm md:text-base transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              style={{
                background:
                  "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                boxShadow:
                  "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
                outline: "2px solid #FFFFFF",
                outlineOffset: "-3px",
              }}
            >
              {status === "success" ? (
                <>
                  <Check size={18} /> Sent
                </>
              ) : status === "submitting" ? (
                "Sending…"
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>

            {status === "error" && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            {status === "success" && (
              <p className="text-[#D7E2EA] text-sm text-center">
                Thanks — I&apos;ll get back to you soon.
              </p>
            )}
          </form>
        </FadeIn>

        <a
          href="mailto:mj.manalo@resoluteaiph.com"
          className="inline-flex items-center gap-2 text-[#646973] hover:text-[#D7E2EA] transition-colors uppercase tracking-widest text-xs sm:text-sm"
        >
          <Mail size={16} /> mj.manalo@resoluteaiph.com
        </a>
      </div>
    </section>
  );
}
