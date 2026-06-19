
import { Reveal } from "@/components/Reveal";
import { Youtube, ExternalLink, Users, Eye, Video } from "lucide-react";
import {
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_UPLOADS_PLAYLIST_ID,
  YOUTUBE_CHANNEL_ID,
} from "@/lib/social";
import { getYouTubeChannelStats, type YouTubeChannelStats } from "@/lib/api";
import { useEffect, useState } from "react";



export default function YouTubePage() {
  const embedUrl = `https://www.youtube.com/embed/videoseries?list=${YOUTUBE_UPLOADS_PLAYLIST_ID}`;
  const [stats, setStats] = useState<YouTubeChannelStats | null>(null);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    async function fetchStats() {
      if (!apiKey) {
        setLoading(false);
        return;
      }

      try {
        const data = await getYouTubeChannelStats(YOUTUBE_CHANNEL_ID, apiKey);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch YouTube stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [apiKey]);

  const formatNumber = (num: string) => {
    const number = parseInt(num);
    if (number >= 1000000) return (number / 1000000).toFixed(1) + 'M';
    if (number >= 1000) return (number / 1000).toFixed(1) + 'K';
    return num;
  };

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="mb-12 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Video Content</div>
          <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            My <span className="text-gradient">YouTube</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Watch my latest uploads on my channel — tutorials, tech content, and more.
          </p>
        </div>
      </Reveal>

      {!loading && stats && (
        <Reveal delay={50}>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl glass p-6 text-center">
              <Users className="mx-auto mb-2 h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">{formatNumber(stats.subscriberCount)}</div>
              <div className="text-sm text-muted-foreground">Subscribers</div>
            </div>
            <div className="rounded-2xl glass p-6 text-center">
              <Eye className="mx-auto mb-2 h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">{formatNumber(stats.viewCount)}</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
            <div className="rounded-2xl glass p-6 text-center">
              <Video className="mx-auto mb-2 h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">{formatNumber(stats.videoCount)}</div>
              <div className="text-sm text-muted-foreground">Videos</div>
            </div>
          </div>
        </Reveal>
      )}

      <Reveal delay={100}>
        <div className="overflow-hidden rounded-2xl glass">
          <div className="aspect-video w-full">
            <iframe
              title="Akshar Patel YouTube channel"
              src={embedUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-10 text-center">
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full neon-border px-6 py-3 text-sm font-medium transition-all hover:glow"
          >
            <Youtube size={18} />
            Visit My YouTube Channel
            <ExternalLink size={14} className="opacity-70" />
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            @aksharpatel-i5e
          </p>
        </div>
      </Reveal>
    </div>
  );
}
