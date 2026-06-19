
import { Skills } from "@/components/Skills";
import { Timeline } from "@/components/Timeline";
import { Testimonials } from "@/components/Testimonials";
import { Reveal } from "@/components/Reveal";



export default function AboutPage() {
  return (
    <div className="pt-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="text-xs uppercase tracking-[0.4em] text-primary">About Me</div>
        <h1 className="mt-3 font-display text-5xl font-semibold md:text-7xl">
          Hi, I'm <span className="text-gradient">Akshar</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
          Dedicated to crafting exceptional digital experiences with modern technologies and a strong focus on clean, maintainable code.
        </p>
      </div>

      <section className="mx-auto mt-20 max-w-4xl px-6">
        <Reveal>
          <div className="rounded-2xl glass p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.4em] text-primary">Professional Journey</div>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              My <span className="text-gradient">story</span>
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate <span className="text-foreground">Full Stack Developer</span> in the making, currently focusing on building modern, responsive web applications.
              </p>
              <p>
                I enjoy working with the React ecosystem and exploring both frontend and backend development.
              </p>
              <p>
                My goal is to create digital solutions that not only look great but also deliver smooth and user-friendly experiences.
              </p>
              <p>
                I love learning new technologies, experimenting with projects, and constantly improving my skills.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <Skills />
      <Timeline />
      <Testimonials />
    </div>
  );
}
