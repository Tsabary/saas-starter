import { useEffect, useState } from "react";
import { Entity, EntityProvider, useEntityList } from "@replyke/react-js";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Column } from "../../../types/column";
import AddTicket from "./AddTicket";
import SingleTicket from "./SingleTicket";
import StageBadge from "../shared/StageBadge";

function SingleColumn({
  column,
  setSelectedTicket,
  isMobile = false,
  isTablet = false,
}: {
  column: Column;
  setSelectedTicket: (ticket: Entity) => void;
  isMobile?: boolean;
  isTablet?: boolean;
}) {
  const { entities, fetchEntities, loading } = useEntityList({
    listId: column.id,
  });
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (entities.length > 0) return;
    fetchEntities(
      {
        metadataFilters: {
          includes: {
            stage: column.id,
          },
        },
      },
      {
        sourceId: "roadmap",
      }
    );
  }, [entities]);

  // Determine column width based on screen size
  const columnWidthClass = isMobile
    ? "w-full"
    : isTablet
    ? "min-w-[280px] w-[280px] snap-center"
    : "flex-1";

  return (
    <div className={columnWidthClass}>
      <div className="bg-gray-100/50 dark:bg-zinc-900/50 rounded-lg p-2 h-full flex flex-col w-full border border-gray-200/50 dark:border-zinc-800">
        <div className="flex justify-between items-center mb-2">
          <StageBadge columnId={column.id} />

          {column.withInput && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7 px-2 hover:bg-gray-200 dark:hover:bg-zinc-800"
              onClick={() => setShowInput((prev) => !prev)}
            >
              {showInput ? "Cancel" : "+ Add"}
            </Button>
          )}
        </div>

        <AnimatePresence>
          {showInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              key="add-ticket"
            >
              <AddTicket columnId={column.id} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-1.5 flex-grow mt-1.5 w-full">
          {loading ? (
            <LoaderCircleIcon className="size-4 text-gray-400 dark:text-zinc-500 animate-spin mx-auto my-4" />
          ) : (entities || []).length === 0 ? (
            <p className="text-center text-gray-400 dark:text-zinc-500 text-xs p-4">
              Nothing here yet
            </p>
          ) : (
            entities?.map((entity) => (
              <EntityProvider entity={entity} key={entity.id}>
                <SingleTicket setSelectedTicket={setSelectedTicket} />
              </EntityProvider>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleColumn;
