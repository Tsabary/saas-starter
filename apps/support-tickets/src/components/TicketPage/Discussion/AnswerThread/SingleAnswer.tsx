"use client";

import { useState } from "react";
import {
  Comment as CommentType,
  getUserName,
  useCommentSection,
  useUser,
} from "@replyke/react-js";
import { UserAvatar, parseContentWithMentions } from "@replyke/ui-core-react-js";
import { VoteButtons } from "./VoteButtons";
import { ReplyButton } from "./ReplyButton";
import { ToggleRepliesButton } from "./ToggleRepliesButton";
import { AcceptedAnswerBadge } from "./AcceptedAnswerBadge";
import { MarkAnswerButton } from "./MarkAnswerButton";
import { AnswerActionMenu } from "./AnswerActionMenu";
import { NewReplyForm } from "./NewReplyForm";
import { useAcceptedAnswer } from "@/hooks/useAcceptedAnswer";
import { formatDistanceToNow } from "date-fns";

interface SingleAnswerProps {
  comment: CommentType;
  depth: number;
  hasReplies: boolean;
  isCollapsed: boolean;
  replyCount: number;
  isLastReply?: boolean;
  onToggleCollapse: () => void;
}

export function SingleAnswer({
  comment: commentFromSection,
  depth,
  hasReplies,
  isCollapsed,
  replyCount,
  isLastReply = false,
  onToggleCollapse,
}: SingleAnswerProps) {
  const { user } = useUser();
  const { callbacks, highlightedComment } = useCommentSection();
  const { isAcceptedAnswer } = useAcceptedAnswer();
  const [comment, setComment] = useState(commentFromSection);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const maxDepth = 6;
  const actualDepth = Math.min(depth, maxDepth);
  const indentationPx = actualDepth * 32; // Clear hierarchy (32px per level)

  const isAccepted = isAcceptedAnswer(comment);
  const isHighlighted = highlightedComment?.comment.id === comment.id;
  const isCommentAuthor = user?.id === comment.userId;

  // Format timestamp
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  });

  return (
    <div
      style={{ marginLeft: `${indentationPx}px` }}
      className={`relative mb-2 ${
        isHighlighted
          ? "bg-info-muted"
          : isAccepted
          ? "bg-green-50/50 dark:bg-green-950/20"
          : ""
      } rounded-lg transition-colors`}
    >
      <div className="py-3">
        {/* Accepted answer badge */}
        {isAccepted && <AcceptedAnswerBadge comment={comment} />}

        <div className="flex gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <UserAvatar user={comment.user} size={32} borderRadius={32} />
          </div>

          {/* Content area */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-foreground">
                  {getUserName(comment.user)}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {timeAgo}
                </span>
                {isCollapsed && hasReplies && (
                  <span className="text-info text-xs font-medium">
                    ({replyCount} {replyCount === 1 ? "reply" : "replies"})
                  </span>
                )}
                {hasReplies && (
                  <ToggleRepliesButton
                    isCollapsed={isCollapsed}
                    onToggleCollapse={onToggleCollapse}
                  />
                )}
              </div>
              <AnswerActionMenu comment={comment} />
            </div>

            {!isCollapsed && (
              <>
                {/* Comment content */}
                {comment.content && (
                  <p className="text-sm text-foreground mb-2 leading-normal">
                    {parseContentWithMentions(
                      comment.content,
                      comment.mentions,
                      user?.id,
                      callbacks?.currentUserClickCallback,
                      callbacks?.otherUserClickCallback
                    )}
                  </p>
                )}

                {/* GIF if present */}
                {comment.gif && (
                  <img
                    src={comment.gif.gifUrl}
                    alt={comment.gif.altText}
                    className="rounded mb-2 max-w-xs"
                    style={{
                      width:
                        comment.gif.aspectRatio > 1
                          ? 250
                          : 250 * comment.gif.aspectRatio,
                      height:
                        comment.gif.aspectRatio < 1
                          ? 250
                          : 250 / comment.gif.aspectRatio,
                    }}
                  />
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ReplyButton
                      hasReplies={hasReplies}
                      replyCount={replyCount}
                      onClick={() => setShowReplyForm((prev) => !prev)}
                    />
                    <MarkAnswerButton comment={comment} />
                  </div>
                  <VoteButtons comment={comment} size="small" />
                </div>

                {/* Reply form */}
                {showReplyForm && (
                  <div className="mt-3">
                    <NewReplyForm
                      comment={comment}
                      onCancel={() => setShowReplyForm(false)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
