import { Entity, useEntity } from "@replyke/react-js";
import { MessageSquare } from "lucide-react";
import UpvoteButton from "../shared/UpvoteButton";

function SingleTicket({
  setSelectedTicket,
}: {
  setSelectedTicket: (ticket: Entity) => void;
}) {
  const { entity: ticket } = useEntity();

  if (!ticket) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-md p-2.5 hover:border-gray-300 dark:hover:border-zinc-600 transition-colors group">
      <button
        onClick={() => setSelectedTicket(ticket)}
        className="cursor-pointer block w-full text-left mb-2"
      >
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug">
          {ticket.title}
        </h3>
      </button>

      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-1 text-gray-500 dark:text-zinc-400">
          <MessageSquare className="h-3.5 w-3.5" />
          <span className="text-xs">{ticket.repliesCount}</span>
        </div>
        <UpvoteButton />
      </div>
    </div>
  );
}

export default SingleTicket;
