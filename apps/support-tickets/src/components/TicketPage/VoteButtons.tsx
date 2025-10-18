"use client";

import { useEntity, useUser } from "@replyke/react-js";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatVoteCount } from "@/lib/ticket-helpers";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function VoteButtons({ className, size = "md" }: VoteButtonsProps) {
  const { user } = useUser();
  const {
    entity,
    upvoteEntity,
    downvoteEntity,
    removeEntityUpvote,
    removeEntityDownvote,
    userUpvotedEntity,
    userDownvotedEntity,
  } = useEntity();

  if (!entity) return null;

  const voteCount =
    (entity.upvotes?.length || 0) - (entity.downvotes?.length || 0);

  const handleUpvote = async () => {
    if (!user) {
      toast.error("Please sign in to vote");
      return;
    }

    try {
      if (userUpvotedEntity) {
        await removeEntityUpvote?.();
      } else {
        await upvoteEntity?.();
      }
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to vote. Please try again.");
    }
  };

  const handleDownvote = async () => {
    if (!user) {
      toast.error("Please sign in to vote");
      return;
    }

    try {
      if (userDownvotedEntity) {
        await removeEntityDownvote?.();
      } else {
        await downvoteEntity?.();
      }
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to vote. Please try again.");
    }
  };

  const sizeClasses = {
    sm: {
      button: "h-7 w-7",
      icon: "w-3.5 h-3.5",
      text: "text-xs",
    },
    md: {
      button: "h-8 w-8",
      icon: "w-4 h-4",
      text: "text-sm",
    },
    lg: {
      button: "h-10 w-10",
      icon: "w-4 h-4",
      text: "text-base",
    },
  };

  return (
    <div className={cn("flex flex-col items-center gap-1.5", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={handleUpvote}
        className={cn(
          sizeClasses[size].button,
          userUpvotedEntity &&
            "bg-success-muted border-success text-success hover:bg-success-muted"
        )}
        aria-label="Upvote"
      >
        <ArrowUp className={sizeClasses[size].icon} />
      </Button>

      <span
        className={cn(
          "font-semibold",
          sizeClasses[size].text,
          voteCount > 0 && "text-success",
          voteCount < 0 && "text-destructive"
        )}
      >
        {formatVoteCount(voteCount)}
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={handleDownvote}
        className={cn(
          sizeClasses[size].button,
          userDownvotedEntity &&
            "bg-destructive/10 border-destructive text-destructive hover:bg-destructive/20"
        )}
        aria-label="Downvote"
      >
        <ArrowDown className={sizeClasses[size].icon} />
      </Button>
    </div>
  );
}
