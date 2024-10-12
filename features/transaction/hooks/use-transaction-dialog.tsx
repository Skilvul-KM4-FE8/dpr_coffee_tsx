import { create } from "zustand";

type Transaction = {
  id: string;
  receptionist: string;
  customer: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  items: [
    {
      id: string;
      name: string;
      price: number;
      quantity: number;
      createdAt: Date;
      updatedAt: Date;
      menu: {
        id: string;
        name: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  ];
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
