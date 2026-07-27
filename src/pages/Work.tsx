import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Achievements } from "@/components/portfolio/Achievements";
import { useReveal } from "@/hooks/useReveal";

const Work = () => {
  useReveal();
  return (
    <div>
      <Skills />
      <Achievements />
      <Projects />
    </div>
  );
};

export default Work;
