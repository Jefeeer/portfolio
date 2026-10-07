import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import FadeIn from "../FadeIn";
import DotField from "./DotField";
import LocalTime from "./LocalTime";
import { Availability } from "./Sidebar";

export default function Intro({ repoCount }: { repoCount: number }) {
  const facts = [
    { label: "Live products", value: String(projects.length).padStart(2, "0") },
    { label: "Public repos", value: repoCount ? String(repoCount).padStart(2, "0") : "—" },
    { label: "Based in", value: site.location },
  ];

  return (
    <section className="relative pb-20 pt-14 sm:pt-24 lg:pt-28">
      <DotField className="absolute -right-4 -top-2 h-[380px] w-[min(520px,95%)] sm:-right-8 sm:h-[460px]" />

      <div className="relative">
        <FadeIn y={12} delay={0} className="mb-8 lg:hidden">
          <Availability />
        </FadeIn>

        <FadeIn y={12} delay={0.05}>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
            Portfolio · {new Date().getFullYear()}
          </p>
        </FadeIn>

        <FadeIn
          as="h1"
          y={18}
          delay={0.12}
          className="mt-5 font-serif text-[clamp(3.1rem,9vw,5.75rem)] font-normal leading-[0.92] tracking-[-0.02em] text-ink"
        >
          Mark Jeferson
          <br />
          <em className="text-ink-2">Manalo</em>
        </FadeIn>

        <FadeIn y={14} delay={0.22} className="mt-8 max-w-[520px] space-y-4 text-[16px] leading-relaxed text-ink-2 sm:text-[17px]">
          <p>
            I&apos;m a <span className="text-ink">full-stack developer</span>. I build
            practical, polished web applications — from the interface all the way
            down to the database.
          </p>
          <p>
            Lately: marketing sites with real craft, AI-powered tools, and
            operations dashboards that teams actually enjoy using.
          </p>
        </FadeIn>

        <FadeIn y={10} delay={0.3} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-canvas transition-opacity hover:opacity-85"
          >
            See the work
          </a>
          {[
            { label: "github", href: site.github },
            { label: "email", href: `mailto:${site.email}` },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-0.5 text-ink-2 underline decoration-line decoration-1 underline-offset-[5px] transition-colors hover:text-ink hover:decoration-ink"
            >
              {l.label}
              <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </FadeIn>

        <FadeIn y={10} delay={0.38}>
          <dl className="mt-16 grid grid-cols-3 border-y border-line">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`py-4 ${i > 0 ? "border-l border-line pl-4 sm:pl-6" : ""}`}
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                  {f.label}
                </dt>
                <dd className="mt-1.5 text-[15px] text-ink sm:text-[17px]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-right font-mono text-[11px] text-ink-3">
            <LocalTime /> · Manila
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
