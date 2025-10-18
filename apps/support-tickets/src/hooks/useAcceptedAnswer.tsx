import { useAcceptedAnswerContext } from "@/context/AcceptedAnswerContext";
import { Comment } from "@replyke/react-js";
import { isAcceptedAnswer as checkIsAcceptedAnswer } from "@/lib/discussion-helpers";

/**
 * Hook to access accepted answer functionality
 */
export function useAcceptedAnswer() {
  const context = useAcceptedAnswerContext();

  /**
   * Check if a specific comment is the accepted answer
   */
  const isAcceptedAnswer = (comment: Comment): boolean => {
    // Check both local metadata and context state
    return (
      checkIsAcceptedAnswer(comment) ||
      comment.id === context.acceptedAnswerId
    );
  };

  /**
   * Check if the current user can mark answers
   * (i.e., they are the ticket author)
   */
  const canMarkAnswers = (): boolean => {
    return context.isUserTicketAuthor;
  };

  return {
    acceptedAnswerId: context.acceptedAnswerId,
    isUserTicketAuthor: context.isUserTicketAuthor,
    markAsAccepted: context.markAsAccepted,
    unmarkAsAccepted: context.unmarkAsAccepted,
    isProcessing: context.isProcessing,
    isAcceptedAnswer,
    canMarkAnswers,
  };
}
