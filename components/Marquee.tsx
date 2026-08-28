"use client";

import { useEffect, useRef, useState } from "react";
import { Code2 } from "lucide-react";

interface Tech {
  name: string;
  slug?: string; // Simple Icons slug; omit for Lucide fallback
  color?: string; // override brand color (used for near-black logos on dark bg)
}

// Full brand color by default; `color` overrides only where the brand mark is
// near-black and would vanish on #0C0C0C.
const logo = (slug: string, color?: string) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;

const TECH: Tech[] = [
  { name: "Next.js", slug: "nextdotjs", color: "white" },
  { name: "React", slug: "react" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Supabase", slug: "supabase" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "MySQL", slug: "mysql" },
  { name: "Prisma", slug: "prisma", color: "white" },
  { name: "Vercel", slug: "vercel", color: "white" },
  { name: "GitHub", slug: "github", color: "white" },
  { name: "Claude AI", slug: "claude" },
  { name: "Cursor", slug: "cursor", color: "white" },
  { name: "Codex" }, // no Simple Icons logo — Lucide fallback
];

const ROW1 = TECH.slice(0, 7);
const ROW2 = TECH.slice(7);

function Tile({ tech }: { tech: Tech }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 flex-shrink-0 rounded-2xl border border-[#D7E2EA]/15 bg-white/[0.03] w-[200px] h-[130px]">
      {tech.slug ? (
        <img
          src={logo(tech.slug, tech.color)}
          alt={tech.name}
          loading="lazy"
          className="h-12 w-12 object-contain"
        />
      ) : (
        <Code2 className="h-12 w-12 text-[#D7E2EA]" strokeWidth={1.5} />
      )}
      <span className="text-[#D7E2EA] font-light uppercase tracking-widest text-xs">
        {tech.name}
      </span>
    </div>
  );
}

export default function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.offsetTop;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const row1 = [...ROW1, ...ROW1, ...ROW1];
  const row2 = [...ROW2, ...ROW2, ...ROW2];

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: "transform",
          }}
        >
          {row1.map((t, i) => (
            <Tile key={`r1-${i}`} tech={t} />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: "transform",
          }}
        >
          {row2.map((t, i) => (
            <Tile key={`r2-${i}`} tech={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
