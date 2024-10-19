import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { useOpenMenu } from "@/features/menu/hooks/use-open-menu";
import { useGetMenu } from "@/features/menu/api/use-get-menu";
import { useEditMenu } from "@/features/menu/api/use-edit-menu";

import { MenuForm } from "./menu-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string(),
  price: z.string(),
  category: z.string(),
  // id: z.string(),
});

type FormValues = z.input<typeof formSchema>;

const EditMenuSheet = () => {
  const { isOpen, onOpen, onClose, id } = useOpenMenu();
  const menuQuery = useGetMenu(id!);
  const editMutation = useEditMenu(id!);

  const isLoading = menuQuery.isPending || menuQuery.isLoading || editMutation.isPending;

  const defaultValue = menuQuery.data
    ? {
        id: menuQuery.data.id,
        name: menuQuery.data.name,
        price: menuQuery.data.price.toString(),
      }
    : {
        id: "",
        name: "",
        price: "",
      };

  const handleSubmit = (values: FormValues) => {
    const parsedPrice = parseFloat(values.price);
    if (isNaN(parsedPrice)) {
      console.log("Price is not a number");
      return;
    }

    editMutation.mutate(
      { ...values, price: parsedPrice },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

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
        ) : (
          <MenuForm id={id} defaultValues={defaultValue} onDelete={() => {}} onSubmit={handleSubmit} disabled={isLoading} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditMenuSheet;
