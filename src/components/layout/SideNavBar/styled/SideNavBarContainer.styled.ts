import { styled } from "@mui/material/styles";
import { Box, BoxProps, Paper } from "@mui/material";

export const StyledAsideContainer = styled("aside")<BoxProps>({
  padding: "4px",
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  height: "100%",
  padding: "4px 0",
  backgroundColor: theme.palette.primary.main,
  overflow: "hidden",
}));

export const StyledToggleButtonContainer = styled(Box)({});

export const StyledDividerContainer = styled(Box)({
  padding: "0 8px",
});
