<div align="center">

# 🚀 LaunchKit by Replyke

**Launch your SaaS in minutes, not months**

Three production-ready starter applications to ship your MVP fast.
Built with modern frameworks. Powered by [Replyke](https://replyke.com).

![LaunchKit Overview](./screenshots/launchkit-overview.png)

</div>

---

## What's Included

LaunchKit provides three complete, ready-to-deploy applications that cover essential SaaS needs:

### 📝 [Blog Starter](./apps/blog)
A modern content platform with social features. Perfect for company blogs, documentation, or content marketing.
- **Live Demo**: [blog.replyke.com](https://blog.replyke.com)
- **Tech**: Next.js 15 + React 19
- **Features**: Article creation, threaded comments, voting, dark mode

### 🗺️ [Roadmap Starter](./apps/roadmap)
A community-driven roadmap and forum. Ideal for product feedback, feature requests, and public roadmaps.
- **Live Demo**: [roadmap.replyke.com](https://roadmap.replyke.com)
- **Tech**: Vite + React 19
- **Features**: Multi-topic boards, voting, discussions, real-time updates

### 🎫 [Support Tickets Starter](./apps/support-tickets)
A complete Q&A and support ticket system. Perfect for customer support, help centers, or community forums.
- **Live Demo**: [support.replyke.com](https://support.replyke.com)
- **Tech**: Next.js 15 + React 19
- **Features**: Ticket management, accepted answers, priority/status tracking, role-based access

---

## Quick Start

### 1. Get Your Replyke Project ID

All three starters use [Replyke](https://replyke.com) to handle authentication, comments, voting, and social features—so you don't need to build a backend.

1. Go to [dashboard.replyke.com](https://dashboard.replyke.com)
2. Create a new project
3. Copy your Project ID

### 2. Choose Your Starter

Each application has its own setup guide:

```bash
# Install dependencies (from root)
pnpm install

# Run the blog
cd apps/blog
# Add NEXT_PUBLIC_REPLYKE_PROJECT_ID to .env
pnpm dev

# Run the roadmap
cd apps/roadmap
# Add VITE_PUBLIC_REPLYKE_PROJECT_ID to .env
pnpm dev

# Run support tickets
cd apps/support-tickets
# Add NEXT_PUBLIC_REPLYKE_PROJECT_ID to .env
pnpm dev
```

> **Note**: Each app directory has detailed setup instructions in its own README.

---

## Authentication

All starters use **Replyke's built-in authentication** out of the box—no setup required beyond adding your Project ID.

### Want to Use Your Own Auth?

Replyke supports integration with external authentication systems. You can easily configure these starters to work with:
- Your existing user database
- Third-party auth providers (Auth0, Clerk, Firebase, etc.)
- Custom authentication solutions

**Learn more**: [Replyke Authentication Docs](https://docs.replyke.com/authentication/external-users)

---

## Why LaunchKit?

✅ **Ship Fast**: Production-ready code, not boilerplate
✅ **No Backend Needed**: Replyke handles auth, data, comments, and voting
✅ **Modern Stack**: Next.js 15, React 19, Vite, TypeScript, Tailwind
✅ **Fully Customizable**: Change anything—it's your code
✅ **Free to Use**: MIT licensed, modify however you want

---

## Tech Stack

- **Frameworks**: Next.js 15, Vite
- **UI**: React 19, TypeScript, Tailwind CSS
- **Components**: Radix UI + shadcn/ui
- **Backend**: Replyke (auth, data, social features)
- **Package Manager**: pnpm

---

## Monorepo Structure

```
saas-starter/
├── apps/
│   ├── blog/              # Next.js blog app
│   ├── roadmap/           # Vite roadmap app
│   └── support-tickets/   # Next.js support app
└── pnpm-workspace.yaml    # pnpm workspace config
```

---

## Development Commands

```bash
# From root directory
pnpm dev:blog              # Start blog dev server
pnpm dev:roadmap           # Start roadmap dev server
pnpm dev:support-tickets   # Start support tickets dev server

pnpm build:blog            # Build blog for production
pnpm build:roadmap         # Build roadmap for production
pnpm build:support-tickets # Build support tickets for production
```

---

## License

MIT License - Use these starters however you want. Build your SaaS, launch your product, make it yours.

---

## About Replyke

[Replyke](https://replyke.com) is a developer platform that provides authentication, comments, voting, and social features as a service—so you can focus on building your product instead of reinventing the wheel.

**Want to learn more?** Check out the [Replyke Documentation](https://docs.replyke.com)

---

<div align="center">

Made with ❤️ by the [Replyke](https://replyke.com) team

[Documentation](https://docs.replyke.com) · [Dashboard](https://dashboard.replyke.com) · [Support](https://support.replyke.com)

</div>
