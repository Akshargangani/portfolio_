import { Reveal } from "./Reveal";
import { ArrowUpRight } from "lucide-react";

const projects = [
  { title: "Nebula OS", tag: "Product · 2025", desc: "Operating system for autonomous design teams.", grad: "from-cyan-400/40 via-sky-500/30 to-violet-500/40" },
  { title: "Helix Finance", tag: "Fintech · 2025", desc: "Trading interface reimagined for AI-native traders.", grad: "from-emerald-400/40 via-teal-500/30 to-cyan-500/40" },
  { title: "Lumen Studio", tag: "Brand · 2025", desc: "Identity & site for a generative video studio.", grad: "from-fuchsia-400/40 via-pink-500/30 to-rose-500/40" },
  { title: "Orbit Labs", tag: "Web · 2025", desc: "Immersive marketing site with WebGL hero.", grad: "from-amber-400/40 via-orange-500/30 to-red-500/40" },
];

export function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-primary">Selected Work</div>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Recent <span className="text-gradient">obsessions</span></h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
            Long-term collaborations with founders building category-defining products.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <a
              href="#"
              className="group relative block overflow-hidden rounded-3xl glass p-1 transition-all duration-500 hover:-translate-y-1 hover:glow"
            >
              <div className={`relative h-64 overflow-hidden rounded-[20px] bg-gradient-to-br ${p.grad}`}>
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute right-4 top-4 rounded-full glass-strong p-2 transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
                <div className="absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(400px at var(--mx,50%) var(--my,50%), oklch(0.86 0.17 200 / 0.18), transparent 60%)" }}
                />
              </div>
              <div className="flex items-end justify-between p-5">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{p.tag}</div>
                  <div className="mt-1 font-display text-xl font-semibold">{p.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
