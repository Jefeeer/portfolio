"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Mail } from "lucide-react";
import { site } from "@/lib/site";
import FadeIn from "../FadeIn";
import SectionHeader from "./SectionHeader";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <section id="contact" className="scroll-mt-20 pb-24 lg:scroll-mt-10">
      <SectionHeader num="05" title="Contact" />

      <div className="lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
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
        </FadeIn>

        <FadeIn y={16} delay={0.1}>
          <ul className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface lg:mt-0">
            <li className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-4 p-5 sm:p-6">
              <Mail size={18} strokeWidth={1.75} className="shrink-0 text-ink-3" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] uppercase tracking-[0.14em] text-ink-3">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 block text-[14px] text-ink transition-opacity min-[360px]:text-[15px] [overflow-wrap:anywhere] hover:opacity-70 sm:text-[18px]"
                >
                  {site.email}
                </a>
              </div>
              <div className="col-span-2 flex gap-2 sm:col-span-1 sm:col-start-2">
                <button
                  onClick={copy}
                  aria-label="Copy email address"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[13px] text-ink-2 transition-colors hover:border-ink/25 hover:text-ink sm:flex-none"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} strokeWidth={1.75} />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-ink px-4 py-2 text-[13px] text-canvas transition-opacity hover:opacity-85 sm:flex-none"
                >
                  Send email <ArrowUpRight size={13} />
                </a>
              </div>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 transition-colors hover:bg-ink/[0.03] sm:p-6"
              >
                <Github size={18} strokeWidth={1.75} className="shrink-0 text-ink-3" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-3">GitHub</p>
                  <p className="mt-1 text-[16px] text-ink sm:text-[18px]">@Jefeeer</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                />
              </a>
            </li>
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
