import { useEffect, useState } from "react";

export type PreviewSite = {
  url: string;
  src: string;
  label: string;
};

type Props = {
  sites: PreviewSite[];
  interval?: number;
  showLabelBadge?: boolean;
  className?: string;
};

export const BrowserMockup = ({
  sites,
  interval = 5000,
  showLabelBadge = true,
  className = "",
}: Props) => {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (sites.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % sites.length), interval);
    return () => clearInterval(t);
  }, [sites.length, interval]);

  const active = sites[i] ?? sites[0];
  if (!active) return null;

  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-primary opacity-20 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-glow">
        <div className="flex items-center gap-2 border-b border-border bg-surface/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <div className="ml-3 flex-1 truncate rounded-md bg-background/60 px-3 py-1 text-center text-xs font-mono text-muted-foreground">
            {active.url}
          </div>
        </div>
        <div className="relative aspect-[16/10] bg-background">
          {sites.map((s, idx) => (
            <iframe
              key={s.src}
              src={s.src}
              title={s.label}
              loading="lazy"
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
              style={{ pointerEvents: "none" }}
            />
          ))}
          {showLabelBadge && (
            <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-mono backdrop-blur">
              {active.label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};