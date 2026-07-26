import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { CompetitiveProgramming } from "@/components/portfolio/CompetitiveProgramming";
import { useReveal } from "@/hooks/useReveal";

const Work = () => {
  useReveal();
  return (
    <div className="pt-24">
      <Skills />
      <Projects />
      <CompetitiveProgramming />
    </div>
  );
};

export default Work;