import { Reveal } from "./Reveal";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const items = [
  { name: "Sofia Martins", role: "CEO, Helix Finance", quote: "Akshar shipped a product surface that feels years ahead. Our activation rate jumped 38% in two weeks." },
  { name: "Daniel Kwon", role: "Founder, Nebula OS", quote: "The most considered design partner we've ever worked with. Every pixel is intentional, every motion has meaning." },
  { name: "Priya Raman", role: "Head of Design, Lumen", quote: "It's rare to find someone who can hold strategy, craft, and engineering at this level. A genuine 10x collaborator." },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = items[i];

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-primary">Testimonials</div>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Words from <span className="text-gradient">collaborators</span></h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setI((v) => (v - 1 + items.length) % items.length)} className="rounded-full glass p-3 hover:glow-soft" aria-label="Previous">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => setI((v) => (v + 1) % items.length)} className="rounded-full glass p-3 hover:glow-soft" aria-label="Next">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div key={i} className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-14 animate-fade-in">
          <Quote className="absolute right-8 top-8 text-primary/30" size={80} />
          <p className="relative font-display text-2xl leading-snug md:text-3xl">"{t.quote}"</p>
          <div className="relative mt-8 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent" />
            <div>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </div>
          </div>
          <div className="mt-8 flex gap-1.5">
            {items.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Go to ${k + 1}`} className={`h-1 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-4 bg-white/15"}`} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
