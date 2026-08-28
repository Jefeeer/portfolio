export interface Project {
  num: string;
  name: string;
  category: string;
  url: string;
}

export const projects: Project[] = [
  {
    num: "01",
    name: "Assisted Living",
    category: "Full-Stack Web Application",
    url: "https://assisted-living.resoluteaiph.com",
  },
  {
    num: "02",
    name: "SLMS Home",
    category: "Full-Stack Web Application",
    url: "https://slms-home.resoluteaiph.com",
  },
  {
    num: "03",
    name: "MediScript AI",
    category: "AI-Powered Web Application",
    url: "https://mediscript-ai.resoluteaiph.com",
  },
  {
    num: "04",
    name: "Transcribe AI",
    category: "AI-Powered Transcription Application",
    url: "https://transcribe-ai.resoluteaiph.com",
  },
  {
    num: "05",
    name: "Queen's Banquets & Events",
    category: "Management / Admin Application",
    url: "https://queensbanquetsevents.vercel.app",
  },
  {
    num: "06",
    name: "Queen's Banquet",
    category: "Customer-Facing Web Application",
    url: "https://queensbanquet.vercel.app",
  },
];

// Live screenshot via thum.io — always current, zero stored assets.
export const shotUrl = (url: string) =>
  `https://image.thum.io/get/width/1200/crop/750/noanimate/${url}`;
