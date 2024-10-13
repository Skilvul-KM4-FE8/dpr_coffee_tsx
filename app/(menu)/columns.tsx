"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomeRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)} aria-label="ini aria label" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row ini" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "amount",
  //   header: ({ column }) => {
  //     return (
  //       <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //         Amount
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     let amount = parseFloat(row.getValue("amount"));

  //     return (
  //       <div className="flex items-center gap-x-3">
  //         <Button variant={"ghost"} size={"sm"}
  //           onClick={() => {
  //             amount - 1
  //           }}
  //         ><Minus className="size-4" /></Button>
  //         <div className=" font-medium">{amount}</div>
  //         <Button type="button" variant={"ghost"} size={"sm"} onClick={() => {
  //             amount = amount + 1
  //           }}><Plus className="size-4" /></Button>
  //       </div>
  //     );
  //   }
  // },
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
    cell: ({ row }) => {
      const payment = row.original;

      // const deleteMutation = useDeleteMenu(payment.id!);
      // const [DialogConfirm] = useConfirm("Are you sure?", "you are about to delete this menu");

      // const handleDeleteMenu = async () => {
      //   const ok = await confirm();
      //   if (ok) {
      //     deleteMutation.mutate();
      //   }
      //   return null;
      // };

      return (
        <>
          {/* <DialogConfirm /> */}
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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copy this menu ID</DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => onOpen(row.original.id)}>Edit</DropdownMenuItem> */}
              {/* <DropdownMenuItem onClick={handleDeleteMenu}>Delete</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
