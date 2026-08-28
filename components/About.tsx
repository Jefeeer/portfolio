"use client";

import { Braces, Database, Server, Terminal } from "lucide-react";
import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";

const BIO =
  "I’m Mark Jeferson Manalo, a full-stack developer focused on building practical, polished, and user-friendly web applications. I work across frontend and backend development, turning ideas into responsive, functional digital products. I care about clean interfaces, maintainable code, and systems that solve real-world problems.";

const STACK = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "Prisma",
  "Supabase",
  "Tailwind",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden scroll-mt-10"
    >
      {/* Developer-oriented corner decorations (replace the reference 3D objects) */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] text-[#646973]"
      >
        <Terminal className="w-[80px] sm:w-[110px] md:w-[150px] h-auto" strokeWidth={1} />
      </FadeIn>
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] text-[#646973]"
      >
        <Braces className="w-[80px] sm:w-[110px] md:w-[150px] h-auto" strokeWidth={1} />
      </FadeIn>
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] text-[#646973]"
      >
        <Database className="w-[70px] sm:w-[100px] md:w-[130px] h-auto" strokeWidth={1} />
      </FadeIn>
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] text-[#646973]"
      >
        <Server className="w-[70px] sm:w-[100px] md:w-[130px] h-auto" strokeWidth={1} />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn
          as="h2"
          delay={0}
          y={40}
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          About me
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text={BIO}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />

          <div
            id="stack"
            className="flex flex-wrap items-center justify-center gap-3 max-w-[640px] scroll-mt-24"
          >
            {STACK.map((t, i) => (
              <FadeIn key={t} delay={i * 0.08} y={20}>
                <span className="rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] uppercase tracking-widest font-light px-5 py-2 text-xs sm:text-sm">
                  {t}
                </span>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
