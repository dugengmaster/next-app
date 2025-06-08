import { RoutesData } from "./types";
import WifiIcon from "@mui/icons-material/Wifi";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import RouterIcon from "@mui/icons-material/Router";

export const sideNavBarItems: RoutesData[] = [
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