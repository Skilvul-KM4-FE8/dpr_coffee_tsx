"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useTransactionDialog from "../hooks/use-transaction-dialog"; // Hook to manage the transaction dialog
import { Table, TableBody, TableHeader, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const useOpenTransaction = () => {
  const { isOpen, onOpen, onClose, transaction } = useTransactionDialog();
  const auth = useUser();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction</DialogTitle>
          <DialogDescription>
            <p className="font-semibold text-slate-900">Receptionist: {auth.user?.fullName}</p>
            <p className="font-semibold text-slate-900">Customer: {transaction?.customer}</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transaction?.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="font-medium">{item.quantity}</TableCell>

                    <TableCell className="text-right">Rp.{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="font-bold text-slate-900">Total: Rp.{transaction?.totalPrice}</p>
          </DialogDescription>
          <Button variant="outline">Print</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default useOpenTransaction;
