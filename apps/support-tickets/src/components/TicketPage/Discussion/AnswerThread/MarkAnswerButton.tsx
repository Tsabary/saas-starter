"use client";

import { useState } from "react";
import { Comment } from "@replyke/react-js";
import { Check, X, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAcceptedAnswer } from "@/hooks/useAcceptedAnswer";

interface MarkAnswerButtonProps {
  comment: Comment;
}

export function MarkAnswerButton({ comment }: MarkAnswerButtonProps) {
  const {
    isAcceptedAnswer,
    canMarkAnswers,
    markAsAccepted,
    unmarkAsAccepted,
    isProcessing,
  } = useAcceptedAnswer();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showUnmarkDialog, setShowUnmarkDialog] = useState(false);

  const isAccepted = isAcceptedAnswer(comment);

  // Don't show button if user can't mark answers
  if (!canMarkAnswers()) {
    return null;
  }

  // Don't show button for nested replies (only allow top-level comments)
  if (comment.parentId) {
    return null;
  }

  const handleMark = async () => {
    setShowConfirmDialog(false);
    await markAsAccepted(comment);
  };

  const handleUnmark = async () => {
    setShowUnmarkDialog(false);
    await unmarkAsAccepted(comment);
  };

  if (isAccepted) {
    return (
      <>
        <button
          onClick={() => setShowUnmarkDialog(true)}
          disabled={isProcessing}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-colors text-success hover:bg-success/10 disabled:opacity-50"
        >
          {isProcessing ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <X className="w-3 h-3" />
          )}
          Unmark Answer
        </button>

        <AlertDialog open={showUnmarkDialog} onOpenChange={setShowUnmarkDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unmark Accepted Answer?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove the accepted answer mark from this comment and
                reopen the ticket. You can mark a different answer later.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleUnmark}>
                Unmark Answer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowConfirmDialog(true)}
        disabled={isProcessing}
        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-colors text-muted-foreground hover:text-success hover:bg-success/10 disabled:opacity-50"
      >
        {isProcessing ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <Check className="w-3 h-3" />
        )}
        Mark as Answer
      </button>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as Accepted Answer?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark this comment as the accepted answer and
              automatically resolve the ticket. You can unmark it later if
              needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleMark}
              className="bg-green-600 hover:bg-green-700"
            >
              Mark as Answer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
