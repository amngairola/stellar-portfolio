import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/portfolio";

const chapters = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/journey", label: "Journey" },
  { to: "/lens", label: "Lens" },
];

export const Navbar = () => {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <span className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center font-display font-bold text-primary-foreground group-hover:scale-105 transition-transform">
            {personal.initials}
          </span>
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
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-lg border border-border hover:border-primary/60 flex items-center justify-center transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Button asChild size="sm" className="hidden sm:inline-flex bg-primary text-primary-foreground hover:opacity-90">
            <a href={personal.resumeUrl} download>
              <Download className="w-4 h-4 mr-1.5" /> Resume
            </a>
          </Button>
          <button
            onClick={() => setOpen(o => !o)}
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
