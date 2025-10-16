# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Replyke SaaS starter monorepo containing two applications that demonstrate Replyke's social feature integrations:
- **Blog** (`apps/blog`): A Next.js 15 blog application with comments and social features
- **Roadmap** (`apps/roadmap`): A Vite + React multi-topic forum/board where users can post, vote, and comment

Both apps use Replyke (https://replyke.com) to provide social features like comments, voting, and community interactions.

## Monorepo Structure

This is a pnpm workspace monorepo. The workspace is defined in `pnpm-workspace.yaml` with packages at `apps/*`.

## Development Commands

### Running Applications
```bash
# Development
pnpm dev:blog           # Start blog in dev mode (Next.js dev server)
pnpm dev:roadmap        # Start roadmap in dev mode (Vite dev server)

# Building
pnpm build:blog         # Build blog for production
pnpm build:roadmap      # Build roadmap for production

# Production
pnpm start:blog         # Start blog production server
pnpm start:roadmap      # Start roadmap production server
```

### Individual App Commands
You can also work within individual apps:
```bash
# Blog (Next.js)
cd apps/blog
pnpm dev                # Development server
pnpm build              # Production build
pnpm start              # Production server
pnpm lint               # Run ESLint

# Roadmap (Vite)
cd apps/roadmap
pnpm dev                # Development server
pnpm build              # Production build (TypeScript + Vite)
pnpm lint               # Run ESLint
pnpm preview            # Preview production build
```

## Architecture

### Blog App (`apps/blog`)
**Framework:** Next.js 15 (App Router)

**Structure:**
- `src/app/`: Next.js App Router pages and layouts
  - `articles/`: Blog article pages
  - `create-post/`: Article creation interface
  - `layout.tsx`: Root layout with metadata, Google Analytics, and context providers
  - `page.tsx`: Homepage
- `src/components/`: React components organized by feature
  - `home/`: Homepage components
  - `article/`: Article display components
  - `all-articles/`: Article listing components
  - `AuthDialog/`: Authentication UI
  - `Layout/`: Layout components
  - `ui/`: Shadcn/ui components
- `src/context/`: React context providers
  - `context-providers.tsx`: Combines ReplykeProvider, ThemeProvider, and PostHogProvider
  - `posthog-provider.tsx`: PostHog analytics setup
- `src/hooks/`: Custom React hooks (useAuth, useMediaQuery)
- `src/lib/`: Utility functions and helpers
- `src/styles/`: Global styles
- `src/constants/`: Constants and configuration

**Key Configuration:**
- Uses `@/` alias for `./src/`
- Images are unoptimized (suitable for static export)
- ESLint and TypeScript errors ignored during builds (configured in `next.config.mjs`)
- Integrates Replyke via `@replyke/react-js` and `@replyke/comments-threaded-react-js`
- PostHog analytics integration
- Next.js 15 with React 19

### Roadmap App (`apps/roadmap`)
**Framework:** Vite + React 19 (React Router)

**Structure:**
- `src/pages/`: Page components
  - `HomePage.tsx`: Main forum/roadmap view
  - `LoginPage.tsx`, `SignupPage.tsx`: Authentication pages
  - `ChangePasswordPage.tsx`: Password management
  - `AuthSuccessPage.tsx`: Auth callback page
- `src/components/`: React components
  - `Roadmap/`: Main roadmap/forum components
  - `authentication/`: Auth-related components
  - `Layout.tsx`: Main layout wrapper
  - `shared/`: Shared components
  - `ui/`: Shadcn/ui components
- `src/context/`: React context
  - `auth-context.tsx`: Authentication state and operations (sign up, sign in, sign out, change password)
  - `context-provider.tsx`: Wraps AuthProvider and ReplykeProvider
- `src/hooks/`: Custom hooks (useAuth, useMediaQuery)
- `src/lib/`: Utility functions
- `src/config/`: Configuration including axios setup and `useAxiosPrivate` hook
- `src/utils/`: Utility functions (error handling, formatting)
- `src/types/`: TypeScript type definitions
- `AppRoutes.tsx`: React Router configuration

**Key Configuration:**
- Uses `@/` alias for `./src/`
- Routing via React Router with protected routes
- Custom authentication system with JWT tokens
  - Access tokens stored in state
  - Refresh tokens handled via cookies
  - Axios instance configured with interceptors in `config/useAxiosPrivate`
- Integrates Replyke with signed JWT authentication
- Backend API calls made via axios to handle auth and JWT signing

**Important Security Note (from README):**
The roadmap app uses `signedToken` authentication with Replyke. The current implementation signs JWTs on the server (via `config/axios` and backend endpoints). For testing purposes only, Replyke provides `useSignTestingJwt` for client-side JWT signing, but this should NEVER be used in production. Always sign JWTs server-side and rotate secret keys before production deployment.

## Environment Variables

### Blog App (.env)
```
NEXT_PUBLIC_REPLYKE_PROJECT_ID=your_project_id
```

### Roadmap App (.env)
```
VITE_PUBLIC_REPLYKE_PROJECT_ID=your_project_id
VITE_PUBLIC_REPLYKE_SECRET_KEY=your_secret_key
```

Both apps require a Replyke project ID from https://dashboard.replyke.com

## Shared Technologies

Both apps use:
- **UI Components:** Radix UI primitives + Shadcn/ui
- **Styling:** Tailwind CSS with `class-variance-authority` and `tailwind-merge`
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Theme:** `next-themes` for dark mode
- **Notifications:** Sonner for toast notifications
- **Replyke Integration:** `@replyke/react-js` and related packages for social features

## Key Differences Between Apps

| Aspect | Blog | Roadmap |
|--------|------|---------|
| Framework | Next.js 15 (App Router) | Vite + React Router |
| Routing | App Router (file-based) | React Router (component-based) |
| Authentication | Managed via Replyke | Custom auth context with backend |
| Build Tool | Next.js/Turbopack | Vite |
| Replyke Auth | Project ID only | Project ID + signed JWT |
| Analytics | PostHog | None configured |

## Path Aliases

Both apps use the `@/` alias to reference the `src` directory:
```typescript
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
```

## Package Manager

This project uses pnpm with version 10.8.0 (specified in `packageManager` field). Always use `pnpm` commands, not npm or yarn.

## Replyke Integration

Both apps integrate Replyke's social features:
- Comments system with threaded conversations
- Voting/upvoting capabilities
- User feeds and notifications
- Community engagement features

The blog app uses simpler project-based authentication, while the roadmap app implements JWT-based authentication for external user systems integration.
