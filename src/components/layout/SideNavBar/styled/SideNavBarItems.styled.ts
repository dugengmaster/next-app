import { Box, BoxProps, Stack, styled, Typography } from "@mui/material";
import Link from "next/link";

interface StyledNavItemProps {
  isCurrent?: boolean;
}

interface StyledContentGridProps {
  isVisible: boolean;
}

interface StyledIconContainerProps {
  isCurrent: boolean;
}

interface StyledTextProps {
  isVisible: boolean;
}

interface StyledFadeElementProps {
  isVisible: boolean;
  isExpanded: boolean;
}

export const StyledItemsContainer = styled("nav")<BoxProps>({
  margin: "8px 0",
  color: "rgb(40, 40, 40)",
});

export const StyledNavItem = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isCurrent",
})<StyledNavItemProps>(({ isCurrent }) => ({
  padding: "4px",
  backgroundColor: isCurrent ? "rgba(0, 0, 0, 0.08)" : "transparent",
  borderRadius: "4px",
  transition: "background-color 0.2s ease",
}));

export const StyledNavLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  margin: "4px 0",
});

export const StyledContentGrid = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<StyledContentGridProps>(({ isVisible }) => ({
  display: "grid",
  gridTemplateColumns: isVisible ? "1fr auto" : "0fr 0fr",
  marginLeft: "8px",
  transition: "grid-template-columns 0.3s ease",
  overflow: "hidden",
  width: "100%",
  alignItems: "center",
}));

export const StyledIconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isCurrent",
})<StyledIconContainerProps>(({ isCurrent }) => ({
  display: "flex",
  alignItems: "start",
  justifyContent: "center",
  color: isCurrent ? "#1976d2" : "inherit",
  transition: "color 0.2s ease",
}));
export const StyledText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<StyledTextProps>(({ isVisible }) => ({
  overflow: "hidden",
  whiteSpace: "nowrap",
  justifySelf: "start",
  opacity: isVisible ? 1 : 0,
  transition: "opacity 0.3s ease",
  transitionDelay: isVisible ? "0.1s" : "0s",
}));

export const StyledArrowContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isVisible" && prop !== "isExpanded",
})<StyledFadeElementProps>(({ isVisible, isExpanded }) => ({
  justifySelf: "end",
  display: "flex",
  alignItems: "center",
  alignSelf: "center",
  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
  opacity: isVisible ? 0 : 1,
  transition: "transform 0.3s ease, opacity 0.2s ease",
}));
