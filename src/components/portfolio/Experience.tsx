import { Briefcase, GraduationCap } from "lucide-react";
import { experience, education } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";

export const Experience = () => (
  <section id="experience" className="py-24 md:py-32 bg-surface/50 relative">
    <div className="container">
      <SectionHeading eyebrow="04 — Experience" title="Where I've shipped." />
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="relative pl-8 border-l-2 border-border space-y-10">
            {experience.map(e => (
              <div key={e.role} className="reveal relative">
                <div className="absolute -left-[42px] w-5 h-5 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center">
                  <Briefcase className="w-2.5 h-2.5 text-primary-foreground" />
                </div>
                <div className="font-mono text-xs text-primary mb-2">{e.period}</div>
                <h3 className="font-display font-semibold text-xl">{e.role}</h3>
                <div className="text-muted-foreground text-sm mb-4">{e.company} · {e.location}</div>
                <ul className="space-y-2">
                  {e.bullets.map(b => (
                    <li key={b} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-primary mt-1.5 shrink-0">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-lg">Education</h3>
            </div>
            <div className="space-y-5">
              {education.map(ed => (
                <div key={ed.degree} className="border-l-2 border-primary/40 pl-4">
                  <div className="font-medium">{ed.degree}</div>
                  <div className="text-sm text-muted-foreground">{ed.school}</div>
                  <div className="font-mono text-xs text-muted-foreground mt-1">{ed.period} · {ed.grade}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
