# Contact Form — Web3Forms Setup

## 1. Get your access key

1. Open [https://web3forms.com](https://web3forms.com)
2. Enter the email where you want messages (e.g. your Gmail)
3. Verify your email (one-time)
4. Copy your **Access Key**

## 2. Configure `.env.local`

Edit `future-luxe-canvas-main/.env.local` and **replace** `YOUR_ACCESS_KEY` with your real key:

```env
WEB3FORMS_ACCESS_KEY=a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx
VITE_WEB3FORMS_ACCESS_KEY=a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx

CONTACT_EMAIL=your.email@gmail.com
VITE_CONTACT_EMAIL=your.email@gmail.com
```

Both `WEB3FORMS_ACCESS_KEY` and `VITE_WEB3FORMS_ACCESS_KEY` must be the **same** value.

## 3. Restart dev server

```bash
cd future-luxe-canvas-main
npm run dev
```

Vite only loads `.env.local` after a restart.

## 4. Test

1. Open `/contact`
2. Fill name, email, message (min 10 characters)
3. Click **Send message**
4. You should see a green toast: **Message sent!**
5. Check your inbox (and spam)

## API endpoint

Submissions go to:

`https://api.web3forms.com/submit`

## Production (Cloudflare)

Add the same variables in your host dashboard:

- `VITE_WEB3FORMS_ACCESS_KEY`
- `WEB3FORMS_ACCESS_KEY`
- `CONTACT_EMAIL`

## Troubleshooting

| Error | Fix |
|-------|-----|
| "not configured" | Replace `YOUR_ACCESS_KEY` in `.env.local` with real key, restart dev server |
| Still not working | Ensure `.env.local` is in `future-luxe-canvas-main/` folder (same level as `package.json`) |
| Web3Forms error | Confirm signup email is verified at web3forms.com |
