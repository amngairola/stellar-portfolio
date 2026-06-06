import { ArrowRight, Download, Mail, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/portfolio";
import { TypingText } from "./TypingText";

export const Hero = () => {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="blob bg-primary/40 w-[420px] h-[420px] -top-20 -left-20" />
      <div className="blob bg-secondary/40 w-[480px] h-[480px] bottom-0 right-0" style={{ animationDelay: "4s" }} />

      <div className="container relative">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-xs font-mono text-muted-foreground mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Open to Software Engineer roles · 2026
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight animate-fade-in" style={{ animationDelay: "0.05s" }}>
            Hi, I'm <span className="gradient-text">{personal.name}.</span>
          </h1>

          <div className="mt-4 text-2xl sm:text-3xl md:text-4xl font-display font-semibold animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <TypingText words={personal.roles} />
          </div>

          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.25s" }}>
            {personal.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {personal.location}</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-primary" /> B.Tech CSE '26</span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" onClick={() => go("projects")} className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow group">
              View Projects <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary/40 hover:border-primary hover:bg-primary/5">
              <a href={personal.resumeUrl} download><Download className="mr-1.5 w-4 h-4" /> Download Resume</a>
            </Button>
            <Button size="lg" variant="ghost" onClick={() => go("contact")}>
              <Mail className="mr-1.5 w-4 h-4" /> Contact Me
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-6 max-w-xl animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {[
              { v: "500+", l: "DSA Solved" },
              { v: "4", l: "Full-Stack Apps" },
              { v: "<200ms", l: "Realtime Latency" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-xl p-4 text-center">
                <div className="font-display font-bold text-xl sm:text-2xl gradient-text">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
