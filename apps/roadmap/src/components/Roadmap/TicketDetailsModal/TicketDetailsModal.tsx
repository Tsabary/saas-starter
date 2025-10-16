import { useState } from "react";
import { Entity } from "@replyke/react-js";
import { DialogContent } from "@/components/ui/dialog";
import { ThreadedCommentSection } from "@replyke/comments-threaded-react-js";
import { AnimatePresence } from "framer-motion";
import ReportTicketView from "./ReportTicketView";
import TicketMeta from "./TicketMeta";
import TicketContent from "./TicketContent";

function TicketDetailsModal({
  selectedTicket,
  columnId,
}: {
  selectedTicket: Entity | null;
  columnId: string | null;
}) {
  const [showReportOverlay, setShowReportOverlay] = useState(false);

  if (!selectedTicket) return null;

  return (
    <DialogContent className="sm:max-w-5xl p-0 min-h-2/3 max-h-4/5 overflow-hidden">
      <div className="grid grid-cols-3 w-full divide-x divide-gray-200 relative">
        <div className="col-span-2 flex flex-col divide-y divide-gray-200 gap-8">
          <TicketContent selectedTicket={selectedTicket} />
          <ThreadedCommentSection entity={selectedTicket} />
        </div>

        <TicketMeta
          columnId={columnId}
          selectedTicket={selectedTicket}
          showReportOverlay={() => setShowReportOverlay(true)}
        />

        {/* Animated overlay */}
        <AnimatePresence>
          {showReportOverlay && (
            <ReportTicketView
              hideReportTicketView={() => setShowReportOverlay(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </DialogContent>
  );
}

export default TicketDetailsModal;
