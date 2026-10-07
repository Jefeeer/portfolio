import { services, stack } from "@/lib/site";
import FadeIn from "../FadeIn";
import SectionHeader from "./SectionHeader";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 pb-24 lg:scroll-mt-10">
      <SectionHeader num="03" title="What I do" />
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {services.map((s, i) => (
          <FadeIn key={s.name} y={12} delay={i * 0.05} className="bg-canvas p-6">
            <span className="font-mono text-[11px] text-ink-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 text-[16px] font-medium tracking-tight text-ink">
              {s.name}
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{s.desc}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 pb-24 lg:scroll-mt-10">
      <SectionHeader num="04" title="Stack" />
      <dl className="space-y-6">
        {stack.map((g, i) => (
          <FadeIn
            key={g.group}
            y={12}
            delay={i * 0.06}
            className="grid gap-3 sm:grid-cols-[9rem_1fr] sm:gap-6"
          >
            <dt className="pt-1.5 text-[13px] text-ink-3">{g.group}</dt>
            <dd className="flex flex-wrap gap-2">
              {g.items.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-ink-2 transition-colors hover:border-ink/25 hover:text-ink"
                >
                  {t}
                </span>
              ))}
            </dd>
          </FadeIn>
        ))}
      </dl>
    </section>
  );
}
