"use client";

import React from "react";
import Divider from "@mui/material/Divider";
import {
  StyledAideContainer,
  StyledPaper,
  StyledToggleButtonContainer,
  StyledDividerContainer,
} from "../styled/SideNavBarContainer.styled";

interface SideNavBarContainerProps {
  children: React.ReactNode;
}

export const SideNavBarContainer: React.FC<SideNavBarContainerProps> = ({
  children,
}) => {
  const [toggleButton, ...navigationItems] = React.Children.toArray(children);

  return (
    <StyledAideContainer>
      <StyledPaper>
        {toggleButton && (
          <>
            <StyledToggleButtonContainer>
              {toggleButton}
            </StyledToggleButtonContainer>

            <StyledDividerContainer>
              <Divider />
            </StyledDividerContainer>
          </>
        )}
        {navigationItems}
      </StyledPaper>
    </StyledAideContainer>
  );
};
