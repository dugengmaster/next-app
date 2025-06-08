"use client";

import { usePathname } from "next/navigation";
import { Typography, Collapse } from "@mui/material";
import { StyledNavLink } from "../styled/SideNavBarItems.styled";
import { RoutesData } from "../types";
import { StyledSubItem, StyledSubItemContainer } from "../styled/SideNavBarSubItems.styled";

interface SideNavBarSubItemsProps {
  items: RoutesData[];
  isExpanded: boolean;
  parentPath: string;
}

export const SideNavBarSubItems: React.FC<SideNavBarSubItemsProps> = ({
  items,
  isExpanded,
  parentPath,
}) => {
  const pathname = usePathname();

  return (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <StyledSubItemContainer direction="column">
        {items.map((subItem) => {
          const isActive = pathname === subItem.href;
          
          return (
            <StyledNavLink key={subItem.href} href={subItem.href}>
              <StyledSubItem direction="row" isActive={isActive}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: isActive ? "primary.main" : "text.secondary",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {subItem.label}
                </Typography>
              </StyledSubItem>
            </StyledNavLink>
          );
        })}
      </StyledSubItemContainer>
    </Collapse>
  );
};