import { create } from "zustand";

interface SideNavState {
  isCollapsed: boolean;
  toggleSideBar: () => void;
  setSideBar: (collapsed: boolean) => void;
}

export const useSideNavStore = create<SideNavState>((set) => ({
  isCollapsed: true,

  toggleSideBar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),

  setSideBar(collapsed: boolean) {
    set({ isCollapsed: collapsed });
  },
}));
