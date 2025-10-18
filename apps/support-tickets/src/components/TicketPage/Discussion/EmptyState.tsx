import { MessageSquare } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4" />
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
        No answers yet
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
        Be the first to help by posting an answer below.
      </p>
    </div>
  );
}
