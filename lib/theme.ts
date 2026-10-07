export type ThemePref = "light" | "dark" | "system";

const KEY = "pf-theme";
export const THEME_EVENT = "pf-theme-change";

export function getPref(): ThemePref {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "light" || v === "dark") return v;
  } catch {}
  return "system";
}

export function resolve(p: ThemePref): "light" | "dark" {
  if (p !== "system") return p;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Apply a theme preference; flips with a circular reveal from (x, y) when supported. */
export function setTheme(p: ThemePref, origin?: { x: number; y: number }) {
  try {
    localStorage.setItem(KEY, p);
  } catch {}
  const root = document.documentElement;
  const next = resolve(p);
  const apply = () => root.setAttribute("data-theme", next);
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: p }));

  if (root.getAttribute("data-theme") === next) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> };
  };
  if (reduce || !doc.startViewTransition) {
    apply();
    return;
  }

  const x = origin?.x ?? window.innerWidth;
  const y = origin?.y ?? 0;
  const r = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );
  doc
    .startViewTransition(apply)
    .ready.then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${r}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 560,
          easing: "cubic-bezier(.32,.08,.24,1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    })
    .catch(() => {});
}
