"use client";

import { useState } from "react";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme";
import { CssBaseline, Box } from "@mui/material";
import { Header, SideBar, SideNavBar } from "@/components/layout";
import { useSideNavStore } from "@/stores/useNavStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 在 Layout 層級管理 nav 狀態
  const { isCollapsed } = useSideNavStore();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>

      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Grid 布局容器 */}
            <Box
              sx={{
                height: "100vh",
                display: "grid",
                gridTemplateRows: "auto 1fr",
                gridTemplateColumns: isCollapsed ? "12em 1fr" : "3em 1fr",
                transition: "grid-template-columns 0.3s ease-in-out",
                overflow: "hidden",
              }}
            >
              {/* Header 跨越兩列 */}
              <Header />

              {/* 側邊導航欄 */}
              <SideNavBar />

              {/* 主內容區域 - 可滾動 */}
              <Box
                sx={{
                  overflow: "auto",
                  height: "100%",
                }}
              >
                {children}
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
