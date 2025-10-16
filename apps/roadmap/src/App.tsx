import { Toaster } from "@/components/ui/sonner";
import AppRoutes from "./AppRoutes";
import { ReplykeProvider } from "@replyke/react-js";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ReplykeProvider
        projectId={import.meta.env.VITE_PUBLIC_REPLYKE_PROJECT_ID}
      >
        <Toaster />
        <AppRoutes />
      </ReplykeProvider>
    </ThemeProvider>
  );
}

export default App;
