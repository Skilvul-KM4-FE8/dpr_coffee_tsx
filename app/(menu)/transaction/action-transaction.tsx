"use client";

import { Button } from "@/components/ui/button";
import useTransactionDialog from "@/features/transaction/hooks/use-transaction-dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type transactionType = {
  id: string;
  receptionist: string;
  customer: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  items: any[]; // Adjust the type of items as per your actual data structure
};

// Create a new ActionCell component
export const ActionTransaction = ({ transaction }: { transaction: transactionType }) => {
  const { onOpen } = useTransactionDialog();

  return (
    <Button variant="outline" onClick={() => onOpen(transaction)}>
      Details
    </Button>
  );
};