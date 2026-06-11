import { Reveal } from "./Reveal";

const events = [
  { year: "2026", role: "Founder · Akshar Studio", desc: "Launched independent studio focused on AI-native product design." },
  { year: "2025", role: "Principal Designer · Vercel", desc: "Led design system and marketing surfaces for the v0 launch." },
  { year: "2025", role: "Design Lead · Linear", desc: "Shipped Cycles, Insights, and the redesigned project surface." },
  { year: "2025", role: "Sr. Product Designer · Stripe", desc: "Built the modern Dashboard navigation and Atlas onboarding." },
  { year: "2025", role: "Designer · Apple", desc: "Worked on macOS system experiences inside the HI team." },
];

export function Timeline() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="mb-14 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Experience</div>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">A decade building <span className="text-gradient">at the edge</span></h2>
        </div>
      </Reveal>

      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/0 via-primary/40 to-accent/0 md:left-1/2" />
        <ul className="space-y-10">
          {events.map((e, i) => (
            <Reveal key={e.year} delay={i * 70}>
              <li className={`relative grid items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className={`md:text-right ${i % 2 ? "md:text-left" : ""} pl-12 md:pl-0`}>
                  <div className="text-xs font-mono text-primary tracking-widest">{e.year}</div>
                  <div className="mt-1 font-display text-xl font-semibold">{e.role}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
                </div>
                <div className="hidden md:block" />
                <span className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2">
                  <span className="block h-3 w-3 rounded-full bg-primary glow-soft" />
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
