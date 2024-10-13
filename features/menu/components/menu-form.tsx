"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { PriceInput } from "@/components/price-input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

const formSchema = z.object({
  name: z.string(),
  price: z.string(),
  //   category: z.string(),
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete: () => void;
  disabled?: boolean;
};

export const MenuForm = ({ id, defaultValues, onSubmit, onDelete, disabled }: Props) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  // 2. Define a submit handler.
  // function handleSubmit(values: FormValues) {
  //     // console.log(values)
  //     const parsedPrice = parseFloat(values.price)
  //     if (isNaN(parsedPrice)) {
  //         console.log("Price is not a number")
  //         return
  //     }

  //     onSubmit({
  //         ...values,
  //         price: parsedPrice.toString()
  //     })
  // }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 gap-5 grid">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-8">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Fried rice, Chicken, etc." {...field} />
                </FormControl>
                <FormDescription>{/* Enter the name of the menu item */}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="mt-8">
                <FormControl>
                  <Select {...field}>
                    <FormLabel>Category</FormLabel>
                    <SelectTrigger className="w-[500px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Drink">Drink</SelectItem>
                        <SelectItem value="Food">Food</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="mt-8">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <PriceInput {...field} placeholder="0" />
                </FormControl>
                <FormDescription>{/* Enter the name of the menu item */}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full m-4" type="submit" disabled={disabled}>
            {id ? "Save Changes" : "Add menu"}
          </Button>
          {!!id && (
            <Button onClick={onDelete} variant="outline" className="w-full gap-x-2" type="button" disabled={disabled}>
              <Trash2 className="size-4 mr-4 inline-block" />
              <p className="ml-4">Delete Menu</p>
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};
