"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Github, Mail, Search } from "lucide-react";
import { nav, site } from "@/lib/site";
import ThemeSwitch from "./ThemeSwitch";
import LocalTime from "./LocalTime";
import { openCommandMenu, useModKey } from "./CommandMenu";

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    // Clear the highlight when scrolled back to the intro.
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.3) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return active;
}

export function Monogram({ size = 36 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center rounded-[10px] bg-ink font-semibold tracking-tight text-canvas"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      mj
    </span>
  );
}

export function Availability() {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] text-ink-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-signal motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
      </span>
      Available for new projects
    </span>
  );
}

export default function Sidebar() {
  const active = useActiveSection();
  const mod = useModKey();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col border-r border-line bg-canvas px-6 py-7 lg:flex">
      <a href="#top" className="flex items-center gap-3">
        <Monogram />
        <span className="leading-tight">
          <span className="block text-[15px] font-medium tracking-tight text-ink">
            {site.short}
          </span>
          <span className="block text-[13px] text-ink-3">{site.role}</span>
        </span>
      </a>

      <div className="mt-6">
        <Availability />
      </div>

      <button
        onClick={openCommandMenu}
        className="group mt-8 flex w-full items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-left text-[13px] text-ink-3 transition-colors hover:border-ink/20 hover:text-ink-2"
      >
        <Search size={14} strokeWidth={1.75} />
        <span className="flex-1">Jump to…</span>
        <kbd className="rounded border border-line px-1.5 text-[10px] text-ink-3">
          {mod} K
        </kbd>
      </button>

      <nav aria-label="Sections" className="mt-8">
        <ul className="space-y-0.5">
          {nav.map((n) => {
            const isActive = active === n.id;
            return (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative flex items-center gap-3 rounded-md py-1.5 pl-3 text-[14px] transition-colors ${
                    isActive ? "text-ink" : "text-ink-3 hover:text-ink"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1/2 h-4 w-px -translate-y-1/2 bg-ink transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span className="text-[11px] text-ink-3">{n.num}</span>
                  {n.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto space-y-5">
        <div className="space-y-1.5 text-[13px]">
          <p className="text-ink-3">Local time</p>
          <LocalTime className="text-ink-2" />
        </div>

        <div className="space-y-1.5 text-[13px]">
          <p className="text-ink-3">Reach me at</p>
          <a
            href={`mailto:${site.email}`}
            className="group flex items-center gap-1.5 text-ink-2 transition-colors hover:text-ink"
          >
            <Mail size={13} strokeWidth={1.75} />
            <span className="truncate">{site.email}</span>
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-ink-2 transition-colors hover:text-ink"
          >
            <Github size={13} strokeWidth={1.75} />
            github.com/Jefeeer
            <ArrowUpRight
              size={12}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
          </a>
        </div>

        <div className="flex items-center justify-between border-t border-line pt-5">
          <span className="text-[12px] text-ink-3">Theme</span>
          <ThemeSwitch />
        </div>
      </div>
    </aside>
  );
}
