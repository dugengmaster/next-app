"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface SideBarContextType {
  isOpen: boolean;
  expandedItems: string[];
  manuallyExpandedItems: string[];
  toggleSideBar: () => void;
  toggleExpanded: (itemId: string) => void;
  expandItem: (itemId: string) => void;
  collapseAllExcept: (itemId: string) => void;
  setExpandedByRoute: (itemId: string) => void;
  setExpandedByArrow: (itemId: string) => void;
}

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

export const useSideBar = () => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBar must be used within a SideBarProvider");
  }
  return context;
};

interface SideBarProviderProps {
  children: React.ReactNode;
  sideBarItems?: Array<{
    id: string;
    href: string;
    children?: Array<{
      id: string;
      href: string;
    }>;
  }>;
}

export const SideBarProvider: React.FC<SideBarProviderProps> = ({ 
  children, 
  sideBarItems = [] 
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [manuallyExpandedItems, setManuallyExpandedItems] = useState<string[]>([]);
  const [manuallyCollapsedItems, setManuallyCollapsedItems] = useState<string[]>([]);
  const pathname = usePathname();

  // 監聽路由變化
  useEffect(() => {
    if (!sideBarItems.length) return;

    // 找出當前路由對應的父項目
    const activeParent = sideBarItems.find(item => {
      // 檢查是否是父項目本身
      if (item.href === pathname) return true;
      // 檢查是否是子項目
      return item.children?.some(child => child.href === pathname);
    });

    if (activeParent) {
      setExpandedItems(prev => {
        const newExpanded: string[] = [];
        
        // 如果當前路由項目沒有被手動收合，則加入展開列表
        if (!manuallyCollapsedItems.includes(activeParent.id)) {
          newExpanded.push(activeParent.id);
        }
        
        // 保留手動展開的項目
        manuallyExpandedItems.forEach(manualId => {
          if (!newExpanded.includes(manualId)) {
            newExpanded.push(manualId);
          }
        });
        
        return newExpanded;
      });
    } else {
      // 如果沒有對應的父項目，只保留手動展開的
      setExpandedItems(manuallyExpandedItems);
    }
  }, [pathname, sideBarItems, manuallyExpandedItems, manuallyCollapsedItems]);

  const toggleSideBar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleExpanded = useCallback((itemId: string) => {
    setExpandedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  }, []);

  const expandItem = useCallback((itemId: string) => {
    setExpandedItems((prev) => {
      if (!prev.includes(itemId)) {
        return [...prev, itemId];
      }
      return prev;
    });
  }, []);

  const collapseAllExcept = useCallback((itemId: string) => {
    setExpandedItems([itemId]);
  }, []);

  // 路由觸發的展開（會收起其他非手動展開的項目）
  const setExpandedByRoute = useCallback((itemId: string) => {
    // 點擊路由時，清除手動狀態
    setManuallyExpandedItems(prev => prev.filter(id => id !== itemId));
    setManuallyCollapsedItems(prev => prev.filter(id => id !== itemId));
    
    // 只保留當前項目和其他手動展開的項目
    setExpandedItems(() => {
      const newExpanded = [itemId];
      manuallyExpandedItems.forEach(manualId => {
        if (manualId !== itemId && !newExpanded.includes(manualId)) {
          newExpanded.push(manualId);
        }
      });
      return newExpanded;
    });
  }, [manuallyExpandedItems]);

  // 箭頭觸發的展開/收合（記錄為手動展開）
  const setExpandedByArrow = useCallback((itemId: string) => {
    // 找出當前路由對應的父項目
    const isCurrentRoute = sideBarItems.some(item => {
      if (item.id === itemId) {
        return item.href === pathname || item.children?.some(child => child.href === pathname);
      }
      return false;
    });

    setExpandedItems(prev => {
      const isCurrentlyExpanded = prev.includes(itemId);
      
      if (isCurrentlyExpanded) {
        // 收合時
        setManuallyExpandedItems(manual => manual.filter(id => id !== itemId));
        
        // 如果是當前路由，記錄為手動收合
        if (isCurrentRoute) {
          setManuallyCollapsedItems(manual => {
            if (!manual.includes(itemId)) {
              return [...manual, itemId];
            }
            return manual;
          });
        }
        
        return prev.filter(id => id !== itemId);
      } else {
        // 展開時
        setManuallyExpandedItems(manual => {
          if (!manual.includes(itemId)) {
            return [...manual, itemId];
          }
          return manual;
        });
        
        // 如果是當前路由，從手動收合列表中移除
        if (isCurrentRoute) {
          setManuallyCollapsedItems(manual => manual.filter(id => id !== itemId));
        }
        
        return [...prev, itemId];
      }
    });
  }, [pathname, sideBarItems]);

  const value = {
    isOpen,
    expandedItems,
    manuallyExpandedItems,
    toggleSideBar,
    toggleExpanded,
    expandItem,
    collapseAllExcept,
    setExpandedByRoute,
    setExpandedByArrow,
  };

  return (
    <SideBarContext.Provider value={value}>
      {children}
    </SideBarContext.Provider>
  );
};