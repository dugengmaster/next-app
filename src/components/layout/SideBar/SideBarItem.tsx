"use client";

import { Stack, Typography, SxProps, Theme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideBarItemData } from "./types";
import { useSideBar } from "./SideBarContext";
import { SideBarChildrenSection } from "./SideBarChildrenSection";

interface SidebarItemProps {
  item: SideBarItemData;
}

const styles = {
  link: {
    color: "inherit",
    textDecoration: "none",
    flex: 1, // 讓 Link 佔據剩餘空間
  } as React.CSSProperties,

  baseItemRow: {
    margin: "4px 0",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    justifyContent: "space-between",
    alignItems: "center",
  } as SxProps<Theme>,

  itemRow: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  } as SxProps<Theme>,

  activeItemRow: {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  } as SxProps<Theme>,

  linkContent: {
    display: "flex",
    alignItems: "center",
    gap: "1em",
    transition: "opacity 0.2s ease",
    whiteSpace: "nowrap",
  } as SxProps<Theme>,

  arrowIcon: {
    cursor: "pointer",
    flexShrink: 0,
  } as SxProps<Theme>,
};

const getItemRowStyles = (isActive: boolean, hasActiveChild: boolean) => ({
  ...styles.baseItemRow,
  ...(isActive || hasActiveChild ? styles.activeItemRow : styles.itemRow),
});

export const SideBarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const pathname = usePathname();
  const { isOpen, expandedItems, setExpandedByRoute, setExpandedByArrow } =
    useSideBar();

  const isExpanded = expandedItems.includes(item.id);
  const isActive = pathname === item.href;
  const hasActiveChild =
    item.children?.some((child) => pathname === child.href) || false;

  const handleMainItemClick = (e: React.MouseEvent) => {
    if (item.children && item.children.length > 0) {
      setExpandedByRoute(item.id);
    }
  };

  const handleArrowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedByArrow(item.id);
  };

  return (
    <>
      <Stack
        direction="row"
        sx={getItemRowStyles(isActive, hasActiveChild)}
        onClick={handleMainItemClick}
      >
        <Link href={item.href} style={styles.link}>
          <Stack
            direction="row"
            sx={{
              ...styles.linkContent,
              opacity: isOpen ? 1 : 0,
              transitionDelay: isOpen ? "0.1s" : "0s",
            }}
          >
            {item.icon}
            {isOpen && <Typography>{item.label}</Typography>}
          </Stack>
        </Link>

        {item.children && item.children.length > 0 && isOpen && (
          <KeyboardArrowUpIcon
            sx={{
              ...styles.arrowIcon,
              transform: isExpanded
                ? "rotate(180deg) scale(1.1)"
                : "rotate(0deg) scale(1)",
              transition: "transform 0.3s ease",
              opacity: isOpen ? 1 : 0,
              transitionDelay: isOpen ? "0.1s" : "0s",

              "&:hover": {
                transform: isExpanded
                  ? "rotate(180deg) scale(1.2)"
                  : "rotate(0deg) scale(1.1)",
              },
              "&:active": {
                transform: isExpanded
                  ? "rotate(180deg) scale(0.9)"
                  : "rotate(0deg) scale(0.9)",
              },
            }}
            onClick={handleArrowClick}
          />
        )}
      </Stack>

      {item.children && item.children.length > 0 && (
        <SideBarChildrenSection
          children={item.children}
          isOpen={isOpen}
          isExpanded={isExpanded}
        />
      )}
    </>
  );
};
