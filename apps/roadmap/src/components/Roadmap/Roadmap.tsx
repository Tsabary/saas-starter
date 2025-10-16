import { useState } from "react";
import { Entity, EntityProvider } from "@replyke/react-js";
import SingleColumn from "./SingleColumn";
import TicketDetailsModal from "./TicketDetailsModal";
import ColumnSelector from "./ColumnSelector";
import { Dialog } from "@/components/ui/dialog";
import { Drawer } from "@/components/ui/drawer";
import { columns } from "../../constants/columns-data";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function Roadmap() {
  const [selectedTicket, setSelectedTicket] = useState<Entity | null>(null);
  const [selectedTicketStage, setSelectedTicketStage] = useState<string | null>(
    null
  );
  const [activeColumnId, setActiveColumnId] = useState(columns[0].id);

  // Responsive breakpoints
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Get columns to display based on screen size
  const displayColumns = isMobile
    ? columns.filter((col) => col.id === activeColumnId)
    : columns;

  // Use Drawer for mobile, Dialog for desktop
  const ResponsiveWrapper = isMobile ? Drawer : Dialog;

  return (
    <>
      {/* Mobile: Column selector tabs */}
      {isMobile && (
        <ColumnSelector
          activeColumnId={activeColumnId}
          onColumnChange={setActiveColumnId}
        />
      )}

      {/* Kanban board container */}
      <div
        className={`w-full h-full ${
          isDesktop
            ? "flex gap-4"
            : isTablet
            ? "flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            : "flex flex-col"
        }`}
      >
        {displayColumns.map((column) => (
          <SingleColumn
            column={column}
            setSelectedTicket={(ticket) => {
              setSelectedTicket(ticket);
              setSelectedTicketStage(column.id);
            }}
            key={column.id}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        ))}
      </div>

      {/* Modal/Drawer for ticket details */}
      <ResponsiveWrapper
        open={!!selectedTicket}
        onOpenChange={(open) => {
          if (!open) setSelectedTicket(null);
        }}
      >
        <EntityProvider entity={selectedTicket ?? undefined}>
          <TicketDetailsModal
            selectedTicket={selectedTicket}
            columnId={selectedTicketStage}
            isMobile={isMobile}
          />
        </EntityProvider>
      </ResponsiveWrapper>
    </>
  );
}

export default Roadmap;
