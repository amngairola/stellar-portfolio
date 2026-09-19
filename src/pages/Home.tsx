import { Hero } from "@/components/portfolio/Hero";
import { Skills } from "@/components/portfolio/Skills";
import { Achievements } from "@/components/portfolio/Achievements";
import { Projects } from "@/components/portfolio/Projects";
import { useReveal } from "@/hooks/useReveal";

const Home = () => {
  useReveal();
  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-[-10%] top-0 z-0 h-[78vh] home-ambient-glow" />
      <div className="relative z-10">
        <Hero />
        <Skills />
        <Achievements />
        <Projects />
      </div>
    </div>
  );
};

export default Home;
