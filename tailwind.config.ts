import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'Geist Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["'Instrument Serif'", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        // Portfolio tokens (light/dark driven by html[data-theme])
        canvas: "rgb(var(--pf-canvas) / <alpha-value>)",
        surface: "rgb(var(--pf-surface) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--pf-ink) / <alpha-value>)",
          2: "rgb(var(--pf-ink-2) / <alpha-value>)",
          3: "rgb(var(--pf-ink-3) / <alpha-value>)",
        },
        line: "rgb(var(--pf-line) / <alpha-value>)",
        signal: "rgb(var(--pf-signal) / <alpha-value>)",

        // shadcn tokens (admin dashboard)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        ping2: {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "80%,100%": { transform: "scale(2.6)", opacity: "0" },
        },
      },
      animation: {
        ping2: "ping2 2s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
