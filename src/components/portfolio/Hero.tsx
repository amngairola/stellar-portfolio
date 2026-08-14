import { personal } from "@/data/portfolio";

export const Hero = () => {
  return (
    <section id="home" className="relative flex items-center pt-20 pb-8 sm:pt-24 md:pt-28 md:pb-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="hero-glow" />
      <div className="blob bg-primary/10 w-[420px] h-[420px] -top-24 -left-24" />

      <div className="container relative">
        <div className="max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-5 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
            {personal.roles?.[0] ?? "Software Engineer"}
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight">
            Hi, I'm <span className="text-primary">{personal.name}.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            {personal.tagline}
          </p>

          <div className="mt-8 h-px w-24 bg-primary/40" />
        </div>
      </div>
    </section>
  );
};
