import { createClient } from "npm:@supabase/supabase-js@2";
import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible";
import { generateText } from "npm:ai";
import { SYSTEM_PROMPT } from "./knowledge.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const MAX_MESSAGE_LENGTH = 1200;
const HISTORY_LIMIT = 20;
const RATE_LIMIT_MAX = 10; // user messages per minute per session
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json().catch(() => null);
    const sessionId = typeof body?.sessionId === "string" ? body.sessionId : "";
    if (!UUID_RE.test(sessionId)) return json({ error: "Invalid session" }, 400);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Latest conversation for this anonymous session
    const { data: convo } = await supabase
      .from("ai_conversations")
      .select("id")
      .eq("session_id", sessionId)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const action = typeof body?.action === "string" ? body.action : "chat";

    // ── History: restore the most recent conversation ──────────────────
    if (action === "history") {
      if (!convo) return json({ conversationId: null, messages: [] });
      const { data: msgs } = await supabase
        .from("ai_messages")
        .select("role, content")
        .eq("conversation_id", convo.id)
        .order("created_at", { ascending: false })
        .limit(HISTORY_LIMIT);
      return json({ conversationId: convo.id, messages: (msgs ?? []).reverse() });
    }

    // ── Reset: start a fresh conversation ──────────────────────────────
    if (action === "reset") {
      const { data: created, error } = await supabase
        .from("ai_conversations")
        .insert({ session_id: sessionId })
        .select("id")
        .single();
      if (error || !created) {
        console.error("reset error", error);
        return json({ error: "Could not start a new conversation" }, 500);
      }
      return json({ conversationId: created.id, messages: [] });
    }

    // ── Chat ───────────────────────────────────────────────────────────
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    if (!message) return json({ error: "Message cannot be empty" }, 400);
    if (message.length > MAX_MESSAGE_LENGTH)
      return json(
        { error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters)` },
        400
      );

    // Rate limit: this session's user messages in the last minute
    if (convo) {
      const since = new Date(Date.now() - 60_000).toISOString();
      const { count } = await supabase
        .from("ai_messages")
        .select("id", { count: "exact", head: true })
        .eq("conversation_id", convo.id)
        .eq("role", "user")
        .gte("created_at", since);
      if ((count ?? 0) >= RATE_LIMIT_MAX)
        return json(
          {
            error:
              "You're sending messages too quickly — please wait a moment and try again.",
            retryable: true,
          },
          429
        );
    }

    // Recent context (before adding the new message)
    let history: { role: "user" | "assistant"; content: string }[] = [];
    if (convo) {
      const { data: msgs } = await supabase
        .from("ai_messages")
        .select("role, content")
        .eq("conversation_id", convo.id)
        .order("created_at", { ascending: false })
        .limit(HISTORY_LIMIT);
      history = (
        (msgs ?? []) as { role: "user" | "assistant"; content: string }[]
      ).reverse();
    }

    // Gemini via Lovable AI Gateway — the key never leaves the server
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      console.error("Missing LOVABLE_API_KEY");
      return json({ error: "AI is not configured right now." }, 500);
    }

    const gateway = createOpenAICompatible({
      name: "lovable",
      baseURL: "https://ai.gateway.lovable.dev/v1",
      headers: { "Lovable-API-Key": apiKey },
    });

    let reply: string;
    try {
      const { text } = await generateText({
        model: gateway("google/gemini-3.7-flash"),
        system: SYSTEM_PROMPT,
        messages: [...history, { role: "user" as const, content: message }],
      });
      reply = text;
    } catch (e) {
      console.error("AI gateway error:", e);
      return json(
        {
          error:
            "Sorry, I'm having trouble responding right now. Please try again in a moment.",
          retryable: true,
        },
        502
      );
    }

    // Persist only after a successful answer — no orphan messages on failure
    let conversationId = convo?.id as string | undefined;
    if (!conversationId) {
      const { data: created, error: cErr } = await supabase
        .from("ai_conversations")
        .insert({ session_id: sessionId })
        .select("id")
        .single();
      if (cErr || !created) {
        console.error("conversation insert error", cErr);
        return json({ error: "Could not save the conversation" }, 500);
      }
      conversationId = created.id;
    }

    const { error: mErr } = await supabase.from("ai_messages").insert([
      { conversation_id: conversationId, role: "user", content: message },
      { conversation_id: conversationId, role: "assistant", content: reply },
    ]);
    if (mErr) console.error("message insert error", mErr);
    await supabase
      .from("ai_conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId);

    return json({
      conversationId,
      message: { role: "assistant", content: reply },
    });
  } catch (e) {
    console.error("aman-ai-chat error:", e);
    return json({ error: "Unexpected error — please try again." }, 500);
  }
});
