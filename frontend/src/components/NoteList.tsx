import type { ReactElement } from "react";
import AppButton from "./Button";
import { Link } from "react-router-dom";
import { useUIInteractions } from "../utils/hooks/useInteraction";
import NoteItem from "./NoteItem";
import { useNotes } from "../utils/hooks/useNote";
import { useRequest } from "../utils/hooks/useRequest";
import { handleFavoriteStatusRequest } from "../core/api/note.service";
import { toast } from "react-toastify";

export default function NoteList(): ReactElement {
  const { notes, setNotes, setFavoriteNotes } = useNotes();
  const { hideNoteList } = useUIInteractions();
  const { execute: toggleFavoriteStatus, error } = useRequest(
    handleFavoriteStatusRequest
  );

  const handleFavoriteStatus = (id: string) => {
    const toggleFavorite = async () => {
      const updatedNote = await toggleFavoriteStatus(id);
      if (updatedNote) {
        setNotes((notes) =>
          notes.map((note) =>
            updatedNote._id === note._id ? updatedNote : note
          )
        );

        if (updatedNote.isFavorite)
          setFavoriteNotes((notes) => [...notes, updatedNote]);
        else
          setFavoriteNotes((notes) =>
            notes.filter((note) => note._id !== updatedNote._id)
          );

        toast.success(
          updatedNote.isFavorite
            ? "Note added to favorites!"
            : "Note removed from favorites!"
        );
      }

      if (error) toast.error(error);
    };

    void toggleFavorite();
  };

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
            <NoteItem note={note} handleFavoriteStatus={handleFavoriteStatus} />
          </Link>
        ))}
      </div>
    </div>
  );
}
