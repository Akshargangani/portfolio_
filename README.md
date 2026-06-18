# Developer Portfolio

A modern, responsive, and dynamic developer portfolio built using the latest web technologies. It seamlessly integrates with external APIs to showcase your projects, coding statistics, and content.

## Features

- **GitHub Integration:** Automatically fetches and displays your public repositories.
- **LeetCode Integration:** Displays your real-time problem-solving statistics and contest rankings.
- **YouTube Integration:** Showcases your latest videos from your YouTube channel.
- **Contact Form:** Integrated contact form using Web3Forms/Resend.
- **Modern UI:** Built with Radix UI components, Tailwind CSS, and Framer Motion (tw-animate-css) for smooth animations.
- **Dark Mode:** Support for both light and dark themes.
- **Fully Responsive:** Works perfectly on mobile, tablet, and desktop.

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) / [React 19](https://react.dev/)
- **Routing:** [TanStack Router](https://tanstack.com/router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Components:** [Radix UI](https://www.radix-ui.com/) (shadcn/ui style)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd portfolio/portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Copy the example environment file and configure your API keys:

```bash
cp .env.example .env
```

Please check [API_SETUP.md](./portfolio/API_SETUP.md) and [CONTACT_SETUP.md](./portfolio/CONTACT_SETUP.md) for detailed instructions on configuring GitHub, LeetCode, YouTube, and the Contact form.

### Running the Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port specified by Vite).

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Deployment

The project includes configurations (`wrangler.jsonc`) ready for deployment to Cloudflare Pages.

## License

This project is licensed under the MIT License.
