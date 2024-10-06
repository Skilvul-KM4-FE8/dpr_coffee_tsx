"use client";
import { columns } from "@/app/(menu)/columns";
import { DataTable } from "@/app/(menu)/data-table";
import { Button } from "@/components/ui/button";
import { useNewMenu } from "@/features/menu/hooks/use-new-menu";

export default function DemoPage() {
  let Menu = [
    {
      id: "728ed52f",
      author: "dpr_coffee",
      amount: 1,
      status: "pending",
      name: "Kopi Susu Gula Aren",
      price: 25000,
    },
    {
      id: "728ed52f",
      author: "dpr_coffee",
      amount: 11,
      status: "pending",
      name: "Americano",
      price: 17000,
    },
  ];
  const { isOpen, onOpen, onClose } = useNewMenu();
  return (
    <div className="container mx-auto py-10">
      <Button variant="default" onClick={onOpen}>
        Add Menu
      </Button>
      <DataTable columns={columns} data={Menu} />
    </div>
  );
}
