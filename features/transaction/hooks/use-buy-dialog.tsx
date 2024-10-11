import { create } from "zustand";

type TypeBuyDialog = {
    // id: string;
    isOpen: boolean;
    menu: {
        id: string;
        name: string;
        price: number;
        // createdAt: Date;
        // updatedAt: Date;
    }[];
    onOpen: (menu: {
        id: string;
        name: string;
        price: number;
        // createdAt: Date;
        // updatedAt: Date;
    }[]) => void;
    onClose: () => void;
}

const useBuyDialog = create<TypeBuyDialog>((set) => ({
    isOpen: false,
    menu: [],
    onOpen: (menu: { 
        id: string; 
        name: string; 
        price: number; 
        // createdAt: Date; 
        // updatedAt: Date; 
    }[]) => set({ isOpen: true, menu: menu }),
    onClose: () => set({ isOpen: false }),
}))

export default useBuyDialog;