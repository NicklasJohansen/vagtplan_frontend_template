import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "./button";
import { ChevronUp, ChevronDown, ListFilter } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { ReactNode } from "react";

interface ColumnMenuProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: ReactNode;
}

export function ColumnMenu<TData, TValue>({
  column,
  title,
}: ColumnMenuProps<TData, TValue>) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 hover:bg-gray-100"
        >
          {title}
          <ListFilter className="w-4 h-4 text-gray-500" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="min-w-[200px] rounded-md bg-white shadow-lg p-2"
        side="bottom"               // primary side to show menu
        align="start"               // align left edge with trigger
        sideOffset={4}              // vertical spacing
        alignOffset={12}            // default horizontal offset
        collisionPadding={8}        // keeps menu from colliding with viewport edges
        avoidCollisions               // dynamically flips if space is insufficient
      >
        {/* Sorting Controls */}
        {column.getCanSort() && (
          <>
            <DropdownMenu.Item
              onClick={() => column.toggleSorting(false)}
              className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer flex items-center"
            >
              Stigende
              <ChevronUp className="w-3 h-3 ml-auto" />
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => column.toggleSorting(true)}
              className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer flex items-center"
            >
              Faldende
              <ChevronDown className="w-3 h-3 ml-auto" />
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => column.clearSorting()}
              className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
            >
              Ryd sortering
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
          </>
        )}

        {/* Filtering Controls */}
        {column.getCanFilter() && (
          <div className="px-2 py-1">
            {column.columnDef.meta?.filterElement ? (
              column.columnDef.meta?.filterElement(column)
            ) : (
              <input
                type="text"
                value={(column.getFilterValue() ?? "") as string}
                onChange={(e) => column.setFilterValue(e.target.value)}
                placeholder="Filter..."
                className="w-full p-1 border rounded text-sm"
              />
            )}
          </div>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}



