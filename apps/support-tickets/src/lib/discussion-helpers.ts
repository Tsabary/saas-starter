import { Comment } from "@replyke/react-js";
import { AnswerMetadata } from "@/types/discussion";
import { formatDistanceToNow } from "date-fns";

/**
 * Check if the current user is the ticket author
 */
export function isTicketAuthor(
  userId: string | undefined,
  ticketAuthorId: string | undefined
): boolean {
  if (!userId || !ticketAuthorId) return false;
  return userId === ticketAuthorId;
}

/**
 * Check if a comment is marked as the accepted answer
 */
export function isAcceptedAnswer(comment: Comment): boolean {
  const metadata = comment.metadata as AnswerMetadata | undefined;
  return metadata?.isAcceptedAnswer === true;
}

/**
 * Get the accepted answer metadata from a comment
 */
export function getAcceptedAnswerMetadata(
  comment: Comment
): AnswerMetadata | null {
  const metadata = comment.metadata as AnswerMetadata | undefined;
  if (metadata?.isAcceptedAnswer) {
    return metadata;
  }
  return null;
}

/**
 * Format the timestamp for when an answer was accepted
 */
export function formatAcceptedDate(date: string): string {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch (error) {
    return "recently";
  }
}

/**
 * Calculate the depth of a comment in the thread hierarchy
 * Limited to a maximum depth for UI purposes
 */
export function getAnswerDepth(
  comment: Comment,
  allComments: Comment[],
  maxDepth: number = 6
): number {
  let depth = 0;
  let currentComment = comment;

  while (currentComment.parentId && depth < maxDepth) {
    const parent = allComments.find((c) => c.id === currentComment.parentId);
    if (!parent) break;
    depth++;
    currentComment = parent;
  }

  return Math.min(depth, maxDepth);
}

/**
 * Count the number of replies for a comment
 */
export function countReplies(comment: Comment, allComments: Comment[]): number {
  return allComments.filter((c) => c.parentId === comment.id).length;
}

/**
 * Get all replies for a comment (direct children only)
 */
export function getReplies(comment: Comment, allComments: Comment[]): Comment[] {
  return allComments.filter((c) => c.parentId === comment.id);
}

/**
 * Check if a comment has any replies
 */
export function hasReplies(comment: Comment, allComments: Comment[]): boolean {
  return allComments.some((c) => c.parentId === comment.id);
}

/**
 * Build a nested tree structure from flat comment list
 */
export function buildCommentTree(comments: Comment[]): Comment[] {
  // Return only top-level comments (no parent)
  return comments.filter((c) => !c.parentId);
}

/**
 * Get the default style configuration for discussion
 */
export function getDefaultDiscussionStyle() {
  return {
    authorAvatarSize: 40,
    authorFontSize: 15,
    authorFontWeight: 600,
    authorFontColor: "#111827",

    fromNowFontSize: 13,
    fromNowFontColor: "#6B7280",

    commentBodyFontSize: 16,
    commentBodyFontColor: "#374151",

    horizontalItemsGap: 16,
    verticalItemsGap: 24,

    threadingLineColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  };
}
