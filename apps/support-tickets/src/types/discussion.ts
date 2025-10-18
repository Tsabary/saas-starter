import { Comment, User } from "@replyke/react-js";

/**
 * Extended metadata for answers (comments in support ticket context)
 */
export interface AnswerMetadata {
  isAcceptedAnswer?: boolean;
  acceptedAt?: string;
  acceptedBy?: string; // User ID who accepted the answer
}

/**
 * Style configuration for discussion components
 */
export interface DiscussionStyleConfig {
  // Avatar and user info
  authorAvatarSize: number;
  authorFontSize: number;
  authorFontWeight: number;
  authorFontColor: string;

  // Timestamps
  fromNowFontSize: number;
  fromNowFontColor: string;

  // Comment body
  commentBodyFontSize: number;
  commentBodyFontColor: string;

  // Spacing
  horizontalItemsGap: number;
  verticalItemsGap: number;

  // Visual elements
  threadingLineColor: string;
  backgroundColor: string;
}

/**
 * Callbacks for discussion interactions
 */
export interface DiscussionCallbacks {
  loginRequiredCallback?: () => void;
  usernameRequiredCallback?: () => void;
  currentUserClickCallback?: () => void;
  otherUserClickCallback?: (userId: string) => void;
  onAnswerAccepted?: (commentId: string) => void;
}

/**
 * Props for DiscussionSection component
 */
export interface DiscussionSectionProps {
  entityId: string;
  ticketAuthorId?: string;
  acceptedAnswerId?: string | null;
  callbacks?: DiscussionCallbacks;
  styleConfig?: Partial<DiscussionStyleConfig>;
  highlightedCommentId?: string | null;
}

/**
 * Props for answer display components
 */
export interface AnswerDisplayProps {
  comment: Comment;
  depth: number;
  hasReplies: boolean;
  isCollapsed: boolean;
  replyCount: number;
  isLastReply?: boolean;
  onToggleCollapse: () => void;
  isAccepted?: boolean;
  isTicketAuthor?: boolean;
}

/**
 * Props for answer action components
 */
export interface AnswerActionProps {
  comment: Comment;
  isTicketAuthor?: boolean;
  isCommentAuthor?: boolean;
}
