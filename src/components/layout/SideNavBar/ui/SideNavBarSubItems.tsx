"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Stack, Typography, Collapse, styled } from "@mui/material";
import { StyledNavLink } from "../styled/SideNavBarItems.styled";
import { RoutesData } from "../types";

interface SideNavBarSubItemsProps {
  items: RoutesData[];
  isExpanded: boolean;
  parentPath: string;
}

const StyledSubItemContainer = styled(Stack)({
  paddingLeft: "32px", // 縮排顯示這是子項目
  marginTop: "4px",
});

const StyledSubItem = styled(Stack)<{ isActive: boolean }>(({ isActive }) => ({
  padding: "8px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  backgroundColor: isActive ? "rgba(25, 118, 210, 0.08)" : "transparent",
  "&:hover": {
    backgroundColor: isActive 
      ? "rgba(25, 118, 210, 0.12)" 
      : "rgba(0, 0, 0, 0.04)",
  },
  transition: "background-color 0.2s ease",
}));

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