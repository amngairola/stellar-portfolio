import { Code, Palette, Server, Database, Wrench, Brain } from "lucide-react";
import { skills } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";

const icons = [Code, Palette, Server, Database, Wrench, Brain];

export const Skills = () => (
  <section id="skills" className="py-24 md:py-32 bg-surface/50 relative">
    <div className="container">
      <SectionHeading eyebrow="02 — Skills" title="A toolkit built for full-stack velocity." desc="Languages, frameworks, and concepts I reach for to ship reliable, performant products." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((s, i) => {
          const Icon = icons[i];
          return (
            <div key={s.category} className="glow-border glass rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 reveal" style={{ transitionDelay: `${i * 40}ms` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg">{s.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {s.items.map(item => (
                  <span key={item} className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
