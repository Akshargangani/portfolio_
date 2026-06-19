
import { Reveal } from "@/components/Reveal";
import { Download, Mail, Phone, MapPin, Github, Linkedin, Youtube, ExternalLink, Code2 } from "lucide-react";
import { YOUTUBE_CHANNEL_URL, LEETCODE_PROFILE_URL } from "@/lib/social";



export default function Resume() {
  const handleDownload = () => {
    // In production, this would download a PDF resume
    // For now, we'll show an alert
    alert("Resume download feature - Add your resume PDF to public/resume.pdf");
  };

  return (
    <div className="relative mx-auto max-w-4xl px-6 py-24">
      <Reveal>
        <div className="mb-12 text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Resume</div>
          <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            My <span className="text-gradient">Resume</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            A summary of my experience, skills, and achievements.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="mb-8 flex justify-center">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow transition-all hover:-translate-y-0.5"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="rounded-2xl glass p-8 md:p-10">
          {/* Contact Info */}
          <div className="mb-8 border-b border-white/10 pb-8">
            <h2 className="mb-4 font-display text-2xl font-semibold">Akshar</h2>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:hello@akshar.dev" className="hover:text-foreground">hello@akshar.dev</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>India</span>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <a href="https://github.com/Akshargangani" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/akshar-gangani/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Linkedin size={18} />
              </a>
              <a href={LEETCODE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Code2 size={18} />
              </a>
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-primary">Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Creative developer & designer crafting elite, cinematic web experiences. 
              Passionate about building innovative solutions with modern technologies. 
              Strong expertise in React, TypeScript, and full-stack development.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-primary">Experience</h3>
            
            <div className="mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">Senior Full Stack Developer</h4>
                  <p className="text-sm text-muted-foreground">Tech Company</p>
                </div>
                <span className="text-sm text-muted-foreground">2025 - Present</span>
              </div>
              <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                <li>Developed and maintained scalable web applications using React and Node.js</li>
                <li>Implemented responsive designs with Tailwind CSS</li>
                <li>Collaborated with cross-functional teams to deliver high-quality products</li>
                <li>Optimized application performance, reducing load time by 40%</li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">Frontend Developer</h4>
                  <p className="text-sm text-muted-foreground">Digital Agency</p>
                </div>
                <span className="text-sm text-muted-foreground">2025 - 2026</span>
              </div>
              <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                <li>Built responsive user interfaces for client websites</li>
                <li>Integrated third-party APIs and payment gateways</li>
                <li>Improved code quality and implemented testing practices</li>
              </ul>
            </div>

            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">Junior Developer</h4>
                  <p className="text-sm text-muted-foreground">Startup</p>
                </div>
                <span className="text-sm text-muted-foreground">2025 - 2026</span>
              </div>
              <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                <li>Developed web applications using JavaScript and React</li>
                <li>Participated in code reviews and team meetings</li>
                <li>Learned and applied modern development practices</li>
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-primary">Skills</h3>
            
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "Vue.js"].map((skill) => (
                  <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold">Backend</h4>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL"].map((skill) => (
                  <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold">Tools & Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {["Git", "GitHub", "Docker", "AWS", "Vercel", "Figma", "Postman", "Jest"].map((skill) => (
                  <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-primary">Education</h3>
            
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">Bachelor of Technology in Computer Science</h4>
                  <p className="text-sm text-muted-foreground">University Name</p>
                </div>
                <span className="text-sm text-muted-foreground">2025 - 2026</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Graduated with honors. Specialized in software development and algorithms.
              </p>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">Projects</h3>
            
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">Portfolio Website</h4>
                <a href="https://github.com/Akshargangani" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <ExternalLink size={14} />
                </a>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Modern portfolio website built with React, TypeScript, and Tailwind CSS featuring animated UI and responsive design.
              </p>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">E-commerce Platform</h4>
                <a href="https://github.com/Akshargangani" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <ExternalLink size={14} />
                </a>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">AI Chatbot</h4>
                <a href="https://github.com/Akshargangani" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <ExternalLink size={14} />
                </a>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                AI-powered chatbot with natural language processing capabilities for customer support automation.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
