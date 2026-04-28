export const SectionHeading = ({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) => (
  <div className="reveal max-w-2xl mb-12">
    <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">{eyebrow}</div>
    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">{title}</h2>
    {desc && <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">{desc}</p>}
  </div>
);
