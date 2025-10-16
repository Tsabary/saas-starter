import { Entity, getUserName, useUser } from "@replyke/react-js";
import UpvoteButton from "../shared/UpvoteButton";
import StageBadge from "../shared/StageBadge";
import { Flag } from "lucide-react";
import StageSelector from "./StageSelector";
import { getTimeAgo } from "../../../lib/timeAgo";

function TicketMeta({
  columnId,
  selectedTicket,
  showReportOverlay,
}: {
  columnId: string | null;
  selectedTicket: Entity;
  showReportOverlay: () => void;
}) {
  const { user } = useUser();
  return (
    <div className="flex flex-col divide-y divide-gray-200 dark:divide-zinc-700 p-0">
      <div className="px-3 py-3 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-2">
          <div className="text-xs font-semibold text-gray-600 dark:text-zinc-400">
            Upvotes
          </div>
          <div>
            <UpvoteButton />
          </div>
        </div>
        <div className="flex justify-between items-start gap-2">
          <div className="text-xs font-semibold text-gray-600 dark:text-zinc-400">
            Stage
          </div>
          <div>
            {columnId &&
              (user?.role === "admin" ? (
                <StageSelector columnId={columnId} />
              ) : (
                <StageBadge columnId={columnId} />
              ))}
          </div>
        </div>
      </div>

      <div className="px-3 py-3 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-2">
          <div className="text-xs font-semibold text-gray-600 dark:text-zinc-400">
            Date
          </div>
          <div className="text-xs text-gray-900 dark:text-gray-100">
            {getTimeAgo(new Date(selectedTicket.createdAt))}
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="text-xs font-semibold text-gray-600 dark:text-zinc-400">
            Author
          </div>
          <div className="text-xs text-gray-900 dark:text-gray-100">
            {getUserName(selectedTicket.user!)}
          </div>
        </div>
      </div>

      <div className="px-3 py-3">
        <button
          onClick={showReportOverlay}
          className="flex items-center text-xs text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 transition-colors"
        >
          <Flag className="size-3 mr-1.5" /> Report this ticket
        </button>
      </div>
    </div>
  );
}

export default TicketMeta;
