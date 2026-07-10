import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/portfolio";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "photography", label: "Photography" },
  { id: "contact", label: "Contact" },
];

export const Navbar = () => {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = links.map(l => document.getElementById(l.id));
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= y) {
          setActive(links[i].id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    if (!onHome) {
      navigate("/", { state: { scrollTo: id } });
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/70 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          onClick={() => onHome && window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <span className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground shadow-glow group-hover:scale-110 transition-transform">
            {personal.initials}
          </span>
          <span className="hidden sm:block font-display font-semibold">{personal.name}</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                onHome && active === l.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
          <Link
            to="/blogs"
            className={`px-3 py-2 text-sm rounded-md transition-colors ${
              location.pathname.startsWith("/blogs")
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Blogs
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-lg border border-border hover:border-primary/60 flex items-center justify-center transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Button asChild size="sm" className="hidden sm:inline-flex bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
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
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`text-left px-3 py-3 rounded-md ${
                  onHome && active === l.id ? "text-primary bg-muted" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
            <Link
              to="/blogs"
              onClick={() => setOpen(false)}
              className={`text-left px-3 py-3 rounded-md ${
                location.pathname.startsWith("/blogs") ? "text-primary bg-muted" : "text-muted-foreground"
              }`}
            >
              Blogs
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
