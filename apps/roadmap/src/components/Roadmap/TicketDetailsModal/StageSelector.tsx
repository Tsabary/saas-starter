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
      <PopoverContent className="w-[200px] p-0">
        <Command>
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
                >
                  {column.title}
                  <Check
                    className={cn(
                      "ml-auto",
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
