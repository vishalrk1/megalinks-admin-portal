import { create } from "zustand";

interface useCategoryModelCategory {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCategoryModel = create<useCategoryModelCategory>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
