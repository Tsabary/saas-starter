import { useState } from "react";
import {
  useCommentSection,
  useUser,
  Comment as CommentType,
  useCommentVotes,
} from "@replyke/react-js";
import { ChevronUp, ChevronDown } from "lucide-react";

interface VoteButtonsProps {
  comment: CommentType;
  size?: "small" | "normal";
}

export function VoteButtons({ comment, size = "small" }: VoteButtonsProps) {
  const { user } = useUser();
  const { callbacks } = useCommentSection();
  const [localComment, setLocalComment] = useState(comment);

  const {
    upvoteComment,
    downvoteComment,
    removeCommentUpvote,
    removeCommentDownvote,
  } = useCommentVotes({
    comment: localComment,
    setComment: setLocalComment,
  });

  const upvotes = localComment.upvotes?.length || 0;
  const downvotes = localComment.downvotes?.length || 0;
  const netScore = upvotes - downvotes;

  const userUpvotedComment = !!(user && localComment.upvotes.includes(user.id));
  const userDownvotedComment = !!(
    user && localComment.downvotes.includes(user.id)
  );
  const userVote: "up" | "down" | null = userUpvotedComment
    ? "up"
    : userDownvotedComment
    ? "down"
    : null;

  const handleVote = (voteType: "up" | "down") => {
    if (!user) {
      callbacks?.loginRequiredCallback?.() || alert("Please login first.");
      return;
    }

    if (voteType === "up") {
      if (userUpvotedComment) {
        removeCommentUpvote?.();
      } else {
        upvoteComment?.();
      }
    } else {
      if (userDownvotedComment) {
        removeCommentDownvote?.();
      } else {
        downvoteComment?.();
      }
    }
  };

  const iconSize = size === "small" ? "w-3.5 h-3.5" : "w-4 h-4";
  const padding = size === "small" ? "py-0.5 px-1.5" : "py-1 px-2";

  return (
    <div
      className={`inline-flex items-center bg-muted rounded gap-0.5 ${padding}`}
    >
      {/* Upvote Button */}
      <button
        onClick={() => handleVote("up")}
        className={`p-0.5 rounded transition-all ${
          userVote === "up"
            ? "bg-success text-success-foreground"
            : "hover:bg-success/10 text-muted-foreground hover:text-success"
        }`}
        title="Upvote"
      >
        <ChevronUp className={iconSize} />
      </button>

      {/* Score */}
      <span
        className={`font-semibold min-w-[20px] text-center ${
          size === "small" ? "text-xs" : "text-sm"
        } ${
          netScore > 0
            ? "text-success"
            : netScore < 0
            ? "text-destructive"
            : "text-foreground"
        }`}
      >
        {netScore}
      </span>

      {/* Downvote Button */}
      <button
        onClick={() => handleVote("down")}
        className={`p-0.5 rounded transition-all ${
          userVote === "down"
            ? "bg-destructive text-destructive-foreground"
            : "hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
        }`}
        title="Downvote"
      >
        <ChevronDown className={iconSize} />
      </button>
    </div>
  );
}
