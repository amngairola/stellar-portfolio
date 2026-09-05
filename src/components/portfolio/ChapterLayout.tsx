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
  { path: "/blogs", label: "Blogs" },
] as const;

export const ChapterLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const idx = useMemo(() => {
    const exact = CHAPTERS.findIndex((c) => c.path === location.pathname);
    if (exact !== -1) return exact;
    if (location.pathname.startsWith("/blogs")) {
      return CHAPTERS.findIndex((c) => c.path === "/blogs");
    }
    return 0;
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

  const touch = useRef<{ x: number; y: number; t: number } | null>(null);

  useEffect(() => {
    const MIN_DIST = 60;
    const RATIO = 2;
    const MAX_TIME = 500;

    const isInteractive = (el: EventTarget | null) => {
      const node = el as HTMLElement | null;
      return !!node?.closest?.(
        "input, textarea, select, [contenteditable='true'], [data-no-swipe], [role='slider']"
      );
    };

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1 || isInteractive(e.target)) {
        touch.current = null;
        return;
      }
      const t = e.touches[0];
      touch.current = { x: t.clientX, y: t.clientY, t: Date.now() };
    };

    const onEnd = (e: TouchEvent) => {
      const start = touch.current;
      touch.current = null;
      if (!start) return;
      const t = e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      const dt = Date.now() - start.t;
      if (dt > MAX_TIME) return;
      if (Math.abs(dx) < MIN_DIST) return;
      if (Math.abs(dx) <= Math.abs(dy) * RATIO) return;
      navigate(dx < 0 ? next.path : prev.path);
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    window.addEventListener("touchcancel", () => (touch.current = null), { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [navigate, next.path, prev.path]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

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
