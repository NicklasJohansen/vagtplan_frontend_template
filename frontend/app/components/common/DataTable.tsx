import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { EditIcon, Loader2, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import { ColumnMenu } from "../ui/column-menu";

interface DataTableProps<TData, TValue> {
  title: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  confirmTitle?: string;
  confirmText?: string;
  onEdit: (row: TData) => void;
  onDelete: (row: TData) => Promise<void>;
  onAdd: () => void;
  onResetPassword?: (row: any) => void;
  editOnly?: boolean;
  resetPassword?: boolean;
  isLoading: boolean;
  displayOnly?: boolean;
  useDefaultWrapper?: boolean;
}

export function DataTable<TData, TValue>({
  title,
  columns,
  data,
  confirmText,
  confirmTitle,
  onDelete,
  onAdd,
  onEdit,
  onResetPassword,
  editOnly = false,
  resetPassword = false,
  isLoading,
  displayOnly = false,
  useDefaultWrapper = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowToDelete, setRowToDelete] = useState<TData | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleDeleteClick = (row: TData) => {
    setRowToDelete(row);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (rowToDelete) {
      await onDelete(rowToDelete);
      setRowToDelete(null);
      setShowConfirmModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 size={50} className="animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`${
        useDefaultWrapper
          ? "rounded-md border m-4 p-4 bg-white shadow-lg w-[80vw]"
          : ""
      }`}
    >
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="relative overflow-y-auto max-h-[75vh]">
        {!editOnly && (
          <>
            <Button
              variant="primary"
              size="lg"
              className="my-3 ml-2 flex w-[20%] items-center justify-center mr-auto"
              onClick={onAdd}
            >
              Tilføj
            </Button>

            <ConfirmDialog
              title={confirmTitle ?? "Vent!"}
              text={
                confirmText ?? "Er du sikker på at du vil slette denne række?"
              }
              isOpen={showConfirmModal}
              onClose={() => setShowConfirmModal(false)}
              onConfirm={handleConfirmDelete}
            />
          </>
        )}

        <Table className="relative">
          <TableHeader className="sticky top-0 z-2 bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {!header.isPlaceholder && (
                      <ColumnMenu
                        column={header.column}
                        title={flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      />
                    )}
                  </TableHead>
                ))}
                <TableHead />
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-100"
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    {(!displayOnly || resetPassword || !editOnly) && (
                      <>
                        {!displayOnly && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="mr-2"
                            onClick={() => onEdit(row.original)}
                          >
                            <EditIcon />
                          </Button>
                        )}
                        {resetPassword && (
                          <Button
                            variant="primary"
                            size="sm"
                            className="mr-2"
                            onClick={() => onResetPassword?.(row.original)}
                          >
                            Reset password
                          </Button>
                        )}
                        {!editOnly && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteClick(row.original)}
                          >
                            <Trash2Icon />
                          </Button>
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-4">
                  Ingen Resultater
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


