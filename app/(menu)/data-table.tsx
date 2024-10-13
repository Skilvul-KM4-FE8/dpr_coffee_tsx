"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, SortingState, getSortedRowModel, ColumnFiltersState, getFilteredRowModel, Row } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Input } from "@/components/ui/input";
// import { useConfirm } from "@/hooks/use-confirm";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  disabled?: boolean;
  // onDelete: (rows: Row<TData>[]) => void;
  onBuyItems: (rows: Row<TData>[]) => void;
}

export function DataTable<TData, TValue>({ columns, data, disabled, onBuyItems }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  // const [ConfirmDialog, confirm] = useConfirm("Delete", "Are you sure you want to delete this item?");

  // const sortedData = React.useMemo(() => {
  //   const selectedRows = data.filter(row => row.getIsSelected()); // Adjust based on your data structure
  //   const unselectedRows = data.filter(row => !row.getIsSelected());
  //   return [...selectedRows, ...unselectedRows];
  // }, [data]);

  const table = useReactTable({
    // data: sortedData, // Use the sorted data here
    // columns,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

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
  const [sortingValue] = React.useState((table.getColumn("name")?.getFilterValue() as string) || "");

  return (
    <div>
      {/* <ConfirmDialog /> */}
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter names..."
          value={sortingValue ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
        {table.getSelectedRowModel().rows.length > 0 && (
          <div className="gap-x-4 flex ml-4">
            {/* <Button
              type="button"
              disabled={disabled}
              variant={"destructive"}
              className="transition"
              onClick={async () => {
                const ok = await confirm();
                if (ok) {
                  // table.getFilteredSelectedRowModel().rows
                  onDelete(table.getSelectedRowModel().rows);
                }
              }}
            >
              Delete ({table.getSelectedRowModel().rows.length})
            </Button> */}
            <Button
              type="button"
              disabled={disabled}
              className="bg-gradient-to-b from-[#7a77c4] to-[#6196A6]"
              onClick={async () => {
                // table.getColumn("name")?.setFilterValue("");
                onBuyItems(table.getSelectedRowModel().rows);
              }}
            >
              Buy ({table.getSelectedRowModel().rows.length}) item{table.getSelectedRowModel().rows.length > 1 && "s"}
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
    </div>
  );
}
