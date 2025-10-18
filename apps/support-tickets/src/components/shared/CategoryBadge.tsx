import { cn } from "@/lib/utils";
import { getCategoryIcon } from "@/lib/ticket-helpers";
import type { TicketCategory } from "@/types/ticket";
import {
  Bug,
  Lightbulb,
  HelpCircle,
  FileText,
  MessageSquare,
} from "lucide-react";

interface CategoryBadgeProps {
  category: TicketCategory;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const iconName = getCategoryIcon(category);

  const Icon = {
    Bug,
    Lightbulb,
    HelpCircle,
    FileText,
    MessageSquare,
  }[iconName as keyof typeof icons] || MessageSquare;

  const icons = {
    Bug,
    Lightbulb,
    HelpCircle,
    FileText,
    MessageSquare,
  };

  const label =
    category === "feature-request"
      ? "Feature Request"
      : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0 rounded text-xs font-medium",
        "bg-muted text-muted-foreground",
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}
