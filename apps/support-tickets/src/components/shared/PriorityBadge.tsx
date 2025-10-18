import { cn } from "@/lib/utils";
import { getPriorityColor } from "@/lib/ticket-helpers";
import type { TicketPriority } from "@/types/ticket";
import { AlertCircle } from "lucide-react";

interface PriorityBadgeProps {
  priority: TicketPriority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  if (!priority) return null;

  const colors = getPriorityColor(priority);
  const label = priority.charAt(0).toUpperCase() + priority.slice(1);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0 rounded text-xs font-medium border",
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      <AlertCircle className="w-3 h-3" />
      {label}
    </span>
  );
}
