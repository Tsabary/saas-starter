import { Check } from "lucide-react";
import { Comment } from "@replyke/react-js";
import { getAcceptedAnswerMetadata, formatAcceptedDate } from "@/lib/discussion-helpers";

interface AcceptedAnswerBadgeProps {
  comment: Comment;
}

export function AcceptedAnswerBadge({ comment }: AcceptedAnswerBadgeProps) {
  const metadata = getAcceptedAnswerMetadata(comment);

  if (!metadata) return null;

  return (
    <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-md">
      <div className="flex items-center gap-2 flex-1">
        <div className="flex items-center justify-center w-5 h-5 bg-green-500/20 dark:bg-green-500/30 rounded-full">
          <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">
            Accepted Answer
          </p>
          {metadata.acceptedAt && (
            <p className="text-xs text-green-600/80 dark:text-green-400/70">
              {formatAcceptedDate(metadata.acceptedAt)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
