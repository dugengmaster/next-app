"use client";

import { Stack, Typography, SxProps, Theme, Divider, Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideBarItemData } from "./types";

interface SideBarChildrenSectionProps {
  children: SideBarItemData[];
  isOpen: boolean;
  isExpanded: boolean;
}

const styles = {
  link: {
    color: "inherit",
    textDecoration: "none",
  } as React.CSSProperties,

  childrenWrapper: {
    display: "grid",
    transition: "grid-template-rows 0.2s ease",
  } as SxProps<Theme>,

  childrenInner: {
    overflow: "hidden",
    minHeight: 0,
  } as SxProps<Theme>,

  childrenContainer: {
    margin: "4px 0",
    padding: "0 8px 0 12px",
    transition: "opacity 0.2s ease",
  } as SxProps<Theme>,

  childrenContent: {
    width: "100%",
    minWidth: "150px",
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

  activeChildItem: {
    margin: "2px 0",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.15)",
    },
  } as SxProps<Theme>,

  dividerContainer: {
    width: "24px",
    display: "flex",
    justifyContent: "center",
  } as SxProps<Theme>,

  childItemText: {
    fontSize: "0.85rem",
    whiteSpace: "nowrap",
  } as SxProps<Theme>,
};

export const SideBarChildrenSection: React.FC<SideBarChildrenSectionProps> = ({
  children,
  isOpen,
  isExpanded,
}) => {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        ...styles.childrenWrapper,
        gridTemplateRows: isOpen && isExpanded ? "1fr" : "0fr",
        transitionDelay: isOpen ? "0.1s" : "0s",
      }}
    >
      <Box sx={styles.childrenInner}>
        <Stack
          direction="row"
          sx={{
            ...styles.childrenContainer,
            opacity: isOpen && isExpanded ? 1 : 0,
            visibility: isOpen && isExpanded ? "visible" : "hidden",
          }}
        >
          <Box sx={styles.dividerContainer}>
            <Divider orientation="vertical" />
          </Box>

          <Stack sx={styles.childrenContent}>
            {children.map((child, index) => {
              const isChildActive = pathname === child.href;
              return (
                <Link key={index} href={child.href} style={styles.link}>
                  <Stack sx={isChildActive ? styles.activeChildItem : styles.childItem}>
                    <Typography variant="body2" sx={styles.childItemText}>
                      {child.label}
                    </Typography>
                  </Stack>
                </Link>
              );
            })}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};