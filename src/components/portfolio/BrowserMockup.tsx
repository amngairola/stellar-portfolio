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
  baseWidth?: number;
};

export const BrowserMockup = ({
  sites,
  interval = 5000,
  showLabelBadge = true,
  className = "",
  baseWidth = 1280,
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
            <div
              key={s.src}
              className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <iframe
                src={s.src}
                title={s.label}
                loading="lazy"
                style={{
                  width: `${baseWidth}px`,
                  height: `${baseWidth * (10 / 16)}px`,
                  transform: `scale(var(--bm-scale, 1))`,
                  transformOrigin: "top left",
                  pointerEvents: "none",
                  border: 0,
                }}
              />
            </div>
          ))}
          <ScaleSetter baseWidth={baseWidth} />
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

const ScaleSetter = ({ baseWidth }: { baseWidth: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const update = () => {
      const w = parent.clientWidth;
      parent.style.setProperty("--bm-scale", String(w / baseWidth));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [baseWidth]);
  return <div ref={ref} className="hidden" />;
};