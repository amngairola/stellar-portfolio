import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { useReveal } from "@/hooks/useReveal";

const Home = () => {
  useReveal();
  return (
    <div className="relative">
      {/* Ambient warm glow — Home page only, sits behind all content */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[80vh] home-ambient-glow"
      />
      <Hero />
      <About />
    </div>
  );
};

export default Home;
