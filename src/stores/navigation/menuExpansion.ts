import { create } from "zustand";

interface MenuExpansionState {
  expandedItems: Record<string, boolean>;
  toggleItem: (itemId: string) => void;
  isItemExpanded: (itemId: string) => boolean;
  setItemExpanded: (itemId: string, expanded: boolean) => void;
  collapseAllItems: () => void;
}

export const useMenuExpansionStore = create<MenuExpansionState>((set, get) => ({
  expandedItems: {},

  toggleItem: (itemId: string) =>
    set((state) => ({
      expandedItems: {
        ...state.expandedItems,
        [itemId]: !state.expandedItems[itemId],
      },
    })),

  isItemExpanded: (itemId: string) => {
    const state = get();
    return state.expandedItems[itemId] || false;
  },

  setItemExpanded: (itemId: string, expanded: boolean) =>
    set((state) => ({
      expandedItems: {
        ...state.expandedItems,
        [itemId]: expanded,
      },
    })),

  collapseAllItems: () => set({ expandedItems: {} }),
}));
