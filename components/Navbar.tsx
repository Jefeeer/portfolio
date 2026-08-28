"use client";

import FadeIn from "./FadeIn";

const links = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <FadeIn as="nav" delay={0} y={-20} className="w-full">
      <ul className="flex justify-between items-center list-none px-6 md:px-10 pt-6 md:pt-8">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </FadeIn>
  );
}
