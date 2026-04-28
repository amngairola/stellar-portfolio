import { useEffect, useRef, useState } from "react";
import { Award, Github, Trophy } from "lucide-react";
import { achievements, certifications, personal } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/button";

const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const dur = 1400;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <div ref={ref} className="font-display font-bold text-4xl md:text-5xl gradient-text">{n}{suffix}</div>;
};

export const Achievements = () => (
  <section id="achievements" className="py-24 md:py-32 relative">
    <div className="container">
      <SectionHeading eyebrow="05 — Achievements" title="Proof of work." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {achievements.map(a => (
          <div key={a.label} className="reveal glass rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform">
            <Counter to={a.value} suffix={a.suffix} />
            <div className="text-sm text-muted-foreground mt-2">{a.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-10">
        {certifications.map(c => (
          <div key={c.title} className="reveal glow-border glass rounded-2xl p-6">
            <Award className="w-5 h-5 text-primary mb-3" />
            <h4 className="font-display font-semibold">{c.title}</h4>
            <div className="text-xs font-mono text-primary mb-2">{c.issuer}</div>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="reveal flex flex-wrap gap-3">
        <Button asChild variant="outline" className="border-primary/40 hover:border-primary">
          <a href={personal.leetcode} target="_blank" rel="noreferrer">
            <Trophy className="w-4 h-4 mr-1.5" /> LeetCode Profile
          </a>
        </Button>
        <Button asChild variant="outline" className="border-primary/40 hover:border-primary">
          <a href={personal.github} target="_blank" rel="noreferrer">
            <Github className="w-4 h-4 mr-1.5" /> GitHub Profile
          </a>
        </Button>
      </div>
    </div>
  </section>
);
