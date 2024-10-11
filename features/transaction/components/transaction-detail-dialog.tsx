"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useTransactionDialog from "../hooks/use-transaction-dialog"; // Menggunakan hook yang Anda buat sebelumnya
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHeader, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useCreateTransaction } from "../api/use-create-transaction";
import { Minus, Plus } from "lucide-react";

const formSchema = z.object({
  customer: z.string().min(2).max(50),
});

const TransactionBuyDialog = () => {
  const { isOpen, onOpen, onClose, transaction } = useTransactionDialog();
  const createMutation = useCreateTransaction();
  const auth = useUser();

  // State untuk jumlah per item, diinisialisasi ke 1 untuk semua item
  const [quantities, setQuantities] = useState<number[]>([]);

  // Ketika transaksi berubah, set jumlah default ke 1 untuk setiap item
  useEffect(() => {
    if (transaction) {
      setQuantities(transaction.items.map(() => 1));
    }
  }, [transaction]);

  // Fungsi untuk memperbarui jumlah
  const handleQuantityChange = (index: number, newQuantity: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);
  };

  // Menghitung total harga berdasarkan jumlah
  const total = transaction?.items.reduce((acc, item, index) => acc + item.price * quantities[index], 0) || 0;

  // Mendefinisikan form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: "",
    },
  });

  // Mendefinisikan handler submit
  function onSubmit(values: z.infer<typeof formSchema>) {
    const orderData = {
      receptionist: auth.user?.fullName || "Unknown Waiter",
      customer: values.customer,
      items:
        transaction?.items.map((item, index) => ({
          ...item,
          quantity: quantities[index],
          price: item.price * quantities[index],
        })) || [],
      totalPrice: total,
    };

    createMutation.mutate(orderData, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy This Menu?</DialogTitle>
          <DialogDescription>
            <p className="font-semibold text-slate-900">Waiters: {auth.user?.fullName}</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-slate-900">Customer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Customer Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transaction?.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="flex items-center">
                          <Button variant={"ghost"} size={"sm"} type="button" onClick={() => handleQuantityChange(index, Math.max(1, quantities[index] - 1))}>
                            <Minus className="size-4" />
                          </Button>
                          <Input type="number" value={quantities[index]} onChange={(e) => handleQuantityChange(index, Math.max(1, parseInt(e.target.value) || 1))} min={1} />
                          <Button variant={"ghost"} size={"sm"} type="button" onClick={() => handleQuantityChange(index, quantities[index] + 1)}>
                            <Plus className="size-4" />
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">Rp.{item.price * quantities[index]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="text-right mr-4 font-bold text-slate-900">Total: Rp.{total}</p>
                <Button type="submit" className="mx-auto inline-block" disabled={createMutation.isPending}>
                  Submit
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionBuyDialog;
