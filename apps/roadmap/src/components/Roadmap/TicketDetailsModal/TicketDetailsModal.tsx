import { useState } from "react";
import { Entity } from "@replyke/react-js";
import { DialogContent } from "@/components/ui/dialog";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ThreadedCommentSection } from "@replyke/comments-threaded-react-js";
import { AnimatePresence } from "framer-motion";
import ReportTicketView from "./ReportTicketView";
import TicketMeta from "./TicketMeta";
import TicketContent from "./TicketContent";

function TicketDetailsModal({
  selectedTicket,
  columnId,
  isMobile,
}: {
  selectedTicket: Entity | null;
  columnId: string | null;
  isMobile: boolean;
}) {
  const [showReportOverlay, setShowReportOverlay] = useState(false);

  if (!selectedTicket) return null;

  // Mobile: Drawer layout (stacked)
  if (isMobile) {
    return (
      <DrawerContent className="max-h-[90vh] bg-white dark:bg-zinc-900">
        <div className="relative h-full flex flex-col overflow-hidden">
          <DrawerHeader className="flex-shrink-0 border-b border-gray-200 dark:border-zinc-700">
            <DrawerTitle className="text-lg font-semibold text-gray-900 dark:text-white pr-8">
              {selectedTicket.title}
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto">
            {/* Description */}
            {selectedTicket.content && (
              <div className="p-4 border-b border-gray-200 dark:border-zinc-700">
                <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                  {selectedTicket.content}
                </p>
              </div>
            )}

            {/* Meta info inline */}
            <div className="border-b border-gray-200 dark:border-zinc-700">
              <TicketMeta
                columnId={columnId}
                selectedTicket={selectedTicket}
                showReportOverlay={() => setShowReportOverlay(true)}
              />
            </div>

            {/* Comments */}
            <div className="p-4">
              <ThreadedCommentSection entity={selectedTicket} />
            </div>
          </div>

          {/* Report overlay */}
          <AnimatePresence>
            {showReportOverlay && (
              <ReportTicketView
                hideReportTicketView={() => setShowReportOverlay(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </DrawerContent>
    );
  }

  // Desktop: Modal layout (70/30 split)
  return (
    <DialogContent className="sm:max-w-5xl p-0 min-h-[60vh] max-h-[85vh] overflow-hidden bg-white dark:bg-zinc-900">
      <div className="grid grid-cols-[1fr_300px] w-full divide-x divide-gray-200 dark:divide-zinc-700 relative h-full">
        {/* Content area (70%) - gets more space */}
        <div className="flex flex-col divide-y divide-gray-200 dark:divide-zinc-700 overflow-hidden">
          <TicketContent selectedTicket={selectedTicket} />
          <div className="flex-1 overflow-y-auto p-4">
            <ThreadedCommentSection entity={selectedTicket} />
          </div>
        </div>

        {/* Meta sidebar (30%) - fixed at 300px */}
        <div className="w-[300px] bg-gray-50/50 dark:bg-zinc-900/50 overflow-y-auto">
          <TicketMeta
            columnId={columnId}
            selectedTicket={selectedTicket}
            showReportOverlay={() => setShowReportOverlay(true)}
          />
        </div>

        {/* Report overlay */}
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
