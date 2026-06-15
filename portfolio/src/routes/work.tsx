import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/Projects";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Akshar Studio" },
      { name: "description", content: "Selected projects across product, brand and immersive web by Akshar." },
      { property: "og:title", content: "Work — Akshar Studio" },
      { property: "og:description", content: "Selected projects across product, brand and immersive web." },
    ],
  }),
  component: () => (
    <div className="pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-xs uppercase tracking-[0.4em] text-primary">Portfolio</div>
        <h1 className="mt-3 font-display text-5xl font-semibold md:text-7xl">Selected <span className="text-gradient">work</span></h1>
        <p className="mt-4 max-w-xl text-muted-foreground">A small slice of recent collaborations across product, brand and immersive web.</p>
      </div>
      <Projects />
    </div>
  ),
});
