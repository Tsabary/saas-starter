import React from "react";
import { useEntity } from "@replyke/react-js";
import { Check } from "lucide-react";

import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import StageBadge from "../shared/StageBadge";
import { columns } from "../../../constants/columns-data";
import { cn } from "../../../lib/utils";

function StageSelector({ columnId }: { columnId: string }) {
  const { updateEntity } = useEntity();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(columnId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <StageBadge
          columnId={
            columns.find((framework) => framework.id === value)?.id || ""
          }
        />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700">
        <Command className="bg-white dark:bg-zinc-900">
          <CommandList>
            <CommandGroup>
              {columns.map((column) => (
                <CommandItem
                  key={column.id}
                  value={column.id}
                  onSelect={async (currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    await updateEntity?.({
                      update: { metadata: { stage: currentValue } },
                    });
                    location.reload();
                  }}
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  {column.title}
                  <Check
                    className={cn(
                      "ml-auto text-gray-900 dark:text-gray-100",
                      value === column.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default StageSelector;
