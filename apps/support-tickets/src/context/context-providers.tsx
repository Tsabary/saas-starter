"use client";

import React from "react";
import { ReplykeProvider } from "@replyke/react-js";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "./posthog-provider";
import { Toaster } from "@/components/ui/sonner";

function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <PostHogProvider>
        <ReplykeProvider projectId={process.env.NEXT_PUBLIC_REPLYKE_PROJECT_ID}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReplykeProvider>
      </PostHogProvider>
    </>
  );
}

export default ContextProviders;
