import type { NavigationGroup } from "../interfaces/navigation.interface";
import { FaRegStar, FaRegTrashAlt } from "react-icons/fa";

export const additionalNavigation: NavigationGroup = {
  title: "More",
  routes: [
    {
      id: 1,
      label: "Favorite",
      path: "/favorites",
      icon: FaRegStar,
    },
    {
      id: 2,
      label: "Trash",
      path: "/recycle-bin",
      icon: FaRegTrashAlt,
    },
  ],
};
