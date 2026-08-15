import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillCategories, type SkillNode } from "@/data/skillsTree";

const Node = ({
  node,
  animationIndex,
}: {
  node: SkillNode;
  animationIndex: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.22,
      delay: animationIndex * 0.03,
      ease: [0.4, 0, 0.2, 1],
    }}
    className="relative rounded-xl border px-4 py-2.5 min-w-[110px] text-center"
    style={{
      borderColor: "hsl(var(--primary) / 0.7)",
      backgroundColor: "hsl(var(--primary) / 0.12)",
      boxShadow: node.highlight ? "0 0 14px -5px hsl(var(--primary))" : undefined,
    }}
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
        style={{ backgroundColor: "hsl(var(--primary))" }}
      />
    </div>
  </motion.div>
);

export const SkillsTree = () => {
  const [active, setActive] = useState(skillCategories[0].key);
  const cat = skillCategories.find((c) => c.key === active) ?? skillCategories[0];

  return (
    <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
      <div className="reveal">
        <div className="border-l-2 border-border pl-0 space-y-1">
          {skillCategories.map((category) => {
            const isActive = category.key === active;
            return (
              <button
                key={category.key}
                onClick={() => setActive(category.key)}
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
                <span className="font-display font-semibold text-base md:text-lg">
                  {category.label}
                </span>
                {isActive && (
                  <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">
                    {category.blurb}
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
