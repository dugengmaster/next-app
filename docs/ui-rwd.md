# 🎨 AIoT Web Platform UI & RWD 規範

---

## DashBoardLayout

* 🖥️ Desktop：Sidebar 左側固定，主內容最大化顯示（Sidebar 固定，MainContent 佔滿剩餘區域，主內容有明顯留白 padding，不會被壓縮）。
* 📱 Mobile：Sidebar 隱藏由 Drawer 控制，底部固定工具列，主內容全寬滿版。
* 📏 Breakpoint：以 MUI 預設 (sm/md/lg) 為基礎，mobile < 900px。
* ⛔ 用 CSS 控制顯示/隱藏，避免 React 條件卸載重繪。
* 🚫 全視窗禁用 scroll bar，只允許元件內部（如 SidebarNav、MainContent）出現 scroll bar。

---

## Sidebar

* 🗂️ 只作為容器組件，負責組合 SidebarHeader + SidebarNav
* ❌ 不負責展開/收合任何邏輯，無需管理寬度與狀態
* 🖥️ 正常寬度 240px，Mobile 隱藏，由 Drawer 控制顯示
* 🎨 背景色建議用低飽和色與主色區隔
* ⛔ 任何展開/收合互動皆由 SidebarHeader 或 SidebarNav 決定

---

## SidebarHeader

* 🖼️ LOGO 靠左，Toggle 按鈕靠右，**不會自動縮合**。
* 📐 上下 padding 16px。

---

## SidebarNav

* 📚 固定高度，周圍有 border-radius，內部內容超過即顯示 scroll bar。

* 🟪 **Discord 風格設計**：

  * 卡片式區域、圓角、低飽和底色
  * 滑動流暢，scroll bar 僅 SidebarNav 內出現
  * 每個 item 間距均勻、層次明確

* 🧑‍🤝‍🧑 **Items 狀態**：

  * Selector/hover 狀態：左側有色條/色塊明顯區分（Discord style 色條）
  * 當前 item 高亮，hover 狀態顏色明顯區分
  * 點擊為父路由
  * 整個 item clickable 區域要夠大，padding 最少 12px
  * 收合狀態 hover 顯示 tooltip

* 🗂️ **展開狀態**：

  * 有箭頭圖示表示是否展開
  * Arrow 旋轉有 0.2\~0.3s 流暢動畫（根據 expandedNavItems 狀態控制角度）
  * 點箭頭展開 children item，可同時展開多個
  * 子選單展開/收合有淡入/淡出與高度動畫（height/opacity 動畫）
  * children item 左側有 time line 效果
  * children item 不需 Discord selector/hover，只需高亮
  * 路由跳轉後自動收起非當前 children item

* 📑 **收合狀態**：

  * 子選單縮合時僅顯 icon，label 與箭頭圖示消失
  * children item 以 menu 呈現 Tooltip 顯示完整名稱、分隔線、children item hover 高亮並保持 Discord hover 效果

* 📏 高 64px，左右內距 24px。

* 🔍 搜尋區置左，通知/用戶資訊置右。

* 📑 背景白或半透明。

* 🛑 Mobile 隱藏。

---

## MainContent

* 🖼️ 滿版填充主區，**四周必有 padding**（建議 24px），避免內容貼齊 Sidebar 或 Header。
* 🚫 無多餘邊框/陰影，保持乾淨。
* 🔄 擁有自己的 scroll bar（只允許 main 區塊本身出現 scroll bar）。

---

## BottomAppBar

* 📱 固定底部，icon 四等分。
* 📦 高 56px，背景主色/深色，icon 對比色。
* 🛑 Desktop 隱藏。

---

## MobileDrawer

* ⬅️ 側邊滑出，佔全高，寬 240px。
* 🕶️ 遮罩全屏，點遮罩收合。
* 🏷️ 僅 Mobile 狀態渲染。

---

> 所有元件樣式一律以 styled-components 或 MUI styled 實作，ui/ 子目錄統一命名。
