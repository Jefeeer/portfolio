"use client";

import { useEffect, useRef } from "react";

/**
 * Halftone dot field that fades out from the top-right corner and swells
 * around the cursor. Colour follows the --pf-ink token, so it themes itself.
 */
export default function DotField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 13;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let ink = "17 17 16";

    const readInk = () => {
      ink = getComputedStyle(document.documentElement)
        .getPropertyValue("--pf-ink")
        .trim() || ink;
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      ctx.clearRect(0, 0, w, h);
      const [r, g, b] = ink.split(/\s+/);
      const diag = Math.hypot(w, h);

      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          // Distance from the top-right corner drives the base density.
          const d = Math.hypot(w - x, y) / diag;
          let base = Math.max(0, 1 - d * 1.55);
          if (base <= 0.01) continue;
          // Slow ambient ripple.
          if (!reduce) base *= 0.82 + 0.18 * Math.sin(x * 0.02 + y * 0.015 - t * 0.0009);
          const md = Math.hypot(mouse.x - x, mouse.y - y);
          const boost = Math.max(0, 1 - md / 120);
          const radius = 0.5 + base * 1.35 + boost * 2.2;
          const alpha = Math.min(1, base * 0.55 + boost * 0.5);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    // With reduced motion, draw one static frame and redraw only on change.
    const still = () => reduce && draw(0);

    readInk();
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      still();
    });
    ro.observe(canvas);
    const mo = new MutationObserver(() => {
      readInk();
      still();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
