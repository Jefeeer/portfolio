import { ArrowUp } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line pb-10 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[12px] text-ink-3">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="hidden sm:block">Built with Next.js &amp; Tailwind CSS</p>
        <a
          href="#top"
          className="tap inline-flex items-center gap-1 transition-colors hover:text-ink"
        >
          Back to top <ArrowUp size={12} />
        </a>
      </div>
    </footer>
  );
}
