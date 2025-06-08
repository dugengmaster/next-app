import { Box, BoxProps, Grid, Stack, styled, Typography } from "@mui/material";
import Link from "next/link";

const StyledItemsContainer = styled("nav")<BoxProps>({
  margin: "8px 0",
  color: "rgb(40, 40, 40)",
});

const StyledNavItem = styled(Stack)({
  padding: "4px",
});

const StyledNavLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  margin: "4px 0",
});

const StyledNavItemContent = styled(Grid)({});

interface StyledContentGridProps {
  toggled: boolean;
}

interface StyledFadeElementProps {
  toggled: boolean;
}

const getFadeInOutStyles = (toggled: boolean) => ({
  opacity: toggled ? 1 : 0,
  transition: "opacity 0.2s ease",
  transitionDelay: toggled ? "0.1s" : "0s",
});

const StyledContentGrid = styled(Stack)<StyledContentGridProps>(
  ({ toggled }) => ({
    display: "grid",
    gridTemplateColumns: toggled ? "1fr auto" : "0fr 0fr",
    marginLeft: "8px",
    transition: "grid-template-columns 0.3s ease",
    overflow: "hidden",
    width: "100%",
  })
);

const StyledText = styled(Typography)<StyledFadeElementProps>(
  ({ toggled }) => ({
    overflow: "hidden",
    whiteSpace: "nowrap",
    justifySelf: "start",
    ...getFadeInOutStyles(toggled),
  })
);

const StyledArrowContainer = styled(Box)<StyledFadeElementProps>(
  ({ toggled }) => ({
    justifySelf: "end",
    display: "flex",
    alignItems: "center",
    ...getFadeInOutStyles(toggled),
  })
);

export {
  StyledItemsContainer,
  StyledNavItem,
  StyledNavLink,
  StyledNavItemContent,
  StyledContentGrid,
  StyledText,
  StyledArrowContainer,
};
