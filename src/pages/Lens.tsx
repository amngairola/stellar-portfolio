import { Photography } from "@/components/portfolio/Photography";
import { useReveal } from "@/hooks/useReveal";

const Lens = () => {
  useReveal();
  return (
    <div>
      <Photography />
    </div>
  );
};

export default Lens;