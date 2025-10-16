import { useState } from "react";
import { Entity, EntityProvider } from "@replyke/react-js";
import SingleColumn from "./SingleColumn";
import TicketDetailsModal from "./TicketDetailsModal";
import { Dialog } from "@/components/ui/dialog";
import { columns } from "../../constants/columns-data";

function Roadmap() {
  const [selectedTicket, setSelectedTicket] = useState<Entity | null>(null);
  const [selectedTicketStage, setSelectedTicketStage] = useState<string | null>(
    null
  );

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setSelectedTicket(null);
      }}
    >
      <EntityProvider entity={selectedTicket ?? undefined}>
        <TicketDetailsModal
          selectedTicket={selectedTicket}
          columnId={selectedTicketStage}
        />
      </EntityProvider>
      <div className="w-full flex gap-4 h-full">
        {columns.map((column) => (
          <SingleColumn
            column={column}
            setSelectedTicket={(ticket) => {
              setSelectedTicket(ticket);
              setSelectedTicketStage(column.id);
            }}
            key={column.id}
          />
        ))}
      </div>
    </Dialog>
  );
}

export default Roadmap;
