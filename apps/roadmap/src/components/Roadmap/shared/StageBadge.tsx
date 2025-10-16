import { Column } from "../../../types/column";
import { columns } from "../../../constants/columns-data";
import { cn } from "../../../lib/utils";

function StageBadge({ columnId }: { columnId: string }) {
  const column: Column | undefined = columns.find((col) => col.id === columnId);
  if (!column) return null;
  return (
    <h2
      className={cn(
        "flex items-center text-xs px-2.5 py-1 font-semibold rounded-md w-max border",
        column.styles
      )}
    >
      {<column.icon className="size-3.5 mr-1.5" />}
      {column.title}
    </h2>
  );
}

export default StageBadge;
