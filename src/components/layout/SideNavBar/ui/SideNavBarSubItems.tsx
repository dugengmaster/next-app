"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from "@mui/material";
import { RoutesData } from "@/types/navigation";
import { useSideNavStore } from "@/stores/useNavStore";
import { isCurrentRoute } from "@/utils/routeUtils";
import {
  StyledSubItemsContainer,
  StyledSubNavLink,
  StyledSubListItem,
  StyledSubListItemButton,
  StyledSubListItemText,
  StyledSubMenuItem,
  StyledSubMenuItemText,
} from "../styled/SideNavBarSubItems.styled";

interface SideNavBarSubItemsProps {
  items: RoutesData[];
  isExpanded: boolean;
  parentPath: string;
  parentElement?: HTMLElement | null;
}

export const SideNavBarSubItems: React.FC<SideNavBarSubItemsProps> = ({
  items,
  isExpanded,
  parentPath,
  parentElement,
}) => {
  const pathname = usePathname();
  const { isCollapsed } = useSideNavStore();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 當 nav 收起時，使用 Menu 顯示
  if (isCollapsed) {
    return (
      <Menu
        anchorEl={parentElement}
        open={Boolean(parentElement)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <MenuList>
          {items.map((item) => {
            const isCurrent = isCurrentRoute(item, pathname);
            
            return (
              <StyledSubNavLink key={item.id} href={item.href}>
                <StyledSubMenuItem 
                  onClick={handleMenuClose}
                  isCurrent={isCurrent}
                >
                  {item.icon && (
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {item.icon}
                    </ListItemIcon>
                  )}
                  <StyledSubMenuItemText primary={item.label} />
                </StyledSubMenuItem>
              </StyledSubNavLink>
            );
          })}
        </MenuList>
      </Menu>
    );
  }

  // 當 nav 展開時，使用 List 顯示
  return (
    <StyledSubItemsContainer isExpanded={isExpanded}>
      <List component="div" disablePadding>
        {items.map((item) => {
          const isCurrent = isCurrentRoute(item, pathname);
          
          return (
            <StyledSubNavLink key={item.id} href={item.href}>
              <StyledSubListItem disablePadding>
                <StyledSubListItemButton isCurrent={isCurrent}>
                  {item.icon && (
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {item.icon}
                    </ListItemIcon>
                  )}
                  <StyledSubListItemText primary={item.label} />
                </StyledSubListItemButton>
              </StyledSubListItem>
            </StyledSubNavLink>
          );
        })}
      </List>
    </StyledSubItemsContainer>
  );
};