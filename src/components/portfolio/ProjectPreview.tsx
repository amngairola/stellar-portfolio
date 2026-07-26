type Props = {
  url: string;
  label: string;
  screenshot?: string;
  className?: string;
};

const thumb = (url: string) => `${url}?auto=compress&cs=tinysrgb&w=800`;

const SCREENSHOTS: Record<string, string> = {
  "rebaaar.vercel.app": "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg",
  "taskm-amangairola.vercel.app": "https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg",
  "collabb.vercel.app": "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
  "trackr-io.vercel.app": "https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg",
  "yapiing.vercel.app": "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg",
  "shilp-web.vercel.app": "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg",
};

export const ProjectPreview = ({ url, label, className = "" }: Props) => {
  const screenshot = SCREENSHOTS[url];
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border bg-card ${className}`}>
      <div className="flex items-center gap-2 border-b border-border bg-surface/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <div className="ml-3 flex-1 truncate rounded-md bg-background/60 px-3 py-1 text-center text-xs font-mono text-muted-foreground">
          {url}
        </div>
      </div>
      <div className="relative aspect-[16/10] bg-surface">
        {screenshot ? (
          <img
            src={thumb(screenshot)}
            alt={label}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm font-mono">
            {label}
          </div>
        )}
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-mono backdrop-blur">
          {label}
        </div>
      </div>
    </div>
  );
};
