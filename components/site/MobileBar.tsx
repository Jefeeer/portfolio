"use client";

import { Search } from "lucide-react";
import { site } from "@/lib/site";
import { Monogram } from "./Sidebar";
import ThemeSwitch from "./ThemeSwitch";
import { openCommandMenu } from "./CommandMenu";

export default function MobileBar() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-canvas/80 px-4 py-3 backdrop-blur-md lg:hidden">
      <a href="#top" className="flex items-center gap-2.5">
        <Monogram size={30} />
        <span className="text-[14px] font-medium tracking-tight">{site.short}</span>
      </a>
      <div className="flex items-center gap-2">
        <button
          onClick={openCommandMenu}
          aria-label="Open menu"
          className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink-2"
        >
          <Search size={14} strokeWidth={1.75} />
        </button>
        <ThemeSwitch />
      </div>
    </header>
  );
}
