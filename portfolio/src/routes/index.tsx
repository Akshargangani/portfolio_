import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";
import { Timeline } from "@/components/Timeline";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akshar — Akshar portfolio of a creative developer" },
      { name: "description", content: "Selected work, capabilities and experience of Akshar — an AI-augmented design & engineering studio." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Projects />
      <Skills />
      <Timeline />
      <Testimonials />
      <ContactForm />
    </>
  );
}
