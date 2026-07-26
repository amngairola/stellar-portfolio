import { useEffect, useMemo, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const CHAPTERS = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/journey", label: "Journey" },
  { path: "/lens", label: "Lens" },
] as const;

export const ChapterLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const touchX = useRef<number | null>(null);

  const idx = useMemo(() => {
    const i = CHAPTERS.findIndex((c) => c.path === location.pathname);
    return i === -1 ? 0 : i;
  }, [location.pathname]);

  const next = CHAPTERS[(idx + 1) % CHAPTERS.length];
  const prev = CHAPTERS[(idx - 1 + CHAPTERS.length) % CHAPTERS.length];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      if (e.key === "ArrowRight") navigate(next.path);
      if (e.key === "ArrowLeft") navigate(prev.path);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, next.path, prev.path]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 80) return;
    navigate(dx < 0 ? next.path : prev.path);
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>

      <Footer />

      <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border">
          {CHAPTERS.map((c, i) => (
            <span
              key={c.path}
              aria-current={i === idx ? "page" : undefined}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/40"
              }`}
            />
          ))}
          <span className="ml-2 font-mono text-[10px] tracking-wider text-muted-foreground">
            {idx + 1} / {CHAPTERS.length}
          </span>
        </div>
        <button
          onClick={() => navigate(next.path)}
          aria-label={`Go to ${next.label}`}
          className="group inline-flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition"
        >
          <span>{next.label}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
