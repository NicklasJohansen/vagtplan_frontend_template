import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { ChevronDown, ChevronRight, Edit, Plus, Trash2 } from "lucide-react";

interface ExpandableDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDelete?: (item: TData) => void;
  onEdit?: (item: TData) => void;
  onAdd?: () => void;
  renderExpandedContent?: (item: TData) => React.ReactNode;
  getRowId?: (item: TData) => string;
}

export function ExpandableDataTable<TData, TValue>({
  columns,
  data,
  onDelete,
  onEdit,
  onAdd,
  renderExpandedContent,
  getRowId,
}: ExpandableDataTableProps<TData, TValue>) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (rowId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: getRowId ? (row) => getRowId(row) : undefined,
  });

  const hasExpandableContent = !!renderExpandedContent;
  const hasActions = !!(onEdit || onDelete);

  return (
    <div>
      {onAdd && (
        <div className="flex justify-end mb-4">
          <Button onClick={onAdd} className="flex items-center gap-2">
            <Plus size={16} />
            Tilføj kompetence
          </Button>
        </div>
      )}
      
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b bg-gray-50">
                {hasExpandableContent && <th className="w-12 p-4"></th>}
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4 text-left font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
                {hasActions && (
                  <th className="p-4 text-right font-medium">Actions</th>
                )}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const rowId = row.id;
                const isExpanded = expandedRows.has(rowId);
                
                return (
                  <React.Fragment key={row.id}>
                    <tr className="border-b hover:bg-gray-50 transition-colors duration-150">
                      {hasExpandableContent && (
                        <td className="p-4">
                          <button
                            onClick={() => toggleRow(rowId)}
                            className="p-1 rounded hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                            aria-expanded={isExpanded}
                            aria-label={isExpanded ? "Collapse row" : "Expand row"}
                          >
                            <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
                              <ChevronDown size={16} />
                            </div>
                          </button>
                        </td>
                      )}
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                      {hasActions && (
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            {onEdit && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(row.original)}
                                className="transition-all duration-150 hover:scale-105"
                              >
                                <Edit size={16} />
                              </Button>
                            )}
                            {onDelete && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDelete(row.original)}
                                className="transition-all duration-150 hover:scale-105"
                              >
                                <Trash2 size={16} />
                              </Button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                    {hasExpandableContent && (
                      <tr>
                        <td
                          colSpan={
                            columns.length +
                            (hasExpandableContent ? 1 : 0) +
                            (hasActions ? 1 : 0)
                          }
                          className="p-0 border-0"
                        >
                          <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              isExpanded 
                                ? 'max-h-96 opacity-100' 
                                : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="p-4 bg-gray-50 border-t">
                              {isExpanded && renderExpandedContent(row.original)}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (hasExpandableContent ? 1 : 0) +
                    (hasActions ? 1 : 0)
                  }
                  className="h-24 text-center"
                >
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}