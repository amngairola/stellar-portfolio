import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHOTO_URLS = [
  "https://images.pexels.com/photos/32441917/pexels-photo-32441917.jpeg",
  "https://images.pexels.com/photos/30948494/pexels-photo-30948494.jpeg",
  "https://images.pexels.com/photos/30948466/pexels-photo-30948466.jpeg",
  "https://images.pexels.com/photos/33016619/pexels-photo-33016619.jpeg",
  "https://images.pexels.com/photos/35408532/pexels-photo-35408532.jpeg",
  "https://images.pexels.com/photos/33638021/pexels-photo-33638021.jpeg",
];

const thumb = (url: string) => `${url}?auto=compress&cs=tinysrgb&w=800`;
const full = (url: string) => `${url}?auto=compress&cs=tinysrgb&w=1920`;

const mod = (n: number, m: number) => ((n % m) + m) % m;

export const Photography = () => {
  const [center, setCenter] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const len = PHOTO_URLS.length;
  const next = useCallback(() => setCenter(c => mod(c + 1, len)), [len]);
  const prev = useCallback(() => setCenter(c => mod(c - 1, len)), [len]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, prev, next]);

  // Offset -2,-1,0,1,2 relative to center
  const slots = [-2, -1, 0, 1, 2];

  const styleForOffset = (o: number): React.CSSProperties => {
    const abs = Math.abs(o);
    // Sizes: center 500, next 260, far 200 (responsive via CSS vars)
    const size = abs === 0 ? "var(--ph-c)" : abs === 1 ? "var(--ph-m)" : "var(--ph-s)";
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.55 : 0.35;
    const scale = abs === 0 ? 1 : abs === 1 ? 0.92 : 0.82;
    // horizontal offset from center in px (accumulated)
    // spacing between adjacent slots
    const gapMid = "calc((var(--ph-c) + var(--ph-m)) / 2 + 16px)";
    const gapOuter = "calc(var(--ph-m) + 24px)";
    let tx = "0px";
    if (o === -1) tx = `calc(-1 * ${gapMid})`;
    else if (o === 1) tx = gapMid;
    else if (o === -2) tx = `calc(-1 * ${gapMid} - ${gapOuter})`;
    else if (o === 2) tx = `calc(${gapMid} + ${gapOuter})`;
    return {
      width: size,
      height: size,
      opacity,
      transform: `translate(-50%, -50%) translateX(${tx}) scale(${scale})`,
      zIndex: 10 - abs,
    };
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section
      id="photography"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Film grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay z-[1]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="container relative z-[2]">
        <div className="reveal max-w-2xl mb-14 md:mb-16 text-center mx-auto">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
            Through My Lens
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
            Through My Lens
          </h2>
          <p className="mt-4 text-white/60 text-base md:text-lg leading-relaxed">
            Streets. Nature. Moments.
          </p>
        </div>

        <div
          className="reveal relative mx-auto select-none"
          style={{
            // Responsive sizes via CSS vars
            ["--ph-c" as any]: "min(500px, 70vw)",
            ["--ph-m" as any]: "min(240px, 34vw)",
            ["--ph-s" as any]: "min(180px, 26vw)",
            height: "min(520px, 74vw)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {slots.map(o => {
            const idx = mod(center + o, len);
            const isCenter = o === 0;
            return (
              <button
                key={o}
                onClick={() => {
                  if (isCenter) setLightbox(true);
                  else if (o < 0) prev();
                  else next();
                }}
                aria-label={isCenter ? "Open photo fullscreen" : o < 0 ? "Previous" : "Next"}
                className="absolute top-1/2 left-1/2 overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{
                  ...styleForOffset(o),
                  transition:
                    "transform 400ms ease-in-out, opacity 400ms ease-in-out, width 400ms ease-in-out, height 400ms ease-in-out, box-shadow 400ms ease-in-out",
                  boxShadow: isCenter
                    ? "0 20px 60px rgba(255,180,50,0.15), 0 0 0 1px rgba(255,255,255,0.06)"
                    : "0 8px 24px rgba(0,0,0,0.4)",
                  cursor: isCenter ? "zoom-in" : "pointer",
                }}
              >
                <img
                  src={thumb(PHOTO_URLS[idx])}
                  alt={`Photograph ${idx + 1}`}
                  draggable={false}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.25} />
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.25} />
          </button>
        </div>

        <div className="reveal mt-14 flex justify-center">
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-white/80 hover:text-white hover:bg-white/5 border border-white/15"
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

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-in"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={e => { e.stopPropagation(); setLightbox(false); }}
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
            src={full(PHOTO_URLS[center])}
            alt={`Photograph ${center + 1}`}
            onClick={e => e.stopPropagation()}
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-lg shadow-2xl animate-scale-in"
          />
        </div>
      )}
    </section>
  );
};