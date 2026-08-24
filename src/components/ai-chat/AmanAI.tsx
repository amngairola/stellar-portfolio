import { lazy, Suspense, useState } from "react";

// Code-split: the chat panel (markdown renderer, history logic, etc.) only
// loads when the visitor opens the assistant. The floating button stays tiny.
const ChatPanel = lazy(() => import("./ChatPanel"));

export const AI_AVATAR =
  "https://res.cloudinary.com/dwr8n8zpl/image/upload/v1787580503/czitvkxvywznsb6wfjuq.png";

export const AmanAI = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <Suspense fallback={null}>
          <ChatPanel onClose={() => setOpen(false)} />
        </Suspense>
      )}

      <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`hidden md:block px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-md border border-border text-xs font-medium text-muted-foreground transition-opacity duration-200 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        >
          Talk to Aman AI
        </span>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close Talk to Aman AI" : "Talk to Aman AI"}
          aria-expanded={open}
          className="icon-action relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40 shadow-glow bg-card hover:border-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img
            src={AI_AVATAR}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
        </button>
      </div>
    </>
  );
};
