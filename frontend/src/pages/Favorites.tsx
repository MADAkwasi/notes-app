import type { ReactElement } from "react";
import { LuStarOff } from "react-icons/lu";

export default function FavoritesPage(): ReactElement {
  return (
    <section className="flex flex-col text-white text-center justify-center items-center w-full h-full gap-3 px-6 bg-[#121212]">
      <LuStarOff className="text-white text-6xl" />
      <h2 className="text-3xl font-semibold">
        No note has been added to Favorites
      </h2>
    </section>
  );
}
