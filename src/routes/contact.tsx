import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Akshar Studio" },
      { name: "description", content: "Start a project with Akshar. Most replies within 24 hours." },
      { property: "og:title", content: "Contact — Akshar Studio" },
      { property: "og:description", content: "Start a project with Akshar. Most replies within 24 hours." },
    ],
  }),
  component: () => (
    <div className="pt-24">
      <ContactForm />
    </div>
  ),
});
