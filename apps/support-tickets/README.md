# 🎫 Support Tickets Starter

**A complete Q&A and support ticket system—launch your help center in 5 minutes**

Built with Next.js 15 and powered by [Replyke](https://replyke.com).

---

## 🌐 Live Demo

See it in action: **[support.replyke.com](https://support.replyke.com)**

---

![Support Tickets List](./screenshots/ticket-list.png)

## What You Get

This is a complete, production-ready support ticket and Q&A platform with:

✅ **Ticket Management**
- Create and browse support tickets
- Rich markdown editor for detailed descriptions
- Status tracking (open, in-progress, resolved)
- Priority levels (low, medium, high, critical)
- Category organization (bug, feature request, question, documentation)
- Keyword tagging for better searchability

✅ **Community Features**
- Upvote/downvote tickets to indicate relevance
- Threaded discussions on every ticket
- Mark answers as "accepted solution"
- Auto-resolve tickets when answers are accepted
- User authentication via Replyke

✅ **Advanced Filtering**
- Filter by status, category, and priority
- Search across titles and content
- Sort by hot, new, top, or controversial
- "My Tickets Only" view

✅ **Role-Based Access**
- Admin: Set priority, edit tickets, manage all content
- Moderator: Moderate discussions
- Ticket Author: Mark accepted answers, resolve tickets
- All Users: Create tickets, vote, comment

✅ **Modern UX**
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Smooth animations and transitions
- Toast notifications

✅ **Production Features**
- TypeScript for type safety
- PostHog analytics integration
- Google Analytics support
- SEO-friendly with sitemap generation

---

## 🚀 Quick Start (5 Minutes)

### 1. Get Your Replyke Project ID

1. Go to [dashboard.replyke.com](https://dashboard.replyke.com)
2. Create a new project
3. Copy your Project ID

### 2. Set Up Environment Variables

Create a `.env` file in the `apps/support-tickets` directory:

```bash
NEXT_PUBLIC_REPLYKE_PROJECT_ID=your_project_id_here
```

### 3. Install and Run

```bash
# From the support-tickets directory
pnpm install
pnpm dev
```

Your support portal will be running at `http://localhost:3000` 🎉

---

![Ticket Detail with Accepted Answer](./screenshots/ticket-detail.png)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **React 19** | UI library with Server Components |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling and responsive design |
| **Replyke** | Authentication, tickets, voting, comments |
| **Radix UI + shadcn/ui** | Accessible component primitives |
| **Framer Motion** | Animations |
| **@uiw/react-md-editor** | Markdown editor |
| **PostHog** | Analytics (optional) |

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── tickets/           # Ticket pages
│   ├── create-ticket/     # Ticket creation
│   └── page.tsx           # Homepage (ticket list)
├── components/
│   ├── HomePage/          # Ticket list and filters
│   ├── TicketPage/        # Ticket detail and discussion
│   ├── CreateTicketPage/  # Ticket creation form
│   ├── shared/            # Shared components (badges, etc.)
│   └── ui/                # shadcn/ui components
├── context/               # React context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and helpers
└── types/                 # TypeScript type definitions
```

---

## 🔐 Authentication

This starter uses **Replyke's built-in authentication**—users can sign up and log in without any additional setup.

### Want to Use Your Own Auth System?

You can easily integrate this support system with your existing authentication:
- Connect to your user database
- Use third-party providers (Auth0, Clerk, Firebase, etc.)
- Implement custom authentication logic

**Learn how**: [Replyke External Authentication Guide](https://docs.replyke.com/authentication/external-users)

---

## 🎨 Customization

This is **your code**—customize it however you want:

- **Branding**: Update colors in `tailwind.config.ts` and logos in `src/assets/`
- **Layout**: Modify components in `src/components/Layout/`
- **Ticket Schema**: Customize statuses, priorities, and categories in `src/lib/constants.ts`
- **Features**: Add new filters, views, or functionality
- **Styling**: All styles use Tailwind CSS classes

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
