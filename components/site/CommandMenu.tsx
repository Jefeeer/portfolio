"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Copy,
  CornerDownLeft,
  Github,
  Hash,
  Mail,
  Monitor,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { nav, site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { setTheme } from "@/lib/theme";

const OPEN_EVENT = "pf-open-cmdk";

export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function useModKey() {
  const [mod, setMod] = useState("Ctrl");
  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) setMod("⌘");
  }, []);
  return mod;
}

interface Item {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
}

const ic = { size: 15, strokeWidth: 1.75 } as const;

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const items: Item[] = useMemo(() => {
    const go = (id: string) => () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const link = (url: string) => () => window.open(url, "_blank", "noopener");
    return [
      ...nav.map((n) => ({
        id: `nav-${n.id}`,
        group: "Navigate",
        label: n.label,
        hint: n.num,
        icon: <Hash {...ic} />,
        run: go(n.id),
      })),
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        group: "Live projects",
        label: p.name,
        hint: new URL(p.url).hostname,
        icon: <ArrowUpRight {...ic} />,
        run: link(p.url),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: site.email,
        icon: <Copy {...ic} />,
        run: () => {
          navigator.clipboard?.writeText(site.email);
          setToast("Email copied");
        },
      },
      {
        id: "mail",
        group: "Actions",
        label: "Send an email",
        icon: <Mail {...ic} />,
        run: () => (window.location.href = `mailto:${site.email}`),
      },
      {
        id: "gh",
        group: "Actions",
        label: "Open GitHub profile",
        hint: "@Jefeeer",
        icon: <Github {...ic} />,
        run: link(site.github),
      },
      { id: "t-light", group: "Theme", label: "Light", icon: <Sun {...ic} />, run: () => setTheme("light") },
      { id: "t-dark", group: "Theme", label: "Dark", icon: <Moon {...ic} />, run: () => setTheme("dark") },
      { id: "t-sys", group: "Theme", label: "System", icon: <Monitor {...ic} />, run: () => setTheme("system") },
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.group} ${i.label} ${i.hint ?? ""}`.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const run = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    // Let the dialog close (and scroll lock release) before acting.
    setTimeout(item.run, 60);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[index]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-ink/20 px-4 pt-[12vh] backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onMouseDown={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_80px_-20px_rgb(0_0_0/0.35)]"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search size={16} strokeWidth={1.75} className="text-ink-3" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search sections, projects, actions…"
                  aria-label="Search"
                  className="h-12 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px] text-ink-3">
                  esc
                </kbd>
              </div>

              <ul ref={listRef} role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="px-3 py-8 text-center text-[14px] text-ink-3">
                    Nothing matches “{query}”.
                  </li>
                )}
                {filtered.map((item, i) => {
                  const header = item.group !== lastGroup;
                  lastGroup = item.group;
                  const selected = i === index;
                  return (
                    <li key={item.id}>
                      {header && (
                        <p className="px-3 pb-1.5 pt-3 text-[10px] uppercase tracking-[0.14em] text-ink-3">
                          {item.group}
                        </p>
                      )}
                      <button
                        data-index={i}
                        role="option"
                        aria-selected={selected}
                        onMouseMove={() => setIndex(i)}
                        onClick={() => run(item)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors ${
                          selected ? "bg-ink/[0.06] text-ink" : "text-ink-2"
                        }`}
                      >
                        <span className="text-ink-3">{item.icon}</span>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.hint && (
                          <span className="truncate text-[11px] text-ink-3">
                            {item.hint}
                          </span>
                        )}
                        {selected && (
                          <CornerDownLeft size={13} className="shrink-0 text-ink-3" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[10px] text-ink-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span className="ml-auto">{site.short}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
        <AnimatePresence>
          {toast && (
            <motion.div
              role="status"
              className="rounded-full bg-ink px-4 py-2 text-[13px] text-canvas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
