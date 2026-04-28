import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { personal } from "@/data/portfolio";

export const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground">
        Built by <span className="text-foreground font-medium">{personal.name}</span> · © {new Date().getFullYear()}
      </div>
      <div className="flex items-center gap-2">
        <a href={`mailto:${personal.email}`} className="w-9 h-9 rounded-lg border border-border hover:border-primary/60 hover:text-primary flex items-center justify-center transition-colors" aria-label="Email">
          <Mail className="w-4 h-4" />
        </a>
        <a href={personal.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg border border-border hover:border-primary/60 hover:text-primary flex items-center justify-center transition-colors" aria-label="LinkedIn">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href={personal.github} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg border border-border hover:border-primary/60 hover:text-primary flex items-center justify-center transition-colors" aria-label="GitHub">
          <Github className="w-4 h-4" />
        </a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-9 h-9 rounded-lg bg-gradient-primary text-primary-foreground hover:opacity-90 flex items-center justify-center transition-opacity" aria-label="Back to top">
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  </footer>
);
