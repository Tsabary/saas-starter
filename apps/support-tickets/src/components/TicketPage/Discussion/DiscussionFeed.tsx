"use client";

import { useMemo } from "react";
import { useCommentSection } from "@replyke/react-js";
import { AnswerThread } from "./AnswerThread/AnswerThread";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { buildCommentTree } from "@/lib/discussion-helpers";

export function DiscussionFeed() {
  const { comments, newComments, loading, highlightedComment } =
    useCommentSection();

  // Combine new comments with loaded comments
  const allComments = useMemo(() => {
    const combined = [...(newComments || []), ...(comments || [])];

    // If there's a highlighted comment, filter it out from the main list
    // (it will be shown separately at the top)
    if (highlightedComment) {
      return combined.filter((c) => c.id !== highlightedComment.comment.id);
    }

    return combined;
  }, [newComments, comments, highlightedComment]);

  // Get top-level comments (no parent)
  const topLevelComments = useMemo(() => {
    return buildCommentTree(allComments);
  }, [allComments]);

  // Show loading state
  if (loading && topLevelComments.length === 0) {
    return <LoadingState />;
  }

  // Show empty state
  if (topLevelComments.length === 0 && !highlightedComment) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-2">
      {/* Highlighted comment (if any) */}
      {highlightedComment && (
        <div className="mb-8">
          <AnswerThread comment={highlightedComment.comment} depth={0} />
        </div>
      )}

      {/* Regular comments */}
      {topLevelComments.map((comment) => (
        <AnswerThread key={comment.id} comment={comment} depth={0} />
      ))}
    </div>
  );
}
