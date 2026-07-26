import { useRef, MouseEvent, useState } from "react";
import { ExternalLink, Github, Star, Zap, X } from "lucide-react";
import { projects } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/button";

export const Projects = () => (
  <section id="projects" className="py-24 md:py-32 relative">
    <div className="container">
      <SectionHeading eyebrow="02 — Projects" title="Things I've built." desc="Selected work showcasing real-time systems, scalable backends, and product-led design." />
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
  const [featuresOpen, setFeaturesOpen] = useState(false);
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
          <Button
            size="sm"
            variant="outline"
            onClick={() => setFeaturesOpen(true)}
            className="border-primary/40 hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Zap className="w-4 h-4 mr-1.5 text-primary" /> Key features
          </Button>
        </div>
      </div>

      {featuresOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setFeaturesOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 md:p-8 shadow-elevated"
            onClick={e => e.stopPropagation()}
            style={{ animation: "scale-in 0.25s var(--transition-smooth) both" }}
          >
            <button
              onClick={() => setFeaturesOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-border hover:border-primary/60 hover:text-primary flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary mb-4">
              <Zap className="w-3.5 h-3.5" /> Key Features · {project.name}
            </div>
            <ul className="space-y-3 text-sm">
              {project.features.map(f => (
                <li key={f} className="flex gap-2 text-muted-foreground">
                  <span className="text-primary mt-1 shrink-0">▸</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
