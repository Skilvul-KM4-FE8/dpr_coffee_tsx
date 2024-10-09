import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useEditMenu } from "@/features/menu/hooks/use-edit-menu";
import { MenuForm } from "./menu-form";
import { z } from "zod";

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
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Menu</SheetTitle>
          <SheetDescription>You are about to edit this account</SheetDescription>
        </SheetHeader>
        <MenuForm 
          id={id}
          defaultValues={defaultMenu}
          onDelete={() => {}}
          onSubmit={() => {}}
          disabled={false}
        />
      </SheetContent>
    </Sheet>
  );
};

export default EditMenuSheet;
