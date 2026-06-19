import { useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const seed: Msg[] = [
  { role: "assistant", content: "Hi, I'm Akshar AI. Ask me anything about the studio — services, pricing, process." },
];

const canned: Record<string, string> = {
  pricing: "Projects start at $12k for product design and $25k for full design + build engagements.",
  process: "Discovery → Strategy → Design → Build → Launch. Typical timeline: 4–10 weeks.",
  stack: "React, TanStack Start, TypeScript, Tailwind, Three.js, Framer Motion, Supabase.",
  contact: "The fastest way is the contact form, or email hello@akshar.dev.",
};

function reply(q: string): string {
  const k = q.toLowerCase();
  if (k.includes("price") || k.includes("cost")) return canned.pricing;
  if (k.includes("process") || k.includes("timeline")) return canned.process;
  if (k.includes("stack") || k.includes("tech")) return canned.stack;
  if (k.includes("contact") || k.includes("email") || k.includes("reach")) return canned.contact;
  return "Great question — I'd love to dig in. Drop your email on the contact page and we'll send a tailored answer within 24h.";
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "assistant", content: reply(q) }]);
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground glow animate-pulse-glow"
      >
        {open ? <X size={20} /> : <Sparkles size={20} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[460px] w-[340px] flex-col overflow-hidden rounded-2xl glass-strong glow animate-fade-in">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <Bot size={16} className="text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold">Akshar AI</div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                Online · responds instantly
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${m.role === "user" ? "bg-primary text-primary-foreground" : "glass"}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about pricing, process…"
              className="flex-1 rounded-xl bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:bg-white/10"
            />
            <button onClick={send} className="rounded-xl bg-primary px-3 py-2 text-primary-foreground hover:opacity-90" aria-label="Send">
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
