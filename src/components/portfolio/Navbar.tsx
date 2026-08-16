import { useEffect, useState } from "react";
import { Menu, X, Download, Settings, Check, Sun, Moon } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { personal } from "@/data/portfolio";
import { useTheme } from "@/hooks/useTheme";
import { prefetchBlogList } from "@/hooks/useBlogs";

const chapters = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/journey", label: "Journey" },
  { to: "/lens", label: "Lens" },
  { to: "/blogs", label: "Blogs" },
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
  homeGlow: [string, string, string];
};

const ACCENTS: AccentOption[] = [
  {
    name: "Porcelain",
    h: "30",
    s: "8",
    l: "90",
    glowH: "30",
    glowS: "8",
    glowL: "86",
    swatch: "#E8E6E3",
    homeGlow: ["30 8% 86%", "30 6% 80%", "40 10% 90%"],
  },
  {
    name: "Sky Blue",
    h: "214",
    s: "100",
    l: "74",
    glowH: "214",
    glowS: "88",
    glowL: "70",
    swatch: "#7DB7FF",
    homeGlow: ["214 80% 60%", "214 70% 54%", "210 30% 78%"],
  },
  {
    name: "Violet",
    h: "258",
    s: "90",
    l: "76",
    glowH: "258",
    glowS: "82",
    glowL: "72",
    swatch: "#A78BFA",
    homeGlow: ["258 70% 66%", "258 60% 60%", "250 30% 78%"],
  },
  {
    name: "Orange",
    h: "28",
    s: "88",
    l: "64",
    glowH: "28",
    glowS: "84",
    glowL: "62",
    swatch: "#F59A52",
    homeGlow: ["28 70% 55%", "32 60% 50%", "40 30% 78%"],
  },
  {
    name: "Mint",
    h: "160",
    s: "50",
    l: "66",
    glowH: "160",
    glowS: "46",
    glowL: "62",
    swatch: "#7DD3B0",
    homeGlow: ["160 50% 56%", "160 44% 52%", "160 28% 80%"],
  },
  {
    name: "Coral",
    h: "12",
    s: "80",
    l: "70",
    glowH: "12",
    glowS: "74",
    glowL: "66",
    swatch: "#F28C72",
    homeGlow: ["12 70% 60%", "14 60% 56%", "20 28% 78%"],
  },
  {
    name: "Amber",
    h: "44",
    s: "87",
    l: "66",
    glowH: "44",
    glowS: "80",
    glowL: "62",
    swatch: "#F4C95D",
    homeGlow: ["44 80% 58%", "40 70% 52%", "36 28% 80%"],
  },
];

const STORAGE_KEY = "accent-color";
const DEFAULT_ACCENT_NAME = "Orange";
const DEFAULT_ACCENT_INDEX = ACCENTS.findIndex((a) => a.name === DEFAULT_ACCENT_NAME);

export const Navbar = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accentIdx, setAccentIdx] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const aliases: Record<string, string> = {
      "Slate Blue": "Sky Blue",
      Gray: "Porcelain",
      Sage: "Mint",
      Sunset: "Coral",
    };
    const savedName = stored ? aliases[stored] ?? stored : "";
    const idx = savedName ? ACCENTS.findIndex((a) => a.name === savedName) : -1;
    return idx >= 0 ? idx : DEFAULT_ACCENT_INDEX;
  });
  const location = useLocation();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const a = ACCENTS[accentIdx];
    const root = document.documentElement;
    // Light theme needs darker, lower-saturation accents for contrast on off-white.
    const dim = (l: string, by: number) => Math.max(28, Number(l) - by);
    const desat = (s: string, by: number) => Math.max(5, Number(s) - by);
    const isLight = theme === "light";
    const l = isLight ? dim(a.l, 20) : a.l;
    const s = isLight ? desat(a.s, 25) : a.s;
    const gl = isLight ? dim(a.glowL, 16) : a.glowL;
    const gs = isLight ? desat(a.glowS, 25) : a.glowS;
    root.style.setProperty("--primary", `${a.h} ${s}% ${l}%`);
    root.style.setProperty("--primary-glow", `${a.glowH} ${gs}% ${gl}%`);
    root.style.setProperty("--accent", `${a.h} ${s}% ${l}%`);
    root.style.setProperty("--ring", `${a.h} ${s}% ${l}%`);
    // Keep gradients (stat numbers, gradient-text) tied to the chosen accent + theme.
    root.style.setProperty(
      "--gradient-primary",
      `linear-gradient(to right, hsl(${a.h} ${s}% ${l}%), hsl(${a.glowH} ${gs}% ${gl}%))`
    );
    root.style.setProperty("--home-glow-1", a.homeGlow[0]);
    root.style.setProperty("--home-glow-2", a.homeGlow[1]);
    root.style.setProperty("--home-glow-3", a.homeGlow[2]);
    localStorage.setItem(STORAGE_KEY, a.name);
  }, [accentIdx, theme]);

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
              onMouseEnter={() => {
                if (c.to === "/blogs") prefetchBlogList(queryClient);
              }}
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
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="icon-action w-11 h-11 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/60 flex items-center justify-center"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Popover>
            <PopoverTrigger asChild>
              <button
                aria-label="Color settings"
                className="icon-action w-11 h-11 rounded-lg border border-border hover:border-primary/60 hover:text-primary flex items-center justify-center"
              >
                <Settings className="w-4 h-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-60 p-3">
              <div className="text-xs font-medium text-muted-foreground mb-3 px-1">
                Accent color
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ACCENTS.map((a, i) => (
                  <button
                    key={a.name}
                    onClick={() => setAccentIdx(i)}
                    className={`flex min-h-[44px] items-center gap-2 rounded-lg border px-2.5 py-2 text-sm transition-all duration-200 active:scale-95 ${
                      accentIdx === i
                        ? "border-primary/80 bg-primary/15 text-foreground"
                        : "border-border text-foreground/75 hover:text-foreground hover:border-primary/40"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 ring-1 ring-black/10"
                      style={{ background: a.swatch }}
                    />
                    {a.name}
                    {accentIdx === i && <Check className="w-3.5 h-3.5 ml-auto text-primary" />}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex min-h-[44px] bg-primary text-primary-foreground transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
          >
            <a href={personal.resumeUrl} download>
              <Download className="w-4 h-4 mr-1.5" /> Resume
            </a>
          </Button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="icon-action md:hidden w-11 h-11 rounded-lg border border-border flex items-center justify-center"
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
                  `min-h-[44px] flex items-center text-left px-3 py-3 rounded-md transition-colors duration-200 active:bg-muted ${
                    isActive ? "text-primary bg-muted" : "text-muted-foreground"
                  }`
                }
              >
                {c.label}
              </NavLink>
            ))}
            <div className="mt-2">
              <a
                href={personal.resumeUrl}
                download
                className="icon-action min-h-[44px] flex items-center justify-center gap-1.5 rounded-md bg-primary text-primary-foreground text-sm"
              >
                <Download className="w-4 h-4" /> Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
