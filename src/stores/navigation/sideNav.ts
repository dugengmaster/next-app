import { create } from "zustand";

interface SideNavState {
  isCollaped: boolean;
  toggleSideBar: () => void;
  setSideBar: (collaped: boolean) => void;
}

export const useSideNavStore = create<SideNavState>((set) => ({
  isCollaped: true,

  toggleSideBar: () => set((state) => ({ isCollaped: !state.isCollaped })),

  setSideBar(collaped: boolean) {
    set({ isCollaped: collaped });
  },
}));
