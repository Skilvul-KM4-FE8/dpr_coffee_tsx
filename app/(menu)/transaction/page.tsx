"use client";
import { columns } from "@/app/(menu)/transaction/columns";
import { DataTable } from "@/app/(menu)/transaction/data-table";
import { Button } from "@/components/ui/button";
import { useNewMenu } from "@/features/menu/hooks/use-new-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { useGetMenus } from "@/features/menu/api/use-get-menus";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteMenus } from "@/features/menu/api/use-bulk-delete-menus";
import useBuyDialog from "@/features/transaction/hooks/use-buy-dialog";

export default function MenuPage() {
  const dataTransaction = [
    {
      receptionist: "Muhammad Rafai",
      customer: "Alfito",
      menu: [
        {
          id: "cm20kllsy000014ai6xl2l34w",
          name: "Iced Matcha",
          price: 15000,
          createdAt: "2024-10-08T15:02:55.117Z",
          updatedAt: "2024-10-08T15:02:55.117Z",
          quantity: 1,
        },
        {
          id: "cm22r1s0r0000o9fewhq06vl8",
          name: "Mango Latte Premium",
          price: 34000,
          createdAt: "2024-10-10T03:38:59.678Z",
          updatedAt: "2024-10-10T04:01:30.192Z",
          quantity: 2,
        },
        {
          id: "cm22rrn7e0002o9fenbf0hiny",
          name: "Americano Latte",
          price: 10000,
          createdAt: "2024-10-10T03:59:06.554Z",
          updatedAt: "2024-10-10T11:02:42.030Z",
          quantity: 1,
        },
        {
          id: "cm23hvvob0002bo46y9vc7b3d",
          name: "Leci Tea",
          price: 12000,
          createdAt: "2024-10-10T16:10:14.172Z",
          updatedAt: "2024-10-11T14:13:25.059Z",
          quantity: 1,
        },
        {
          id: "cm24te25j0001840h1niklc6q",
          name: "Aren Latte",
          price: 21000,
          createdAt: "2024-10-11T14:20:04.301Z",
          updatedAt: "2024-10-11T14:20:04.301Z",
          quantity: 1,
        },
      ],
      totalPrice: 92000,
    },
    {
      receptionist: "Muhammad Rafai",
      customer: "Alfito",
      menu: [
        {
          id: "cm20kllsy000014ai6xl2l34w",
          name: "Iced Matcha",
          price: 15000,
          createdAt: "2024-10-08T15:02:55.117Z",
          updatedAt: "2024-10-08T15:02:55.117Z",
          quantity: 1,
        },
        {
          id: "cm22r1s0r0000o9fewhq06vl8",
          name: "Mango Latte Premium",
          price: 34000,
          createdAt: "2024-10-10T03:38:59.678Z",
          updatedAt: "2024-10-10T04:01:30.192Z",
          quantity: 2,
        },
        {
          id: "cm22rrn7e0002o9fenbf0hiny",
          name: "Americano Latte",
          price: 10000,
          createdAt: "2024-10-10T03:59:06.554Z",
          updatedAt: "2024-10-10T11:02:42.030Z",
          quantity: 1,
        },
        {
          id: "cm23hvvob0002bo46y9vc7b3d",
          name: "Leci Tea",
          price: 12000,
          createdAt: "2024-10-10T16:10:14.172Z",
          updatedAt: "2024-10-11T14:13:25.059Z",
          quantity: 1,
        },
        {
          id: "cm24te25j0001840h1niklc6q",
          name: "Aren Latte",
          price: 21000,
          createdAt: "2024-10-11T14:20:04.301Z",
          updatedAt: "2024-10-11T14:20:04.301Z",
          quantity: 1,
        },
      ],
      totalPrice: 92000,
    },
  ];

  const menuQuery = useGetMenus();
  const menuData = menuQuery.data || [];
  const { isOpen, onOpen, onClose } = useNewMenu();
  console.log("Data dari Api:", menuData);
  const { onOpen: isOpenBuyDialog } = useBuyDialog();

  const bulkDeleteMenuMutation = useBulkDeleteMenus();

  const disabled = menuQuery.isLoading || bulkDeleteMenuMutation.isPending;

  if (menuQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl w-full pb-10 -mt-24 flex justify-center items-center mx-auto">
        {/* <div>
              <Loader2 className="size-10 lg:size-14 text-muted-foreground animate-spin inline-block" />
            </div> */}
        <Card className="w-full border-none drop-shadow-sm">
          <CardHeader className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              <Skeleton className="h-10 w-28 lg:w-48" />
            </CardTitle>
            <Skeleton className="h-10 w-full lg:w-36" />
            {/* <Skeleton className="h-10 w-28 md:w-48" /> */}
          </CardHeader>
          <CardContent className="grid gap-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-10 w-2/5" />
              <Skeleton className="h-10 w-full lg:w-28" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm ">
        <CardHeader className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Transaction Page</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={dataTransaction}
            disabled={disabled}
            onDelete={(rows) => {
              const ids = rows.map((row) => row.original.id);
              bulkDeleteMenuMutation.mutate(ids);
            }}
            onBuyItems={(rows) => {
              // console.log("Rows selected for buying:", rows);
              const datas = rows.map((row) => ({
                ...row.original,
              }));
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
