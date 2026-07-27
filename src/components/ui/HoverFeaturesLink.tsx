import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

interface HoverFeaturesLinkProps {
  text: string;
  features: string[];
}

export const HoverFeaturesLink = ({ text, features }: HoverFeaturesLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <>
      {/* 
        Upgraded from a plain <span> to a styled button.
        It uses your primary colors and has a subtle hover background fill. 
      */}
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-primary/40 bg-transparent px-3 py-1.5 text-sm font-medium text-foreground/80 shadow-sm transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary cursor-help h-9"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <Zap className="w-4 h-4 mr-1.5 text-primary" />
        {text}
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5, x: "-50%", y: 24 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, x: "-50%", y: 24 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5, x: "-50%", y: 24 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
              style={{
                position: "fixed",
                left: springX,
                top: springY,
                zIndex: 9999,
              }}
              className="pointer-events-none w-[320px] max-w-[85vw] overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-md p-5 shadow-elevated"
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
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
