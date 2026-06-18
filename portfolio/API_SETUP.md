# API Setup Guide

This portfolio integrates with GitHub, LeetCode, and YouTube APIs to display real-time data.

## Environment Variables

Copy `.env.example` to `.env` and configure your API keys:

```bash
cp .env.example .env
```

## GitHub API (No API Key Required)

GitHub's public API doesn't require authentication for basic repository data.

1. Set your GitHub username:
   ```
   VITE_GITHUB_USERNAME=yourusername
   ```

2. The GitHub page will automatically fetch your public repositories.

## LeetCode API (No API Key Required)

LeetCode's GraphQL API is public and doesn't require authentication.

1. Set your LeetCode username:
   ```
   VITE_LEETCODE_USERNAME=yourusername
   ```

2. The LeetCode page will fetch your problem-solving statistics.

## YouTube API (API Key Required)

YouTube Data API v3 requires an API key.

### Getting YouTube API Key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials → API Key
5. Copy the API key

### Getting YouTube Channel ID:

1. Go to your YouTube channel
2. Look at the URL: `https://www.youtube.com/@yourchannel`
3. Your channel ID is in the URL after `@` or you can find it in channel settings

### Configure:

```
VITE_YOUTUBE_CHANNEL_ID=YOUR_CHANNEL_ID
VITE_YOUTUBE_API_KEY=your_api_key_here
```

## Contact Form

See **[CONTACT_SETUP.md](./CONTACT_SETUP.md)**. Uses **Web3Forms** or **Resend** on the server (FormSubmit removed — no activation links).

```env
WEB3FORMS_ACCESS_KEY=your_key
CONTACT_EMAIL=your.email@gmail.com
```

## API Integration Details

### GitHub API
- **Endpoint**: `https://api.github.com/users/{username}/repos`
- **Rate Limit**: 60 requests/hour (unauthenticated)
- **Data Fetched**: Repository name, description, language, stars, forks, topics

### LeetCode API
- **Endpoint**: `https://leetcode.com/graphql`
- **Rate Limit**: No strict limit for public queries
- **Data Fetched**: Problems solved, acceptance rate, contest ranking

### YouTube API
- **Endpoint**: `https://www.googleapis.com/youtube/v3/search`
- **Rate Limit**: 10,000 units/day (free tier)
- **Data Fetched**: Video ID, title, description, thumbnail, publish date

## Fallback Behavior

All pages have fallback data that displays if:
- API calls fail
- API keys are not configured
- Network errors occur

## Troubleshooting

### GitHub page shows demo data:
- Check your GitHub username is correct
- Ensure your profile is public

### LeetCode page shows demo data:
- Check your LeetCode username is correct
- Ensure you have solved problems on the platform

### YouTube page shows demo data:
- Verify YouTube API key is valid
- Check channel ID is correct
- Ensure YouTube Data API v3 is enabled in Google Cloud Console

### Contact form doesn't send emails:
- Check console for error messages
- Configure email service API key
- Verify email address is correct

## Security Notes

- Never commit `.env` file to version control
- Use different API keys for development and production
- Rotate API keys regularly
- Monitor API usage to avoid hitting rate limits
