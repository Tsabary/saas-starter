"use client";

import React, { createContext, useState, useCallback, ReactNode } from "react";
import {
  useEntity,
  useUser,
  useUpdateComment,
  Comment,
} from "@replyke/react-js";
import { toast } from "sonner";
import { isTicketAuthor } from "@/lib/discussion-helpers";
import { AnswerMetadata } from "@/types/discussion";
import { TicketMetadata } from "@/types/ticket";

interface AcceptedAnswerContextValue {
  acceptedAnswerId: string | null;
  ticketAuthorId: string | undefined;
  isUserTicketAuthor: boolean;
  markAsAccepted: (comment: Comment) => Promise<void>;
  unmarkAsAccepted: (comment: Comment) => Promise<void>;
  isProcessing: boolean;
}

const AcceptedAnswerContext = createContext<
  AcceptedAnswerContextValue | undefined
>(undefined);

interface AcceptedAnswerProviderProps {
  children: ReactNode;
  ticketAuthorId?: string;
  initialAcceptedAnswerId?: string | null;
  onAnswerAccepted?: (commentId: string) => void;
}

export function AcceptedAnswerProvider({
  children,
  ticketAuthorId,
  initialAcceptedAnswerId,
  onAnswerAccepted,
}: AcceptedAnswerProviderProps) {
  const { user } = useUser();
  const { entity, updateEntity } = useEntity();
  const updateComment = useUpdateComment();

  const [acceptedAnswerId, setAcceptedAnswerId] = useState<string | null>(
    initialAcceptedAnswerId || null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const isUserTicketAuthor = isTicketAuthor(user?.id, ticketAuthorId);

  /**
   * Mark a comment as the accepted answer
   * This will:
   * 1. Update the comment's metadata to mark it as accepted
   * 2. Update the ticket's metadata to reference the accepted answer
   * 3. Auto-resolve the ticket
   */
  const markAsAccepted = useCallback(
    async (comment: Comment) => {
      if (!isUserTicketAuthor) {
        toast.error("Only the ticket author can mark an answer as accepted");
        return;
      }

      if (isProcessing) return;

      try {
        setIsProcessing(true);

        // Update comment metadata
        const answerMetadata: AnswerMetadata = {
          isAcceptedAnswer: true,
          acceptedAt: new Date().toISOString(),
          acceptedBy: user?.id,
        };

        await updateComment({
          commentId: comment.id,
          content: comment.content || "",
          metadata: {
            ...comment.metadata,
            ...answerMetadata,
          } as any,
        });

        // Update ticket metadata - mark as resolved and reference accepted answer
        if (entity && updateEntity) {
          const currentMetadata = entity.metadata as TicketMetadata;
          const updatedMetadata: TicketMetadata = {
            ...currentMetadata,
            status: "resolved",
            resolvedAt: new Date().toISOString(),
            resolvedBy: user?.id,
            acceptedAnswerId: comment.id,
          };

          await updateEntity({
            update: {
              metadata: updatedMetadata as any,
            },
          });
        }

        // Update local state
        setAcceptedAnswerId(comment.id);

        // Notify parent
        onAnswerAccepted?.(comment.id);

        toast.success("Answer marked as accepted and ticket resolved");
      } catch (error) {
        console.error("Error marking answer as accepted:", error);
        toast.error("Failed to mark answer as accepted");
      } finally {
        setIsProcessing(false);
      }
    },
    [
      isUserTicketAuthor,
      isProcessing,
      updateComment,
      entity,
      updateEntity,
      user,
      onAnswerAccepted,
    ]
  );

  /**
   * Remove the accepted answer mark from a comment
   * This will also reopen the ticket
   */
  const unmarkAsAccepted = useCallback(
    async (comment: Comment) => {
      if (!isUserTicketAuthor) {
        toast.error("Only the ticket author can unmark an accepted answer");
        return;
      }

      if (isProcessing) return;

      try {
        setIsProcessing(true);

        // Update comment metadata
        const answerMetadata: AnswerMetadata = {
          isAcceptedAnswer: false,
          acceptedAt: undefined,
          acceptedBy: undefined,
        };

        await updateComment({
          commentId: comment.id,
          content: comment.content || "",
          metadata: {
            ...comment.metadata,
            ...answerMetadata,
          } as any,
        });

        // Update ticket metadata - reopen ticket
        if (entity && updateEntity) {
          const currentMetadata = entity.metadata as TicketMetadata;
          const updatedMetadata: TicketMetadata = {
            ...currentMetadata,
            status: "open",
            resolvedAt: null,
            resolvedBy: null,
            acceptedAnswerId: null,
          };

          await updateEntity({
            update: {
              metadata: updatedMetadata as any,
            },
          });
        }

        // Update local state
        setAcceptedAnswerId(null);

        // Notify parent
        onAnswerAccepted?.(null as any);

        toast.success("Accepted answer removed and ticket reopened");
      } catch (error) {
        console.error("Error unmarking accepted answer:", error);
        toast.error("Failed to unmark accepted answer");
      } finally {
        setIsProcessing(false);
      }
    },
    [
      isUserTicketAuthor,
      isProcessing,
      updateComment,
      entity,
      updateEntity,
      onAnswerAccepted,
    ]
  );

  const value: AcceptedAnswerContextValue = {
    acceptedAnswerId,
    ticketAuthorId,
    isUserTicketAuthor,
    markAsAccepted,
    unmarkAsAccepted,
    isProcessing,
  };

  return (
    <AcceptedAnswerContext.Provider value={value}>
      {children}
    </AcceptedAnswerContext.Provider>
  );
}

export function useAcceptedAnswerContext() {
  const context = React.useContext(AcceptedAnswerContext);
  if (context === undefined) {
    throw new Error(
      "useAcceptedAnswerContext must be used within AcceptedAnswerProvider"
    );
  }
  return context;
}

export default AcceptedAnswerContext;
