"use client";

import FadeIn from "./FadeIn";
import Magnet from "./Magnet";
import Navbar from "./Navbar";
import ContactButton from "./ContactButton";

export default function Hero() {
  return (
    <section
      className="relative h-screen flex flex-col"
      style={{ overflowX: "clip" }}
    >
      <Navbar />

      <div className="flex-1 flex flex-col justify-between px-6 md:px-10 relative">
        <div className="overflow-hidden w-full">
          <FadeIn
            as="h1"
            delay={0.15}
            y={40}
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5"
          >
            Hi, i&apos;m mark
          </FadeIn>
        </div>

        <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10">
          <FadeIn
            delay={0.35}
            y={20}
            className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          >
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug"
              style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
            >
              a full-stack developer building modern, scalable, and user-focused
              web applications
            </p>
            <p
              className="mt-3 text-[#646973] font-light uppercase tracking-widest"
              style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.9rem)" }}
            >
              Mark Jeferson Manalo
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
          <FadeIn delay={0.6} y={30}>
            <Magnet padding={150} strength={3}>
              <img
                src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Robot/3D/robot_3d.png"
                alt="3D robot mascot"
                className="w-full h-auto select-none pointer-events-none drop-shadow-2xl"
              />
            </Magnet>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
