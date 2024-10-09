"use client";
import { columns } from "@/app/(menu)/columns";
import { DataTable } from "@/app/(menu)/data-table";
import { Button } from "@/components/ui/button";
import { useNewMenu } from "@/features/menu/hooks/use-new-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus } from "lucide-react";
import { useGetMenus } from "@/features/menu/api/use-get-menus";
import { Skeleton } from "@/components/ui/skeleton";

export default function DemoPage() {
  let dataMenu = [
    {
      id: "728ed52f",
      name: "Kopi Susu Gula Aren",
      price: 25000,
    },
    {
      id: "728ed52f",
      name: "Americano",
      price: 17000,
    },
  ];
  const menuQuery = useGetMenus()  
  const menuData = menuQuery.data || []
  const { isOpen, onOpen, onClose } = useNewMenu();
  console.log("Data dari Api:",menuData)
  console.log("Data local:", dataMenu)

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
    )
  }

  return (
    <div className="mx-auto max-w-screen-2xl w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm ">
                    <CardHeader className="flex gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle className="text-xl line-clamp-1">
                            Accounts Page
                        </CardTitle>
                        <Button
                            size="sm"
                            onClick={onOpen}
                        >
                            <Plus className="size-4 mr-2" />
                            Add new
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={menuData} />
                        {/* <DataTable 
                            filterKey="name"
                            columns={columns} 
                            data={dataMenu} 
                            onDelete={(row) => {
                                const ids = row.map((r) => r.original.id)
                                deleteAccount.mutate({ids})
                            }}
                            disabled={isDisabled}
                        /> */}
                    </CardContent>
                </Card>
            </div>
  );
}
