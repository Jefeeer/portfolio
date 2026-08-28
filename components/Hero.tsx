"use client";

import FadeIn from "./FadeIn";
import Navbar from "./Navbar";
import ContactButton from "./ContactButton";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

export default function Hero() {
  return (
    <section
      className="relative h-screen overflow-hidden flex flex-col"
      style={{ overflowX: "clip" }}
    >
      {/* Cursor-following neon glow */}
      <Spotlight
        className="from-[#22FF88]/40 via-[#0c7a42]/25 to-transparent"
        size={420}
      />

      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Heading */}
      <div className="relative z-20 overflow-hidden w-full px-6 md:px-10 pointer-events-none">
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-4 sm:mt-3 md:-mt-4"
        >
          Hi, i&apos;m mark
        </FadeIn>
      </div>

      {/* Interactive 3D robot — large, anchored below the heading */}
      <div className="absolute inset-x-0 bottom-0 top-[22%] z-10">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Bottom bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 pointer-events-none">
        <FadeIn
          delay={0.35}
          y={20}
          className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
        >
          <p
            className="text-[#D2FFE4] font-light uppercase tracking-wide leading-snug"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            a full-stack developer building modern, scalable, and user-focused
            web applications
          </p>
          <p
            className="mt-3 text-[#5E8A73] font-light uppercase tracking-widest"
            style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.9rem)" }}
          >
            Mark Jeferson Manalo
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="pointer-events-auto">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
