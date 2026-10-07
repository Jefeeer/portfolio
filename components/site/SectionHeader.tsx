import { ArrowUpRight } from "lucide-react";

export default function SectionHeader({
  num,
  title,
  link,
}: {
  num: string;
  title: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex items-baseline justify-between gap-4 border-t border-line pt-4">
      <h2 className="text-[11px] uppercase tracking-[0.16em] text-ink-3">
        <span className="text-ink">{num}</span>
        <span className="mx-2">—</span>
        {title}
      </h2>
      {link && (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="tap group inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] text-ink-3 transition-colors hover:text-ink"
        >
          {link.label}
          <ArrowUpRight
            size={12}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      )}
    </div>
  );
}
