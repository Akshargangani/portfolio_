import { Github, Linkedin, Youtube, Mail, Code2 } from "lucide-react";
import { YOUTUBE_CHANNEL_URL, LEETCODE_PROFILE_URL } from "@/lib/social";

const items = [
  { href: "https://github.com/Akshargangani", icon: Github, label: "GitHub", target: "_blank" },
  { href: "https://www.linkedin.com/in/akshar-gangani/", icon: Linkedin, label: "LinkedIn", target: "_blank" },
  { href: LEETCODE_PROFILE_URL, icon: Code2, label: "LeetCode", target: "_blank" },
  { href: YOUTUBE_CHANNEL_URL, icon: Youtube, label: "YouTube", target: "_blank" },
  { href: "mailto:hello@akshar.dev", icon: Mail, label: "Email", target: "" },
];

export function SocialDock() {
  return (
    <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <ul className="flex flex-col gap-2 rounded-full glass p-2">
        {items.map(({ href, icon: Icon, label, target }) => (
          <li key={label}>
            <a
              href={href}
              target={target || undefined}
              rel={target ? "noreferrer" : undefined}
              aria-label={label}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all hover:text-primary hover:bg-white/5"
            >
              <Icon size={16} className="transition-transform group-hover:scale-110" />
              <span className="pointer-events-none absolute left-12 whitespace-nowrap rounded-md glass px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
