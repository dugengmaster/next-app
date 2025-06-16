"use client";

import { SideNavBarContainer } from "./ui/SideNavBarContainer";
import { SideNavBarItems } from "./ui/SideNavBarItems";
import { sideNavBarItems } from "./items";
import { ToggleButton } from "./ui/SideNavBarToggle";

interface SideNavBarProps {
  isOpen: boolean;
}

export const SideNavBar: React.FC<SideNavBarProps> = () => {
  return (
    <SideNavBarContainer>
      <ToggleButton />
      <SideNavBarItems routes={sideNavBarItems} />
    </SideNavBarContainer>
  );
};
