import { Link } from "react-router-dom";
import { useNotes } from "../utils/hooks/useNote";
import NoteItem from "../components/NoteItem";
import {
  getUserNotesRequest,
  handleFavoriteStatusRequest,
} from "../core/api/note.service";
import { useRequest } from "../utils/hooks/useRequest";
import { toast } from "react-toastify";
import { Activity, useEffect } from "react";
import NoteItemSkeleton from "../components/NoteItemSkeleton";
import { CiFileOff } from "react-icons/ci";

export default function HomePage() {
  const { notes, setNotes, setFavoriteNotes } = useNotes();
  const {
    execute: toggleFavoriteStatus,
    isLoading: isToggling,
    error: toggleError,
  } = useRequest(handleFavoriteStatusRequest);
  const {
    execute: getNotes,
    isLoading: isFetchingNotes,
    error,
  } = useRequest(getUserNotesRequest);

  useEffect(() => {
    if (notes.length > 0) return;

    const fetchNotes = async () => {
      const userNote = await getNotes();
      if (userNote) setNotes(userNote);
      if (error) toast.error(error);
    };

    void fetchNotes();
  }, [getNotes, error, setNotes, notes.length]);

  const handleFavoriteStatus = (id: string) => {
    const toggleFavorite = async () => {
      const updatedNote = await toggleFavoriteStatus(id);
      if (updatedNote) {
        setNotes((notes) =>
          notes.map((note) =>
            updatedNote._id === note._id ? updatedNote : note
          )
        );

        setFavoriteNotes((notes) =>
          notes.filter((note) => note._id !== updatedNote._id)
        );

        toast.success(
          updatedNote.isFavorite
            ? "Note added to favorites!"
            : "Note removed from favorites!"
        );
      }

      if (toggleError) toast.error(toggleError);
    };

    void toggleFavorite();
  };

  return (
    <>
      <section className="lg:flex flex-col hidden text-white text-center justify-center items-center w-full h-full gap-3 px-6 bg-[#121212]">
        <img src="doc.png" alt="file" />
        <h2 className="text-3xl font-semibold">Select a note to view</h2>
        <p>
          Choose a note from the list on the left to view its contents, or
          create a new note to add to your collection.
        </p>
      </section>

      <Activity mode={isFetchingNotes ? "visible" : "hidden"}>
        <section className="lg:hidden w-full gap-6 py-8 px-6 bg-[#121212] grid grid-cols-1 md:grid-cols-2">
          <NoteItemSkeleton />
        </section>
      </Activity>

      <Activity
        mode={notes.length === 0 && !isFetchingNotes ? "visible" : "hidden"}
      >
        <section className="flex flex-col lg:hidden text-white text-center justify-center items-center w-full h-full gap-3 px-6 bg-[#121212]">
          <CiFileOff className="text-white text-6xl" />
          <h2 className="text-3xl font-semibold">
            You don't have any saved notes.
          </h2>
        </section>
      </Activity>

      <Activity
        mode={notes.length > 0 && !isFetchingNotes ? "visible" : "hidden"}
      >
        <section className="lg:hidden text-white text-center w-full gap-3 py-8 px-6 bg-[#121212] grid grid-cols-1 md:grid-cols-2">
          {notes.map((note) => (
            <Link to={`/notes/${note._id}`} key={note._id}>
              <NoteItem
                note={note}
                handleFavoriteStatus={handleFavoriteStatus}
                isLoading={isToggling}
              />
            </Link>
          ))}
        </section>
      </Activity>
    </>
  );
}
