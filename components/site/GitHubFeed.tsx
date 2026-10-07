import { ArrowUpRight } from "lucide-react";
import type { Repo } from "@/lib/github";
import { GITHUB_USER, repoNotes } from "@/lib/projects";
import { site } from "@/lib/site";
import FadeIn from "../FadeIn";
import SectionHeader from "./SectionHeader";

const LANG_DOT: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#e8d44d",
  CSS: "#8a5cf6",
  Python: "#3572a5",
  HTML: "#e34c26",
};

function ago(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function GitHubFeed({ repos }: { repos: Repo[] }) {
  return (
    <section id="github" className="scroll-mt-20 pb-24 lg:scroll-mt-10">
      <SectionHeader
        num="02"
        title="Lately on GitHub"
        link={{ href: site.github, label: `@${GITHUB_USER}` }}
      />

      <FadeIn y={14}>
        <p className="mb-8 max-w-[520px] text-[15px] leading-relaxed text-ink-2">
          Everything I&apos;m building in public, freshest first. Live links where
          there&apos;s a deploy — the rest are platforms and experiments in progress.
        </p>
      </FadeIn>

      {repos.length === 0 ? (
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[14px] text-ink underline decoration-line underline-offset-[5px]"
        >
          Browse repositories on GitHub <ArrowUpRight size={13} />
        </a>
      ) : (
        <FadeIn y={14}>
          <ul className="border-b border-line">
            {repos.map((r) => (
              <li
                key={r.name}
                className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border-t border-line py-3.5 sm:grid-cols-[11rem_1fr_auto]"
              >
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate font-mono text-[13px] text-ink transition-opacity hover:opacity-70"
                >
                  {r.name}
                  {r.fork && <span className="ml-2 text-ink-3">fork</span>}
                </a>
                <span className="col-start-1 row-start-2 truncate text-[13px] text-ink-3 sm:col-start-2 sm:row-start-1">
                  {repoNotes[r.name] ?? "—"}
                </span>
                <span className="col-start-2 row-span-2 row-start-1 flex items-center gap-4 justify-self-end sm:col-start-3 sm:row-span-1">
                  {r.language && (
                    <span className="hidden items-center gap-1.5 font-mono text-[11px] text-ink-3 md:inline-flex">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: LANG_DOT[r.language] ?? "currentColor" }}
                      />
                      {r.language}
                    </span>
                  )}
                  <span className="w-[4.5rem] text-right font-mono text-[11px] text-ink-3">
                    {ago(r.pushedAt)}
                  </span>
                  {r.homepage ? (
                    <a
                      href={r.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-12 items-center justify-end gap-0.5 text-[12px] text-ink transition-opacity hover:opacity-70"
                    >
                      live <ArrowUpRight size={12} />
                    </a>
                  ) : (
                    <span className="w-12 text-right text-[12px] text-ink-3/60">wip</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      )}
    </section>
  );
}
