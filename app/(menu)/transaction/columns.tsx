"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Minus, MoreHorizontal, Plus } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import useOpenTransaction from "@/features/transaction/components/transaction-detail-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteMenu } from "@/features/menu/api/use-delete-menu";
import useTransactionDialog from "@/features/transaction/hooks/use-transaction-dialog";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type transactionType = {
  id: string;
  receptionist: string;
  customer: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  totalPrice: number;
};

export const columns: ColumnDef<transactionType>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomeRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)} aria-label="ini aria label" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row ini" />,
  },
  {
    accessorKey: "receptionist",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Receptionist
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-left">Total Price</div>,
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
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateString = row.getValue("createdAt") as Date;
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
    header: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      const { onOpen, isOpen, onClose } = useTransactionDialog();
      const deleteMutation = useDeleteMenu(payment.id!);
      const [DialogConfirm, confirm] = useConfirm("Are you sure?", "you are about to delete this menu");

      // const handleDeleteTransaction = async () => {
      //   const ok = await confirm();
      //   if (ok) {
      //     deleteMutation.mutate();
      //   }
      //   return null;
      // };

      return (
        <>
          <DialogConfirm />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onOpen(row.original)}>Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
