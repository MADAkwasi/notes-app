import { Activity, type ReactElement } from "react";
import AppButton from "./Button";
import { FaRegStar, FaStar } from "react-icons/fa";
import type { Note } from "../utils/interfaces/note.interface";

interface ItemProps {
  isDeleted?: boolean;
  note: Note;
  onRestore?: (id: string) => void;
  isLoading?: boolean;
}

export default function NoteItem({
  note,
  isDeleted = false,
  onRestore,
  isLoading = false,
}: ItemProps): ReactElement {
  return (
    <div
      className={`flex flex-col gap-7 rounded-md px-4 py-3 duration-300 shadow-md ${
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
          {onRestore && (
            <AppButton
              className="w-fit! px-2 py-1! bg-yellow-500 text-xs hover:bg-yellow-600 active:bg-yellow-700"
              onClick={() => onRestore(note._id)}
              disabled={isLoading}
            >
              Restore
            </AppButton>
          )}
        </Activity>
      </span>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span className="whitespace-nowrap">
          {new Intl.DateTimeFormat("en-GB").format(new Date(note.createdAt))}
        </span>

        <p className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {note.content}
        </p>
      </div>
    </div>
  );
}
