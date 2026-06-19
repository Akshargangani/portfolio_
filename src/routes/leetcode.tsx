
import { Reveal } from "@/components/Reveal";
import { Code2, Trophy, Target, Zap, Loader2, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { getLeetCodeProfile, type LeetCodeProfile, type LeetCodeSolvedProblem } from "@/lib/api";
import { LEETCODE_PROFILE_URL, LEETCODE_USERNAME } from "@/lib/social";



export default function LeetCodePage() {
  const [profile, setProfile] = useState<LeetCodeProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackData: LeetCodeProfile = {
    username: LEETCODE_USERNAME,
    totalSolved: 150,
    easy: 80,
    medium: 50,
    hard: 20,
    acceptanceRate: 75,
    ranking: 150000,
    recentSolved: [
      {
        title: "Two Sum",
        titleSlug: "two-sum",
        date: "22 May 2025",
        lang: "JavaScript",
        url: "https://leetcode.com/problems/two-sum/",
      },
      {
        title: "Add Two Numbers",
        titleSlug: "add-two-numbers",
        date: "21 May 2025",
        lang: "JavaScript",
        url: "https://leetcode.com/problems/add-two-numbers/",
      },
      {
        title: "Longest Substring Without Repeating Characters",
        titleSlug: "longest-substring-without-repeating-characters",
        date: "20 May 2025",
        lang: "JavaScript",
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      },
    ],
  };

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getLeetCodeProfile(LEETCODE_USERNAME);
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch LeetCode data:", err);
        // Use fallback data instead of showing error
        setProfile(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    load();
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = profile
    ? [
        { label: "Problems Solved", value: profile.totalSolved.toString(), icon: Trophy },
        { label: "Acceptance Rate", value: `${profile.acceptanceRate}%`, icon: Target },
        {
          label: "Global Ranking",
          value: profile.ranking ? `#${profile.ranking.toLocaleString()}` : "N/A",
          icon: Zap,
        },
        { label: "Hard Solved", value: profile.hard.toString(), icon: Code2 },
      ]
    : [];

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="mb-12 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Problem Solving</div>
          <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            My <span className="text-gradient">LeetCode</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Track my problem-solving journey on LeetCode — {LEETCODE_USERNAME}
          </p>
        </div>
      </Reveal>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : profile ? (
        <>
          <Reveal delay={100}>
            <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:glow-soft"
                >
                  <div className="mb-3 flex items-center gap-2 text-primary">
                    <stat.icon size={20} />
                    <span className="text-xs uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <div className="font-display text-3xl font-semibold">{stat.value}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mb-12 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Easy", count: profile.easy, color: "text-green-400" },
                { label: "Medium", count: profile.medium, color: "text-yellow-400" },
                { label: "Hard", count: profile.hard, color: "text-red-400" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl glass p-5 text-center">
                  <div className={`font-display text-2xl font-semibold ${item.color}`}>
                    {item.count}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {item.label} solved
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {profile.recentSolved.length > 0 && (
            <Reveal delay={200}>
              <div className="mb-8">
                <h2 className="mb-6 font-display text-2xl font-semibold">Recently Solved</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {profile.recentSolved.map((problem) => (
                    <ProblemCard key={`${problem.titleSlug}-${problem.date}`} problem={problem} />
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </>
      ) : null}

      <Reveal delay={300}>
        <div className="text-center">
          <a
            href={LEETCODE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full neon-border px-6 py-3 text-sm font-medium transition-all hover:glow"
          >
            <Code2 size={18} />
            View LeetCode Profile
            <ExternalLink size={14} className="opacity-70" />
          </a>
        </div>
      </Reveal>
    </div>
  );
}

function ProblemCard({ problem }: { problem: LeetCodeSolvedProblem }) {
  return (
    <a
      href={problem.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:glow-soft"
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="shrink-0 text-primary" size={18} />
          <h3 className="font-display text-base font-semibold group-hover:text-primary">
            {problem.title}
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs font-medium text-green-400">
          Accepted
        </span>
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-foreground/70">
          {problem.lang}
        </span>
      </div>
      <div className="text-xs text-muted-foreground">Solved on {problem.date}</div>
    </a>
  );
}
