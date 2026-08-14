import { useEffect, useState } from "react";
import { Menu, X, Download, Settings, Check, Sun, Moon } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { personal } from "@/data/portfolio";
import { useTheme } from "@/hooks/useTheme";

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
};

const ACCENTS: AccentOption[] = [
  {
    name: "Porcelain",
    h: "240",
    s: "8",
    l: "88",
    glowH: "240",
    glowS: "6",
    glowL: "80",
    swatch: "#E2E2E7",
  },
  {
    name: "Slate Blue",
    h: "222",
    s: "38",
    l: "68",
    glowH: "228",
    glowS: "34",
    glowL: "72",
    swatch: "#8FA3C8",
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
    s: "58",
    l: "62",
    glowH: "22",
    glowS: "56",
    glowL: "64",
    swatch: "#D98E5A",
  },
  {
    name: "Sage",
    h: "152",
    s: "26",
    l: "60",
    glowH: "160",
    glowS: "28",
    glowL: "64",
    swatch: "#88AEA2",
  },
  {
    name: "Sunset",
    h: "26",
    s: "48",
    l: "62",
    glowH: "20",
    glowS: "52",
    glowL: "64",
    swatch: "#CE8A6A",
  },
];

const STORAGE_KEY = "accent-color";
const ORANGE_INDEX = ACCENTS.findIndex((a) => a.name === "Orange");

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accentIdx, setAccentIdx] = useState(() => ORANGE_INDEX);
  const location = useLocation();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const idx = stored ? ACCENTS.findIndex((a) => a.name === stored) : -1;
    setAccentIdx(idx >= 0 ? idx : ORANGE_INDEX);
  }, []);

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
