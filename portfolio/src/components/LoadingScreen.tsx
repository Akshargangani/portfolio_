import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) { p = 100; clearInterval(id); setTimeout(() => setDone(true), 500); }
      setPct(Math.min(100, Math.round(p)));
    }, 140);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[300] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${done ? "pointer-events-none opacity-0" : "opacity-100"}`}
      aria-hidden={done}
    >
      <div className="absolute inset-0 bg-hero-glow opacity-60" />
      <div className="relative flex flex-col items-center gap-8">
        <div className="text-xs uppercase tracking-[0.5em] text-muted-foreground">Initializing experience</div>
        <div className="font-display text-5xl font-semibold tracking-tight text-gradient md:text-7xl">
          AKSHAR<span className="text-primary">.</span>
        </div>
        <div className="h-[2px] w-72 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary transition-[width] duration-200"
            style={{ width: `${pct}%`, boxShadow: "0 0 20px var(--neon)" }}
          />
        </div>
        <div className="font-mono text-sm text-muted-foreground">{pct.toString().padStart(3, "0")}%</div>
      </div>
    </div>
  );
}
