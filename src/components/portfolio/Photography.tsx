import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X, ExternalLink } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
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

export const Photography = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex(i => (i === null ? i : (i - 1 + PHOTO_URLS.length) % PHOTO_URLS.length)),
    [],
  );
  const next = useCallback(
    () => setOpenIndex(i => (i === null ? i : (i + 1) % PHOTO_URLS.length)),
    [],
  );

  useEffect(() => {
    if (openIndex === null) return;
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
  }, [openIndex, close, prev, next]);

  return (
    <section id="photography" className="py-24 md:py-32 bg-muted/30 border-y border-border">
      <div className="container">
        <SectionHeading
          eyebrow="Through My Lens"
          title="Through My Lens"
          desc="A glimpse of the world as I see it."
        />

        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {PHOTO_URLS.map((url, i) => (
            <button
              key={url}
              onClick={() => setOpenIndex(i)}
              className="group relative overflow-hidden rounded-xl border border-border bg-background aspect-[4/5] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Open photo ${i + 1}`}
            >
              <img
                src={thumb(url)}
                alt={`Photography by Aman Gairola ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <Expand className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </button>
          ))}
        </div>

        <div className="reveal mt-10 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <a href="https://www.pexels.com/@amangairola/" target="_blank" rel="noopener noreferrer">
              View Full Gallery on Pexels
              <ExternalLink className="w-4 h-4 ml-1.5" />
            </a>
          </Button>
        </div>
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-in"
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
            src={full(PHOTO_URLS[openIndex])}
            alt={`Photograph ${openIndex + 1}`}
            onClick={e => e.stopPropagation()}
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-lg shadow-2xl animate-scale-in"
          />
        </div>
      )}
    </section>
  );
};