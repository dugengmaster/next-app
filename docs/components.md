# 🧩 AIoT Web Platform Components

---

## DashBoardLayout

### 🎯 定位

* 全域排版管理
* 根據 isMobileView 切換 Desktop/Mobile 主結構

### 🧩 結構

* Desktop: Sidebar（左）、AppHeader（上）、MainContent（中）
* Mobile: MobileDrawer、BottomAppBar、MainContent

### 🔗 關聯

* 注入 slot 主內容，聯動狀態管理切換

---

## Sidebar

### 🎯 定位

* 左側導航容器，包含 SidebarHeader、SidebarNav

### 🧩 結構

* 展開/收合兩種寬度
* 組合 SidebarHeader（LOGO/切換）+ SidebarNav（多層 menu）

---

## SidebarHeader

### 🎯 定位

* LOGO + Sidebar 展開/收合按鈕

### 🛠️ 行為

* 點擊 Toggle 切換 `isSidebarCollapsed`

---

## SidebarNav

### 🎯 定位

* 多層級導航，支援展開/收合
* 高亮顯示 selectedNavItem

### 🛠️ 行為

* 點擊選單更新 selectedNavItem
* 展開/收合子選單，狀態與 Store 綁定

---

## AppHeader

### 🎯 定位

* 桌面版主內容區上方工具列

### 🧩 結構

* 搜尋、通知、用戶資訊區塊

---

## MainContent

### 🎯 定位

* Slot 注入各頁內容
* 滿版主內容呈現

---

## BottomAppBar

### 🎯 定位

* Mobile 版專用底部功能列

### 🧩 結構

* DrawerBtn / Home / Search / User 四顆 icon，固定底部

---

## MobileDrawer

### 🎯 定位

* Mobile 版專用側欄抽屜
* 滑出顯示 SidebarNav，覆蓋主畫面

### 🛠️ 行為

* 點擊 DrawerBtn 展開/收合
* 點擊遮罩自動收合

---

> 狀態管理與事件流於 state-flow\.md 詳述
> UI 規格、RWD 細節於 ui-rwd.md 補充
