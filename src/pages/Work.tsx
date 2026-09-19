import { Projects } from "@/components/portfolio/Projects";
import { Achievements } from "@/components/portfolio/Achievements";
import { useReveal } from "@/hooks/useReveal";

const Work = () => {
  useReveal();
  return (
    <div>
      <Achievements />
      <Projects />
    </div>
  );
};

export default Work;
