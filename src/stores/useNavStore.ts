import { create } from "zustand";

interface SideNavState {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useSideNavStore = create<SideNavState>((set) => ({
  isCollapsed: false,
  toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
  
interface MenuExpansionState {
  expandedItems: Record<string, boolean>;
  toggleItem: (itemId: string) => void;
  isItemExpanded: (itemId: string) => boolean;
}

export const useMenuExpansionStore = create<MenuExpansionState>((set, get) => ({
  expandedItems: {},
  
  toggleItem: (itemId: string) => 
    set((state) => ({
      expandedItems: {
        ...state.expandedItems,
        [itemId]: !state.expandedItems[itemId]
      }
    })),
    
  isItemExpanded: (itemId: string) => {
    const state = get();
    return state.expandedItems[itemId] || false;
  },
}));