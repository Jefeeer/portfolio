"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const fmt = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: site.timeZone,
});

/** Live local time in Manila — rendered client-side only to avoid hydration drift. */
export default function LocalTime({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`tabular-nums ${className}`} suppressHydrationWarning>
      {now ?? "--:--"} <span className="text-ink-3">GMT+8</span>
    </span>
  );
}
