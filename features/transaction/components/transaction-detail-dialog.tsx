"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useTransactionDialog from "../hooks/use-transaction-dialog"; // Hook to manage the transaction dialog
import { Table, TableBody, TableHeader, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { useUser } from "@clerk/nextjs";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
// import { StructPrint } from "@/components/struct-print";
import { useRef } from "react"; // No need for RefObject

const useOpenTransaction = () => {
  const { isOpen, onOpen, onClose, transaction } = useTransactionDialog();
  const auth = useUser();

  // Ref for the component to print
  const contentRef = useRef<HTMLDivElement>(null); 

  // Handle print functionality with proper content function
  const reactToPrintFn = useReactToPrint({contentRef});

  return (
    < >
    <div style={{ width: "58mm", fontFamily: "Arial, sans-serif" }} >
      {/* <StructPrint ref={contentRef} /> */}
      {/* <div ref={contentRef}>
        Content is here
      </div> */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction</DialogTitle>
            <DialogDescription ref={contentRef} className="p-4">
              <div className="flex flex-col items-center">
                <div className="w-full px-4">
                  <p className="font-semibold text-left text-slate-900 mx-5">Receptionist: {auth.user?.fullName}</p>
                  <p className="font-semibold text-left text-slate-900 mx-5">Customer: {transaction?.customer}</p>
                </div>
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
                      <TableCell className="font-medium">{item?.menu?.name}</TableCell>
                      <TableCell className="font-medium">{item?.quantity}</TableCell>
                      <TableCell className="text-right">Rp.{item?.menu?.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="px-4">
                <p className="font-bold text-right text-slate-900">Total: Rp.{transaction?.totalPrice}</p>
              </div>
              </div>
            </DialogDescription>
            <Button variant="outline" onClick={() => reactToPrintFn()}>Print</Button>
            <Button onClick={onClose}>Close</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </div>
    </>
  );
};

export default useOpenTransaction;

