import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#0C0C0C]" style={{ overflowX: "clip" }}>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Projects />
      <Contact />
    </main>
  );
}
