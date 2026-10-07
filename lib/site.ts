export const site = {
  name: "Mark Jeferson Manalo",
  short: "Mark Manalo",
  role: "Full-stack developer",
  location: "Philippines",
  timeZone: "Asia/Manila",
  email: "markjefersonmanalo@gmail.com",
  github: "https://github.com/Jefeeer",
};

export const nav = [
  { id: "work", num: "01", label: "Work" },
  { id: "github", num: "02", label: "GitHub" },
  { id: "services", num: "03", label: "Services" },
  { id: "stack", num: "04", label: "Stack" },
  { id: "contact", num: "05", label: "Contact" },
];

export const services = [
  {
    name: "Full-stack web apps",
    desc: "Production-ready products end to end — data model, API, auth and interface.",
  },
  {
    name: "Frontend & UI engineering",
    desc: "Responsive, accessible interfaces with considered motion and detail.",
  },
  {
    name: "Backend & data",
    desc: "APIs, databases, authentication, integrations and background jobs.",
  },
  {
    name: "AI-powered products",
    desc: "Image generation, assistants and automation woven into useful workflows.",
  },
];

export const stack: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js", "Vite"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "Prisma", "PostgreSQL", "Supabase", "Python · FastAPI"],
  },
  {
    group: "Tools & AI",
    items: ["Vercel", "Git", "Zod", "Gemini API", "Playwright", "Claude Code"],
  },
];
