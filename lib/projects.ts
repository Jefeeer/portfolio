export interface Project {
  slug: string;
  name: string;
  kind: string;
  year: string;
  summary: string;
  tags: string[];
  url: string;
  shot: string; // captured screenshot in /public/projects
  repo?: string; // github.com/Jefeeer/<repo>
  featured?: boolean;
}

export const GITHUB_USER = "Jefeeer";

export const projects: Project[] = [
  {
    slug: "jac",
    name: "JAC Motors Philippines",
    kind: "Dealer platform",
    year: "2026",
    summary:
      "Public site, customer portal and role-based admin for a truck dealer with 7 branches — truck and parts catalogs, quotes with PDF output, service booking with email/SMS notifications, and a Python service for imports, reports and reminders.",
    tags: ["Next.js 16", "Supabase", "Tailwind v4", "FastAPI", "Resend"],
    url: "https://jac-aurevixa.vercel.app",
    shot: "/projects/jac.jpg",
    repo: "JAC",
    featured: true,
  },
  {
    slug: "kabisado",
    name: "Kabisado",
    kind: "AI study companion",
    year: "2026",
    summary:
      "Upload handouts, slides or photos of your notes and get a reviewer, flashcards and practice exams in the formats Filipino teachers actually use — with every answer traced back to its source page.",
    tags: ["AI", "Document parsing", "Exam generation"],
    url: "https://kabisado-sigma.vercel.app",
    shot: "/projects/kabisado.jpg",
    featured: true,
  },
  {
    slug: "axel",
    name: "Axel",
    kind: "Family caregiving app",
    year: "2026",
    summary:
      "One shared record for an aging parent's medications, doctor visits, vitals and documents, so every sibling — next door or abroad — knows what happened today. English & Filipino, works offline.",
    tags: ["Mobile app", "Landing site", "Bilingual"],
    url: "https://home-ages-web.vercel.app",
    shot: "/projects/axel.jpg",
    featured: true,
  },
  {
    slug: "cargoflow",
    name: "CargoFlow",
    kind: "Marketing & lead-gen site",
    year: "2026",
    summary:
      "Conversion-focused site for a Miami aviation-parts logistics company. An airfield-signage identity with a split-flap departures board, turbofan engineering drawing and dot-matrix route map — all hand-built SVG.",
    tags: ["Next.js", "TypeScript", "React Hook Form", "Zod"],
    url: "https://cargoflowgroup.vercel.app",
    shot: "/projects/cargoflow.jpg",
    repo: "cargoflow",
    featured: true,
  },
  {
    slug: "realstate",
    name: "Realstate",
    kind: "Luxury real estate studio",
    year: "2026",
    summary:
      "A quiet, editorial site for a boutique property advisory. Every photograph is generated through a Gemini image pipeline with a central manifest and graceful fallbacks.",
    tags: ["Next.js 16", "Tailwind v4", "Gemini API"],
    url: "https://realstate-tawny.vercel.app",
    shot: "/projects/realstate.jpg",
    repo: "realstate",
    featured: true,
  },
  {
    slug: "aurevixa",
    name: "Aurevixa",
    kind: "Software & automation studio",
    year: "2026",
    summary:
      "Company site with a live data-network hero canvas, a bento grid of animated capability mocks, and an interactive manual → automated workflow simulator.",
    tags: ["Next.js", "TypeScript", "Canvas", "Vanilla CSS"],
    url: "https://aurevixa.vercel.app",
    shot: "/projects/aurevixa.jpg",
    repo: "Aurevixa",
    featured: true,
  },
  {
    slug: "hostles",
    name: "Lester Events Host",
    kind: "Personal brand site",
    year: "2026",
    summary:
      "Booking site for an events host and voice-over talent — a broadcast-inspired “on air” design with cue cards and a live audio waveform.",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://hostles.vercel.app",
    shot: "/projects/hostles.jpg",
    repo: "hostles",
    featured: true,
  },
  {
    slug: "queens-banquet",
    name: "Queen's Banquet",
    kind: "Wedding & events platform",
    year: "2026",
    summary:
      "Black, gold and ivory landing site for a wedding coordinator, with an inquiry flow backed by an Express API and Postgres on Supabase.",
    tags: ["React", "Vite", "Express", "Supabase"],
    url: "https://queensbanquet.vercel.app",
    shot: "/projects/queens-banquet.jpg",
    repo: "queensbanquets",
  },
  {
    slug: "queens-events",
    name: "Queen's Banquet Events",
    kind: "Admin & operations console",
    year: "2026",
    summary: "Management console for packages, content and client inquiries.",
    tags: ["React", "Express", "PostgreSQL"],
    url: "https://queensbanquetsevents.vercel.app",
    shot: "/projects/queens-events.jpg",
    repo: "queensbanquets",
  },
];

/** Hand-written blurbs for repos (GitHub descriptions are empty). */
export const repoNotes: Record<string, string> = {
  cargoflow: "Aviation logistics marketing site",
  JAC: "JAC Motors dealer platform — site, portal, admin & Python jobs",
  realstate: "Luxury real estate studio site",
  Aurevixa: "Software & automation studio site",
  hostles: "Events host booking site",
  gainly: "Turborepo monorepo playground",
  jarvis: "Sci-fi AI assistant command center with live telemetry",
  logistics: "Full-stack logistics ops platform with 3D globe",
  sanaya: "Event-management platform — site, partner portal, ops",
  portfolio: "This site",
  queensbanquets: "Wedding & events platform",
};
