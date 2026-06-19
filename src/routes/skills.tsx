import { createFileRoute } from "@tanstack/react-router";
import { Skills } from "@/components/Skills";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — My Technical Expertise" },
      { name: "description", content: "Explore my technical skills and expertise in various technologies." },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  return <Skills />;
}
