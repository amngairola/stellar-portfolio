import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "@/components/ui/tooltip-card";
import { Button } from "@/components/ui/button";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  TrendingUp,
  Award,
} from "lucide-react";
import { images } from "@/data/images";
// ... your other imports

const PHOTO_URLS = [
  "https://images.pexels.com/photos/32441908/pexels-photo-32441908.jpeg",
  "https://images.pexels.com/photos/33638024/pexels-photo-33638024.jpeg",
  "https://images.pexels.com/photos/32441927/pexels-photo-32441927.jpeg",
  "https://images.pexels.com/photos/32441921/pexels-photo-32441921.jpeg",
  "https://images.pexels.com/photos/33638021/pexels-photo-33638021.jpeg",
  "https://images.pexels.com/photos/33638020/pexels-photo-33638020.jpeg",
  "https://images.pexels.com/photos/35408529/pexels-photo-35408529.jpeg",
  "https://images.pexels.com/photos/32441917/pexels-photo-32441917.jpeg",
  "https://images.pexels.com/photos/32441931/pexels-photo-32441931.jpeg",
  "https://images.pexels.com/photos/38431412/pexels-photo-38431412.jpeg",
  "https://images.pexels.com/photos/38665212/pexels-photo-38665212.jpeg",
  "https://images.pexels.com/photos/35542972/pexels-photo-35542972.jpeg",
  "https://images.pexels.com/photos/35408532/pexels-photo-35408532.jpeg",
  "https://images.pexels.com/photos/33939424/pexels-photo-33939424.jpeg",
  "https://images.pexels.com/photos/30948442/pexels-photo-30948442.jpeg",
];

const thumb = (url: string) => `${url}?auto=compress&cs=tinysrgb&w=600`;
const full = (url: string) => `${url}?auto=compress&cs=tinysrgb&w=1920`;
const mod = (n: number, m: number) => ((n % m) + m) % m;

const useGalleryImages = () =>
  useQuery({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      await Promise.all(
        PHOTO_URLS.map(
          (url) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.onerror = () => resolve();
              img.src = thumb(url);
            })
        )
      );
      return PHOTO_URLS;
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const, delay: i * 0.04 },
  }),
};

const StatsRow = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
    {/* Card 1: Views Metric */}
    <Tooltip
      containerClassName="text-neutral-600 dark:text-neutral-400"
      content={<img src={images.pexels} />}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group relative flex flex-col justify-center rounded-2xl border border-border bg-card/40 backdrop-blur-md px-6 py-6 shadow-sm transition-all duration-300 hover:bg-card/80 hover:border-primary/40 hover:shadow-glow"
      >
        <div className="flex items-center gap-2 mb-3 text-primary">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-[0.15em] font-semibold">
            Global Reach
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-display font-bold text-4xl md:text-5xl tracking-tight text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-glow transition-all duration-500">
            506K+
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            views
          </span>
        </div>
      </motion.div>
    </Tooltip>
    {/* Card 2: Featured In (Spans 2 columns on desktop) */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: 0.1 }}
      className="md:col-span-2 relative flex flex-col justify-center rounded-2xl border border-border bg-card/40 backdrop-blur-md px-6 py-6 shadow-sm transition-all duration-300 hover:bg-card/80 hover:border-primary/40"
    >
      <div className="flex items-center gap-2 mb-4 text-primary">
        <Award className="w-4 h-4" />
        <span className="text-xs font-mono uppercase tracking-[0.15em] font-semibold">
          Published & Recognized
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Interactive Link Pill 1 */}
        <a
          href="https://www.ndtv.com/travel/webstories/uttarakhand-s-hidden-gems-where-you-can-escape-the-crowds-51971"
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-foreground/80 hover:text-foreground hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
        >
          <span>NDTV Travel</span>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover/link:text-primary transition-colors" />
        </a>

        {/* Interactive Link Pill 2 */}
        <a
          href="https://www.india.com/hindi-news/gallery-hindi/uttar-pradesh-facts-which-river-flow-near-ghaziabad-know-the-shocking-name-that-even-residence-dont-know-the-correct-answer-8074716/"
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-foreground/80 hover:text-foreground hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
        >
          <span>India.com</span>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover/link:text-primary transition-colors" />
        </a>
      </div>
    </motion.div>
  </div>
);

// Custom hook to handle responsive column counting in React
const useMasonryCols = () => {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 640) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else if (window.innerWidth < 1280) setCols(3);
      else setCols(4);
    };

    updateCols(); // Initial check
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return cols;
};

export const Photography = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { data: cachedUrls } = useGalleryImages();
  const urls = cachedUrls ?? PHOTO_URLS;
  const len = urls.length;

  const colCount = useMasonryCols();

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? 0 : mod(i + 1, len))),
    [len]
  );
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? 0 : mod(i - 1, len))),
    [len]
  );

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

  // Programmatically split the images into columns
  const columns = Array.from({ length: colCount }, () => [] as string[]);
  urls.forEach((url, i) => {
    columns[i % colCount].push(url);
  });

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

        {/* BULLETPROOF REACT MASONRY GRID */}
        <div className="flex w-full gap-4 md:gap-6 justify-center mx-auto">
          {columns.map((col, colIndex) => (
            <div
              key={colIndex}
              className="flex flex-col gap-4 md:gap-6 flex-1 min-w-0"
            >
              {col.map((url) => {
                // Find original index for the lightbox tracking
                const originalIndex = urls.indexOf(url);

                return (
                  <motion.div
                    key={url}
                    custom={originalIndex}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="group relative overflow-hidden rounded-2xl bg-muted shadow-sm cursor-pointer w-full"
                    onClick={() => setLightbox(originalIndex)}
                  >
                    <img
                      src={thumb(url)}
                      alt={`Photograph ${originalIndex + 1}`}
                      loading="lazy"
                      className="w-full h-auto block object-cover"
                    />
                    {/* Hover overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="pointer-events-none absolute bottom-2 left-3 font-mono text-[10px] text-white/0 group-hover:text-white/80 transition-colors duration-300">
                      {String(originalIndex + 1).padStart(2, "0")}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

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

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
