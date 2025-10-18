import { Plus, Minus } from "lucide-react";

interface ToggleRepliesButtonProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function ToggleRepliesButton({
  isCollapsed,
  onToggleCollapse,
}: ToggleRepliesButtonProps) {
  return (
    <button
      onClick={onToggleCollapse}
      className="ml-1 w-5 h-5 flex items-center justify-center text-muted-foreground bg-muted hover:bg-muted/80 hover:text-foreground rounded transition-all"
      title={isCollapsed ? "Expand thread" : "Collapse thread"}
    >
      {isCollapsed ? (
        <Plus className="w-3 h-3" />
      ) : (
        <Minus className="w-3 h-3" />
      )}
    </button>
  );
}
