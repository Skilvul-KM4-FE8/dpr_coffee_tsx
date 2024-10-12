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
import { useGetTransactions } from "@/features/transaction/api/use-get-transactions";
import useTransactionDialog from "@/features/transaction/hooks/use-transaction-dialog";

export default function MenuPage() {
  const transactionQuery = useGetTransactions();
  const transactionData = transactionQuery.data || [];
  const { isOpen, onOpen, onClose } = useNewMenu();
  const { onOpen: openTransactionDialog } = useTransactionDialog();
  const bulkDeleteMenuMutation = useBulkDeleteMenus();

  const disabled = transactionQuery.isLoading || bulkDeleteMenuMutation.isPending;

  if (transactionQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl w-full pb-10 -mt-24 flex justify-center items-center mx-auto">
        <Card className="w-full border-none drop-shadow-sm">
          <CardHeader className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              <Skeleton className="h-10 w-28 lg:w-48" />
            </CardTitle>
            <Skeleton className="h-10 w-full lg:w-36" />
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
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Transaction Page</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactionData}
            disabled={disabled}
            onDelete={(rows) => {
              const ids = rows.map((row) => row.original.id);
              bulkDeleteMenuMutation.mutate(ids);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
