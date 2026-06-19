
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";
import { Timeline } from "@/components/Timeline";
import { ContactForm } from "@/components/ContactForm";



export default function Index() {
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
