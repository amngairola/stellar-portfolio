import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Tooltip } from "@/components/ui/tooltip-card";

import { personal } from "@/data/portfolio";
import { images } from "@/data/images";

export const Footer = () => (
  <footer className="border-t border-border py-10 pb-28 md:pb-32 relative z-20">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground">
        Built by <span className="text-foreground font-medium">{personal.name}</span> · ©{" "}
        {new Date().getFullYear()}
        <span className="block sm:inline sm:ml-1 text-muted-foreground">
          Copyright © {new Date().getFullYear()} · All rights reserved.
        </span>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={`mailto:${personal.email}`}
          className="icon-action w-11 h-11 rounded-lg border border-border text-muted-foreground hover:border-primary/60 hover:text-primary flex items-center justify-center"
          aria-label="Email"
        >
          <Mail className="w-4 h-4" />
        </a>
        <Tooltip
          containerClassName="text-neutral-600 dark:text-neutral-400"
          content={<img src={images.linkdin} />}
        >
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="icon-action w-11 h-11 rounded-lg border border-border text-muted-foreground [@media(hover:hover)]:hover:border-primary/60 [@media(hover:hover)]:hover:text-primary flex items-center justify-center"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </Tooltip>

        <Tooltip
          containerClassName="text-neutral-600 dark:text-neutral-400"
          content={<img src={images.x} />}
        >
          <a
            href={personal.xUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="x.com"
            className="icon-action grid h-11 w-11 place-items-center rounded-lg border border-border text-muted-foreground [@media(hover:hover)]:hover:border-primary/60 [@media(hover:hover)]:hover:text-primary"
          >
            <FaXTwitter className="w-5 h-5" />
          </a>
        </Tooltip>

        <Tooltip
          containerClassName="text-neutral-600 dark:text-neutral-400"
          content={<img src={images.git} />}
        >
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="icon-action w-11 h-11 rounded-lg border border-border text-muted-foreground [@media(hover:hover)]:hover:border-primary/60 [@media(hover:hover)]:hover:text-primary flex items-center justify-center"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </Tooltip>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="icon-action w-11 h-11 rounded-lg bg-gradient-primary text-primary-foreground hover:opacity-90 flex items-center justify-center"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  </footer>
);
