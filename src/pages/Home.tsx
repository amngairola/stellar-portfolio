import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { useReveal } from "@/hooks/useReveal";

const Home = () => {
  useReveal();
  return (
    <>
      <Hero />
      <About />
    </>
  );
};

export default Home;