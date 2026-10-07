"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { GITHUB_USER, Project, projects } from "@/lib/projects";
import { site } from "@/lib/site";
import FadeIn from "../FadeIn";
import SectionHeader from "./SectionHeader";

const host = (url: string) => new URL(url).hostname;

function BrowserFrame({ project, big }: { project: Project; big?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface transition-[border-color,box-shadow] duration-300 group-hover:border-ink/20 group-hover:shadow-[0_18px_50px_-24px_rgb(0_0_0/0.35)]">
      <div className="flex h-7 items-center gap-1.5 border-b border-line px-3">
        <span className="h-[7px] w-[7px] rounded-full bg-ink/15" />
        <span className="h-[7px] w-[7px] rounded-full bg-ink/15" />
        <span className="h-[7px] w-[7px] rounded-full bg-ink/15" />
        <span className="mx-auto truncate rounded px-2 font-mono text-[10px] text-ink-3">
          {host(project.url)}
        </span>
        <span className="w-[29px]" />
      </div>
      <div className={`overflow-hidden ${big ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.shot}
          alt={`${project.name} — homepage screenshot`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.035]"
        />
      </div>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-4 flex items-center gap-4 text-[13px]">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/l inline-flex items-center gap-1 text-ink underline decoration-line underline-offset-[5px] transition-colors hover:decoration-ink"
      >
        Visit live
        <ArrowUpRight size={13} className="transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
      </a>
      {project.repo && (
        <a
          href={`https://github.com/${GITHUB_USER}/${project.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-ink-3 transition-colors hover:text-ink"
        >
          <Github size={13} strokeWidth={1.75} /> Source
        </a>
      )}
    </div>
  );
}

function FeaturedCard({ project, big }: { project: Project; big?: boolean }) {
  return (
    <article>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        aria-label={`${project.name} — open live site`}
      >
        <BrowserFrame project={project} big={big} />
      </a>
      <div className={`mt-5 ${big ? "sm:grid sm:grid-cols-[1fr_1.4fr] sm:gap-8" : ""}`}>
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[17px] font-medium tracking-tight text-ink">
              {project.name}
            </h3>
            <span className="font-mono text-[11px] text-ink-3">{project.year}</span>
          </div>
          <p className="mt-0.5 text-[13px] text-ink-3">{project.kind}</p>
        </div>
        <div>
          <p className={`text-[14px] leading-relaxed text-ink-2 ${big ? "mt-3 sm:mt-0" : "mt-3"}`}>
            {project.summary}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-ink-3">
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

/** Compact list with a screenshot that trails the cursor on hover (fine pointers only). */
function ProjectIndex({ items }: { items: Project[] }) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div className="relative">
      <ul
        ref={listRef}
        onPointerMove={onMove}
        onPointerLeave={() => setHovered(null)}
        className="border-b border-line"
      >
        {items.map((p, i) => (
          <li key={p.slug} className="border-t border-line">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(p)}
              onFocus={() => setHovered(null)}
              className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 py-4 sm:grid-cols-[2.5rem_1.1fr_1fr_auto]"
            >
              <span className="font-mono text-[11px] text-ink-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[15px] text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {p.name}
                </span>
                <span className="block truncate text-[13px] text-ink-3 sm:hidden">
                  {p.kind}
                </span>
              </span>
              <span className="hidden truncate text-[13px] text-ink-3 sm:block">
                {p.kind}
              </span>
              <span className="flex items-center gap-3">
                <span className="hidden font-mono text-[11px] text-ink-3 sm:inline">
                  {p.year}
                </span>
                <ArrowUpRight
                  size={15}
                  className="text-ink-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {hovered && (
          <motion.div
            key="preview"
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[300px] md:block"
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "calc(-100% - 18px)" }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.18 }}
          >
            <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hovered.shot}
                alt=""
                className="aspect-[16/10] w-full object-cover object-top"
              />
              <p className="border-t border-line px-3 py-2 font-mono text-[10px] text-ink-3">
                {host(hovered.url)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="scroll-mt-20 pb-24 lg:scroll-mt-10">
      <SectionHeader
        num="01"
        title="Selected work"
        link={{ href: site.github, label: "All code" }}
      />

      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
        {featured.map((p, i) => (
          <FadeIn key={p.slug} y={18} delay={i === 0 ? 0 : (i % 2) * 0.08} className={i === 0 ? "sm:col-span-2" : ""}>
            <FeaturedCard project={p} big={i === 0} />
          </FadeIn>
        ))}
      </div>

      <FadeIn y={14} className="mt-20">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="text-[15px] font-medium text-ink">More shipped work</h3>
          <span className="font-mono text-[11px] text-ink-3">{rest.length} live</span>
        </div>
        <ProjectIndex items={rest} />
      </FadeIn>
    </section>
  );
}
