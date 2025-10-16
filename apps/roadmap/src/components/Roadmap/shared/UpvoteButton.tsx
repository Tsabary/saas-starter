import { useEntity } from "@replyke/react-js";
import { ChevronUp } from "lucide-react";
import { cn } from "../../../lib/utils";

function UpvoteButton() {
  const {
    entity: ticket,
    userUpvotedEntity,
    upvoteEntity,
    removeEntityUpvote,
  } = useEntity();

  if (!ticket) return null;
  return (
    <button
      onClick={userUpvotedEntity ? removeEntityUpvote : upvoteEntity}
      className={cn(
        "flex items-center gap-0.5 rounded-md px-1 py-0.5 transition-all cursor-pointer text-xs font-semibold",
        userUpvotedEntity
          ? "bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700"
          : "bg-transparent border border-gray-300 dark:border-zinc-600 text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:border-gray-400 dark:hover:border-zinc-500"
      )}
    >
      <ChevronUp className="h-3.5 w-3.5" />
      <span>{ticket.upvotes.length}</span>
    </button>
  );
}

export default UpvoteButton;
