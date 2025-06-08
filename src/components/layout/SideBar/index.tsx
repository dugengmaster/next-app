"use client";
import * as React from "react";
import { ToggleButton } from "../../common/ToggleButton";
import { Drawer, Stack, SxProps, Theme } from "@mui/material";
import Divider from "@mui/material/Divider";
import WifiIcon from "@mui/icons-material/Wifi";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import RouterIcon from "@mui/icons-material/Router";
import { SideBarItemData } from "./types";
import { SideBarItem } from "./SideBarItem";
import { SideBarProvider, useSideBar } from "./SideBarContext";

const sideBarItems: SideBarItemData[] = [
  {
    id: "home",
    label: "首頁",
    icon: <HomeIcon />,
    href: "/",
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    icon: <WifiIcon />,
    href: "/wifi",
    children: [
      {
        id: "wifi-network",
        label: "網路設定",
        icon: <NetworkWifiIcon />,
        href: "/wifi/network",
      },
      {
        id: "wifi-router",
        label: "路由器管理",
        icon: <RouterIcon />,
        href: "/wifi/router",
      },
    ],
  },
  {
    id: "settings",
    label: "設定",
    icon: <SettingsIcon />,
    href: "/settings",
    children: [
      {
        id: "settings-profile",
        label: "個人資料",
        icon: <PersonIcon />,
        href: "/settings/profile",
      },
      {
        id: "settings-security",
        label: "安全性",
        icon: <SecurityIcon />,
        href: "/settings/security",
      },
      {
        id: "settings-notifications",
        label: "通知設定",
        icon: <NotificationsIcon />,
        href: "/settings/notifications",
      },
    ],
  },
];

const styles = {
  drawer: {
    height: "100%",
    padding: "4px",
  } as SxProps<Theme>,

  paper: (isOpen: boolean): SxProps<Theme> => ({
    width: isOpen ? "12em" : "3em",
    position: "relative",
    transition: "width 0.3s ease",
    overflow: "hidden",
    borderRadius: "8px",
    backgroundColor: "lightgreen",
  }),

  header: {
    width: "100%",
    padding: "0 4px",
  } as SxProps<Theme>,

  dividerContainer: {
    padding: "8px",
  } as SxProps<Theme>,

  itemsContainer: {
    padding: "0 4px",
    color: "rgb(40, 40, 40)",
  } as SxProps<Theme>,
};

const SideBarContent: React.FC = () => {
  const { isOpen, toggleSideBar } = useSideBar();

  return (
    <Drawer
      variant="permanent"
      sx={styles.drawer}
      slotProps={{
        paper: {
          sx: styles.paper(isOpen),
        },
      }}
    >
      <Stack direction="row" sx={styles.header}>
        <ToggleButton
          toggled={isOpen}
          onToggle={toggleSideBar}
        />
      </Stack>

      <Stack sx={styles.dividerContainer}>
        <Divider />
      </Stack>

      <Stack sx={styles.itemsContainer}>
        {sideBarItems.map((item) => (
          <SideBarItem key={item.id} item={item} />
        ))}
      </Stack>
    </Drawer>
  );
};

export const SideBar: React.FC = () => {
  return (
    <SideBarProvider sideBarItems={sideBarItems}>
      <SideBarContent />
    </SideBarProvider>
  );
};