import { useRef, MouseEvent } from "react";
import { Zap, ExternalLink, Github, Star } from "lucide-react";
import { projects } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/button";
import { Keywords } from "./Keywords";
import { HoverFeaturesLink } from "@/components/ui/HoverFeaturesLink";
import { Tooltip } from "@/components/ui/tooltip-card";

export const Projects = () => (
  <section id="projects" className="py-24 md:py-32 relative">
    <div className="container">
      <SectionHeading
        eyebrow="03 — Projects"
        title="Things I've built."
        desc="Selected work showcasing real-time systems, scalable backends, and product-led design."
      />
      <div className="space-y-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) => {
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
      {/* Subtle radial mouse tracking background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx) var(--my), hsl(var(--primary) / 0.10), transparent 60%)",
        }}
      />

      <div className="relative space-y-5">
        <div className="font-mono text-xs text-primary">
          PROJECT 0{index + 1}
        </div>

        <h3 className="font-display font-bold text-2xl md:text-3xl flex items-center gap-2">
          {project.name}
          {project.featured && (
            <Star className="w-5 h-5 text-primary fill-primary" />
          )}
        </h3>

        <div className="text-muted-foreground"><Keywords text={project.tagline} /></div>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
          <Keywords text={project.description} />
        </p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/25"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 pt-2 items-center">
          <Button
            asChild
            size="sm"
            className="min-h-[44px] bg-gradient-primary text-primary-foreground transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:scale-95 active:brightness-95"
          >
            <a href={project.live} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4 mr-1.5" /> Live Demo
            </a>
          </Button>

          <Button
            asChild
            size="sm"
            variant="outline"
            className="min-h-[44px] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 active:scale-95"
          >
            <a href={project.github} target="_blank" rel="noreferrer">
              <Github className="w-4 h-4 mr-1.5" /> GitHub
            </a>
          </Button>

          {/* New Cursor-Following Features Link */}
          <div className="ml-2">
            {/* <HoverFeaturesLink 
              text="View Key Features" 
              features={project.features} 
            /> */}
            <Tooltip
              containerClassName="text-neutral-600 dark:text-neutral-400"
              content={
                // Wrap the features in a styled container so it renders as a proper list
                <div className="flex flex-col gap-2 p-1 max-w-xs text-left">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary mb-1">
                    <Zap className="w-3.5 h-3.5" /> Key Features
                  </div>
                  <ul className="space-y-2 text-sm">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-muted-foreground leading-snug"
                      >
                        <span className="text-primary mt-0.5 shrink-0">▸</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            >
              {/* We can also apply the button styling here so it matches Live Demo & GitHub */}
              <button
                type="button"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-primary/40 bg-transparent px-3 py-1.5 text-sm font-medium text-foreground/80 shadow-sm transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95 cursor-help"
              >
                <Zap className="w-4 h-4 mr-1.5 text-primary" />
                View Key Features
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
