import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Entity } from "@replyke/react-js";

function TicketContent({ selectedTicket }: { selectedTicket: Entity }) {
  return (
    <div className="p-5">
      <DialogHeader>
        <DialogTitle>{selectedTicket?.title}</DialogTitle>
        <DialogDescription className="mt-3">{selectedTicket?.content}</DialogDescription>
      </DialogHeader>
    </div>
  );
}

export default TicketContent;
