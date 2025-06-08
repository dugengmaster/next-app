import { styled } from "@mui/material/styles";
import { Box, BoxProps, Paper } from "@mui/material";

const StyledAideContainer = styled("aside")<BoxProps>({
  padding: "4px",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: "100%",
  padding: "4px 0",
  backgroundColor: theme.palette.primary.main,
  overflow: "hidden",
}));

const StyledToggleButtonContainer = styled(Box)({});

const StyledDividerContainer = styled(Box)({
  padding: "0 8px",
});

export {
  StyledAideContainer,
  StyledPaper,
  StyledToggleButtonContainer,
  StyledDividerContainer,
};
