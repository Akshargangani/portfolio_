import { Reveal } from "./Reveal";
import { Code2, Server, Wrench } from "lucide-react";

const groups = [
  {
    title: "Frontend Development",
    icon: Code2,
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5 & CSS", "JavaScript ES6+", "Redux", "Vue.js", "React Native"],
  },
  {
    title: "Backend Development",
    icon: Server,
    items: ["Node.js", "Express.js", "MongoDB", "REST APIs", "MySQL", "PostgreSQL", "GraphQL", "Firebase"],
  },
  {
    title: "Tools & Technologies",
    icon: Wrench,
    items: ["Git & GitHub", "Figma", "Docker", "AWS", "Vercel", "Jest", "Cypress", "Postman"],
  },
  {
    title: "Programming Languages",
    icon: Code2,
    items: ["JavaScript", "TypeScript", "Python", "Java", "C++", "SQL", "Bash/Shell"],
  },
  {
    title: "Frameworks & Libraries",
    icon: Server,
    items: ["TanStack Router", "TanStack Query", "Zustand", "Prisma", "Mongoose", "Sequelize"],
  },
  {
    title: "Soft Skills",
    icon: Wrench,
    items: ["Problem Solving", "Team Collaboration", "Communication", "Agile/Scrum", "Time Management", "Leadership"],
  },
];

export function Skills() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="mb-12 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Technical Skills</div>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Technologies I <span className="text-gradient">work with</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Technologies and tools I use to build amazing applications.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 80}>
            <div className="group relative h-full rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:glow-soft">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl neon-border p-2 text-primary">
                  <g.icon size={18} />
                </div>
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
