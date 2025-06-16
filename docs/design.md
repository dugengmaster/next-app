# AIoT Web Platform SaaS Design Docs

---

## 技術棧總覽

| 技術             | 用途說明                          |
| -------------- | ----------------------------- |
| **Next.js**    | App 架構、Routing、SSR/ISR 支援     |
| **MUI**        | UI Component Library + RWD 支援 |
| **Zustand**    | 全局狀態管理                        |
| **TypeScript** | 型別安全開發                        |
| **React**      | 元件驅動開發核心                      |

---

## Layout 設計總覽

### 元件結構表

| 元件名稱              | 功能說明                                     |
| ----------------- | ---------------------------------------- |
| `DashBoardLayout` | 主排版元件，負責整體布局，依據狀態切換 Desktop/Mobile 模式    |
| `Sidebar`         | 左側導航組合器，包含 Header 與 Nav                  |
| `SidebarHeader`   | 顯示 Logo/Home 與 Toggle 按鈕                 |
| `SidebarNav`      | 垂直導航清單，支援展開/收合                           |
| `AppHeader`       | Desktop 狀態上方工具列，含搜尋/使用者/通知等              |
| `MainContent`     | 實際頁面主內容區塊，slot 形式注入                      |
| `BottomAppBar`    | Mobile 狀態底部工具列，含 Drawer、Home、Search、User |
| `MobileDrawer`    | Mobile 專用 Sidebar 抽屜，滑出顯示 SidebarNav     |

---

## Desktop Layout 結構

```jsx
<main class="layout-row">
  <aside class="sidebar-column">
    <SidebarHeader />
    <SidebarNav />
  </aside>
  <section class="main-column">
    <AppHeader />
    <MainContent />
  </section>
</main>
```

* Sidebar 固定左側，寬度可展開/收合
* AppHeader 置於主內容上方
* MainContent 彈性填滿區域

---

## Mobile Layout 結構

```jsx
<main class="layout-column">
  <MobileDrawer />    // Drawer 展開顯示 SidebarNav
  <MainContent />    // 滿版內容區
  <BottomAppBar />   // 固定底部，含 DrawerBtn / Home / Search / User
</main>
```

* Sidebar 元件由 Drawer 控制顯示/隱藏
* BottomAppBar 固定底部，符合手持操作習慣

---

## 狀態管理（Zustand）

* 全局管理 layout 狀態，避免過度 prop drilling
* 主要狀態包含：

  * `isMobileView`：是否為 Mobile 畫面（由 useMediaQuery 決定）
  * `isSidebarCollapsed`：Sidebar 展開或收合
  * `selectedNavItem`：當前選單項目
  * `user`：登入使用者資訊

---

## Responsive 切換原則

* 初次 render 載入全部主要 Layout 元件
* 用 MUI `useMediaQuery` 監控 Breakpoint，寫入 Zustand 狀態
* 各元件根據 Zustand 狀態自行決定顯示/隱藏（用 CSS 控制 display，不做條件卸載）
* AppHeader & BottomAppBar 僅在對應模式顯示

---

## 檔案結構建議

```
src/
  components/
    layout/
      DashBoardLayout.tsx
      Sidebar/
        Sidebar.tsx
        SidebarHeader.tsx
        SidebarNav.tsx
      AppHeader.tsx
      BottomAppBar.tsx
      MobileDrawer.tsx
      MainContent.tsx
  stores/
    useLayoutStore.ts  // Zustand 狀態管理
```

---

# 🧩 AIoT Web Platform Component 細節設計

---

## 1️⃣ DashBoardLayout

### 🎯 核心職責

* 全域排版與 Desktop/Mobile 切換
* 統一注入 Sidebar、Header、主內容

### 🛠️ 行為/邏輯

* 透過 `isMobileView` 決定渲染 Desktop 或 Mobile Layout
* Desktop：Sidebar（左側）+ AppHeader（上方）+ MainContent
* Mobile：MobileDrawer（隱藏）+ BottomAppBar（固定底部）+ MainContent

### 🧩 組件結構

* Desktop: 兩欄式（Sidebar / Main）
* Mobile: 單欄 + Drawer + BottomBar

---

## 2️⃣ Sidebar

### 📚 定位

* 左側導航容器
* 結合 SidebarHeader + SidebarNav

### 🛠️ 行為/邏輯

* 綁定 `isSidebarCollapsed` 狀態決定寬度
* 展開時顯示完整導航
* 收合時只顯示 icon（壓縮導航）

### 🧩 組件結構

* SidebarHeader
* SidebarNav

---

## 3️⃣ SidebarHeader

### 🏠 功能

* LOGO 或 Home Icon
* Sidebar 展開/收合切換

### 🛠️ 行為/邏輯

* Toggle Button 觸發 `isSidebarCollapsed` 切換

---

## 4️⃣ SidebarNav

### 📋 功能

* 多層級選單
* 支援展開/收合子選單
* 高亮當前 `selectedNavItem`

### 🛠️ 行為/邏輯

* 點擊選單更新 `selectedNavItem`
* 多層結構可選擇展開/收合
* 與 Store 綁定展開狀態

---

## 5️⃣ AppHeader

### 🔍 功能

* 搜尋欄
* 通知 icon
* 用戶頭像 / 選單

### 🛠️ 行為/邏輯

* 只在 Desktop 顯示
* 元素間距寬鬆，符合桌面體驗

---

## 6️⃣ MainContent

### 📄 功能

* 注入 slot（React children）
* 彈性滿版，支援頁面自動捲動

---

## 7️⃣ BottomAppBar

### 📱 功能

* Drawer 按鈕
* Home
* Search
* User

### 🛠️ 行為/邏輯

* 只在 Mobile 顯示
* 固定於螢幕底部，Icon Button 操作

---

## 8️⃣ MobileDrawer

### 📲 功能

* Drawer 橫滑展開收合 SidebarNav
* 滿版遮罩，關閉點擊自動收合

### 🛠️ 行為/邏輯

* BottomAppBar DrawerBtn 控制展開收合

---

## 9️⃣ Zustand 狀態

### ⚡ 管理重點

* `isMobileView`：畫面模式
* `isSidebarCollapsed`：Sidebar 狀態
* `selectedNavItem`：目前選單
* `user`：登入資訊
* 其他展開/收合 menu 狀態

---

# 🎨 AIoT Web Platform Component RWD & UI規則

---

## 1️⃣ DashBoardLayout

* 🖥️ Desktop：Sidebar 左側固定，主內容最大化顯示。
* 📱 Mobile：Sidebar 隱藏由 Drawer 控制，底部固定工具列，主內容全寬滿版。
* 📏 Breakpoint：以 MUI 預設 (sm/md/lg) 為基礎，mobile < 900px
* ⛔ 不條件卸載，用 CSS 控制顯示/隱藏，避免 React 元件卸載重繪問題。

---

## 2️⃣ Sidebar

* 🖥️ 寬度 240px，收合時 60px，icon-only。
* 📱 Mobile 隱藏，由 Drawer 控制顯示。
* 🎨 背景色建議用與主色互補/低飽和色，方便區隔。
* ✨ 展開/收合切換動畫（淡入/寬度變化）。

---

## 3️⃣ SidebarHeader

* 🖼️ LOGO 左對齊（收合狀態只顯示 icon）。
* 🔄 Toggle 按鈕貼齊 LOGO 右側，icon 尺寸大於一般操作鍵。
* 📐 上下 padding 16px。

---

## 4️⃣ SidebarNav

* 📚 選單項目高度 48px，icon+label 配置。
* ➡️ 多層選單用縮排/摺疊箭頭表示展開狀態。
* 🌈 當前選單高亮、hover 有明顯區分。
* 🧩 子選單展開動畫（高度/透明度）。

---

## 5️⃣ AppHeader

* 📏 高度 64px，內距 24px。
* 🔍 搜尋區置左，通知與用戶資訊置右。
* 📑 背景色白/半透明。
* 🛑 Mobile 不顯示。

---

## 6️⃣ MainContent

* 🖼️ 滿版填充主區。
* 🚫 無多餘邊框/陰影，保持乾淨。
* 🔄 支援捲動，內距 24px。

---

## 7️⃣ BottomAppBar

* 📱 固定底部，icon 列表等寬分布。
* 📦 高度 56px，背景色主色/深色，icon 對比色。
* 🟢 DrawerBtn/ Home/ Search/ User 四顆。
* 🛑 Desktop 不顯示。

---

## 8️⃣ MobileDrawer

* ⬅️ 滑出側邊欄，佔全高，寬度 240px。
* 🕶️ 遮罩全屏，點擊遮罩收合。
* 🏷️ 僅在 Mobile 狀態渲染。

---

## 9️⃣ Zustand 狀態

* ⚡ 所有 UI 狀態集中存，元件只讀取/更新，不自行管理。
* 🧠 可用 selector 節省 re-render。

---

> 完成 UI 與 RWD 設計後，接下來可針對 SidebarNav 配置、選單資料格式、互動場景、各元件之間事件 flow 再展開。


