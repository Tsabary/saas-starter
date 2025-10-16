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
        "flex items-center gap-1 text-primary rounded-md px-1.5 py-0.5 transition-colors cursor-pointer",
        userUpvotedEntity
          ? "bg-green-100 hover:bg-green-200 border border-green-400 text-green-500"
          : "bg-gray-100 hover:bg-gray-200 border border-gray-400 text-gray-500"
      )}
    >
      <ChevronUp className="h-4 w-4" />
      <span className="text-xs font-medium">{ticket.upvotes.length}</span>
    </button>
  );
}

export default UpvoteButton;
