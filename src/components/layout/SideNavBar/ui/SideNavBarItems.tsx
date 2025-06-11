"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { RoutesData } from "@/types/navigation";
import { useSideNavStore, useMenuExpansionStore } from "@/stores/useNavStore";
import { hasMatchingChildRoute, isCurrentRoute } from "@/utils/routeUtils";
import {
  StyledArrowContainer,
  StyledContentGrid,
  StyledItemsContainer,
  StyledNavItem,
  StyledNavLink,
  StyledText,
  StyledIconContainer,
} from "../styled/SideNavBarItems.styled";
// import { SideNavBarSubItems } from "./SideNavBarSubItems";

interface SideNavBarItemsProps {
  items: RoutesData[];
}

export const SideNavBarItems: React.FC<SideNavBarItemsProps> = ({ items }) => {
  const pathname = usePathname();
  const { isCollapsed } = useSideNavStore();
  const { toggleItem, isItemExpanded } = useMenuExpansionStore();

  useEffect(() => {
    if (isCollapsed) return;

    const findParentItem = (currentPath: string) => {
      for (const item of items) {
        if (item.children && item.children.length > 0) {
          if (
            hasMatchingChildRoute(item, currentPath) &&
            !isItemExpanded(item.id)
          ) {
            toggleItem(item.id);
          }
        }
      }
    };

    findParentItem(pathname);
  }, [pathname, isCollapsed]);

  const handleArrowClick = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(itemId);
  };

  return (
    <StyledItemsContainer>
      <StyledNavItem direction="column">
        {items.map((item) => {
          const isExpanded = isItemExpanded(item.id);
          const isCurrent = isCurrentRoute(item, pathname);

          return (
            <StyledNavLink key={item.id} href={item.href}>
              <StyledNavItem direction="row" isCurrent={isCurrent}>
                {/* Icon */}
                <StyledIconContainer isCurrent={isCurrent}>
                  {item.icon}
                </StyledIconContainer>

                {/* Text and Arrow Container */}
                <StyledContentGrid isVisible={isCollapsed}>
                  {/* Text */}
                  <StyledText isVisible={isCollapsed}>{item.label}</StyledText>

                  {/* Arrow Container */}
                  {item.children && item.children.length > 0 && (
                    <StyledArrowContainer
                      isVisible={!isCollapsed}
                      isExpanded={isExpanded}
                      onClick={(e) => handleArrowClick(e, item.id)}
                    >
                      <KeyboardArrowUpIcon />
                    </StyledArrowContainer>
                  )}
                </StyledContentGrid>
              </StyledNavItem>

              {/* subItems */}
              {/* {item.children && item.children.length > 0 && isExpanded && (
                <SideNavBarSubItems
                  items={item.children}
                  isExpanded={isExpanded}
                  parentPath={item.href}
                />
              )} */}
            </StyledNavLink>
          );
        })}
      </StyledNavItem>
    </StyledItemsContainer>
  );
};
