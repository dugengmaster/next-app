# 🏗️ AIoT Web Platform 專案總覽

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

## 專案目標

* 建立 AIoT Web SaaS 平台，支援企業級多租戶、彈性組件、RWD體驗
* 採模組化元件結構，易於維護與擴充

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
        index.ts
        ui/
          StyledSidebarHeader.ts     // ⬅️ 命名統一用 Styled 開頭
          StyledSidebarNav.ts
      AppHeader.tsx
      BottomAppBar.tsx
      MobileDrawer.tsx
      MainContent.tsx
  stores/
    useLayoutStore.ts  // Zustand 狀態管理
```

* **每個元件子目錄下皆有 `index.ts` 作為接口檔案（必備）**
* **ui layer 命名統一使用 `Styled[Component].ts`**
* **ui/ 子目錄所有 components 須以 `export` 開頭明確規範**

**規範範例**：

```ts
// components/layout/Sidebar/ui/StyledSidebarHeader.ts
export const StyledSidebarHeader = styled(...)
```

```ts
// components/layout/Sidebar/ui/StyledSidebarNav.ts
export const StyledSidebarNav = styled(...)
```

```ts
// components/layout/Sidebar/index.ts
export { SidebarHeader } from './SidebarHeader'
export { StyledSidebarHeader } from './ui/StyledSidebarHeader'
```

---

## UI Layer 拆分原則

* 視覺樣式 (MUI styled) 完全與 UI 行為分離
* 所有樣式、覆寫、客製 styled 統一於 `ui/` 子目錄
* 主元件僅關注 props 與交互，樣式全部自外部導入
* **所有 ui/ 下的 styled components 都需 `export` 開頭**

---

## 主要功能組件

* DashBoardLayout
* Sidebar（SidebarHeader + SidebarNav）
* AppHeader
* MainContent
* BottomAppBar
* MobileDrawer

---
