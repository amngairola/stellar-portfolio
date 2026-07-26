import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHOTO_URLS = [
  "https://images.pexels.com/photos/32441917/pexels-photo-32441917.jpeg",
  "https://images.pexels.com/photos/30948494/pexels-photo-30948494.jpeg",
  "https://images.pexels.com/photos/30948466/pexels-photo-30948466.jpeg",
  "https://images.pexels.com/photos/33016619/pexels-photo-33016619.jpeg",
  "https://images.pexels.com/photos/35408532/pexels-photo-35408532.jpeg",
  "https://images.pexels.com/photos/33638021/pexels-photo-33638021.jpeg",
  "https://images.pexels.com/photos/38665212/pexels-photo-38665212.jpeg",
  "https://images.pexels.com/photos/33638020/pexels-photo-33638020.jpeg",
  "https://images.pexels.com/photos/35408529/pexels-photo-35408529.jpeg",
  "https://images.pexels.com/photos/33638024/pexels-photo-33638024.jpeg",
  "https://images.pexels.com/photos/32441931/pexels-photo-32441931.jpeg",
  "https://images.pexels.com/photos/32441921/pexels-photo-32441921.jpeg",
];

const thumb = (url: string) => `${url}?auto=compress&cs=tinysrgb&w=800`;
const full = (url: string) => `${url}?auto=compress&cs=tinysrgb&w=1920`;

const mod = (n: number, m: number) => ((n % m) + m) % m;

export const Photography = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const len = PHOTO_URLS.length;

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => setLightbox(i => (i === null ? 0 : mod(i + 1, len))), [len]);
  const prev = useCallback(() => setLightbox(i => (i === null ? 0 : mod(i - 1, len))), [len]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, prev, next]);

  return (
    <section id="photography" className="relative py-24 md:py-32 bg-surface">
      <div className="container">
        <div className="reveal max-w-2xl mb-14 md:mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
            Through My Lens
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
            Uttarakhand, and elsewhere
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            Frames from home — streets, mountains, moments. Twelve shots, no carousel, just the roll.
          </p>
        </div>

        <div className="reveal columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 [column-fill:_balance]">
          {PHOTO_URLS.map((url, i) => (
            <button
              key={url}
              onClick={() => setLightbox(i)}
              aria-label={`Open photo ${i + 1}`}
              className="group relative block w-full mb-3 md:mb-4 overflow-hidden rounded-xl border border-border bg-card break-inside-avoid focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-transform duration-300 hover:-translate-y-1"
              style={{
                animation: "fade-in 0.5s ease-out both",
                animationDelay: `${i * 50}ms`,
              }}
            >
              <img
                src={thumb(url)}
                alt={`Photograph ${i + 1}`}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors" />
              <div className="pointer-events-none absolute bottom-2 left-2 font-mono text-[10px] text-foreground/0 group-hover:text-foreground/60 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </div>
            </button>
          ))}
        </div>

        <div className="reveal mt-14 flex justify-center">
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-foreground/80 hover:text-foreground hover:bg-muted border border-border"
          >
            <a
              href="https://www.pexels.com/@amangairola/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full Gallery on Pexels →
            </a>
          </Button>
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={e => { e.stopPropagation(); close(); }}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-3 md:left-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-3 md:right-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <img
            src={full(PHOTO_URLS[lightbox])}
            alt={`Photograph ${lightbox + 1}`}
            onClick={e => e.stopPropagation()}
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-lg"
            style={{ animation: "scale-in 0.25s var(--transition-smooth) both" }}
          />
        </div>
      )}
    </section>
  );
};
