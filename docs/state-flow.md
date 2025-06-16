# ⚡ AIoT Web Platform 狀態流說明（Zustand）

---

## 1️⃣ 狀態管理核心（Zustand）

- 全域 UI 狀態單一來源，避免 prop drilling
- 僅負責 UI 狀態，不涉資料存取

---

## 2️⃣ Store 結構

- `isMobileView`：是否為 Mobile（由 useMediaQuery 決定）
- `isSidebarCollapsed`：SidebarNav 展開/收合狀態（SidebarHeader 控制，SidebarNav 響應）
- `selectedNavItem`：目前選單路由 key（SidebarNav 控制）
- `expandedNavItems`：多層選單展開紀錄（SidebarNav 控制）
- `user`：登入使用者資訊（AppHeader/全局可存取）

---

## 3️⃣ 主要狀態流動流程

1. Layout 初始化：

   - 使用 `useMediaQuery` 偵測解析度，設 `isMobileView` 狀態

2. SidebarHeader（Toggle）點擊時：

   - 切換 `isSidebarCollapsed` 狀態
   - 傳遞給 SidebarNav 決定顯示方式（展開/收合 menu）

3. SidebarNav（選單互動邏輯）：

   - 點擊父選單 item，更新 `selectedNavItem`
   - 點**箭頭（Arrow）**展開/收合 children item，修改 `expandedNavItems`
     - 每個父選單旁都有 Arrow，箭頭可多個同時展開（不會自動收起其他層）
     - 路由跳轉時自動收合非當前父 item 下的 children item
     - **Arrow 旋轉邏輯**：每個 Arrow icon 根據 `expandedNavItems` 狀態，展開時自動平滑旋轉 180°（建議 0.2~0.3 秒動畫），收合時復原
   - hover item 時，SidebarNav 觸發高亮（hover 狀態不會更改 selected，只改顏色/左側色條）
     - hover 狀態與 selector 狀態視覺上清楚區分
     - 收合狀態下，hover 會顯示 tooltip 或高亮 menu item

4. AppHeader / BottomAppBar:

   - AppHeader 只在 Desktop，BottomAppBar 只在 Mobile 狀態顯示，由 `isMobileView` 控制

---

## 4️⃣ 狀態使用範例

- SidebarNav/SidebarHeader：只讀寫 `isSidebarCollapsed`、`expandedNavItems`
- SidebarNav：根據 `selectedNavItem`、`expandedNavItems` 呈現不同 UI 狀態
- MainContent：不主動依賴狀態，只負責渲染 slot
- AppHeader/BottomAppBar：根據 `isMobileView` 決定顯示/隱藏

---

## 5️⃣ 流程圖示意

```
[User] → [SidebarHeader.Toggle] ⇄ (切換) ⇄ [Zustand Store] ⇄ [SidebarNav]
                ↓                                        ↑
         [useMediaQuery] → 設定 isMobileView → DashBoardLayout → (分 Desktop/Mobile 結構)
```

---

> 所有 UI 狀態單一來源，禁止跨元件 prop 傳遞控制
> 行為由發出元件控制，顯示由接收元件依據狀態判斷
