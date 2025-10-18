"use client";

import { useState } from "react";
import { useCommentSection, useUser, Comment as CommentType } from "@replyke/react-js";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

interface NewReplyFormProps {
  comment: CommentType;
  onCancel: () => void;
}

export function NewReplyForm({ comment, onCancel }: NewReplyFormProps) {
  const { user } = useUser();
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createComment, callbacks } = useCommentSection();

  const handleReply = async () => {
    if (!replyContent.trim() || isSubmitting) return;

    if (!user) {
      callbacks?.loginRequiredCallback?.();
      return;
    }

    setIsSubmitting(true);
    try {
      await createComment?.({
        content: replyContent.trim(),
        parentId: comment.id,
        mentions: [],
      });
      setReplyContent("");
      onCancel();
      toast.success("Reply posted successfully");
    } catch (error) {
      console.error("Error creating reply:", error);
      toast.error("Failed to post reply");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleReply();
    }
  };

  return (
    <div className="bg-muted rounded p-3 border border-border">
      <Textarea
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write your reply..."
        className="min-h-[60px] resize-none text-sm"
        autoFocus
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-muted-foreground">
          Cmd/Ctrl + Enter
        </span>
        <div className="flex gap-1.5">
          <Button
            variant="ghost"
            size="xs"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            size="xs"
            onClick={handleReply}
            disabled={!replyContent.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send className="w-3 h-3 mr-1" />
                Reply
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
