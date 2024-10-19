"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, SortingState, getSortedRowModel, ColumnFiltersState, getFilteredRowModel, Row } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { useConfirm } from "@/hooks/use-confirm";
import { tsXLXS } from "ts-xlsx-export";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  disabled?: boolean;
  onDelete: (rows: Row<TData>[]) => void;
}

export function DataTable<TData, TValue>({ columns, data, disabled, onDelete }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  // onDelete: (rows: Row<TData>[]) => void;

  const [ConfirmDialog, Confirm] = useConfirm("Delete", "Are you sure you want to delete this item?");
  // const bulkDeleteTransactionMutation = useBulkDeleteTransaction();

  const table = useReactTable({
    // data: sortedData, // Use the sorted data here
    // columns,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // Create a sorted data array with selected rows at the top
  // const [sortingValue] = React.useState((table.getColumn("customer")?.getFilterValue() as string) || "");

  //export handle

  const handleExportExcel = async () => {
    const selectedRowsExcel = table.getSelectedRowModel().rows;
    console.log(selectedRowsExcel.map((row) => row.original));
    const selectedRowParsingExcel = selectedRowsExcel.map((row) => row.original);
    tsXLXS().exportAsExcelFile(selectedRowParsingExcel).saveAsExcelFile("Transaction Data");
  };

  return (
    <div>
      <ConfirmDialog />
      <div className="flex items-center justify-between py-4">
        <Input placeholder="Find customer..." value={(table.getColumn("customer")?.getFilterValue() as string) || ""} onChange={(event) => table.getColumn("customer")?.setFilterValue(event.target.value)} className="max-w-sm" />
        {table.getSelectedRowModel().rows.length > 0 && (
          <div className="gap-x-4 flex ml-4">
            <Button onClick={handleExportExcel}>Export Excel</Button>
            <Button
              type="button"
              disabled={disabled}
              variant={"destructive"}
              className="transition"
              onClick={async () => {
                const ok = await Confirm();
                if (ok) {
                  // table.getFilteredSelectedRowModel().rows
                  onDelete(table.getSelectedRowModel().rows);
                }
              }}
              // onClick={async () => {
              //   const ok = await confirm();
              //   if (ok) {
              //     // table.getFilteredSelectedRowModel().rows
              //     onDelete(table.getSelectedRowModel().rows);
              //   }
              // }}
            >
              Delete ({table.getSelectedRowModel().rows.length})
            </Button>
          </div>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
