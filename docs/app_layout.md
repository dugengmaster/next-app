# AppLayout 架構文檔

## 📋 目錄

- [概述](#概述)
- [架構設計](#架構設計)
- [組件說明](#組件說明)
- [使用方式](#使用方式)
- [遷移指南](#遷移指南)
- [最佳實踐](#最佳實踐)
- [常見問題](#常見問題)
- [API 參考](#api-參考)

## 概述

AppLayout 是一個完整的應用程式布局系統，整合了 Header（頂部導航）和 Sidebar（側邊導航），提供統一的狀態管理和組件交互。

### 主要特性

- 🎨 **統一布局**：Header + Sidebar + Main Content 的經典布局
- 🔄 **狀態共享**：通過 Context 統一管理 sidebar、theme、search 等狀態
- 🧩 **組件化**：高度模組化，支援靈活組合
- 🎯 **類型安全**：完整的 TypeScript 支援
- 📱 **響應式**：支援 mobile/desktop 適配
- 🎪 **可自定義**：支援完全自定義組件內容

## 架構設計

### 整體結構

```
┌─────────────────────────────────────────────────────────┐
│ AppHeader                                               │
│ 🏠 Logo | 🔍 Search | 🌙 Theme | 👤 Profile | 🎨 Settings │
├─────────────────────────────────────────────────────────┤
│ AppSidebar │                                            │
│ ToggleBtn  │                                            │
│ 🏠 Home    │              Main Content                   │
│ 📶 WiFi    │              (children)                     │
│ ⚙️ Settings │                                            │
│            │                                            │
└─────────────────────────────────────────────────────────┘
```

### 狀態管理

```typescript
interface AppLayoutContextType {
  // Sidebar 控制
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // 主題控制
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // 搜尋功能
  searchOpen: boolean;
  toggleSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
```

## 組件說明

### Core Components

#### `<AppLayout>`
主要的布局容器，整合所有功能。

```typescript
interface AppLayoutProps {
  children: ReactNode;           // 主要內容區域
  routes: RoutesData[];          // 導航路由配置
  user?: UserData;               // 用戶資料
  defaultSidebarOpen?: boolean;  // 預設 sidebar 狀態
  defaultTheme?: 'light' | 'dark'; // 預設主題
  // Header 功能回調
  onHomeClick?: () => void;
  onUserSettings?: () => void;
  onCustomize?: () => void;
  onLogout?: () => void;
  searchPlaceholder?: string;
}
```

#### `<AppHeader>`
頂部導航區域，包含所有 header 功能。

#### `<AppSidebar>`  
側邊導航區域，包含路由選單和切換按鈕。

### Header Components

#### `<AppLogo>`
首頁圖標/Logo 按鈕
```typescript
<AppLogo onClick={() => router.push('/')} />
```

#### `<SearchBar>`
搜尋功能組件
```typescript
<SearchBar placeholder="搜尋功能或設定..." />
```

#### `<ThemeSwitch>`
日夜模式切換按鈕
```typescript
<ThemeSwitch />
```

#### `<UserProfile>`
用戶資料下拉選單
```typescript
<UserProfile 
  user={{ name: "John", avatar: "/avatar.jpg" }}
  onSettings={() => openSettings()}
  onLogout={() => handleLogout()}
/>
```

#### `<CustomizeSettings>`
自定義設定按鈕
```typescript
<CustomizeSettings onCustomize={() => openCustomPanel()} />
```

### Sidebar Components

#### `<NavigationMenu>`
導航選單組件（原 SideNavBarItems）
```typescript
<NavigationMenu routes={appRoutes} />
```

#### `<SidebarToggle>`
側邊欄收合按鈕
```typescript
<SidebarToggle />
```

### Hooks

#### `useAppLayout()`
取得 layout 狀態和控制函數
```typescript
const { 
  sidebarOpen, 
  toggleSidebar, 
  theme, 
  toggleTheme,
  searchQuery,
  setSearchQuery 
} = useAppLayout();
```

## 使用方式

### 基本使用

```typescript
// routes.ts
export const appRoutes: RoutesData[] = [
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
      }
    ],
  }
];

// App.tsx
import { AppLayout } from '@/components/AppLayout';
import { appRoutes } from '@/config/routes';

function App() {
  const user = { name: "John", avatar: "/avatar.jpg" };
  
  return (
    <AppLayout
      routes={appRoutes}
      user={user}
      defaultSidebarOpen={true}
      defaultTheme="light"
      onHomeClick={() => router.push('/')}
      onUserSettings={() => router.push('/profile')}
      onCustomize={() => setCustomizeOpen(true)}
      onLogout={() => handleLogout()}
      searchPlaceholder="搜尋功能或設定..."
    >
      {/* 你的頁面內容 */}
      <YourPageContent />
    </AppLayout>
  );
}
```

### 組合式使用（高級）

```typescript
function CustomLayoutExample() {
  return (
    <AppLayoutProvider defaultSidebarOpen={true}>
      <div className="custom-layout">
        {/* 自定義 Header */}
        <header className="custom-header">
          <div className="header-left">
            <AppLogo onClick={() => router.push('/')} />
            <SearchBar />
          </div>
          <div className="header-right">
            <ThemeSwitch />
            <CustomizeSettings onCustomize={openCustomize} />
            <UserProfile 
              user={currentUser}
              onLogout={handleLogout}
            />
          </div>
        </header>
        
        {/* 自定義 Body */}
        <div className="custom-body">
          <AppSidebar routes={appRoutes} showToggle={true} />
          <main className="main-content">
            <YourContent />
          </main>
        </div>
      </div>
    </AppLayoutProvider>
  );
}
```

### 在 Next.js 中使用

```typescript
// app/layout.tsx
import { AppLayout } from '@/components/AppLayout';
import { appRoutes } from '@/config/routes';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>
        <AppLayout
          routes={appRoutes}
          user={await getCurrentUser()}
          onHomeClick={() => router.push('/')}
          onUserSettings={() => router.push('/profile')}
          onLogout={() => signOut()}
        >
          {children}
        </AppLayout>
      </body>
    </html>
  );
}

// app/page.tsx
export default function HomePage() {
  return (
    <div>
      <h1>首頁內容</h1>
      {/* AppLayout 會自動包裹這些內容 */}
    </div>
  );
}
```

## 遷移指南

### 從 SideNavBar 遷移到 AppLayout

#### 步驟 1：更新檔案名稱
```bash
# 重命名檔案
mv SideNavBar.tsx AppLayout.tsx
mv items.ts routes.ts
mv SideNavBarContainer.tsx AppLayoutContainer.tsx
```

#### 步驟 2：更新組件名稱
```typescript
// Before
const sideNavBarItems = [...];
<SideNavBarContainer>
  <ToggleButton />
  <SideNavBarItems items={sideNavBarItems} />
</SideNavBarContainer>

// After  
const appRoutes = [...];
<AppLayout routes={appRoutes}>
  <YourContent />
</AppLayout>
```

#### 步驟 3：遷移功能
```typescript
// Before: 散落的狀態管理
const [isOpen, setIsOpen] = useState(false);
const [theme, setTheme] = useState('light');

// After: 統一的 Context 管理
const { sidebarOpen, theme, toggleSidebar, toggleTheme } = useAppLayout();
```

#### 步驟 4：更新樣式
```scss
// 更新 CSS class 名稱
.sidenav-container → .app-layout
.sidenav-header → .app-header  
.sidenav-items → .navigation-menu
```

### 向後兼容

如果需要漸進式遷移，可以同時保留舊組件：

```typescript
// 保留舊的 API 作為 wrapper
export const SideNavBar = (props) => {
  return (
    <AppLayout routes={props.items}>
      {props.children}
    </AppLayout>
  );
};
```

## 最佳實踐

### 1. 路由配置組織

```typescript
// 建議按功能分組
export const APP_ROUTES = {
  main: [
    { id: 'home', label: '首頁', icon: <HomeIcon />, href: '/' }
  ],
  
  network: [
    {
      id: 'wifi',
      label: 'Wi-Fi',
      icon: <WifiIcon />,
      href: '/wifi',
      children: [
        { id: 'wifi-settings', label: '設定', href: '/wifi/settings' }
      ]
    }
  ],
  
  system: [
    {
      id: 'settings',
      label: '系統設定',
      icon: <SettingsIcon />,
      href: '/settings'
    }
  ],
  
  // 組合所有路由
  get all() {
    return [...this.main, ...this.network, ...this.system];
  }
};
```

### 2. 主題系統

```scss
// 使用 CSS 變數支援主題
.app-layout {
  &.theme-light {
    --bg-primary: #ffffff;
    --text-primary: #333333;
    --border-color: #e0e0e0;
  }
  
  &.theme-dark {
    --bg-primary: #1a1a1a;
    --text-primary: #ffffff;
    --border-color: #333333;
  }
}

.app-header {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
}
```

### 3. 響應式設計

```typescript
// 使用 hook 處理響應式
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return { isMobile };
};

// 在 AppLayout 中使用
const AppLayout = (props) => {
  const { isMobile } = useResponsive();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  // mobile 時預設收合 sidebar
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);
  
  // ...
};
```

### 4. 效能優化

```typescript
// 使用 memo 避免不必要的重渲染
export const NavigationMenu = memo(({ routes }: { routes: RoutesData[] }) => {
  // ...
});

// 使用 useMemo 快取計算結果
const AppLayout = ({ routes, ...props }) => {
  const processedRoutes = useMemo(() => {
    return routes.map(route => ({
      ...route,
      isActive: pathname === route.href
    }));
  }, [routes, pathname]);
  
  // ...
};
```

## 常見問題

### Q: 如何自定義 Header 內容？

A: 有兩種方式：

```typescript
// 方式 1：使用 props 傳遞自定義內容
<AppLayout
  headerExtra={<CustomComponent />}
  routes={routes}
>
  {children}
</AppLayout>

// 方式 2：使用組合式組件
<AppLayoutProvider>
  <AppHeader>
    <div className="custom-header-content">
      <AppLogo />
      <CustomComponent />
      <UserProfile />
    </div>
  </AppHeader>
  <AppSidebar routes={routes} />
  <main>{children}</main>
</AppLayoutProvider>
```

### Q: 如何處理路由高亮？

A: 在 NavigationMenu 中使用 Next.js router 或 React Router：

```typescript
import { usePathname } from 'next/navigation';

const NavigationMenu = ({ routes }) => {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };
  
  return (
    <nav>
      {routes.map(route => (
        <a 
          key={route.id}
          href={route.href}
          className={`nav-link ${isActive(route.href) ? 'active' : ''}`}
        >
          {route.label}
        </a>
      ))}
    </nav>
  );
};
```

### Q: 如何實現權限控制？

A: 在路由配置中添加權限欄位：

```typescript
interface RoutesData {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  permissions?: string[];  // 新增權限欄位
  children?: RoutesData[];
}

// 過濾路由
const filterRoutesByPermissions = (routes: RoutesData[], userPermissions: string[]) => {
  return routes.filter(route => {
    if (route.permissions) {
      return route.permissions.some(permission => 
        userPermissions.includes(permission)
      );
    }
    return true;
  }).map(route => ({
    ...route,
    children: route.children ? 
      filterRoutesByPermissions(route.children, userPermissions) : 
      undefined
  }));
};

// 在 AppLayout 中使用
<AppLayout 
  routes={filterRoutesByPermissions(appRoutes, user.permissions)}
  user={user}
>
  {children}
</AppLayout>
```

### Q: 如何添加載入狀態？

A: 使用 Context 管理全域載入狀態：

```typescript
interface AppLayoutContextType {
  // ... 其他狀態
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// 在組件中使用
const SomeComponent = () => {
  const { setLoading } = useAppLayout();
  
  const handleAsyncAction = async () => {
    setLoading(true);
    try {
      await someAsyncOperation();
    } finally {
      setLoading(false);
    }
  };
};

// 在 AppLayout 中顯示載入指示器
const AppLayout = ({ children, ...props }) => {
  const { loading } = useAppLayout();
  
  return (
    <div className="app-layout">
      {loading && <LoadingOverlay />}
      <AppHeader {...props} />
      <AppSidebar routes={props.routes} />
      <main>{children}</main>
    </div>
  );
};
```

## API 參考

### AppLayout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | 主要內容區域 |
| `routes` | `RoutesData[]` | - | 導航路由配置 |
| `user` | `UserData` | `undefined` | 用戶資料 |
| `defaultSidebarOpen` | `boolean` | `true` | 預設 sidebar 狀態 |
| `defaultTheme` | `'light' \| 'dark'` | `'light'` | 預設主題 |
| `onHomeClick` | `() => void` | `undefined` | Logo 點擊回調 |
| `onUserSettings` | `() => void` | `undefined` | 用戶設定回調 |
| `onCustomize` | `() => void` | `undefined` | 自定義設定回調 |
| `onLogout` | `() => void` | `undefined` | 登出回調 |
| `searchPlaceholder` | `string` | `"搜尋..."` | 搜尋框佔位符 |

### RoutesData Interface

```typescript
interface RoutesData {
  id: string;              // 唯一識別碼
  label: string;           // 顯示文字
  icon?: ReactNode;        // 圖標組件
  href?: string;           // 連結地址
  onClick?: () => void;    // 點擊回調
  children?: RoutesData[]; // 子路由
  badge?: string | number; // 徽章
  permissions?: string[];  // 權限控制
}
```

### UserData Interface

```typescript
interface UserData {
  name: string;      // 用戶名稱
  avatar?: string;   // 頭像 URL
  email?: string;    // 電子郵件
  role?: string;     // 用戶角色
}
```

---

## 更新日誌

### v1.0.0 (2024-06-15)
- 🎉 初始版本發佈
- ✨ 完整的 Header + Sidebar 布局系統
- 🎨 主題切換功能
- 🔍 搜尋功能整合
- 📱 響應式設計支援
- 🔧 完整的 TypeScript 支援