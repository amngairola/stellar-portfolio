import { Code2, Layers, Rocket, BookOpen } from "lucide-react";
import { about } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";

const icons = [Rocket, Layers, Code2, BookOpen];

export const About = () => (
  <section id="about" className="py-24 md:py-32 relative">
    <div className="container">
      <SectionHeading eyebrow="01 — About" title="I build things that work and feel good to use." />
      <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
        <div className="lg:col-span-3 reveal space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground">
          <p>{about.summary}</p>
          <p className="text-foreground">{about.highlight}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {about.stats.map((s) => (
              <div key={s.label} className="glass rounded-xl p-4">
                <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 reveal grid sm:grid-cols-2 gap-3">
          {about.values.map((v, i) => {
            const Icon = icons[i];
            return (
              <div key={v.title} className="glass rounded-xl p-5 hover:border-primary/40 transition-colors">
                <Icon className="w-5 h-5 text-primary mb-3" />
                <div className="font-display font-semibold mb-1">{v.title}</div>
                <div className="text-sm text-muted-foreground">{v.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
