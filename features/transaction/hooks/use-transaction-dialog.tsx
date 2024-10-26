import { create } from "zustand";

interface Menu {
  id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface TransactionItem {
  id: string;
  quantity: number;
  menuId: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
  menu: Menu;
  name: string,
  price: number,
  category: string,
}

interface Transaction {
  id: string;
  receptionist: string;
  customer: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  items: TransactionItem[];
}

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
