import { Column } from "../../../types/column";
import { columns } from "../../../constants/columns-data";
import { cn } from "../../../lib/utils";

function StageBadge({ columnId }: { columnId: string }) {
  const column: Column | undefined = columns.find((col) => col.id === columnId);
  if (!column) return null;
  return (
    <h2
      className={cn(
        "flex items-center text-xs px-2.5 py-0.5 font-medium rounded-md w-max",
        column.styles
      )}
    >
      {<column.icon className="size-3 mr-2" />}
      {column.title}
    </h2>
  );
}

export default StageBadge;
