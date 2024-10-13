"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionTransaction } from "./action-transaction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type transactionType = {
  id: string;
  receptionist: string;
  customer: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  items: any[]; // Adjust the type of items as per your actual data structure
};

export const columns: ColumnDef<transactionType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomeRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "receptionist",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Receptionist
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Customer
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Total Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const dateString = row.getValue("createdAt") as string; // Ensure this is a string
      const date = new Date(dateString);

      // Format the date to show only day, month, year, hours, and minutes
      const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit", // Use 'long' if you want the full month name
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Set to true if you want 12-hour format
      });

      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionTransaction transaction={row.original} />, // Use the new ActionCell component
  },
];