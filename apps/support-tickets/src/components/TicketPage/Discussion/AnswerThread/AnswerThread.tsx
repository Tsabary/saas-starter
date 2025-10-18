"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Comment as CommentType,
  useCommentSection,
  useReplies,
} from "@replyke/react-js";
import { SingleAnswer } from "./SingleAnswer";
import { AnswerReplies } from "./AnswerReplies";
import { useAcceptedAnswer } from "@/hooks/useAcceptedAnswer";

export interface AnswerThreadProps {
  comment: CommentType;
  depth: number;
  isLastReply?: boolean;
}

export function AnswerThread({
  comment,
  depth,
  isLastReply = false,
}: AnswerThreadProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);

  const { sortBy } = useCommentSection();
  const { isAcceptedAnswer } = useAcceptedAnswer();

  const { replies, newReplies, loading, page, setPage } = useReplies({
    commentId: comment.id,
    sortBy: sortBy || "new",
  });

  useEffect(() => {
    // Reset the page when the comment changes
    setPage(1);
  }, [setPage]);

  const initialVisibleReplies = 3;

  const allReplies = useMemo(() => {
    const combined = [...(newReplies || []), ...(replies || [])];
    return combined;
  }, [newReplies, replies]);

  const visibleReplies = useMemo(() => {
    const visible = showAllReplies
      ? allReplies
      : allReplies.slice(0, initialVisibleReplies);
    return visible;
  }, [showAllReplies, allReplies, initialVisibleReplies]);

  const hiddenRepliesCount = Math.max(
    0,
    allReplies.length - initialVisibleReplies
  );

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleShowAllReplies = () => {
    setShowAllReplies(true);
  };

  const hasReplies = allReplies.length > 0;
  const replyCount = allReplies.length;

  // Never collapse accepted answers
  const effectiveIsCollapsed = isAcceptedAnswer(comment) ? false : isCollapsed;

  return (
    <>
      <SingleAnswer
        comment={comment}
        depth={depth}
        hasReplies={hasReplies}
        isCollapsed={effectiveIsCollapsed}
        replyCount={replyCount}
        isLastReply={isLastReply}
        onToggleCollapse={handleToggleCollapse}
      />

      <AnswerReplies
        depth={depth}
        isCollapsed={effectiveIsCollapsed}
        loading={loading}
        visibleReplies={visibleReplies}
        hiddenRepliesCount={hiddenRepliesCount}
        showAllReplies={showAllReplies}
        onShowAllReplies={handleShowAllReplies}
      />
    </>
  );
}
