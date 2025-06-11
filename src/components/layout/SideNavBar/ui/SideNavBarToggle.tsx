import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpen from "@mui/icons-material/MenuOpen";
import { IconButton } from "@mui/material";
import { useSideNavStore } from "@/stores/useNavStore";


export const ToggleButton: React.FC = () => {
  const { isCollapsed, toggleSidebar } = useSideNavStore();

  return (
    <IconButton
      color="inherit"
      onClick={toggleSidebar}
      aria-label={isCollapsed ? "close nav" : "open nav"}
    >
      {isCollapsed ? <MenuOpen /> : <MenuIcon />}
    </IconButton>
  );
};