import { useEffect, useState } from "react";

export function TypingText({ words, className = "" }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    const speed = del ? 45 : 90;
    const t = setTimeout(() => {
      const next = del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      setText(next);
      if (!del && next === current) setTimeout(() => setDel(true), 1400);
      else if (del && next === "") { setDel(false); setI((v) => v + 1); }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return (
    <span className={className}>
      {text}
      <span className="ml-1 inline-block h-[0.9em] w-[2px] -translate-y-[0.05em] bg-primary align-middle animate-blink" style={{ boxShadow: "0 0 8px var(--neon)" }} />
    </span>
  );
}
