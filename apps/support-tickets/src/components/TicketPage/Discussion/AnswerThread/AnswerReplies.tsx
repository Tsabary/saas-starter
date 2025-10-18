import { Comment as CommentType } from "@replyke/react-js";
import { AnswerThread } from "./AnswerThread";
import { ChevronDown } from "lucide-react";

interface AnswerRepliesProps {
  depth: number;
  isCollapsed: boolean;
  loading: boolean;
  visibleReplies: CommentType[];
  hiddenRepliesCount: number;
  showAllReplies: boolean;
  onShowAllReplies: () => void;
}

export function AnswerReplies({
  depth,
  isCollapsed,
  loading,
  visibleReplies,
  hiddenRepliesCount,
  showAllReplies,
  onShowAllReplies,
}: AnswerRepliesProps) {
  // Don't render anything if collapsed or no replies
  if (isCollapsed || visibleReplies.length === 0) {
    return null;
  }

  return (
    <div>
      {visibleReplies.map((reply: CommentType, index: number) => (
        <AnswerThread
          key={reply.id}
          comment={reply}
          depth={depth + 1}
          isLastReply={index === visibleReplies.length - 1}
        />
      ))}

      {/* Load more replies button */}
      {hiddenRepliesCount > 0 && !showAllReplies && (
        <div className="mt-4 ml-2">
          <button
            onClick={onShowAllReplies}
            className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-3 py-1.5 rounded-full transition-all font-medium"
          >
            <ChevronDown className="w-4 h-4" />
            {hiddenRepliesCount} more{" "}
            {hiddenRepliesCount === 1 ? "reply" : "replies"}
          </button>
        </div>
      )}
    </div>
  );
}
