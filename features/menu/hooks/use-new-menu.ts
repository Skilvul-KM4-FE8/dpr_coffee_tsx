import { create } from "zustand";

type NewMenuState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewMenu = create<NewMenuState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
