import type { ReactElement } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import AppButton from "./Button";

interface ListProps {
  isFavorite: boolean;
}

export default function NoteList({
  isFavorite,
}: Readonly<ListProps>): ReactElement {
  return (
    <div className="py-6 px-3 overflow-y-auto h-full">
      <span className="flex items-center justify-between">
        <h3 className="text-white text-xl font-bold">Recent</h3>

        <AppButton
          variant="tertiary"
          title="Close list bar"
          className="w-fit! text-gray-400 text-sm"
        >
          Hide
        </AppButton>
      </span>

      <div className="flex flex-col gap-3 mt-7">
        <div className="flex flex-col gap-7 rounded-md bg-[#1f1f1f] px-4 py-3  cursor-pointer hover:bg-[#181818] duration-300">
          <span className="flex items-center justify-between">
            <h4 className="text-lg text-white font-semibold">Note Title</h4>

            <AppButton
              variant="tertiary"
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className="w-fit! p-0!"
            >
              {isFavorite ? (
                <FaStar className="text-white" />
              ) : (
                <FaRegStar className="text-white" />
              )}
            </AppButton>
          </span>
          <span className="flex items-center justify-between text-sm text-gray-400">
            <p>Note Date</p>
            <p>Note Content</p>
          </span>
        </div>
      </div>
    </div>
  );
}
