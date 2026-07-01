import { ExternalLink, Briefcase, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/button";
import { BrowserMockup } from "./BrowserMockup";

const karigari = {
  name: "Shilp",
  tagline: "Custom Websites That Bring Customers to Your Business",
  description:
    "Shilp is my freelance web studio where I design and develop high-converting custom websites for local businesses and personal brands — including cafes, hotels, salons, gyms, and restaurants. Every site is built mobile-first, SEO-ready, and optimized for real business outcomes like leads and customer walk-ins.",
  offerings: [
    "Custom website design and development for local businesses",
    "Mobile-first, SEO-optimized builds",
    "Fast delivery and clean, maintainable code",
    "Tailored solutions for cafes, hotels, salons, gyms, restaurants, and personal brands",
  ],
  stack: ["React.js", "Node.js", "NoSQL", "SQL", "Vercel"],
  live: "https://shilp-web.vercel.app",
};

export const Freelance = () => (
  <section id="freelance" className="py-24 md:py-32 relative">
    <div
      aria-hidden
      className="absolute inset-0 -z-10 opacity-60"
      style={{
        background:
          "radial-gradient(800px circle at 50% 0%, hsl(var(--secondary) / 0.08), transparent 60%)",
      }}
    />
    <div className="container">
      <SectionHeading
        eyebrow="04 — Freelance"
        title="Ventures I run."
        desc="Live businesses I've founded and ship under my own brand."
      />
      <div className="reveal relative overflow-hidden rounded-2xl border border-secondary/30 bg-gradient-to-br from-secondary/[0.04] via-card to-card p-6 md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
        />
        <div className="relative grid lg:grid-cols-10 gap-8">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/30">
                <Sparkles className="w-3 h-3" /> Live Business
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                <Briefcase className="w-3 h-3" /> Founder & Developer
              </span>
            </div>
            <div>
              <h3 className="font-display font-bold text-2xl md:text-3xl mb-2">
                {karigari.name}
              </h3>
              <div className="text-muted-foreground">{karigari.tagline}</div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {karigari.description}
            </p>
            <div className="rounded-xl border border-border bg-surface/60 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-secondary mb-3">
                What I offer
              </div>
              <ul className="space-y-2 text-sm">
                {karigari.offerings.map((o) => (
                  <li key={o} className="flex gap-2 text-muted-foreground">
                    <span className="text-secondary mt-1">▸</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {karigari.stack.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary/10 text-secondary border border-secondary/20"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-3 pt-1">
              <Button
                asChild
                size="sm"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                <a href={karigari.live} target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1.5" /> Visit
                </a>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-4">
            <a
              href={karigari.live}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Karigari in a new tab"
              className="block cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <BrowserMockup
                sites={[
                  {
                    url: karigari.live.replace(/^https?:\/\//, ""),
                    src: karigari.live,
                    label: karigari.name,
                  },
                ]}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
