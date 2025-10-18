"use client";

import Link from "next/link";
import { useUser } from "@replyke/react-js";
import { ArrowUp, MessageSquare } from "lucide-react";
import { formatVoteCount, isAdminOrEditor, getTicketPath } from "@/lib/ticket-helpers";
import { formatTimeAgo } from "@/lib/time-formatters";
import { StatusBadge } from "../shared/StatusBadge";
import { CategoryBadge } from "../shared/CategoryBadge";
import { PriorityBadge } from "../shared/PriorityBadge";
import type { TicketEntity } from "@/types/ticket";
import { cn } from "@/lib/utils";

interface TicketRowProps {
  ticket: TicketEntity;
}

export function TicketRow({ ticket }: TicketRowProps) {
  const { user } = useUser();
  const showPriority = isAdminOrEditor(user);

  const voteCount = (ticket.upvotes?.length || 0) - (ticket.downvotes?.length || 0);
  const commentCount = ticket.repliesCount || 0;
  const ticketPath = getTicketPath({ title: ticket.title, shortId: ticket.shortId });

  return (
    <Link
      href={ticketPath}
      className="group grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 px-4 py-2.5 border-b border-border hover:bg-muted/50 transition-colors text-sm"
    >
      {/* Vote count */}
      <div className="flex items-center gap-1.5 text-muted-foreground min-w-[50px]">
        <div className={cn(
          "flex items-center justify-center w-6 h-6 rounded",
          voteCount > 0 ? "bg-success-muted text-success" : "bg-muted"
        )}>
          <ArrowUp className="w-3.5 h-3.5" />
        </div>
        <span className="font-medium text-xs">
          {formatVoteCount(voteCount)}
        </span>
      </div>

      {/* Title and badges */}
      <div className="flex items-center gap-2 min-w-0">
        <h3 className="font-medium text-foreground group-hover:text-info transition-colors truncate">
          {ticket.title}
        </h3>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <StatusBadge status={ticket.metadata.status} />
          <CategoryBadge category={ticket.metadata.category} />
          {showPriority && ticket.metadata.priority && (
            <PriorityBadge priority={ticket.metadata.priority} />
          )}
        </div>
      </div>

      {/* Author */}
      <div className="text-muted-foreground text-xs whitespace-nowrap">
        {ticket.user?.username || ticket.user?.name || "Anonymous"}
      </div>

      {/* Date */}
      <div className="text-muted-foreground text-xs whitespace-nowrap">
        {formatTimeAgo(ticket.createdAt)}
      </div>

      {/* Comments */}
      <div className="flex items-center gap-1 text-muted-foreground min-w-[40px] justify-end">
        <MessageSquare className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">{commentCount}</span>
      </div>
    </Link>
  );
}
