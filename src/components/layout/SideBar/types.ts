
import * as React from "react";

export interface SideBarItemData {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  children?: SideBarItemData[];
}