import { Box, ListItem, ListItemButton, ListItemText, MenuItem, styled } from "@mui/material";
import Link from "next/link";

interface StyledSubItemsContainerProps {
  isExpanded: boolean;
}

interface StyledCurrentItemProps {
  isCurrent: boolean;
}

export const StyledSubItemsContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isExpanded",
})<StyledSubItemsContainerProps>(({ isExpanded }) => ({
  marginLeft: "24px",
  overflow: "hidden",
  maxHeight: isExpanded ? "500px" : "0px",
  opacity: isExpanded ? 1 : 0,
  transition: "max-height 0.3s ease, opacity 0.2s ease",
  transitionDelay: isExpanded ? "0.1s" : "0s",
}));

export const StyledSubNavLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
});

export const StyledSubListItem = styled(ListItem)({
  padding: 0,
  margin: "2px 0",
});

export const StyledSubListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "isCurrent",
})<StyledCurrentItemProps>(({ isCurrent }) => ({
  padding: "6px 16px",
  borderRadius: "4px",
  backgroundColor: isCurrent ? "rgba(25, 118, 210, 0.12)" : "transparent",
  color: isCurrent ? "#1976d2" : "inherit",
  minHeight: "40px",
  transition: "background-color 0.2s ease, color 0.2s ease",
  
  "&:hover": {
    backgroundColor: isCurrent 
      ? "rgba(25, 118, 210, 0.16)" 
      : "rgba(0, 0, 0, 0.04)",
  },
}));

export const StyledSubListItemText = styled(ListItemText)({
  "& .MuiListItemText-primary": {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
});

export const StyledSubMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== "isCurrent",
})<StyledCurrentItemProps>(({ isCurrent }) => ({
  backgroundColor: isCurrent ? "rgba(25, 118, 210, 0.12)" : "transparent",
  color: isCurrent ? "#1976d2" : "inherit",
  minHeight: "40px",
  transition: "background-color 0.2s ease, color 0.2s ease",
  
  "&:hover": {
    backgroundColor: isCurrent 
      ? "rgba(25, 118, 210, 0.16)" 
      : "rgba(0, 0, 0, 0.04)",
  },
}));

export const StyledSubMenuItemText = styled(ListItemText)({
  "& .MuiListItemText-primary": {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
});