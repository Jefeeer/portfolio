"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { getPref, resolve, setTheme, THEME_EVENT, ThemePref } from "@/lib/theme";

const OPTIONS: { value: ThemePref; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "system", label: "System theme", Icon: Monitor },
  { value: "dark", label: "Dark theme", Icon: Moon },
];

export default function ThemeSwitch() {
  const [pref, setPref] = useState<ThemePref | null>(null);

  useEffect(() => {
    setPref(getPref());
    const onChange = (e: Event) => setPref((e as CustomEvent<ThemePref>).detail);
    window.addEventListener(THEME_EVENT, onChange);

    // Follow the OS while on "system".
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onOs = () => {
      if (getPref() === "system")
        document.documentElement.setAttribute("data-theme", resolve("system"));
    };
    mq.addEventListener("change", onOs);
    return () => {
      window.removeEventListener(THEME_EVENT, onChange);
      mq.removeEventListener("change", onOs);
    };
  }, []);

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center gap-px rounded-full border border-line p-0.5"
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = pref === value;
        return (
          <button
            key={value}
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={(e) => setTheme(value, { x: e.clientX, y: e.clientY })}
            className={`grid h-6 w-6 place-items-center rounded-full transition-colors ${
              active ? "bg-ink/[0.07] text-ink" : "text-ink-3 hover:text-ink"
            }`}
          >
            <Icon size={13} strokeWidth={1.75} />
          </button>
        );
      })}
    </div>
  );
}
