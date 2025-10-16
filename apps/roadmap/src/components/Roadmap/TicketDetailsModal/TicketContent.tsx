import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Entity } from "@replyke/react-js";

function TicketContent({ selectedTicket }: { selectedTicket: Entity }) {
  return (
    <div className="p-4">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
          {selectedTicket?.title}
        </DialogTitle>
        <DialogDescription className="mt-2 text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
          {selectedTicket?.content}
        </DialogDescription>
      </DialogHeader>
    </div>
  );
}

export default TicketContent;
