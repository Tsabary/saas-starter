# 📝 Blog Starter

**A modern content platform with social features—ready to deploy in 5 minutes**

Built with Next.js 15 and powered by [Replyke](https://replyke.com).

---

## 🌐 Live Demo

See it in action: **[blog.replyke.com](https://blog.replyke.com)**

---

![Blog Homepage](./screenshots/homepage.png)

## What You Get

This is a complete, production-ready blog application with:

✅ **Article Management**
- Create, edit, and publish articles with rich markdown editor
- SEO-friendly URLs with slugs
- Author profiles and attribution

✅ **Social Features**
- Threaded comments on every article
- Upvote/downvote system
- User authentication via Replyke

✅ **Modern UX**
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Smooth animations and transitions
- Toast notifications

✅ **Production Features**
- TypeScript for type safety
- PostHog analytics integration
- Google Analytics support
- Sitemap generation

---

## 🚀 Quick Start (5 Minutes)

### 1. Get Your Replyke Project ID

1. Go to [dashboard.replyke.com](https://dashboard.replyke.com)
2. Create a new project
3. Copy your Project ID

### 2. Set Up Environment Variables

Create a `.env` file in the `apps/blog` directory:

```bash
NEXT_PUBLIC_REPLYKE_PROJECT_ID=your_project_id_here
```

### 3. Install and Run

```bash
# From the blog directory
pnpm install
pnpm dev
```

Your blog will be running at `http://localhost:3000` 🎉

---

![Article with Comments](./screenshots/article-detail.png)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **React 19** | UI library with Server Components |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling and responsive design |
| **Replyke** | Authentication, comments, voting |
| **Radix UI + shadcn/ui** | Accessible component primitives |
| **Framer Motion** | Animations |
| **PostHog** | Analytics (optional) |

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── articles/          # Article pages
│   ├── create-post/       # Article creation
│   └── page.tsx           # Homepage
├── components/
│   ├── home/              # Homepage components
│   ├── article/           # Article display
│   ├── AuthDialog/        # Login/signup
│   └── ui/                # shadcn/ui components
├── context/               # React context providers
├── hooks/                 # Custom React hooks
└── lib/                   # Utilities and helpers
```

---

## 🔐 Authentication

This starter uses **Replyke's built-in authentication**—users can sign up and log in without any additional setup.

### Want to Use Your Own Auth System?

You can easily integrate this blog with your existing authentication:
- Connect to your user database
- Use third-party providers (Auth0, Clerk, Firebase, etc.)
- Implement custom authentication logic

**Learn how**: [Replyke External Authentication Guide](https://docs.replyke.com/authentication/external-users)

---

## 🎨 Customization

This is **your code**—customize it however you want:

- **Branding**: Update colors in `tailwind.config.ts` and logos in `src/assets/`
- **Layout**: Modify components in `src/components/Layout/`
- **Features**: Add new pages, components, or functionality
- **Styling**: All styles use Tailwind CSS classes
- **Content**: Change the article schema in `src/types/`

---

## 📦 Build for Production

```bash
pnpm build    # Build the Next.js app
pnpm start    # Start production server
```

Deploy to:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

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
