import { useRef, MouseEvent } from "react";
import { ExternalLink, Github, Star, Zap } from "lucide-react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { projects } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/button";

export const Projects = () => (
  <section id="projects" className="py-24 md:py-32 relative">
    <div className="container">
      <SectionHeading eyebrow="03 — Projects" title="Things I've built." desc="Selected work showcasing real-time systems, scalable backends, and product-led design." />
      <div className="space-y-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const ProjectCard = ({ project, index }: { project: typeof projects[number]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-10 hover:border-primary/50 transition-colors"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx) var(--my), hsl(var(--primary) / 0.10), transparent 60%)",
        }}
      />
      <div className="relative space-y-5">
        <div className="font-mono text-xs text-primary">PROJECT 0{index + 1}</div>
        <h3 className="font-display font-bold text-2xl md:text-3xl flex items-center gap-2">
          {project.name}
          {project.featured && <Star className="w-5 h-5 text-primary fill-primary" />}
        </h3>
        <div className="text-muted-foreground">{project.tagline}</div>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map(t => (
            <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/25">
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-1">
          <Button asChild size="sm" className="bg-gradient-primary text-primary-foreground hover:brightness-110 transition">
            <a href={project.live} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4 mr-1.5" /> Live Demo
            </a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href={project.github} target="_blank" rel="noreferrer">
              <Github className="w-4 h-4 mr-1.5" /> GitHub
            </a>
          </Button>
          <HoverCard.Root openDelay={150} closeDelay={200}>
            <HoverCard.Trigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="border-primary/40 hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Zap className="w-4 h-4 mr-1.5 text-primary" /> Key features
              </Button>
            </HoverCard.Trigger>
            <HoverCard.Portal>
              <HoverCard.Content
                sideOffset={8}
                className="z-[100] w-[340px] max-w-[92vw] rounded-2xl border border-border bg-popover p-5 shadow-elevated outline-none"
                style={{ animation: "scale-in 0.18s var(--transition-smooth) both" }}
              >
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary mb-3">
                  <Zap className="w-3.5 h-3.5" /> Key Features · {project.name}
                </div>
                <ul className="space-y-2.5 text-sm">
                  {project.features.map(f => (
                    <li key={f} className="flex gap-2 text-muted-foreground">
                      <span className="text-primary mt-1 shrink-0">▸</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <HoverCard.Arrow className="fill-border" />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
        </div>
      </div>
    </div>
  );
};
