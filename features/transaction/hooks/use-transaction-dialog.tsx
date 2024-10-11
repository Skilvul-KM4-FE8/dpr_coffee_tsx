import { create } from "zustand";

type TransactionItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  // createdAt: Date;
  // updatedAt: Date;
};

type Transaction = {
  id: string;
  receptionist: string;
  customer: string;
  items: TransactionItem[];
};

type TypeTransactionDialog = {
  isOpen: boolean;
  transaction: Transaction | null;
  onOpen: (transaction: Transaction) => void;
  onClose: () => void;
};

const useTransactionDialog = create<TypeTransactionDialog>((set) => ({
  isOpen: false,
  transaction: null,
  onOpen: (transaction: Transaction) => set({ isOpen: true, transaction }),
  onClose: () => set({ isOpen: false, transaction: null }),
}));

export default useTransactionDialog;
