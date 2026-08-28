"use client";

import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { Project, projects, shotUrl } from "@/lib/projects";
import FadeIn from "./FadeIn";
import LiveProjectButton from "./LiveProjectButton";

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card scales down as later cards stack on top of it.
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="relative w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D2FFE4] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4 sm:mb-6">
          <div className="flex items-center gap-4 md:gap-6">
            <span
              className="text-[#D2FFE4] font-black leading-none"
              style={{ fontSize: "clamp(2.5rem, 8vw, 100px)" }}
            >
              {project.num}
            </span>
            <div className="flex flex-col">
              <span className="text-[#5E8A73] uppercase tracking-widest font-light text-xs sm:text-sm">
                {project.category}
              </span>
              <span
                className="text-[#D2FFE4] uppercase font-medium leading-tight"
                style={{ fontSize: "clamp(1rem, 2.4vw, 2rem)" }}
              >
                {project.name}
              </span>
            </div>
          </div>
          <LiveProjectButton href={project.url} />
        </div>

        <div className="w-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-[#D2FFE4]/20">
          <img
            src={shotUrl(project.url)}
            alt={project.name}
            loading="lazy"
            className="w-full object-cover object-top"
            style={{ height: "clamp(220px, 42vh, 460px)" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={container}
      id="projects"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20 scroll-mt-10"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Selected Work
      </FadeIn>

      <div>
        {projects.map((p, i) => (
          <ProjectCard
            key={p.num}
            project={p}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
