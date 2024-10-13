"use client";
import { columns } from "@/app/(menu)/columns";
import { DataTable } from "@/app/(menu)/data-table";
import { Button } from "@/components/ui/button";
import { useNewMenu } from "@/features/menu/hooks/use-new-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Loader2, Plus, Wallet } from "lucide-react";
import { useGetMenus } from "@/features/menu/api/use-get-menus";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteMenus } from "@/features/menu/api/use-bulk-delete-menus";
import useBuyDialog from "@/features/transaction/hooks/use-buy-dialog";
import { useGetTransactions } from "@/features/transaction/api/use-get-transactions";
import { useEffect, useState } from "react";
import { SummaryCard } from "@/components/summary-card";
import { Chart } from "@/components/chart";
import { format } from "date-fns";

export default function MenuPage() {
  const transactions = useGetTransactions();
  const transactionData = transactions.data || [];
  console.log(transactionData);

  const [soldMenu, setSoldMenu] = useState(0);

  const totalSale = transactionData.reduce((acc: any, item: any) => acc + item.totalPrice, 0);
  const totalTransaction = transactionData.length;

  const fixedData = transactionData.map((item: any) => ({
    ...item,
    createdAt: format(new Date(item.createdAt), "dd MMMM yyyy"),
    totalPrice: item.totalPrice,
  }));

  useEffect(() => {
    const totalMenuSold = transactionData.reduce((total: number, transaction: any) => {
      const quantityPerTransaction = transaction.items.reduce((acc: number, item: any) => acc + item.quantity, 0);
      return total + quantityPerTransaction;
    }, 0);
    setSoldMenu(totalMenuSold);
    //   transactionData.map((items: any) => items.items.map((item: any) => {
    //     setSoldMenu(soldMenu + item.quantity)
    //   }))
  }, [transactionData]);

  return (
    <div className="mx-auto max-w-screen-2xl w-full pb-10 -mt-24">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 w-full gap-8">
        {/* <SummaryCard disabled={transactions.isLoading} data={Intl.NumberFormat("id-ID",{
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,

              }).format(totalSale)} title="Total Sale" tipe="" /> */}
        <SummaryCard disabled={transactions.isLoading} data={totalSale} title="Total Sale" tipe="" />
        <SummaryCard disabled={transactions.isLoading} data={totalTransaction} title="Total Transaction" tipe="Transactions" />
        <SummaryCard disabled={transactions.isLoading} data={soldMenu} title="Total Menu Sold" tipe="Menus" />
      </div>
      <div className="mt-10">
        <Chart data={fixedData} disabled={transactions.isLoading} />
      </div>
    </div>
  );
}
