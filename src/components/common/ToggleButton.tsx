import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpen from "@mui/icons-material/MenuOpen";
import { IconButton } from "@mui/material";

interface ToggleButtonProps {
  toggled: boolean;
  onToggle: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  toggled,
  onToggle,
}) => {
  return (
    <IconButton
      color="inherit"
      onClick={onToggle}
    >
      {toggled ? <MenuOpen /> : <MenuIcon />}
    </IconButton>
  );
};
