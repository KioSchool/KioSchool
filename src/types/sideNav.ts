export interface SideNavItem {
  name: string;
  path: string;
}

export interface SideNavCategory {
  category: string;
  items: SideNavItem[];
}
