"use client";

import { TicketRow } from "./TicketRow";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEntityList } from "@replyke/react-js";
import { TicketEntity } from "../../types/ticket";

export function TicketList() {
  const {
    entities: tickets,
    hasMore,
    loadMore,
    loading,
  } = useEntityList({
    listId: "support-tickets-main",
  });

  if (!loading && tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No tickets found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Be the first to create a support ticket!
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 px-4 py-2 bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground">
        <div className="min-w-[50px]">Votes</div>
        <div>Title</div>
        <div className="whitespace-nowrap">Author</div>
        <div className="whitespace-nowrap">Created</div>
        <div className="min-w-[40px] text-right">Replies</div>
      </div>

      {/* Table rows */}
      <div>
        {tickets.map((ticket) => (
          <TicketRow key={ticket.id} ticket={ticket as TicketEntity} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8 border-t border-border">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && hasMore && (
        <div className="flex justify-center py-3 border-t border-border">
          <Button onClick={loadMore} variant="ghost" size="sm">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
