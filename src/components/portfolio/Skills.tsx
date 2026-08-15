import { SectionHeading } from "./SectionHeading";
import { SkillsTree } from "./SkillsTree";

export const Skills = () => (
  <section id="skills" className="py-24 md:py-32 bg-surface/50 relative">
    <div className="container">
      <SectionHeading
        eyebrow="01 — Toolkit"
        title="A growing toolkit — full-stack today, always exploring what's next."
        desc="Pick a track to see how the pieces connect. Depth where it counts, curiosity everywhere else."
      />
      <SkillsTree />
    </div>
  </section>
);
