"use client";

import { SideNavBarContainer } from "./ui/SideNavBarContainer";
import { SideNavBarItems } from "./ui/SideNavBarItems";
import { sideNavBarItems } from "./items";
import { ToggleButton } from "./ui/SideNavBarToggle";

export const SideNavBar: React.FC = () => {
  return (
    <SideNavBarContainer>
      <ToggleButton />
      <SideNavBarItems routes={sideNavBarItems} />
    </SideNavBarContainer>
  );
};
