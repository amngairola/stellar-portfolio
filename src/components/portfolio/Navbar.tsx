import { useEffect, useState } from "react";
import { Menu, X, Download, Settings, Check } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { personal } from "@/data/portfolio";

const chapters = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/journey", label: "Journey" },
  { to: "/lens", label: "Lens" },
];

type AccentOption = {
  name: string;
  h: string;
  s: string;
  l: string;
  glowH: string;
  glowS: string;
  glowL: string;
  swatch: string;
};

const ACCENTS: AccentOption[] = [
  {
    name: "Blue",
    h: "225",
    s: "100",
    l: "65",
    glowH: "234",
    glowS: "100",
    glowL: "68",
    swatch: "#4F7CFF",
  },
  {
    name: "Gray",
    h: "240",
    s: "5",
    l: "65",
    glowH: "240",
    glowS: "5",
    glowL: "72",
    swatch: "#A1A1AA",
  },
  {
    name: "Orange",
    h: "28",
    s: "92",
    l: "58",
    glowH: "22",
    glowS: "95",
    glowL: "62",
    swatch: "#F97316",
  },
  {
    name: "Sage",
    h: "152",
    s: "45",
    l: "55",
    glowH: "160",
    glowS: "50",
    glowL: "60",
    swatch: "#4FB39E",
  },
  {
    name: "Sunset",
    h: "26",
    s: "72",
    l: "58",
    glowH: "20",
    glowS: "80",
    glowL: "62",
    swatch: "#E07040",
  },
];

const STORAGE_KEY = "accent-color";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accentIdx, setAccentIdx] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const idx = ACCENTS.findIndex((a) => a.name === stored);
      if (idx >= 0) setAccentIdx(idx);
    }
  }, []);

  useEffect(() => {
    const a = ACCENTS[accentIdx];
    const root = document.documentElement;
    root.style.setProperty("--primary", `${a.h} ${a.s}% ${a.l}%`);
    root.style.setProperty("--primary-glow", `${a.glowH} ${a.glowS}% ${a.glowL}%`);
    root.style.setProperty("--accent", `${a.h} ${a.s}% ${a.l}%`);
    root.style.setProperty("--ring", `${a.h} ${a.s}% ${a.l}%`);
    localStorage.setItem(STORAGE_KEY, a.name);
  }, [accentIdx]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/70 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Home">
          <img
            src="https://res.cloudinary.com/dwr8n8zpl/image/upload/v1782545426/gj7lfbwmfwzmnjrleo33.png"
            alt="Aman Gairola"
            className="w-9 h-9 rounded-lg object-cover group-hover:scale-105 transition-transform"
          />
          <span className="hidden sm:block font-display font-semibold">{personal.name}</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {chapters.map((c) => (
            <NavLink
              key={c.to}
              to={c.to}
              end={c.to === "/"}
              className={({ isActive }) =>
                `relative px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {c.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <button
                aria-label="Color settings"
                className="w-10 h-10 rounded-lg border border-border hover:border-primary/60 flex items-center justify-center transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-3">
              <div className="text-xs font-medium text-muted-foreground mb-3 px-1">
                Accent color
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ACCENTS.map((a, i) => (
                  <button
                    key={a.name}
                    onClick={() => setAccentIdx(i)}
                    className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-sm transition-colors ${
                      accentIdx === i
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0"
                      style={{ background: a.swatch }}
                    />
                    {a.name}
                    {accentIdx === i && <Check className="w-3.5 h-3.5 ml-auto text-primary" />}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Button asChild size="sm" className="hidden sm:inline-flex bg-primary text-primary-foreground hover:opacity-90">
            <a href={personal.resumeUrl} download>
              <Download className="w-4 h-4 mr-1.5" /> Resume
            </a>
          </Button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="md:hidden w-10 h-10 rounded-lg border border-border flex items-center justify-center"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border animate-fade-in">
          <div className="container py-4 flex flex-col gap-1">
            {chapters.map((c) => (
              <NavLink
                key={c.to}
                to={c.to}
                end={c.to === "/"}
                className={({ isActive }) =>
                  `text-left px-3 py-3 rounded-md ${
                    isActive ? "text-primary bg-muted" : "text-muted-foreground"
                  }`
                }
              >
                {c.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
