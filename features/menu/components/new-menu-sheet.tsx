"use client";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useNewMenu } from "@/features/menu/hooks/use-new-menu";
import { MenuForm } from "./menu-form";
import { useCreateMenu } from "@/features/menu/api/use-create-menu";
import { z } from "zod";
import { PrismaClient, Prisma } from "@prisma/client";

const formSchema = z.object({
    name: z.string(),
    price: z.string(),
}) 

type FormValues = z.input<typeof formSchema>

const NewMenuSheet = () => {
  const prisma = new PrismaClient()

  const { isOpen, onOpen, onClose } = useNewMenu();
  const mutation = useCreateMenu()

  const onDelete = () => {
    console.log("Delete");
  };

  const onSubmit = (values: FormValues) => {
    console.log("Submit");

    // const menuData = {
    //   name: values.name,
    //   price: parseFloat(values.price)
    // }

    const parsedPrice = parseFloat(values.price)
    if (isNaN(parsedPrice)) {
        console.log("Price is not a number")
        return
    }

    // console.log(values)
    mutation.mutate({...values, price: parsedPrice}, {
      onSuccess: (data) => {
        console.log({data})
        onClose()
      }
    })
  };

  // function handleSubmit(values: FormValues) {
  //   // console.log(values)
  //   const parsedPrice = parseFloat(values.price)
  //   if (isNaN(parsedPrice)) {
  //       console.log("Price is not a number")
  //       return
  //   }

  //   onSubmit({
  //       ...values,
  //       price: parsedPrice.toString()
  //   })
  // }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Menu</SheetTitle>
          <SheetDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</SheetDescription>
        </SheetHeader>
        <MenuForm 
          onDelete={onDelete}  
          onSubmit={onSubmit} 
          disabled={false} 
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewMenuSheet;
