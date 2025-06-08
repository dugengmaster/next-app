import { Stack, styled } from "@mui/material";

export const StyledSubItemContainer = styled(Stack)({
  paddingLeft: "32px",
  marginTop: "4px",
});

export const StyledSubItem = styled(Stack)<{ isActive: boolean }>(({ isActive }) => ({
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
