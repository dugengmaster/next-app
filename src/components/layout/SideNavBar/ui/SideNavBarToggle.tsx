import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpen from "@mui/icons-material/MenuOpen";
import { IconButton } from "@mui/material";
import { useNavStore } from "@/stores/useNavStore";


export const ToggleButton: React.FC = () => {
  const { toggled, toggle } = useNavStore();

  return (
    <IconButton
      color="inherit"
      onClick={toggle}
      aria-label={toggled ? "close nav" : "open nav"}
    >
      {toggled ? <MenuOpen /> : <MenuIcon />}
    </IconButton>
  );
};