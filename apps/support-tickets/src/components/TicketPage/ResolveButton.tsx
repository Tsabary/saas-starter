"use client";

import { useState } from "react";
import { useEntity, useUser, useUpdateEntity } from "@replyke/react-js";
import { Button } from "@/components/ui/button";
import { CheckCircle, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { isTicketAuthor, isAdminOrEditor } from "@/lib/ticket-helpers";
import { TICKET_STATUS } from "@/lib/constants";
import type { TicketStatus } from "@/types/ticket";

export function ResolveButton() {
  const { entity, setEntity } = useEntity();
  const { user } = useUser();
  const updateEntity = useUpdateEntity();

  const [isUpdating, setIsUpdating] = useState(false);

  if (!entity || !user) return null;

  const metadata = entity.metadata as any;
  const isAuthor = isTicketAuthor(user.id, entity.user?.id);
  const isAdminEditor = isAdminOrEditor(user);

  // Only author or admin/editor can change status
  if (!isAuthor && !isAdminEditor) return null;

  const currentStatus = metadata.status as TicketStatus;
  const isResolved = currentStatus === TICKET_STATUS.RESOLVED;

  const handleToggle = async () => {
    try {
      setIsUpdating(true);

      const newStatus = isResolved ? TICKET_STATUS.OPEN : TICKET_STATUS.RESOLVED;
      const updatedMetadata = {
        ...metadata,
        status: newStatus,
        resolvedAt: isResolved ? null : new Date().toISOString(),
        resolvedBy: isResolved ? null : user.id,
      };

      const updatedEntity = await updateEntity({
        entityId: entity.id,
        update: {
          metadata: updatedMetadata,
        },
      });

      setEntity?.(updatedEntity);
      toast.success(isResolved ? "Ticket reopened" : "Ticket marked as resolved");
    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast.error("Failed to update ticket status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={isUpdating}
      size="sm"
      variant={isResolved ? "outline" : "default"}
      className={!isResolved ? "bg-success hover:bg-success/90" : ""}
    >
      {isUpdating ? (
        <>
          <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          {isResolved ? "Reopening..." : "Resolving..."}
        </>
      ) : (
        <>
          {isResolved ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Reopen Ticket
            </>
          ) : (
            <>
              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
              Mark as Resolved
            </>
          )}
        </>
      )}
    </Button>
  );
}
