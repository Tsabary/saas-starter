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
}: {
  column: Column;
  setSelectedTicket: (ticket: Entity) => void;
}) {
  const { entities, fetchEntities, loading } = useEntityList({
    listId: column.id,
  });
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div className="flex-1">
      <div className="bg-gray-50 rounded-lg p-3 h-full flex flex-col w-full">
        <div className="flex justify-between items-center mb-3">
          <StageBadge columnId={column.id} />

          {column.withInput && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-6 px-2"
              onClick={() => setShowInput((prev) => !prev)}
            >
              {showInput ? "↑ Cancel" : "+ Add"}
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

        <div className="space-y-2 flex-grow mt-2 w-full">
          {loading ? (
            <LoaderCircleIcon className="size-4 text-gray-400 animate-spin mx-auto my-4" />
          ) : (entities || []).length === 0 ? (
            <p className="text-center text-gray-400 text-sm p-4">
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
