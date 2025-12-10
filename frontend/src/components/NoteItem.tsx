import { Activity, type ReactElement } from "react";
import AppButton from "./Button";
import { FaRegStar, FaStar } from "react-icons/fa";
import type { Note } from "../utils/interfaces/note.interface";

interface ItemProps {
  isDeleted?: boolean;
  note: Note;
}

export default function NoteItem({
  note,
  isDeleted = false,
}: ItemProps): ReactElement {
  return (
    <div
      className={`flex flex-col gap-7 rounded-md px-4 py-3 duration-300 shadow-md h-fit ${
        isDeleted
          ? "opacity-60 cursor-not-allowed bg-[#2a2a2a]"
          : "opacity-100 bg-[#1f1f1f] cursor-pointer hover:bg-[#181818]"
      }`}
    >
      <span className="flex items-center justify-between gap-2">
        <h4 className="text-lg text-white font-semibold">{note.title}</h4>

        <Activity mode={!isDeleted ? "visible" : "hidden"}>
          <AppButton
            variant="tertiary"
            title={
              note.isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            className="w-fit! p-0!"
          >
            {note.isFavorite ? (
              <FaStar className="text-white" />
            ) : (
              <FaRegStar className="text-white" />
            )}
          </AppButton>
        </Activity>

        <Activity mode={isDeleted ? "visible" : "hidden"}>
          <AppButton className="w-fit! px-2 py-1! bg-yellow-500 text-xs hover:bg-yellow-600">
            Restore
          </AppButton>
        </Activity>
      </span>
      <span className="flex items-center justify-between text-sm text-gray-400 whitespace-nowrap text-ellipsis overflow-hidden gap-8">
        {new Intl.DateTimeFormat("en-GB").format(new Date(note.createdAt))}
        <p>{note.content}</p>
      </span>
    </div>
  );
}
