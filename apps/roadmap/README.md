# 🗺️ Roadmap Starter

**A community-driven roadmap and forum—ship your feedback portal in 5 minutes**

Built with Vite + React 19 and powered by [Replyke](https://replyke.com).

---

## 🌐 Live Demo

See it in action: **[roadmap.replyke.com](https://roadmap.replyke.com)**

---

![Roadmap Board](./screenshots/homepage.png)

## What You Get

This is a complete, production-ready roadmap and discussion platform with:

✅ **Multi-Topic Boards**
- Create and organize topics/feature requests
- Rich text posts with markdown support
- Topic categorization and filtering

✅ **Community Engagement**
- Upvote/downvote on posts
- Threaded discussions and replies
- Real-time vote counts
- User authentication via Replyke

✅ **Modern UX**
- Fast Vite development with HMR
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Smooth animations and transitions
- Toast notifications

✅ **Production Ready**
- TypeScript for type safety
- React Router for navigation
- Optimized build output

---

## 🚀 Quick Start (5 Minutes)

### 1. Get Your Replyke Project ID

1. Go to [dashboard.replyke.com](https://dashboard.replyke.com)
2. Create a new project
3. Copy your Project ID

### 2. Set Up Environment Variables

Create a `.env` file in the `apps/roadmap` directory:

```bash
VITE_PUBLIC_REPLYKE_PROJECT_ID=your_project_id_here
```

### 3. Install and Run

```bash
# From the roadmap directory
pnpm install
pnpm dev
```

Your roadmap will be running at `http://localhost:5173` 🎉

---

![Discussion View](./screenshots/discussion.png)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Vite** | Build tool with fast HMR |
| **React 19** | UI library |
| **React Router** | Client-side routing |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling and responsive design |
| **Replyke** | Authentication, posts, voting, comments |
| **Radix UI + shadcn/ui** | Accessible component primitives |
| **Framer Motion** | Animations |

---

## 📁 Project Structure

```
src/
├── pages/                 # Page components
│   └── HomePage.tsx       # Main roadmap view
├── components/
│   ├── Roadmap/           # Roadmap-specific components
│   ├── Layout.tsx         # Main layout wrapper
│   ├── shared/            # Shared components
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and helpers
├── types/                 # TypeScript type definitions
└── AppRoutes.tsx          # Route configuration
```

---

## 🔐 Authentication

This starter uses **Replyke's built-in authentication**—users can sign up and log in without any additional setup.

### Want to Use Your Own Auth System?

You can easily integrate this roadmap with your existing authentication:
- Connect to your user database
- Use third-party providers (Auth0, Clerk, Firebase, etc.)
- Implement custom authentication logic

**Learn how**: [Replyke External Authentication Guide](https://docs.replyke.com/authentication/external-users)

---

## 🎨 Customization

This is **your code**—customize it however you want:

- **Branding**: Update colors in `tailwind.config.ts` and assets
- **Layout**: Modify components in `src/components/`
- **Features**: Add new views, filters, or functionality
- **Styling**: All styles use Tailwind CSS classes
- **Routing**: Add new routes in `AppRoutes.tsx`

---

## 📦 Build for Production

```bash
pnpm build     # Build optimized production bundle
pnpm preview   # Preview production build locally
```

Deploy to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting platform

---

## 🤝 Need Help?

- **Documentation**: [docs.replyke.com](https://docs.replyke.com)
- **Support**: [support.replyke.com](https://support.replyke.com)
- **Dashboard**: [dashboard.replyke.com](https://dashboard.replyke.com)

---

## 📄 License

MIT License - Free to use, modify, and deploy however you want.

---

<div align="center">

**Part of [LaunchKit](../../README.md) by [Replyke](https://replyke.com)**

</div>
