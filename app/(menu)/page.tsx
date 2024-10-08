"use client";
import { columns } from "@/app/(menu)/columns";
import { DataTable } from "@/app/(menu)/data-table";
import { Button } from "@/components/ui/button";
import { useNewMenu } from "@/features/menu/hooks/use-new-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react";
import { useGetMenus } from "@/features/menu/api/use-get-menus";

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
