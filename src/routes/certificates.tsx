
import { Reveal } from "@/components/Reveal";
import { Award, Calendar, ExternalLink, CheckCircle } from "lucide-react";



export default function Certificates() {
  const certificates = [
    {
      title: "Frontend Developer React",
      issuer: "Simplilearn",
      date: "2025",
      credentialId: "FE-REACT-001",
      skills: ["React", "Frontend Development", "JavaScript", "Web Development"],
      link: "/frontend_developer_react certificate.pdf",
    },
    {
      title: "JavaScript Intermediate",
      issuer: "Simplilearn",
      date: "2025",
      credentialId: "JS-INT-002",
      skills: ["JavaScript", "Intermediate JS", "DOM Manipulation", "ES6+"],
      link: "/javascript_intermediate certificate.pdf",
    },
    {
      title: "JavaScript Basic",
      issuer: "Simplilearn",
      date: "2025",
      credentialId: "JS-BASIC-003",
      skills: ["JavaScript", "Basic JS", "Variables", "Functions"],
      link: "/javascript_basic certificate.pdf",
    },
    {
      title: "Node.js Basic",
      issuer: "Simplilearn",
      date: "2025",
      credentialId: "NODE-BASIC-004",
      skills: ["Node.js", "Backend Development", "Express", "API Development"],
      link: "/nodejs_basic certificate.pdf",
    },
    {
      title: "React Basic",
      issuer: "Simplilearn",
      date: "2025",
      credentialId: "REACT-BASIC-005",
      skills: ["React", "Components", "Hooks", "State Management"],
      link: "/react_basic certificate.pdf",
    },
    {
      title: "Simplilearn Certificate",
      issuer: "Simplilearn",
      date: "2025",
      credentialId: "SIMPLI-006",
      skills: ["Full Stack Development", "Web Technologies", "Programming"],
      link: "/simplilearn.pdf",
    },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="mb-12 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Achievements</div>
          <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            My <span className="text-gradient">Certificates</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Professional certifications and courses I've completed to enhance my skills.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {certificates.map((cert, index) => (
          <Reveal key={cert.title} delay={index * 80}>
            <div className="group relative h-full rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:glow-soft">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity group-hover:opacity-100" />
              
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl neon-border p-2 text-primary">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>{cert.date}</span>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-foreground/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle size={12} className="text-green-400" />
                <span>ID: {cert.credentialId}</span>
              </div>

              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLink size={14} />
                View Certificate
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
