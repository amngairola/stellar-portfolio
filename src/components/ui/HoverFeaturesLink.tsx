import { useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

interface HoverFeaturesLinkProps {
  text: string;
  features: string[];
}

export const HoverFeaturesLink = ({ text, features }: HoverFeaturesLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  return (
    <>
      <span
        className="relative inline-block font-semibold text-primary underline decoration-primary/50 decoration-dashed underline-offset-4 transition-colors hover:text-primary-glow hover:decoration-primary-glow cursor-help"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {text}
      </span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
            style={{
              position: "fixed",
              left: springX,
              top: springY,
              zIndex: 100,
            }}
            className="pointer-events-none w-[320px] max-w-[85vw] overflow-hidden rounded-2xl border border-border bg-popover p-5 shadow-elevated"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary mb-3">
              <Zap className="w-3.5 h-3.5" /> Key Features
            </div>
            <ul className="space-y-2.5 text-sm">
              {features.map((feature, i) => (
                <li key={i} className="flex gap-2 text-muted-foreground">
                  <span className="text-primary mt-0.5 shrink-0">▸</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
