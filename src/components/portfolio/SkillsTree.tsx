import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillCategories, type SkillNode } from "@/data/skillsTree";

const Node = ({ node, i }: { node: SkillNode; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.22, delay: i * 0.03, ease: [0.4, 0, 0.2, 1] }}
    className={`rounded-xl border px-4 py-2.5 min-w-[110px] text-center ${
      node.highlight
        ? "border-primary/60 bg-primary/10"
        : "border-border bg-surface-elevated"
    }`}
  >
    <div className="text-[13px] font-medium leading-tight text-foreground whitespace-nowrap">
      {node.name}
    </div>
    <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${node.progress}%` }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`h-full rounded-full ${node.highlight ? "bg-primary" : "bg-foreground/40"}`}
      />
    </div>
  </motion.div>
);

export const SkillsTree = () => {
  const [active, setActive] = useState(skillCategories[0].key);
  const cat = skillCategories.find((c) => c.key === active) ?? skillCategories[0];

  return (
    <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
      {/* Column 1 — categories, Experience-style left border */}
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

      {/* Column 2 — tree */}
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
              {cat.levels.map((level, li) => (
                <div key={li} className="flex flex-col items-center w-full">
                  {li > 0 && (
                    <div className="h-6 w-[2px] bg-border" aria-hidden />
                  )}
                  <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {level.map((n, i) => (
                      <Node key={n.name} node={n} i={i} />
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
