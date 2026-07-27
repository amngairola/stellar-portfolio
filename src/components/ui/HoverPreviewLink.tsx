import { useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface HoverPreviewLinkProps {
  text: string;
  href: string;
  imageSrc: string;
}

export const HoverPreviewLink = ({ text, href, imageSrc }: HoverPreviewLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Framer Motion values to track the cursor's exact X and Y coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply a spring physics effect to make the movement fluid instead of robotic
  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Update the coordinates whenever the mouse moves inside the link
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // We add a slight offset (e.g., +20px) so the image doesn't block the mouse cursor
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-block font-semibold text-primary underline decoration-primary/50 decoration-dashed underline-offset-4 transition-colors hover:text-primary-glow hover:decoration-primary-glow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {text}
      </a>

      {/* The Floating Image */}
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
              zIndex: 100, // Ensures it floats above everything
            }}
            // pointer-events-none is CRUCIAL so the image doesn't steal hover state from the link
            className="pointer-events-none overflow-hidden rounded-xl border-2 border-border bg-card shadow-elevated"
          >
            <img
              src={imageSrc}
              alt={`${text} preview`}
              className="w-64 h-auto block object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
