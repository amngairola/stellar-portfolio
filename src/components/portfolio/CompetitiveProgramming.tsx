import { Code2, Trophy, Target, TrendingUp } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/portfolio";

const stats = [
  { icon: Trophy, label: "Contest Rating", value: "1761" },
  { icon: TrendingUp, label: "Global Rank", value: "82,874 / 874,213" },
  { icon: Target, label: "Contests Attended", value: "21" },
  { icon: Code2, label: "Top Globally", value: "9.7%" },
];

const topics = [
  "Arrays", "Strings", "Linked Lists", "Trees", "Graphs",
  "Dynamic Programming", "Greedy", "Recursion", "Backtracking", "System Design",
];

export const CompetitiveProgramming = () => (
  <section id="cp" className="py-24 md:py-32 relative">
    <div className="container">
      <SectionHeading
        eyebrow="06 — Competitive Programming"
        title="Competitive Programming & Problem Solving."
        desc="500+ DSA problems solved across multiple platforms with strong algorithmic fundamentals and regular LeetCode contest participation."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} className="reveal glass rounded-2xl p-6 hover:-translate-y-1 transition-transform">
            <s.icon className="w-5 h-5 text-primary mb-3" />
            <div className="font-display font-bold text-2xl md:text-3xl gradient-text">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="reveal glow-border glass rounded-2xl p-6 md:p-8 mb-8">
        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-4">Core Topics</div>
        <div className="flex flex-wrap gap-2">
          {topics.map(t => (
            <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
              {t}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm md:text-base text-muted-foreground leading-relaxed">
          Passionate about building scalable products while maintaining strong algorithmic problem-solving skills and software engineering fundamentals.
        </p>
      </div>

      <div className="reveal">
        <Button asChild variant="outline" className="border-primary/40 hover:border-primary">
          <a href={personal.leetcode} target="_blank" rel="noreferrer">
            <Trophy className="w-4 h-4 mr-1.5" /> View LeetCode Profile
          </a>
        </Button>
      </div>
    </div>
  </section>
);
