import type { ReactElement } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import AppButton from "./Button";
import type { Note } from "../utils/interfaces/note.interface";
import { Link } from "react-router-dom";
import { useUIInteractions } from "../utils/hooks/useInteraction";

interface ListProps {
  isFavorite: boolean;
  notes: Note[];
}

export default function NoteList({
  isFavorite,
  notes,
}: Readonly<ListProps>): ReactElement {
  const { hideNoteList } = useUIInteractions();

  return (
    <div className="py-6 px-3 overflow-y-auto h-full">
      <span className="flex items-center justify-between">
        <h3 className="text-white text-xl font-bold">Recent</h3>

        <AppButton
          variant="tertiary"
          title="Close list bar"
          className="w-fit! text-gray-400 text-sm"
          onClick={hideNoteList}
        >
          Hide
        </AppButton>
      </span>

      <div className="flex flex-col gap-3 mt-7">
        {notes.map((note) => (
          <Link to={`/notes/${note._id}`} key={note._id}>
            <div className="flex flex-col gap-7 rounded-md bg-[#1f1f1f] px-4 py-3  cursor-pointer hover:bg-[#181818] duration-300 shadow-md">
              <span className="flex items-center justify-between">
                <h4 className="text-lg text-white font-semibold">
                  {note.title}
                </h4>

                <AppButton
                  variant="tertiary"
                  title={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                  className="w-fit! p-0!"
                >
                  {isFavorite ? (
                    <FaStar className="text-white" />
                  ) : (
                    <FaRegStar className="text-white" />
                  )}
                </AppButton>
              </span>
              <span className="flex items-center justify-between text-sm text-gray-400 whitespace-nowrap text-ellipsis overflow-hidden gap-8">
                {new Intl.DateTimeFormat("en-GB").format(
                  new Date(note.createdAt)
                )}
                <p>{note.content}</p>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
