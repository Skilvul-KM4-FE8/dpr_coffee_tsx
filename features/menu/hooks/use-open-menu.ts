import { create } from "zustand";

type EditMenuState = {
  id?: string;
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
};

export const useOpenMenu = create<EditMenuState>((set) => ({
  isOpen: false,
  onOpen: (id?: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}));
