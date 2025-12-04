import type { NavigationGroup } from "../interfaces/navigation.interface";
import { FaRegFileAlt, FaRegStar, FaRegTrashAlt } from "react-icons/fa";
import type { Note } from "../interfaces/note.interface";

export const additionalNavigation: NavigationGroup = {
  title: "More",
  routes: [
    {
      id: "1",
      label: "Favorite",
      path: "/favorites",
      icon: FaRegStar,
    },
    {
      id: "2",
      label: "Trash",
      path: "/recycle-bin",
      icon: FaRegTrashAlt,
    },
  ],
};

export const recentNavigationGroup = (notes: Note[]): NavigationGroup => {
  return {
    title: "Recent",
    routes: notes.map((note) => ({
      id: note._id,
      label: note.title,
      path: `/notes/${note._id}`,
      icon: FaRegFileAlt,
    })),
  };
};
