import type { ReactElement } from "react";
import AppButton from "./Button";
import type { Note } from "../utils/interfaces/note.interface";
import { Link } from "react-router-dom";
import { useUIInteractions } from "../utils/hooks/useInteraction";
import NoteItem from "./NoteItem";

interface ListProps {
  notes: Note[];
}

export default function NoteList({ notes }: Readonly<ListProps>): ReactElement {
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
            <NoteItem isFavorite={false} note={note} />
          </Link>
        ))}
      </div>
    </div>
  );
}
