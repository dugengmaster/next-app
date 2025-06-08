"use client";

import { Stack, Typography, SxProps, Theme, Divider, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideBarItemData } from "../components/layout/SideBar/types";
import { useState, useEffect } from "react";

interface SidebarItemProps {
  item: SideBarItemData;
  isOpen: boolean;
}

const styles = {
  link: {
    color: "inherit",
    textDecoration: "none",
  } as React.CSSProperties,
  
  itemRow: {
    margin: "4px 0",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  } as SxProps<Theme>,
  itemContent: {
    marginLeft: "1em",
    transition: "opacity 0.2s ease",

    whiteSpace: "nowrap",
    width: "100%",
    justifyContent: "space-between",
  } as SxProps<Theme>,

  childrenContainer: {
    margin: "4px 0",
    padding: "0 8px",
  } as SxProps<Theme>,

  childItem: {
    margin: "2px 0",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
  } as SxProps<Theme>,
};

export const SideBarItem: React.FC<SidebarItemProps> = ({ item, isOpen }) => {
  const pathname = usePathname();
  const [shouldRenderChildren, setShouldRenderChildren] = useState(false);
  const [showChildrenAnimation, setShowChildrenAnimation] = useState(false);

  const isActive = pathname === item.href;
  const hasActiveChild =
    item.children?.some((child) => pathname === child.href) || false;
  const isCurrentSection = isActive || hasActiveChild;

  useEffect(() => {
    if (isOpen && isCurrentSection) {
      setTimeout(() => {
        setShouldRenderChildren(true);
      }, 100);
    } else {
      setShowChildrenAnimation(false);
      setTimeout(() => {
        setShouldRenderChildren(false);
      }, 0);
    }
  }, [isOpen, isCurrentSection]);

  return (
    <>
      <Link href={item.href} style={styles.link}>
        <Stack direction="row" sx={styles.itemRow}>
          {item.icon}
          <Stack
            direction="row"
            sx={{
              ...styles.itemContent,
              opacity: isOpen ? 1 : 0,
              transitionDelay: isOpen ? "0.1s" : "0s",
            }}
          >
            <Typography>{item.label}</Typography>
            {item.children && item.children.length > 0 && (
              <KeyboardArrowUpIcon
                sx={{
                  transform: isCurrentSection
                    ? "rotate(180deg) scale(1.1)"
                    : "rotate(0deg) scale(1)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: isCurrentSection
                      ? "rotate(180deg) scale(1.2)"
                      : "rotate(0deg) scale(1.1)",
                  },
                  "&:active": {
                    transform: isCurrentSection
                      ? "rotate(180deg) scale(0.9)"
                      : "rotate(0deg) scale(0.9)",
                  },
                }}
              />
            )}
          </Stack>
        </Stack>
      </Link>

      {item.children && item.children.length > 0 && shouldRenderChildren && (
        <Stack direction="row" sx={styles.childrenContainer}>
          <Box
            sx={{
              width: "24px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Divider orientation="vertical" />
          </Box>

          <Stack sx={{ width: "100%" }}>
            {item.children.map((child, index) => (
              <Link key={index} href={child.href} style={styles.link}>
                <Stack sx={styles.childItem}>
                  <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                    {child.label}
                  </Typography>
                </Stack>
              </Link>
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
};
