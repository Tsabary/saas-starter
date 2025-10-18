import { Reply } from "lucide-react";

interface ReplyButtonProps {
  hasReplies: boolean;
  replyCount: number;
  onClick: () => void;
}

export function ReplyButton({
  hasReplies,
  replyCount,
  onClick,
}: ReplyButtonProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <button
        onClick={onClick}
        className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-2 py-1 rounded transition-all -ml-2"
      >
        <Reply className="w-4 h-4" />
        <span className="font-medium">Reply</span>
      </button>
      {hasReplies && (
        <span className="text-gray-500 dark:text-gray-500">
          {replyCount} {replyCount === 1 ? "reply" : "replies"}
        </span>
      )}
    </div>
  );
}
