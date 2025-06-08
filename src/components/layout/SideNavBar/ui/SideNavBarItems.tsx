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
                {/* Text */}
                <StyledText toggled={toggled}>{item.label}</StyledText>

                {/* Arrow Container */}
                {item.children && item.children.length > 0 && (
                  <StyledArrowContainer toggled={toggled}>
                    <KeyboardArrowUpIcon />
                  </StyledArrowContainer>
                )}
              </StyledContentGrid>
            </StyledNavItem>

            {/* subItems */}
            {item.children && item.children.length > 0 && (
              <SideNavBarSubItems
                items={item.children}
                isExpanded={true}
                parentPath={item.href}
              />
            )}
          </StyledNavLink>
        ))}
      </StyledNavItem>
    </StyledItemsContainer>
  );
};
