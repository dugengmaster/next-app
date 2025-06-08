"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export const Header: React.FC = () => {
  return (
    <AppBar position="relative" sx={{ gridColumn: "1 / -1" }}>
      <Toolbar>
      </Toolbar>
    </AppBar>
  );
};
