"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionCell } from "./actions";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Menu = {
  id: string;
  // price: number;
  // author: string;
  // status: string
  name: string;
  price: number;
};

export const columns: ColumnDef<Menu>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomeRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="ini aria label"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row ini"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "actions",
    cell: ({ row }) => <ActionCell payment={row.original} />, // Use the new ActionCell component
  },
];
