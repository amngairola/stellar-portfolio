import { Experience } from "@/components/portfolio/Experience";
import { Achievements } from "@/components/portfolio/Achievements";
import { Freelance } from "@/components/portfolio/Freelance";
import { useReveal } from "@/hooks/useReveal";

const Journey = () => {
  useReveal();
  return (
    <div className="pt-24">
      <Experience />
      <Achievements />
      <Freelance />
    </div>
  );
};

export default Journey;