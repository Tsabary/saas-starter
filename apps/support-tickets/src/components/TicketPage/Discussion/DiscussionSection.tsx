"use client";

import { CommentSectionProvider } from "@replyke/react-js";
import { AcceptedAnswerProvider } from "@/context/AcceptedAnswerContext";
import { DiscussionFeed } from "./DiscussionFeed";
import { NewAnswerForm } from "./NewAnswerForm";
import { DiscussionCallbacks } from "@/types/discussion";

interface DiscussionSectionProps {
  entityId: string;
  ticketAuthorId?: string;
  acceptedAnswerId?: string | null;
  callbacks?: DiscussionCallbacks;
  highlightedCommentId?: string | null;
}

export function DiscussionSection({
  entityId,
  ticketAuthorId,
  acceptedAnswerId,
  callbacks,
  highlightedCommentId,
}: DiscussionSectionProps) {
  return (
    <CommentSectionProvider
      entityId={entityId}
      callbacks={callbacks as any}
      highlightedCommentId={highlightedCommentId}
    >
      <AcceptedAnswerProvider
        ticketAuthorId={ticketAuthorId}
        initialAcceptedAnswerId={acceptedAnswerId}
        onAnswerAccepted={callbacks?.onAnswerAccepted}
      >
        <div className="flex flex-col min-h-[400px]">
          {/* Discussion Feed */}
          <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-950 py-6 px-4">
            <DiscussionFeed />
          </div>

          {/* New Answer Form */}
          <NewAnswerForm />
        </div>
      </AcceptedAnswerProvider>
    </CommentSectionProvider>
  );
}
