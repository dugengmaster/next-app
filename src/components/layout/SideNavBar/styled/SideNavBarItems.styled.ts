import { Box, BoxProps, Grid, Stack, styled, Typography } from "@mui/material";
import Link from "next/link";

export const StyledItemsContainer = styled("nav")<BoxProps>({
  margin: "8px 0",
  color: "rgb(40, 40, 40)",
});

export const StyledNavItem = styled(Stack)({
  padding: "4px",
});

export const StyledNavLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  margin: "4px 0",
});

interface StyledContentGridProps {
  toggled: boolean;
}

interface StyledFadeElementProps {
  toggled: boolean;
}

export const getFadeInOutStyles = (toggled: boolean) => ({
  opacity: toggled ? 1 : 0,
  transition: "opacity 0.2s ease",
  transitionDelay: toggled ? "0.1s" : "0s",
});

export const StyledContentGrid = styled(Stack)<StyledContentGridProps>(
  ({ toggled }) => ({
    display: "grid",
    gridTemplateColumns: toggled ? "1fr auto" : "0fr 0fr",
    marginLeft: "8px",
    transition: "grid-template-columns 0.3s ease",
    overflow: "hidden",
    width: "100%",
  })
);

export const StyledText = styled(Typography)<StyledFadeElementProps>(
  ({ toggled }) => ({
    overflow: "hidden",
    whiteSpace: "nowrap",
    justifySelf: "start",
    ...getFadeInOutStyles(toggled),
  })
);

export const StyledArrowContainer = styled(Box)<StyledFadeElementProps>(
  ({ toggled }) => ({
    justifySelf: "end",
    display: "flex",
    alignItems: "center",
    ...getFadeInOutStyles(toggled),
  })
);
