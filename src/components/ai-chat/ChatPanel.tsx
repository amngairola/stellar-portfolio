import { useEffect, useRef, useState } from "react";
import { RotateCcw, Send, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { AI_AVATAR } from "./AmanAI";

type Msg = { role: "user" | "assistant"; content: string };

const SESSION_KEY = "aman-ai-session";

const getSessionId = () => {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
};

const SUGGESTIONS = [
  "What is Aman's tech stack?",
  "Tell me about his best project.",
  "What has he done professionally?",
  "How can I contact him?",
];

const call = async (body: Record<string, unknown>) => {
  const { data, error } = await supabase.functions.invoke("aman-ai-chat", {
    body: { ...body, sessionId: getSessionId() },
  });
  if (error) throw error;
  return data as { messages?: Msg[]; message?: Msg; error?: string };
};

const ChatPanel = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    call({ action: "history" })
      .then((d) => setMessages(d.messages ?? []))
      .catch(() => void 0);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, busy]);

  const send = async (text: string) => {
    const msg = text.trim();
    if (!msg || busy) return;
    setInput("");
    setError(null);
    setMessages((m) => [...m, { role: "user", content: msg }]);
    setBusy(true);
    try {
      const d = await call({ action: "chat", message: msg });
      if (d.error) setError(d.error);
      else if (d.message) setMessages((m) => [...m, d.message as Msg]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    setBusy(true);
    try {
      await call({ action: "reset" });
      setMessages([]);
      setError(null);
    } catch {
      setError("Could not start a new chat.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Talk to Aman AI"
      className="fixed inset-x-3 bottom-24 z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-xl sm:inset-x-auto sm:right-5 sm:w-[380px] md:right-8 md:bottom-28 animate-fade-in"
    >
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <img src={AI_AVATAR} alt="" className="h-8 w-8 rounded-full object-cover" />
        <div className="min-w-0">
          <div className="text-sm font-medium">Aman AI</div>
          <div className="text-[11px] text-muted-foreground">Ask about my work</div>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={reset}
            aria-label="Start a new chat"
            className="icon-action flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="icon-action flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Hi! I can answer questions about Aman's skills, projects and experience.
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
              m.role === "user"
                ? "ml-auto bg-primary/15 text-foreground"
                : "bg-muted text-foreground"
            }`}
          >
            {m.role === "assistant" ? (
              <div className="chat-md">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            ) : (
              m.content
            )}
          </div>
        ))}

        {busy && (
          <div className="text-xs text-muted-foreground">Aman AI is typing…</div>
        )}
        {error && <div className="text-xs text-destructive">{error}</div>}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-border p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something…"
          maxLength={1200}
          className="min-h-[44px] flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-primary/60"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Send message"
          className="icon-action flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
