import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/Projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — My Portfolio" },
      { name: "description", content: "Explore my featured projects and development work." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-xs uppercase tracking-[0.4em] text-primary">Portfolio</div>
        <h1 className="mt-3 font-display text-5xl font-semibold md:text-7xl">My <span className="text-gradient">Projects</span></h1>
        <p className="mt-4 max-w-xl text-muted-foreground">A collection of my recent work across web development, mobile apps, and more.</p>
      </div>
      <Projects />
    </div>
  );
}
