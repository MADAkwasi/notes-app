import type { IconType } from "react-icons";

export interface NavigationOption {
  id: number;
  icon: IconType;
  label: string;
  path: string;
}

export interface NavigationGroup {
  title: string;
  routes: NavigationOption[];
}
