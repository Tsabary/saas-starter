import { cn } from "@/lib/utils";
import { getStatusColor } from "@/lib/ticket-helpers";
import type { TicketStatus } from "@/types/ticket";

interface StatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colors = getStatusColor(status);

  const label = status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0 rounded text-xs font-medium border",
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      {label}
    </span>
  );
}
