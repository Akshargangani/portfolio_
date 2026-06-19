import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Github, Star, GitFork, Code, Users, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getGitHubData } from "@/lib/api";

export const Route = createFileRoute("/github")({
  head: () => ({
    meta: [
      { title: "GitHub — My Repositories" },
      { name: "description", content: "Explore my GitHub repositories and open source contributions." },
    ],
  }),
  component: GitHub,
});

function GitHub() {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Replace with your actual GitHub username
  const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "Akshargangani";

  useEffect(() => {
    async function fetchRepos() {
      try {
        const data = await getGitHubData(GITHUB_USERNAME);
        setRepositories(data);
      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
        setError("Failed to load repositories. Using demo data.");
        
        // Fallback to demo data
        setRepositories([
          {
            name: "portfolio-website",
            description: "A modern, responsive portfolio website built with React and Tailwind CSS",
            language: "TypeScript",
            stars: 12,
            forks: 4,
            topics: ["react", "typescript", "tailwindcss", "portfolio"],
            url: `https://github.com/${GITHUB_USERNAME}/portfolio-website`,
          },
          {
            name: "e-commerce-platform",
            description: "Full-stack e-commerce solution with payment integration and admin dashboard",
            language: "TypeScript",
            stars: 28,
            forks: 9,
            topics: ["nextjs", "nodejs", "mongodb", "stripe"],
            url: `https://github.com/${GITHUB_USERNAME}/e-commerce-platform`,
          },
          {
            name: "ai-chatbot",
            description: "AI-powered chatbot with natural language processing capabilities",
            language: "Python",
            stars: 45,
            forks: 15,
            topics: ["python", "ai", "nlp", "machine-learning"],
            url: `https://github.com/${GITHUB_USERNAME}/ai-chatbot`,
          },
          {
            name: "task-manager",
            description: "Collaborative task management application with real-time updates",
            language: "JavaScript",
            stars: 18,
            forks: 6,
            topics: ["react", "firebase", "realtime", "productivity"],
            url: `https://github.com/${GITHUB_USERNAME}/task-manager`,
          },
          {
            name: "weather-app",
            description: "Beautiful weather application with location-based forecasts",
            language: "TypeScript",
            stars: 22,
            forks: 8,
            topics: ["react", "api", "weather", "typescript"],
            url: `https://github.com/${GITHUB_USERNAME}/weather-app`,
          },
          {
            name: "leetcode-solutions",
            description: "Collection of my LeetCode problem solutions with explanations",
            language: "JavaScript",
            stars: 56,
            forks: 23,
            topics: ["algorithms", "data-structures", "leetcode", "javascript"],
            url: `https://github.com/${GITHUB_USERNAME}/leetcode-solutions`,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();

    // Auto-refresh every 5 minutes for live updates
    const interval = setInterval(fetchRepos, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [GITHUB_USERNAME]);

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="mb-12 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Open Source</div>
          <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            My <span className="text-gradient">GitHub</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Explore my repositories and open source contributions. Feel free to fork and contribute!
          </p>
        </div>
      </Reveal>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {repositories.map((repo, index) => (
            <Reveal key={repo.name} delay={index * 80}>
              <a
                href={repo.url || `https://github.com/${GITHUB_USERNAME}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:glow-soft"
              >
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Github className="text-primary" size={20} />
                    <h3 className="font-display text-lg font-semibold">{repo.name}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-foreground/80">
                    {repo.language}
                  </span>
                </div>

                <p className="mb-4 text-sm text-muted-foreground">{repo.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {repo.topics.map((topic: string) => (
                    <span
                      key={topic}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-foreground/70"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star size={14} />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={14} />
                    <span>{repo.forks}</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      )}

      <Reveal delay={400}>
        <div className="mt-12 text-center">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full neon-border px-6 py-3 text-sm font-medium transition-all hover:glow"
          >
            <Github size={18} />
            View All on GitHub
          </a>
        </div>
      </Reveal>
    </div>
  );
}
