/** Public channel URL (handle-based). Used for links across the portfolio. */
export const YOUTUBE_CHANNEL_URL =
  import.meta.env.VITE_YOUTUBE_CHANNEL_URL ?? "https://www.youtube.com/@aksharpatel-i5e";

/** UC channel ID — used for embeds and optional YouTube Data API. */
export const YOUTUBE_CHANNEL_ID =
  import.meta.env.VITE_YOUTUBE_CHANNEL_ID ?? "UCvF6G_0ZlBjoq5ES7pd30dQ";

/** Uploads playlist ID (UC → UU) for embedding latest videos. */
export const YOUTUBE_UPLOADS_PLAYLIST_ID = YOUTUBE_CHANNEL_ID.replace(/^UC/, "UU");

export const LEETCODE_USERNAME =
  import.meta.env.VITE_LEETCODE_USERNAME ?? "Akshargangani";

export const LEETCODE_PROFILE_URL = `https://leetcode.com/${LEETCODE_USERNAME}/`;
