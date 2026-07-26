import { Photography } from "@/components/portfolio/Photography";
import { useReveal } from "@/hooks/useReveal";

const Lens = () => {
  useReveal();
  return (
    <div className="pt-20">
      <Photography />
    </div>
  );
};

export default Lens;