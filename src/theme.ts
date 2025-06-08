"use client";
import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: blue[300],     // 淺藍色 (原本是 blue[500])
      light: blue[100],    // 更淺
      dark: blue[400],     // 稍深
    },
  },
});