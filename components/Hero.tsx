"use client";

import FadeIn from "./FadeIn";
import Navbar from "./Navbar";
import ContactButton from "./ContactButton";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

export default function Hero() {
  return (
    <section
      className="relative h-screen flex flex-col overflow-hidden"
      style={{ overflowX: "clip" }}
    >
      {/* Cursor-following glow, tinted to the brand gradient */}
      <Spotlight
        className="from-[#B600A8]/40 via-[#7621B0]/25 to-transparent"
        size={420}
      />

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="flex-1 flex flex-col justify-between px-6 md:px-10 relative">
        {/* Interactive 3D robot — fills the hero, sits behind the text */}
        <div className="absolute inset-0 z-10">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        <div className="overflow-hidden w-full relative z-20 pointer-events-none">
          <FadeIn
            as="h1"
            delay={0.15}
            y={40}
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5"
          >
            Hi, i&apos;m mark
          </FadeIn>
        </div>

        <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 relative z-20">
          <FadeIn
            delay={0.35}
            y={20}
            className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px] pointer-events-none"
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
      </div>
    </section>
  );
}
