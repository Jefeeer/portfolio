export interface Project {
  num: string;
  name: string;
  category: string;
  url: string;
  shot: string; // captured screenshot in /public/projects
}

export const projects: Project[] = [
  {
    num: "01",
    name: "Assisted Living",
    category: "Full-Stack Web Application",
    url: "https://assisted-living.resoluteaiph.com",
    shot: "/projects/assisted-living.jpg",
  },
  {
    num: "02",
    name: "SLMS Home",
    category: "Full-Stack Web Application",
    url: "https://slms-home.resoluteaiph.com",
    shot: "/projects/slms-home.jpg",
  },
  {
    num: "03",
    name: "MediScript AI",
    category: "AI-Powered Web Application",
    url: "https://mediscript-ai.resoluteaiph.com",
    shot: "/projects/mediscript-ai.jpg",
  },
  {
    num: "04",
    name: "Transcribe AI",
    category: "AI-Powered Transcription Application",
    url: "https://transcribe-ai.resoluteaiph.com",
    shot: "/projects/transcribe-ai.jpg",
  },
  {
    num: "05",
    name: "Queen's Banquets & Events",
    category: "Management / Admin Application",
    url: "https://queensbanquetsevents.vercel.app",
    shot: "/projects/queens-events.jpg",
  },
  {
    num: "06",
    name: "Queen's Banquet",
    category: "Customer-Facing Web Application",
    url: "https://queensbanquet.vercel.app",
    shot: "/projects/queens-banquet.jpg",
  },
];
