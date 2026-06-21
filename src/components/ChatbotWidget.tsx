import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, X, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const seed: Msg[] = [
  { role: "assistant", content: "Hi, I'm Akshar AI. Ask me anything about the studio — services, pricing, process." },
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [msgs, open]);

  const send = async () => {
    const q = input.trim();
    if (!q || isLoading) return;
    
    const newMsgs = [...msgs, { role: "user" as const, content: q }];
    setMsgs(newMsgs);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API key not found. Please add VITE_GEMINI_API_KEY to .env");
      }

      // Convert history to Gemini format, skipping the first 'assistant' seed message
      const history = newMsgs.slice(1).map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      const requestBody = {
        systemInstruction: {
          parts: [{ text: "You are Akshar AI, an assistant for Akshar's portfolio. You are helpful, concise, and professional. Answer questions about Akshar, pricing, process, and tech stack. Projects start at $12k for product design and $25k for full design + build engagements. Typical timeline is 4-10 weeks. Stack: React, TanStack Start, TypeScript, Tailwind. Contact: hello@akshar.dev. Akshar's projects involve a collaborative process where client feedback is integral. Changes and iterations are naturally incorporated during the design and development phases to ensure the final product aligns perfectly with your vision and goals." }]
        },
        contents: history,
      };

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      if (!res.ok) {
        let errorMsg = `HTTP Error ${res.status}`;
        try {
          const errorData = await res.json();
          if (errorData.error && errorData.error.message) {
            errorMsg = errorData.error.message;
          }
        } catch(e) {
           errorMsg = await res.text();
        }
        throw new Error(errorMsg);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
      
      setMsgs((m) => [...m, { role: "assistant", content: text }]);
    } catch (error: any) {
      setMsgs((m) => [...m, { role: "assistant", content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
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
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 whitespace-pre-wrap ${m.role === "user" ? "bg-primary text-primary-foreground" : "glass"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-3 py-2 glass">
                  <Loader2 size={16} className="animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about pricing, process…"
              disabled={isLoading}
              className="flex-1 rounded-xl bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:bg-white/10 disabled:opacity-50"
            />
            <button onClick={send} disabled={isLoading || !input.trim()} className="rounded-xl bg-primary px-3 py-2 text-primary-foreground hover:opacity-90 disabled:opacity-50" aria-label="Send">
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
