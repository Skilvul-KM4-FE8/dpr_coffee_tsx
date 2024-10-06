import { create } from "zustand";

type EditMenuState = {
  id?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useEditMenu = create<EditMenuState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
