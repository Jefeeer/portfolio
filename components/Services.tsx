"use client";

import FadeIn from "./FadeIn";

const SERVICES = [
  {
    num: "01",
    name: "Full-Stack Development",
    desc: "End-to-end development of production-ready web applications.",
  },
  {
    num: "02",
    name: "Frontend Development",
    desc: "Responsive, accessible, and intuitive interfaces built around great user experience.",
  },
  {
    num: "03",
    name: "Backend Development",
    desc: "APIs, application logic, databases, authentication, integrations, and server-side systems.",
  },
  {
    num: "04",
    name: "UI/UX Implementation",
    desc: "Turning designs and concepts into polished, responsive digital experiences.",
  },
  {
    num: "05",
    name: "AI-Powered Applications",
    desc: "Building applications and workflows that integrate AI capabilities into useful products.",
  },
];

export default function Services() {
  const border = "1px solid rgba(12, 12, 12, 0.15)";
  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        What I Do
      </h2>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-5 sm:gap-8 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: border,
                borderBottom: i === SERVICES.length - 1 ? border : undefined,
              }}
            >
              <span
                className="text-[#0C0C0C] font-black leading-none shrink-0"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {s.num}
              </span>
              <div className="flex flex-col gap-3 pt-1">
                <h3
                  className="text-[#0C0C0C] font-medium uppercase"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {s.name}
                </h3>
                <p
                  className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl"
                  style={{
                    fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)",
                    opacity: 0.6,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
