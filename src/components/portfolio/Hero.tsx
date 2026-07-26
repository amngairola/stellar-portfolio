import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/portfolio";
import { TypingText } from "./TypingText";

export const Hero = () => {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="blob bg-primary/15 w-[420px] h-[420px] -top-20 -left-20" />
      <div className="blob bg-primary/10 w-[480px] h-[480px] bottom-0 right-0" style={{ animationDelay: "4s" }} />

      <div className="container relative">
        <div className="max-w-4xl">
          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight">
            Hi, I'm <span className="gradient-text">{personal.name}.</span>
          </h1>

          <div className="mt-4 text-2xl sm:text-3xl md:text-4xl font-display font-semibold">
            <TypingText words={personal.roles} />
          </div>

          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            {personal.tagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => go("projects")} className="bg-gradient-primary text-primary-foreground hover:brightness-110 transition group">
              View Projects <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary/40 hover:border-primary hover:bg-primary/10">
              <a href={personal.resumeUrl} download><Download className="mr-1.5 w-4 h-4" /> Download Resume</a>
            </Button>
            <Button size="lg" variant="ghost" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
              <Mail className="mr-1.5 w-4 h-4" /> Contact Me
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-6 max-w-xl">
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
