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
    <div className="w-full mb-3 overflow-x-auto">
      <div className="flex gap-1.5 min-w-max px-1">
        {columns.map((column) => {
          const Icon = column.icon;
          const isActive = activeColumnId === column.id;
          const count = columnCounts[column.id] || 0;

          return (
            <button
              key={column.id}
              onClick={() => onColumnChange(column.id)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-200 text-xs font-semibold whitespace-nowrap border",
                isActive
                  ? column.styles
                  : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
              )}
            >
              <Icon className="size-3.5" />
              <span>{column.title}</span>
              {count > 0 && (
                <span
                  className={cn(
                    "ml-0.5 px-1.5 py-0.5 rounded-full text-[11px] font-bold",
                    isActive
                      ? "bg-white/80 dark:bg-black/20"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400"
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
