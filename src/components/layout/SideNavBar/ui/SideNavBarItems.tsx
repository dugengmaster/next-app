"use client";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { RoutesData } from "../types";
import { useNavStore } from "@/stores/useNavStore";
import {
  StyledArrowContainer,
  StyledContentGrid,
  StyledItemsContainer,
  StyledNavItem,
  StyledNavLink,
  StyledText,
} from "../styled/SideNavBarItems.styled";
import { SideNavBarSubItems } from "./SideNavBarSubItems";

interface SideNavBarItemsProps {
  items: RoutesData[];
}

export const SideNavBarItems: React.FC<SideNavBarItemsProps> = ({ items }) => {
  const { toggled } = useNavStore();

  return (
    <StyledItemsContainer>
      <StyledNavItem direction="column">
        {items.map((item) => (
          <StyledNavLink key={item.id} href={item.href}>
            <StyledNavItem direction="row">
              {/* Icon */}
              {item.icon}

              {/* Text and Arrow Container */}
              <StyledContentGrid toggled={toggled}>
                <StyledText toggled={toggled}>{item.label}</StyledText>

                {item.children && item.children.length > 0 && (
                  <StyledArrowContainer toggled={toggled}>
                    <KeyboardArrowUpIcon />
                  </StyledArrowContainer>
                )}
              </StyledContentGrid>
            </StyledNavItem>
            {/* 子路由區塊 - 常駐展開 */}
            {item.children && item.children.length > 0 && (
              <SideNavBarSubItems
                items={item.children}
                isExpanded={true} // 常駐展開
                parentPath={item.href}
              />
            )}
          </StyledNavLink>
        ))}
      </StyledNavItem>
    </StyledItemsContainer>
  );
};
