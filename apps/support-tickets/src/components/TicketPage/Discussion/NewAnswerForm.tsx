"use client";

import { useState } from "react";
import { useCommentSection, useUser } from "@replyke/react-js";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

export function NewAnswerForm() {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createComment, callbacks } = useCommentSection();

  const handleSubmit = async () => {
    if (!content.trim() || isSubmitting) return;

    if (!user) {
      callbacks?.loginRequiredCallback?.();
      return;
    }

    setIsSubmitting(true);
    try {
      await createComment?.({
        content: content.trim(),
        mentions: [],
      });
      setContent("");
      toast.success("Answer posted successfully");
    } catch (error) {
      console.error("Error creating answer:", error);
      toast.error("Failed to post answer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-card border-t border-border p-4">
      <h3 className="text-base font-semibold text-foreground mb-3">
        Post an Answer
      </h3>
      <div className="space-y-3">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Share your solution or insights..."
          className="min-h-[100px] resize-none text-sm"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Cmd/Ctrl + Enter
          </span>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            size="sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 mr-1.5" />
                Post Answer
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
