// API utility functions for the portfolio

export { submitContactMessage } from "@/lib/contact";
export type { ContactFormValues } from "@/lib/contact-schema";

export async function getGitHubData(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub data");
    }

    const repos = await response.json();
    
    return repos.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
      url: repo.html_url,
    }));
  } catch (error) {
    console.error("GitHub API error:", error);
    throw error;
  }
}

const LEETCODE_API_BASE = "https://alfa-leetcode-api.onrender.com";
const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

export type LeetCodeSolvedProblem = {
  title: string;
  titleSlug: string;
  date: string;
  lang: string;
  url: string;
};

export type LeetCodeProfile = {
  username: string;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  acceptanceRate: number;
  ranking: number | null;
  recentSolved: LeetCodeSolvedProblem[];
};

type AlfaProfile = { username: string; ranking: number };
type AlfaSolved = {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acSubmissionNum: { difficulty: string; submissions: number }[];
  totalSubmissionNum: { difficulty: string; submissions: number }[];
};
type AlfaSubmission = {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
};

async function fetchAlfa<T>(path: string): Promise<T> {
  const response = await fetch(`${LEETCODE_API_BASE}/${path}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`LeetCode API error (${response.status})`);
  }

  return response.json() as Promise<T>;
}

async function fetchLeetCodeGraphQL(query: string, variables: any): Promise<any> {
  const response = await fetch(LEETCODE_GRAPHQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`LeetCode GraphQL error (${response.status})`);
  }

  return response.json();
}

export async function getLeetCodeProfile(username: string): Promise<LeetCodeProfile> {
  // Try GraphQL API first (more reliable)
  try {
    const userDataQuery = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
              ranking
          }
        }
      }
    `;

    const recentSubmissionQuery = `
      query recentSubmissions($username: String!) {
        recentSubmissionList(username: $username, limit: 10) {
          title
          titleSlug
          timestamp
          statusDisplay
          lang
        }
      }
    `;

    const [userData, recentData] = await Promise.all([
      fetchLeetCodeGraphQL(userDataQuery, { username }),
      fetchLeetCodeGraphQL(recentSubmissionQuery, { username }),
    ]);

    if (userData.errors || recentData.errors) {
      throw new Error("GraphQL API errors");
    }

    const matchedUser = userData.data.matchedUser;
    if (!matchedUser) {
      throw new Error("User not found");
    }

    const submitStats = matchedUser.submitStats.acSubmissionNum;
    const easy = submitStats.find((item: any) => item.difficulty === "Easy")?.count || 0;
    const medium = submitStats.find((item: any) => item.difficulty === "Medium")?.count || 0;
    const hard = submitStats.find((item: any) => item.difficulty === "Hard")?.count || 0;
    const totalSolved = easy + medium + hard;

    const ranking = matchedUser.profile?.ranking || null;

    const recentSolved = (recentData.data.recentSubmissionList || [])
      .filter((item: any) => item.statusDisplay === "Accepted")
      .slice(0, 12)
      .map((item: any) => ({
        title: item.title,
        titleSlug: item.titleSlug,
        date: new Date(item.timestamp).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        lang: item.lang,
        url: `https://leetcode.com/problems/${item.titleSlug}/`,
      }));

    return {
      username: matchedUser.username || username,
      totalSolved,
      easy,
      medium,
      hard,
      acceptanceRate: 0, // GraphQL doesn't provide this easily
      ranking,
      recentSolved,
    };
  } catch (error) {
    console.log("GraphQL failed, trying fallback API:", error);

    // Fallback to Alfa API
    const [profile, solved, acSubmissions] = await Promise.all([
      fetchAlfa<AlfaProfile>(username),
      fetchAlfa<AlfaSolved>(`${username}/solved`),
      fetchAlfa<{ submission: AlfaSubmission[] }>(`${username}/acSubmission`),
    ]);

    const acceptedSubmissions =
      solved.acSubmissionNum.find((item) => item.difficulty === "All")?.submissions ?? 0;
    const totalSubmissions =
      solved.totalSubmissionNum.find((item) => item.difficulty === "All")?.submissions ?? 0;
    const acceptanceRate =
      totalSubmissions > 0 ? Math.round((acceptedSubmissions / totalSubmissions) * 100) : 0;

    const recentSolved = (acSubmissions.submission ?? [])
      .filter((item) => item.statusDisplay === "Accepted")
      .slice(0, 12)
      .map((item) => ({
        title: item.title,
        titleSlug: item.titleSlug,
        date: new Date(Number(item.timestamp) * 1000).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        lang: item.lang,
        url: `https://leetcode.com/problems/${item.titleSlug}/`,
      }));

    return {
      username: profile.username ?? username,
      totalSolved: solved.solvedProblem,
      easy: solved.easySolved,
      medium: solved.mediumSolved,
      hard: solved.hardSolved,
      acceptanceRate,
      ranking: profile.ranking ?? null,
      recentSolved,
    };
  }
}

export type YouTubeChannelStats = {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  title: string;
  thumbnail: string;
};

export async function getYouTubeChannelStats(channelId: string, apiKey: string): Promise<YouTubeChannelStats> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=statistics,snippet`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch YouTube channel stats");
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error("Channel not found");
    }

    const channel = data.items[0];
    return {
      subscriberCount: channel.statistics.subscriberCount,
      viewCount: channel.statistics.viewCount,
      videoCount: channel.statistics.videoCount,
      title: channel.snippet.title,
      thumbnail: channel.snippet.thumbnails.high.url,
    };
  } catch (error) {
    console.error("YouTube API error:", error);
    throw error;
  }
}

export async function getYouTubeData(channelId: string, apiKey: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch YouTube data");
    }

    const data = await response.json();
    
    return data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error("YouTube API error:", error);
    throw error;
  }
}
