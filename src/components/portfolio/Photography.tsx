import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

const thumb = (url: string) => `${url}?auto=compress&cs=tinysrgb&w=600`;
const full = (url: string) => `${url}?auto=compress&cs=tinysrgb&w=1920`;

const mod = (n: number, m: number) => ((n % m) + m) % m;

const useGalleryImages = () =>
  useQuery({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const results = await Promise.all(
        PHOTO_URLS.map(
          (url) =>
            new Promise<string>((resolve) => {
              const img = new Image();
              img.onload = () => resolve(url);
              img.onerror = () => resolve(url);
              img.src = thumb(url);
            })
        )
      );
      return results;
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const StatsRow = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-lg">
    <Card className="p-5 flex items-center gap-4 border-border shadow-sm">
      <span className="font-display font-bold text-3xl gradient-text leading-none">506k+</span>
      <span className="text-sm text-muted-foreground leading-tight">Total Views</span>
    </Card>
    <Card className="p-5 flex flex-col gap-2 border-border shadow-sm">
      <span className="text-sm text-muted-foreground">Featured In</span>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        <a
          href="https://www.ndtv.com/travel/webstories/uttarakhand-s-hidden-gems-where-you-can-escape-the-crowds-51971"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-glow transition-colors"
        >
          ndtv.com <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href="https://www.india.com/hindi-news/gallery-hindi/uttar-pradesh-facts-which-river-flow-near-ghaziabad-know-the-shocking-name-that-even-residence-dont-know-the-correct-answer-8074716/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-glow transition-colors"
        >
          india.com <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </Card>
  </div>
);

export const Photography = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { data: cachedUrls } = useGalleryImages();
  const urls = cachedUrls ?? PHOTO_URLS;
  const len = urls.length;

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => setLightbox((i) => (i === null ? 0 : mod(i + 1, len))), [len]);
  const prev = useCallback(() => setLightbox((i) => (i === null ? 0 : mod(i - 1, len))), [len]);

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

  const breakpointConfig = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <section id="photography" className="relative py-20 md:py-24 bg-surface">
      <div className="container">
        <div className="reveal max-w-2xl mb-10">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
            Through My Lens
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
            Uttarakhand, and elsewhere
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            Every photo, a feeling frozen in time
          </p>
        </div>

        <StatsRow />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout
        >
          <Masonry
            breakpointCols={breakpointConfig}
            className="flex gap-5 md:gap-6"
            columnClassName="flex flex-col gap-5 md:gap-6"
          >
            {urls.map((url, i) => (
              <motion.div
                key={url}
                variants={cardVariants}
                layout
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Card
                  className="group relative overflow-hidden rounded-xl border-border p-0 cursor-pointer shadow-sm hover:shadow-glow transition-shadow duration-300"
                  onClick={() => setLightbox(i)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={thumb(url)}
                      alt={`Photograph ${i + 1}`}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="pointer-events-none absolute bottom-2 left-2 font-mono text-[10px] text-foreground/0 group-hover:text-foreground/70 transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </Masonry>
        </motion.div>

        <div className="reveal mt-12 flex justify-center">
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
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 md:left-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 md:right-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <img
            src={full(urls[lightbox])}
            alt={`Photograph ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-lg"
          />
        </div>
      )}
    </section>
  );
};
