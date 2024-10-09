import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useEditMenu } from "@/features/menu/hooks/use-edit-menu";
import { MenuForm } from "./menu-form";
import { z } from "zod";
import { useGetMenu } from "../api/use-get-menu";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string(),
  price: z.string(),
  id: z.string(),
})

type FormValues = z.input<typeof formSchema>

const EditMenuSheet = () => {
  const defaultMenu = {
    // id: "qweqweqwddqw",
    name: "ayam",
    price: "120000",
  }
  const { isOpen, onOpen, onClose, id } = useEditMenu();
  const menuQuery = useGetMenu(id!)

  const isLoading = menuQuery.isPending || menuQuery.isLoading

  const defaultValue = menuQuery.data ? {
    id: menuQuery.data.id,
    name: menuQuery.data.name,
    price: menuQuery.data.price,
  } : {
    id: "",
    name: "",
    price: "",
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Menu</SheetTitle>
          <SheetDescription>You are about to edit this account</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-8 text-muted-foreground animate-spin" />
          </div>
        ) : 
        (
        <MenuForm 
          id={id}
          defaultValues={defaultValue}
          onDelete={() => {}}
          onSubmit={() => {}}
          disabled={isLoading}
        />
        )} 
      </SheetContent>
    </Sheet>
  );
};

export default EditMenuSheet;
