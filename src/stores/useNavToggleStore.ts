import { create } from "zustand";

interface NavState {
  toggled: boolean;
  toggle: () => void;
}

export const useNavStore = create<NavState>((set) => ({
  toggled: false,
  toggle: () => set((state) => ({ toggled: !state.toggled })),
}));
