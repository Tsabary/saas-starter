import { columns } from "@/constants/columns-data";
import { cn } from "@/lib/utils";

interface ColumnSelectorProps {
  activeColumnId: string;
  onColumnChange: (columnId: string) => void;
  columnCounts?: Record<string, number>;
}

function ColumnSelector({
  activeColumnId,
  onColumnChange,
  columnCounts = {},
}: ColumnSelectorProps) {
  return (
    <div className="w-full mb-4 overflow-x-auto">
      <div className="flex gap-2 min-w-max px-1">
        {columns.map((column) => {
          const Icon = column.icon;
          const isActive = activeColumnId === column.id;
          const count = columnCounts[column.id] || 0;

          return (
            <button
              key={column.id}
              onClick={() => onColumnChange(column.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium whitespace-nowrap",
                "border-2",
                isActive
                  ? column.styles
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              )}
            >
              <Icon className="size-4" />
              <span>{column.title}</span>
              {count > 0 && (
                <span
                  className={cn(
                    "ml-1 px-2 py-0.5 rounded-full text-xs font-semibold",
                    isActive
                      ? "bg-white/80"
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ColumnSelector;
