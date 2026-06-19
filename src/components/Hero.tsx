import { ParticleField } from "./ParticleField";
import { TypingText } from "./TypingText";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      <div className="absolute inset-0 bg-hero-glow" aria-hidden />
      <div className="absolute inset-0 grid-bg animate-grid" aria-hidden />
      <ParticleField />

      {/* floating orbs */}
      <div className="pointer-events-none absolute -top-20 right-10 h-64 w-64 rounded-full bg-accent/30 blur-3xl animate-orb" aria-hidden />
      <div className="pointer-events-none absolute bottom-10 -left-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl animate-orb" style={{ animationDelay: "-6s" }} aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground animate-fade-in">
          <Sparkles size={12} className="text-primary" />
          Hi, I'm Akshar · Full Stack Developer
        </div>

        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl animate-fade-up">
          I'm <span className="text-gradient">Akshar</span>
          <br />
          a <span className="text-gradient">Full Stack Developer</span>
          <br />
          building <span className="text-gradient">
            <TypingText words={["digital products.", "interfaces.", "brand systems.", "experiences."]} />
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg animate-fade-up" style={{ animationDelay: "120ms" }}>
          A creative engineer & designer building elite, cinematic web experiences for visionary teams — blending Apple-grade craft with Tesla-grade ambition.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "240ms" }}>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow transition-transform hover:-translate-y-0.5"
          >
            View selected work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 rounded-full neon-border px-6 py-3 text-sm font-medium transition-all hover:bg-white/5"
          >
            View Resume
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full neon-border px-6 py-3 text-sm font-medium transition-all hover:bg-white/5"
          >
            Start a project
          </Link>
        </div>

        {/* marquee */}
        <div className="relative mt-20 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex w-max gap-16 animate-marquee text-sm uppercase tracking-[0.4em] text-muted-foreground/60">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-16">
                {["Linear", "Vercel", "Stripe", "Apple", "Tesla", "Arc", "Framer", "Notion"].map((b) => (
                  <span key={b}>{b}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
