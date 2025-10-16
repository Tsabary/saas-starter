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
    <div className="flex flex-col divide-y divide-gray-200 p-0">
      <div className="px-4 py-5 flex flex-col gap-4">
        <div className="grid grid-cols-5 items-center">
          <div className="col-span-2 text-sm font-medium text-gray-500">
            Upvoters
          </div>
          <div className="col-span-3">
            <UpvoteButton />
          </div>
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-2 text-sm font-medium text-gray-500">
            Stage
          </div>
          <div className="col-span-3">
            {columnId &&
              (user?.role === "admin" ? (
                <StageSelector columnId={columnId} />
              ) : (
                <StageBadge columnId={columnId} />
              ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-5 flex flex-col gap-4">
        <div className="grid grid-cols-5 items-center">
          <div className="col-span-2 text-sm font-medium text-gray-500">
            Date
          </div>
          <div className="col-span-3 text-xs">
            {getTimeAgo(new Date(selectedTicket.createdAt))}
          </div>
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-2 text-sm font-medium text-gray-500">
            Author
          </div>
          <div className="col-span-3 flex gap-3 text-xs">
            {getUserName(selectedTicket.user!)}
          </div>
        </div>
      </div>

      <div className="px-4 py-5">
        <button
          onClick={showReportOverlay}
          className="flex items-center text-xs text-gray-400 hover:underline"
        >
          <Flag className="size-3 mr-2" /> Report this ticket
        </button>
      </div>
    </div>
  );
}

export default TicketMeta;
