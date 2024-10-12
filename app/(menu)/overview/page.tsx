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

export default function MenuPage() {

  const transactions = useGetTransactions()
  const transactionData = transactions.data || []
  console.log(transactionData)

  const [soldMenu, setSoldMenu] = useState(0)

  const totalSale = transactionData.reduce((acc:any, item: any) => acc + item.totalPrice, 0)
  const totalTransaction = transactionData.length


  useEffect(() => {
    const totalMenuSold = transactionData.reduce((total: number, transaction: any) => {
      const quantityPerTransaction = transaction.items.reduce((acc: number, item: any) => acc + item.quantity, 0)
      return total + quantityPerTransaction
    }, 0)
    setSoldMenu(totalMenuSold)
  //   transactionData.map((items: any) => items.items.map((item: any) => {
  //     setSoldMenu(soldMenu + item.quantity)
  //   }))
  }, [transactionData])
  
  
  // const tot2 = transactionData.map()
  // const menuQuery = useGetMenus()  
  // const menuData = menuQuery.data || []
  // const { onOpen } = useNewMenu();
  // console.log("Data dari Api:",menuData)
  // const { onOpen: isOpenBuyDialog} = useBuyDialog()


  // const bulkDeleteMenuMutation = useBulkDeleteMenus();

  // const disabled = menuQuery.isLoading || bulkDeleteMenuMutation.isPending;

  // if (menuQuery.isLoading) {
  //   return (
  //     <div className="max-w-screen-2xl w-full pb-10 -mt-24 flex justify-center items-center mx-auto">
  //       {/* <div>
  //             <Loader2 className="size-10 lg:size-14 text-muted-foreground animate-spin inline-block" />
  //           </div> */}
  //       <Card className="w-full border-none drop-shadow-sm">
  //         <CardHeader className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
  //           <CardTitle className="text-xl line-clamp-1">
  //             <Skeleton className="h-10 w-28 lg:w-48" />
  //           </CardTitle>
  //           <Skeleton className="h-10 w-full lg:w-36" />
  //           {/* <Skeleton className="h-10 w-28 md:w-48" /> */}
  //         </CardHeader>
  //         <CardContent className="grid gap-y-2">
  //           <div className="flex justify-between">
  //             <Skeleton className="h-10 w-2/5" />
  //             <Skeleton className="h-10 w-full lg:w-28" />
  //           </div>
  //           <Skeleton className="h-10 w-full" />
  //           <Skeleton className="h-8 w-full" />
  //           <Skeleton className="h-8 w-full" />
  //           <Skeleton className="h-8 w-full" />
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <div className="mx-auto max-w-screen-2xl w-full pb-10 -mt-24">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 w-full gap-8">
        <div className="rounded-md bg-white px-6 py-8 drop-shadow-md">
          <div className="flex justify-between">
            <div>
            <p className="font-bold text-xl lg:text-2xl">Total Sale</p>
            <p className="text-muted-foreground">12 Sep - 12 October 2024</p>
            </div>
            <div className="flex justify-center items-center p-5 rounded-md bg-violet-300/30">
              <Wallet className="size-5 text-slate-800" />
            </div>
          </div>
          <div className="mt-4">
            {transactions.isLoading ? (
              <Skeleton className="h-10 w-36" />
            ) : 
            (
              <p className="text-xl lg:text-2xl font-bold">{Intl.NumberFormat("id-ID",{
                style: "currency",
                currency: "IDR",
              }).format(totalSale)}</p>
            )}
            <p className="text-muted-foreground">2% From last period</p>
          </div>
        </div>
        <div className="rounded-md bg-white px-6 py-8 drop-shadow-md">
          <div className="flex justify-between">
            <div>
            <p className="font-bold text-xl lg:text-2xl">Total Transaction</p>
            <p className="text-muted-foreground">12 Sep - 12 October 2024</p>
            </div>
            <div className="flex justify-center items-center p-5 rounded-md bg-violet-300/30">
              <Wallet className="size-5 text-slate-800" />
            </div>
          </div>
          <div className="mt-4">
          {transactions.isLoading ? (
              <Skeleton className="h-10 w-36" />
            ) : 
            (
              <p className="text-xl lg:text-2xl font-bold">{totalTransaction} Transactions</p>
            )}
            <p className="text-muted-foreground">2% From last period</p>
          </div>
        </div>
        <div className="rounded-md bg-white px-6 py-8 drop-shadow-md">
          <div className="flex justify-between">
            <div>
            <p className="font-bold text-xl lg:text-2xl">Total Menu Sold</p>
            <p className="text-muted-foreground">12 Sep - 12 October 2024</p>
            </div>
            <div className="flex justify-center items-center p-5 rounded-md bg-violet-300/30">
              <Wallet className="size-5 text-slate-800" />
            </div>
          </div>
          <div className="mt-4">
          {transactions.isLoading ? (
              <Skeleton className="h-10 w-36" />
            ) : 
            (
              <p className="text-xl lg:text-2xl font-bold">{soldMenu} Sold</p>
            )}
            <p className="text-muted-foreground">2% From last period</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
