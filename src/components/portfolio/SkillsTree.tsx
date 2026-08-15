import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillCategories, type SkillNode } from "@/data/skillsTree";

type TreeColor = {
  hue: number;
  saturation: number;
  lightness: number;
};

const TREE_PALETTE: TreeColor[] = [
  { hue: 28, saturation: 88, lightness: 58 },
  { hue: 160, saturation: 58, lightness: 46 },
  { hue: 230, saturation: 78, lightness: 62 },
  { hue: 44, saturation: 88, lightness: 52 },
  { hue: 340, saturation: 76, lightness: 58 },
  { hue: 198, saturation: 82, lightness: 50 },
];

const getTreeColor = (index: number) =>
  TREE_PALETTE[index % TREE_PALETTE.length];

const Node = ({
  node,
  colorIndex,
  animationIndex,
}: {
  node: SkillNode;
  colorIndex: number;
  animationIndex: number;
}) => {
  const color = getTreeColor(colorIndex);
  const accent = `hsl(${color.hue} ${color.saturation}% ${color.lightness}%)`;
  const border = `color-mix(in srgb, ${accent} 72%, hsl(var(--border)))`;
  const background = `color-mix(in srgb, ${accent} 13%, hsl(var(--background)))`;
  const progress = `color-mix(in srgb, ${accent} 78%, hsl(var(--foreground)))`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.22,
        delay: animationIndex * 0.03,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="relative rounded-xl border px-4 py-2.5 min-w-[110px] text-center"
      style={{ borderColor: border, backgroundColor: background }}
    >
      <div className="text-[13px] font-medium leading-tight text-foreground whitespace-nowrap">
        {node.name}
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${node.progress}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: progress }}
        />
      </div>
      {node.highlight && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{ boxShadow: `0 0 14px -5px ${accent}` }}
        />
      )}
    </motion.div>
  );
};

export const SkillsTree = () => {
  const [active, setActive] = useState(skillCategories[0].key);
  const cat = skillCategories.find((c) => c.key === active) ?? skillCategories[0];
  const categoryIndex = skillCategories.findIndex((c) => c.key === active);

  return (
    <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
      <div className="reveal">
        <div className="border-l-2 border-border pl-0 space-y-1">
          {skillCategories.map((c) => {
            const isActive = c.key === active;
            return (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                aria-pressed={isActive}
                className={`relative block w-full text-left pl-5 pr-3 py-3 min-h-[44px] transition-colors duration-200 ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`absolute left-[-2px] top-0 bottom-0 w-[2px] transition-colors duration-200 ${
                    isActive ? "bg-primary" : "bg-transparent"
                  }`}
                />
                <span className="font-display font-semibold text-base md:text-lg">{c.label}</span>
                {isActive && (
                  <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">
                    {c.blurb}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-2 reveal">
        <div className="rounded-2xl border border-border bg-surface-elevated/40 p-6 md:p-10 overflow-x-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center"
            >
              {cat.levels.map((level, levelIndex) => (
                <div key={levelIndex} className="flex flex-col items-center w-full">
                  {levelIndex > 0 && <div className="h-6 w-[2px] bg-border" aria-hidden />}
                  <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {level.map((node, nodeIndex) => (
                      <Node
                        key={node.name}
                        node={node}
                        colorIndex={categoryIndex + levelIndex + nodeIndex}
                        animationIndex={nodeIndex}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};


export { SkillsTree }